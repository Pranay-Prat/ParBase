import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Direct connection (port 5432) for Prisma CLI (migrate, introspect)
    // The pooled connection (port 6543) is used at runtime via PrismaPg adapter in prisma.ts
    url: process.env["DIRECT_URL"],
  },
});
