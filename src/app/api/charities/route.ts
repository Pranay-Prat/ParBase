import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const charities = await prisma.charity.findMany({
      where: { isActive: true },
      orderBy: { isFeatured: "desc" },
    });

    return NextResponse.json({ charities });
  } catch (error) {
    console.error("GET /api/charities error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
