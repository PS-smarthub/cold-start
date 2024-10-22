"use server";

import db from "@/lib/db";
import { auth } from "@/services/auth";
import { SchedulingFormData } from "./_components/scheduling-dialog";
import { FormattedScheduling } from "./types";
import { revalidatePath } from "next/cache";

const getAllContainerName = async () => {
  const containers = await db.container.findMany({
    select: {
      device: true,
      id: true,
    },
  });

  return containers;
};

const getUserFromEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};
const createNewScheduling = async (data: SchedulingFormData) => {
  const session = await auth();
  const userEmail = session?.user.email as string;
  const user = await getUserFromEmail(userEmail);
  const initialDateTime = new Date(data.initialDateTime).toISOString();
  const endingDateTime = new Date(data.endingDateTime);
  endingDateTime.setHours(endingDateTime.getHours() + 1);
  const endingDateTimeISOString = endingDateTime.toISOString();

  const existingScheduling = await db.schedulingContainer.findFirst({
    where: {
      containerId: data.containerId,
      OR: [
        {
          AND: [
            { initialDateTime: { lte: initialDateTime } },
            { endingDateTime: { gt: initialDateTime } },
          ],
        },
        {
          AND: [
            { initialDateTime: { lt: endingDateTime } },
            { endingDateTime: { gte: endingDateTime } },
          ],
        },
        {
          AND: [
            { initialDateTime: { gte: initialDateTime } },
            { endingDateTime: { lte: endingDateTime } },
          ],
        },
      ],
    },
  });

  if (existingScheduling) {
    throw new Error(
      "Este container já está agendado para o período selecionado."
    );
  }

  const newScheduling = await db.schedulingContainer.create({
    data: {
      endingDateTime: endingDateTimeISOString,
      initialDateTime: initialDateTime,
      containerId: data.containerId,
      userName1: session?.user.name as string,
      userIdPosition1: user?.id as string,
      position1: true,
    },
  });
  revalidatePath("/app/calendar");

  return newScheduling;
};

const getAllSchedulings = async (): Promise<FormattedScheduling[]> => {
  const schedulings = await db.schedulingContainer.findMany();

  const formatedSchedulings: FormattedScheduling[] = await Promise.all(
    schedulings.map(async (scheduling) => {
      const container = await db.container.findUnique({
        where: {
          id: scheduling.containerId,
        },
      });

      return {
        title: `${
          `Container ${container?.device.split("_")[1]} - ${
            scheduling.userName1
          }` || "Container não encontrado"
        }`,
        start: scheduling.initialDateTime,
        end: scheduling.endingDateTime,
        id: scheduling.id,
      };
    })
  );

  return formatedSchedulings;
};
export { getAllContainerName, createNewScheduling, getAllSchedulings };
