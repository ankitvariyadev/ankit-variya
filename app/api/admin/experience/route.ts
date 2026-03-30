import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { company, position, location, startDate, endDate, description, hidden } = body;

    if (!company || !position || !startDate) {
      return NextResponse.json(
        { error: "Company, position, and start date are required" },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        position,
        location: location || "",
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        description: description || "",
        hidden: hidden || false,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Failed to create experience:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
