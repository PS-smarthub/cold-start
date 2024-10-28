"use server";

import db from "@/lib/db";

interface UpdateSetpointProps {
  containerId: string;
  value: number;
}

export const updatSetPoint = async ({
  containerId,
  value,
}: UpdateSetpointProps) => {
  const container = await db.container.update({
    where: {
      id: containerId,
    },
    data: {
      setPoint: value,
    },
  });

  console.log(container);
};
