import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";

export async function GET() {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    // Get the active/pending draw
    const activeDraw = await prisma.draw.findFirst({
      where: { status: "PENDING" },
      orderBy: { month: "asc" },
      include: {
        results: {
          where: { userId: auth.profile.id },
        },
      },
    });

    // Get past draws
    const pastDraws = await prisma.draw.findMany({
      where: { status: { not: "PENDING" } },
      orderBy: { month: "desc" },
      take: 10,
      include: {
        results: {
          where: { userId: auth.profile.id },
        },
      },
    });

    return NextResponse.json({ activeDraw, pastDraws });
  } catch (error) {
    console.error("GET /api/draws error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
