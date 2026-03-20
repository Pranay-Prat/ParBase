import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, error } = await requireAdmin();

  // If there's an error (e.g. Unauthorized or Forbidden), redirect away from admin panel
  if (error || !auth || auth.profile.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
