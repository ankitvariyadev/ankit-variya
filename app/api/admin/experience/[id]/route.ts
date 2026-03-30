import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id) },
    });

    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Failed to fetch experience:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { company, position, location, startDate, endDate, description, hidden } = body;

    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: {
        company,
        position,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        description,
        hidden,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Failed to update experience:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.experience.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
