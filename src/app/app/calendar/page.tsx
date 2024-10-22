import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/dashboard/page";
import SchedulingCalendar from "./_components/scheduling-calendar";
import SchedulingDialog from "./_components/scheduling-dialog";
import { Button } from "@/components/ui/button";
import { getAllContainerName, getAllSchedulings } from "./actions";

export default async function Page() {
  const schedulings = await getAllSchedulings();
  const containerList = await getAllContainerName();

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
          <SchedulingDialog containers={containerList}>
            <Button>Novo Agendamento</Button>
          </SchedulingDialog>
        </div>
      </DashboardPageHeader>
      <DashboardPageMain>
        <SchedulingCalendar schedulings={schedulings} />
      </DashboardPageMain>
    </DashboardPage>
  );
}
