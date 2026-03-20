import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const { auth, error } = await requireAdmin();
    if (error) return error;

    const users = await prisma.profile.findMany({
      include: {
        subscription: true,
        charity: true,
        scores: {
          orderBy: { playedAt: "desc" },
          take: 5,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const stats = {
      totalUsers: users.length,
      activeSubscribers: users.filter(u => u.subscription?.status === "ACTIVE").length,
    };

    return NextResponse.json({ users, stats });
  } catch (error) {
    console.error("GET /api/admin/users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
