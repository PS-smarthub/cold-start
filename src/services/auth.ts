import { env } from "@/env";
import NextAuth from "next-auth";
import Entra from "next-auth/providers/microsoft-entra-id";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

let accountInfoProcessed = false;

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Entra({
      clientId: env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: {
        prompt: "select-account",
        params: {
          scope: "openid profile email User.Read offline_access",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && !accountInfoProcessed) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        accountInfoProcessed = true;
      }
      return token;
    },
    async session({ session, token }) {
      const profilePicture = await fetch(
        `https://graph.microsoft.com/v1.0/me/photos/648x648/$value`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );

      if (profilePicture.ok) {
        const pictureBuffer = await profilePicture.arrayBuffer();
        const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");
        session.user.image = `data:image/jpeg;base64, ${pictureBase64} `;
      }

      session.user.token = token.accessToken as string;
      return session;
    },
  },
});
