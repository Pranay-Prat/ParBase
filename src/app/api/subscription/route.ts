import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET() {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const subscription = await prisma.subscription.findUnique({
      where: { userId: auth.profile.id },
    });

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error("GET /api/subscription error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const { plan } = await request.json();

    if (!["MONTHLY", "YEARLY"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Dummy logic: Create or update subscription to ACTIVE
    const currentDate = new Date();
    const periodEnd = new Date();
    if (plan === "MONTHLY") {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    const subscription = await prisma.subscription.upsert({
      where: { userId: auth.profile.id },
      update: {
        plan,
        status: "ACTIVE",
        currentPeriodStart: currentDate,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      },
      create: {
        userId: auth.profile.id,
        plan,
        status: "ACTIVE",
        currentPeriodStart: currentDate,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: false,
      },
    });

    sendWelcomeEmail(
      auth.profile.email, 
      auth.profile.fullName || "Golfer"
    ).catch(console.error);

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    console.error("POST /api/subscription error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
