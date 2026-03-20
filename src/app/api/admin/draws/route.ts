import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { sendDrawResultsEmail, sendWinnerNotificationEmail } from "@/lib/email";

export async function GET() {
  try {
    const { auth, error } = await requireAdmin();
    if (error) return error;

    const draws = await prisma.draw.findMany({
      orderBy: { month: "desc" },
      include: {
        results: {
          include: { profile: true },
        },
      },
    });

    return NextResponse.json({ draws });
  } catch (error) {
    console.error("GET /api/admin/draws error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { auth, error } = await requireAdmin();
    if (error) return error;

    const { month, type } = await request.json();

    // Generate 5 random winning numbers between 1 and 45
    const winningNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 1);

    // Get active subscribers
    const activeSubscribers = await prisma.profile.findMany({
      where: {
        subscription: { status: "ACTIVE" },
      },
      include: {
        scores: {
          orderBy: { playedAt: "desc" },
          take: 5,
        },
        subscription: true,
      },
    });

    // Dummy prize pool calculation: $5 per active subscriber
    const prizePoolTotal = activeSubscribers.length * 5;
    const jackpot5Match = prizePoolTotal * 0.40;
    const prize4Match = prizePoolTotal * 0.35;
    const prize3Match = prizePoolTotal * 0.25;

    // Create the draw
    const draw = await prisma.draw.create({
      data: {
        month: new Date(month || new Date().setDate(1)), // Start of month
        type: type || "RANDOM",
        status: "PUBLISHED",
        prizePoolTotal,
        jackpot5Match,
        prize4Match,
        prize3Match,
        winningNumbers,
      },
    });

    // Find winners and create results
    const winners = [];
    for (const sub of activeSubscribers) {
      if (sub.scores.length < 5) continue; // Must have 5 scores to enter

      const userScores = sub.scores.map(s => s.score);
      const matched = userScores.filter(s => winningNumbers.includes(s)).length;

      let matchType = null;
      let prizeAmount = 0;

      if (matched === 5) {
        matchType = "FIVE_MATCH";
        prizeAmount = jackpot5Match; // Needs to be split among actual 5-match winners but simplified for dummy
      } else if (matched === 4) {
        matchType = "FOUR_MATCH";
        prizeAmount = prize4Match; 
      } else if (matched === 3) {
        matchType = "THREE_MATCH";
        prizeAmount = prize3Match;
      }

      if (matchType) {
        winners.push({
          drawId: draw.id,
          userId: sub.id,
          matchType,
          prizeAmount,
          verificationStatus: "PENDING",
        });
      }
    }

    if (winners.length > 0) {
      await prisma.drawResult.createMany({
        data: winners as any,
      });

      // Notify winners individually
      winners.forEach(w => {
        const sub = activeSubscribers.find(s => s.id === w.userId);
        if (sub) {
          sendWinnerNotificationEmail(
            sub.email, 
            sub.fullName || "Golfer", 
            w.matchType, 
            w.prizeAmount.toString()
          ).catch(console.error);
        }
      });
    }

    // Notify all active subscribers that a draw was published
    const monthName = draw.month.toLocaleString('default', { month: 'long', year: 'numeric' });
    activeSubscribers.forEach(sub => {
      sendDrawResultsEmail(sub.email, sub.fullName || "Golfer", monthName).catch(console.error);
    });

    return NextResponse.json({ success: true, draw, winnersCount: winners.length });
  } catch (err) {
    console.error("POST /api/admin/draws error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
