import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";

export async function GET() {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const results = await prisma.drawResult.findMany({
      where: { userId: auth.profile.id },
      include: { draw: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("GET /api/winnings error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
