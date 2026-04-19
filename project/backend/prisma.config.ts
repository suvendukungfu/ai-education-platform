// @ts-expect-error - prisma/config is provided by Prisma 7 runtime
import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // @ts-ignore
    url: process.env.DATABASE_URL || "",
  },
});
