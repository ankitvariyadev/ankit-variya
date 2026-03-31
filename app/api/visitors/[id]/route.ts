import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if visitor exists
    const existingVisitor = await prisma.visitor.findUnique({
      where: { id },
    });

    if (!existingVisitor) {
      return NextResponse.json(
        { message: "Visitor not found" },
        { status: 404 }
      );
    }

    // Delete the visitor
    await prisma.visitor.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Visitor deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete visitor:", error);
    return NextResponse.json(
      { message: "Failed to delete visitor" },
      { status: 500 }
    );
  }
}
