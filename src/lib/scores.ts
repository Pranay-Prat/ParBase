import { prisma } from "./prisma";

const MAX_SCORES = 5;

/**
 * Add a new score for a user, enforcing the 5-score rolling window.
 * - Only the latest 5 scores are retained at any time
 * - A new score replaces the oldest stored score automatically
 * - Scores are displayed in reverse chronological order (most recent first)
 */
export async function addScore(
  userId: string,
  score: number,
  playedAt: Date
) {
  // Validate Stableford score range
  if (score < 1 || score > 45) {
    throw new Error("Stableford score must be between 1 and 45");
  }

  // Get current scores ordered oldest-first so we know which to delete
  const existingScores = await prisma.score.findMany({
    where: { userId },
    orderBy: { playedAt: "asc" },
    select: { id: true },
  });

  // If already at limit, delete the oldest to make room
  if (existingScores.length >= MAX_SCORES) {
    const scoresToDelete = existingScores.slice(
      0,
      existingScores.length - MAX_SCORES + 1
    );
    await prisma.score.deleteMany({
      where: {
        id: { in: scoresToDelete.map((s) => s.id) },
      },
    });
  }

  // Insert the new score
  return prisma.score.create({
    data: {
      userId,
      score,
      playedAt,
    },
  });
}

/**
 * Get a user's scores in reverse chronological order (most recent first).
 */
export async function getUserScores(userId: string) {
  return prisma.score.findMany({
    where: { userId },
    orderBy: { playedAt: "desc" },
    take: MAX_SCORES,
  });
}
