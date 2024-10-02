"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavLink,
  SidebarNavMain,
} from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";
import { MixerVerticalIcon, CalendarIcon } from "@radix-ui/react-icons";
import { UserDropdown } from "./user-dropdown";
import { Session } from "next-auth";
import { Container } from "lucide-react"

type MainSidebarProps = {
  user: Session["user"] | undefined;
};

export default function MainSidebar({ user }: MainSidebarProps) {
  const pathanme = usePathname();

  const isActive = (path: string) => {
    return pathanme === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Cold Start</h1>
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/app" active={isActive("/app/container/1")}>
              <Container className="w-4 h-4 mr-3" />
              Container
            </SidebarNavLink>
            <SidebarNavLink href="/app/calendar" active={isActive("/app/calendar")}>
              <CalendarIcon className="w-4 h-4 mr-3" />
              Agenda
            </SidebarNavLink>
            <SidebarNavLink href="/app/settings">
              <MixerVerticalIcon className="w-4 h-4 mr-3" />
              Configurações
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter>
        <UserDropdown user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
