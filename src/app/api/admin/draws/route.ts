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

    // Generate 5 unique random winning numbers between 1 and 45
    const generateUniqueNumbers = (count: number, max: number) => {
      const nums = new Set<number>();
      while (nums.size < count) {
        nums.add(Math.floor(Math.random() * max) + 1);
      }
      return Array.from(nums);
    };
    const winningNumbers = generateUniqueNumbers(5, 45);

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

    // Dynamic prize pool calculation: $5 per active subscriber
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

    // Find matches
    const tier5: string[] = [];
    const tier4: string[] = [];
    const tier3: string[] = [];

    for (const sub of activeSubscribers) {
      if (sub.scores.length < 5) continue; // Must have 5 scores to enter

      // Get unique user scores to prevent duplicate scores from counting as multiple matches
      const uniqueUserScores = Array.from(new Set(sub.scores.map(s => s.score)));
      const matched = uniqueUserScores.filter(s => winningNumbers.includes(s)).length;

      if (matched === 5) tier5.push(sub.id);
      else if (matched === 4) tier4.push(sub.id);
      else if (matched === 3) tier3.push(sub.id);
    }

    // Split prizes evenly among winners of each tier
    const winners: any[] = [];
    
    if (tier5.length > 0) {
      const splitPrize = jackpot5Match / tier5.length;
      tier5.forEach(userId => {
        winners.push({ drawId: draw.id, userId, matchType: "FIVE_MATCH", prizeAmount: splitPrize, verificationStatus: "PENDING" });
      });
    }
    if (tier4.length > 0) {
      const splitPrize = prize4Match / tier4.length;
      tier4.forEach(userId => {
        winners.push({ drawId: draw.id, userId, matchType: "FOUR_MATCH", prizeAmount: splitPrize, verificationStatus: "PENDING" });
      });
    }
    if (tier3.length > 0) {
      const splitPrize = prize3Match / tier3.length;
      tier3.forEach(userId => {
        winners.push({ drawId: draw.id, userId, matchType: "THREE_MATCH", prizeAmount: splitPrize, verificationStatus: "PENDING" });
      });
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
