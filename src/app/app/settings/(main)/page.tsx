import { ProfileCard } from "./_components/profile-card";
import { auth } from "@/services/auth";

export default async function Page() {
  const session = await auth();
  return <ProfileCard defaultValues={session?.user} />;
}
