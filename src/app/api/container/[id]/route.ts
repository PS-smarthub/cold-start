import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  const container = await db.container.findUnique({
    where: {
      id: id,
    },
    include: {
      temperatures: {
        orderBy: {
          dateTime: "asc",
        },
      },
      schedulingContainers: {
        include: {
          container: true,
        },
      },
    },
  });

  if (!container) {
    return NextResponse.json({ error: "Container not found" }, { status: 404 });
  }

  return NextResponse.json(container);
}
