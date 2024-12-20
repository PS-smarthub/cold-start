import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { UserCircle, Palette } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type UserdropdwonProps = {
  user: Session["user"] | undefined;
};

export function UserDropdown({ user }: UserdropdwonProps) {
  if (!user) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 flex items-center justify-between w-full !px-0 space-x-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image as string}
              alt={user?.name as string}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 max-w-max truncate flex-1 text-left">
            {user.name && (
              <p className="text-sm font-medium leading-none">{user.name}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/app/settings"}>
              <UserCircle className="w-4 h-4 mr-3" />
              Meu perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/app/settings/theme"}>
              <Palette className="w-4 h-4 mr-3" />
              <span>Aparência</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LockClosedIcon className="w-4 h-4 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
