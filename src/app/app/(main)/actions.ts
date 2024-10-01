"use server";

import db from "@/lib/db";
import { auth } from "@/services/auth";

const getContainerList = async () => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Não autenticado");
    }

    const containerList = await db.container.findMany();

    return containerList;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};

export { getContainerList };
