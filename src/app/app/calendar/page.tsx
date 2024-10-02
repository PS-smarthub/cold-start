import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import SchedulingCalendar from "./_components/scheduling-calendar";

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <div className="flex justify-between items-center">
          <div>
            <DashboardPageHeaderTitle>Agenda</DashboardPageHeaderTitle>
            <p className="text-muted-foreground text-sm">
              Monitore os períodos de agendamento dos containers
            </p>
          </div>
        </div>
      </DashboardPageHeader>
      <DashboardPageMain>
        <SchedulingCalendar />
      </DashboardPageMain>
    </DashboardPage>
  );
}
