import db from "@/lib/db";
import { auth } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { containerId, initialDateTime, endingDateTime } = body;
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!containerId || !initialDateTime || !endingDateTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newSchedulingContainer = await db.schedulingContainer.create({
      data: {
        containerId,
        initialDateTime: new Date(),
        endingDateTime: new Date(),
        userIdPosition1: session?.user.id as string,
        position1: true,
        userName1: session?.user.name as string,
      },
    });

    return NextResponse.json(newSchedulingContainer, { status: 201 });
  } catch (error) {
    console.error("Error creating scheduling container:", error);
    return NextResponse.json(
      { error: "Failed to create scheduling container" },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    const schedulings = await db.schedulingContainer.findMany();

    return NextResponse.json(schedulings, { status: 200 });
  } catch (error) {
    console.error("Error fetching scheduling containers:", error);
    return NextResponse.json(
      { error: "Failed to fetch scheduling containers" },
      { status: 500 }
    );
  }
}
