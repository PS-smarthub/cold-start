import Image from "next/image";
import SignInButton from "../_components/sign-in-button";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 lg:block bg-blue-500">
        <Image
          src="/assets/login_image.png"
          alt="Login background"
          width={1080}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">
              Entre na sua conta para continuar
            </p>
          </div>
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
