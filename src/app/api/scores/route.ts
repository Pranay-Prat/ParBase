import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorized } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const scores = await prisma.score.findMany({
      where: { userId: auth.profile.id },
      orderBy: { playedAt: "desc" },
      take: 5,
    });

    return NextResponse.json({ scores });
  } catch (error) {
    console.error("GET /api/scores error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedUser();
    if (!auth) return unauthorized();

    const { score, playedAt } = await request.json();

    if (typeof score !== "number" || score < 1 || score > 45) {
      return NextResponse.json({ error: "Score must be between 1 and 45" }, { status: 400 });
    }

    if (!playedAt) {
      return NextResponse.json({ error: "Date played is required" }, { status: 400 });
    }

    const newScore = await prisma.score.create({
      data: {
        score,
        playedAt: new Date(playedAt),
        userId: auth.profile.id,
      },
    });

    // Enforce 5-score limit per Platform Subscription.txt
    // "Only latest 5 stored. New score replaces oldest."
    // First, let's keep only the newest 5 scores.
    const allScores = await prisma.score.findMany({
      where: { userId: auth.profile.id },
      orderBy: { playedAt: "desc" },
    });

    if (allScores.length > 5) {
      const scoresToDelete = allScores.slice(5).map(s => s.id);
      await prisma.score.deleteMany({
        where: { id: { in: scoresToDelete } },
      });
    }

    return NextResponse.json({ success: true, score: newScore });
  } catch (error) {
    console.error("POST /api/scores error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
