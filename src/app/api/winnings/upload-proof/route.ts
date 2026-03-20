import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const { resultId, proofUrl } = await request.json();

    if (!resultId || !proofUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify the result belongs to the user
    const result = await prisma.drawResult.findUnique({
      where: { id: resultId },
    });

    if (!result || result.userId !== auth.profile.id) {
      return NextResponse.json({ error: "Draw result not found or unauthorized" }, { status: 404 });
    }

    const updatedResult = await prisma.drawResult.update({
      where: { id: resultId },
      data: {
        proofUrl,
        verificationStatus: "PENDING",
      },
    });

    return NextResponse.json({ success: true, result: updatedResult });
  } catch (error) {
    console.error("POST /api/winnings/upload-proof error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
