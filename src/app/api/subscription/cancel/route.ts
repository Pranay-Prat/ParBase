import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const subscription = await prisma.subscription.findUnique({
      where: { userId: auth.profile.id },
    });

    if (!subscription || subscription.status !== "ACTIVE") {
      return NextResponse.json({ error: "No active subscription" }, { status: 400 });
    }

    const updated = await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true },
    });

    return NextResponse.json({ success: true, subscription: updated });
  } catch (error) {
    console.error("POST /api/subscription/cancel error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
