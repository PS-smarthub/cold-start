"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Event = {
  title: string;
  start: Date;
  end: Date;
};

export default function SchedulingCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setNewEvent({ title: "", start: slotInfo.start, end: slotInfo.end });
    setIsDialogOpen(true);
  };

  const handleCreateEvent = () => {
    setEvents([...events, newEvent]);
    setIsDialogOpen(false);
  };

  return (
    <div className="h-screen p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List"
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleSelectSlot}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.35}
        eventContent={(eventInfo) => (
          <div className="flex flex-col p-2 bg-primary text-primary-foreground rounded-md">
            <div className="font-semibold">{eventInfo.event.title}</div>
            <div className="text-xs">{eventInfo.timeText}</div>
          </div>
        )}
        dayHeaderContent={(args) => (
          <div className="text-sm font-medium text-muted-foreground">
            {args.text}
          </div>
        )}
        viewClassNames="bg-background border rounded-md shadow-sm"
        dayCellClassNames="p-2 h-[120px] border-border hover:bg-muted/50 transition-colors"
        slotLabelClassNames="text-xs text-muted-foreground"
        moreLinkClassNames="text-primary font-medium"
        nowIndicatorClassNames="bg-destructive"
        eventClassNames="rounded-md"
        allDayClassNames="text-muted-foreground"
        dayHeaderClassNames="text-muted-foreground uppercase text-xs font-medium p-2"
        slotLaneClassNames="border-border"
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Title
              </Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-start" className="text-right">
                Start
              </Label>
              <Input
                id="event-start"
                type="datetime-local"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start: new Date(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-end" className="text-right">
                End
              </Label>
              <Input
                id="event-end"
                type="datetime-local"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
