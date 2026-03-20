import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const { auth, error } = await requireAdmin();
    if (error) return error;

    const results = await prisma.drawResult.findMany({
      include: {
        profile: true,
        draw: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("GET /api/admin/winners error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { auth, error } = await requireAdmin();
    if (error) return error;

    const { resultId, verificationStatus, paymentStatus } = await request.json();

    const result = await prisma.drawResult.update({
      where: { id: resultId },
      data: {
        verificationStatus: verificationStatus !== undefined ? verificationStatus : undefined,
        paymentStatus: paymentStatus !== undefined ? paymentStatus : undefined,
      },
      include: { profile: true },
    });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("PATCH /api/admin/winners error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
