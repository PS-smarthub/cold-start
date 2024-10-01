import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <div className="flex justify-between items-center">
          <div>
            <DashboardPageHeaderTitle>Container</DashboardPageHeaderTitle>
            <p className="text-muted-foreground text-sm">
              Visualize todo os containers disponíveis instalados na planta.
            </p>
          </div>
        </div>
      </DashboardPageHeader>
      <DashboardPageMain>{children}</DashboardPageMain>
    </DashboardPage>
  );
}
