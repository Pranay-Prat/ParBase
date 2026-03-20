import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { Profile } from "../../prisma/generated/prisma/client";

/**
 * Gets the authenticated user from Supabase and their profile from the database.
 * Returns null if not authenticated.
 * Automatically creates a profile if one doesn't exist (first login sync).
 */
export async function getAuthenticatedUser(): Promise<{
  supabaseUser: { id: string; email: string };
  profile: Profile;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) return null;

  // Try to find existing profile
  let profile = await prisma.profile.findUnique({
    where: { id: user.id },
  });

  // Auto-create profile on first login (sync from Supabase auth)
  if (!profile) {
    const metadata = user.user_metadata || {};
    profile = await prisma.profile.create({
      data: {
        id: user.id,
        email: user.email,
        fullName:
          metadata.first_name && metadata.last_name
            ? `${metadata.first_name} ${metadata.last_name}`
            : metadata.full_name || null,
        charityContributionPct: metadata.contribution_pct
          ? parseInt(metadata.contribution_pct)
          : 10,
      },
    });
  }

  return {
    supabaseUser: { id: user.id, email: user.email },
    profile,
  };
}

/**
 * Returns a 401 JSON response
 */
export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/**
 * Returns a 403 JSON response
 */
export function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

/**
 * Check if user is an admin
 */
export async function requireAdmin() {
  const auth = await getAuthenticatedUser();
  if (!auth) return { auth: null, error: unauthorized() };
  if (auth.profile.role !== "ADMIN") return { auth, error: forbidden() };
  return { auth, error: null };
}
