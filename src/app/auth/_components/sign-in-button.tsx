import { Button } from "@/components/ui/button";
import { signIn } from "@/services/auth";
import React from "react";

export default function SignInButton() {
  return (
    <form
      className="space-y-4"
      action={async () => {
        "use server";
        await signIn("microsoft-entra-id");
      }}
    >
      <Button
        type="submit"
        className="w-full bg-blue-800 hover:bg-blue-900 font-semibold text-lg"
      >
        Bosch Login
      </Button>
    </form>
  );
}
