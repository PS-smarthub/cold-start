"use client"

import { SidebarNav, SidebarNavMain, SidebarNavLink } from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'

export default function SettingsSidebar() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        return pathname == path
    }
    return (
        <aside>
            <SidebarNav>
                <SidebarNavMain>
                    <SidebarNavLink href="/app/settings" active={isActive("/app/settings")}>Meu perfil</SidebarNavLink>
                    <SidebarNavLink href="/app/settings/theme" active={isActive("/app/settings/theme")}>Aparência</SidebarNavLink>
                </SidebarNavMain>
            </SidebarNav>
        </aside>
    )
}