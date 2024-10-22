"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg} from "@fullcalendar/core";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ptBR } from "date-fns/locale";

interface CalendarEvent {
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  description?: string;
}

interface FullCalendarComponentProps {
  schedulings: CalendarEvent[];
}

export default function FullCalendarComponent({
  schedulings,
}: FullCalendarComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const handleSchedulingClick = (args: EventClickArg) => {
    const { event } = args;

    const selectedScheduling: CalendarEvent = {
      title: event.title,
      start: event.start as Date,
      end: event.end as Date,
    };
    setSelectedEvent(selectedScheduling);
    setIsDialogOpen(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        locale={ptBR}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Lista",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={schedulings}
        eventClick={handleSchedulingClick}
        eventContent={(eventInfo) => (
          <div className="flex flex-col p-2 text-primary-foreground rounded-md w-full bg-blue-700">
            <div className="font-semibold truncate">
              <i>{eventInfo.event.title}</i>
            </div>
          </div>
        )}
        dayHeaderContent={(args) => (
          <div className="text-sm font-medium text-muted-foreground">
            {args.text}
          </div>
        )}
        viewClassNames="bg-background border rounded-md shadow-sm"
        dayCellClassNames="p-2 border-border"
        moreLinkContent="Ver mais..."
        slotLabelClassNames="text-xs text-muted-foreground"
        moreLinkClassNames="text-primary font-medium"
        eventClassNames="rounded-md"
        allDayClassNames="text-muted-foreground"
        dayHeaderClassNames="text-muted-foreground uppercase text-xs font-medium p-2"
        slotLaneClassNames="border-border"
        timeZone="UTC"
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Aqui estão as informações do agendamento
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="p-4 rounded-md gap-2 flex items-center">
              <span className="font-medium">De:</span>
              <p className="text-sm text-muted-foreground">
                {selectedEvent?.start?.toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 rounded-md gap-2 flex items-center">
              <span className="font-medium">Até:</span>
              <p className="text-sm text-muted-foreground">
                {selectedEvent?.end?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button className="mt-4" onClick={() => setIsDialogOpen(false)}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
