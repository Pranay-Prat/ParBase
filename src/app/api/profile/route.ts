import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const profile = await prisma.profile.findUnique({
      where: { id: auth.profile.id },
      include: {
        subscription: true,
        charity: true,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const data = await request.json();

    const updatedProfile = await prisma.profile.update({
      where: { id: auth.profile.id },
      data: {
        fullName: data.fullName !== undefined ? data.fullName : undefined,
        charityId: data.charityId !== undefined ? data.charityId : undefined,
        charityContributionPct: data.contribution !== undefined ? data.contribution : undefined,
      },
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error("PATCH /api/profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
