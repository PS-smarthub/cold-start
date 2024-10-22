"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createNewScheduling } from "../actions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const schedulingSchema = z.object({
  initialDateTime: z
    .string()
    .min(1, { message: "Selecione uma data de início." }),
  endingDateTime: z
    .string()
    .min(1, { message: "Selecione uma data de término." }),
  containerId: z
    .string({ required_error: "Selecione um container." })
    .min(1, { message: "Selecione um container." })
    .cuid({ message: "Container inválido" }),
});

export type SchedulingFormData = z.infer<typeof schedulingSchema>;

type SchedlingDialogProps = {
  children: React.ReactNode;
  containers: {
    id: string;
    device: string;
  }[];
};

export default function SchedulingDialog({
  children,
  containers,
}: SchedlingDialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<SchedulingFormData>({
    resolver: zodResolver(schedulingSchema),
    defaultValues: {
      endingDateTime: "",
      initialDateTime: "",
      containerId: "",
    },
  });

  const onSubmit = async (data: SchedulingFormData) => {
    try {
      await createNewScheduling(data);
      toast({
        title: "Agendado",
        description: "Container agendado com sucesso.",
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error)
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message,
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div ref={ref}>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="initialDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Início</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endingDateTime"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="font-semibold">Final</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="containerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Container</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o container..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {containers.map((container) => (
                        <SelectItem key={container.id} value={container.id}>
                          {`Container ${container.device.split("_")[1]}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Carregando..." : "Agendar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
