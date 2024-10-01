import { auth } from "@/services/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname != "/auth/signin") {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && req.nextUrl.pathname == "/auth/signin") {
    const newUrl = new URL("/app", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
