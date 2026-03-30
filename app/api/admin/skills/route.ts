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

    const skills = await prisma.skill.findMany({
      orderBy: { proficiency: "desc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Failed to fetch skills:", error);
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
    const { name, icon, proficiency, category } = body;

    if (!name || !proficiency || !category) {
      return NextResponse.json(
        { error: "Name, proficiency, and category are required" },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        icon: icon || "fas fa-code",
        proficiency: parseInt(proficiency),
        category,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
