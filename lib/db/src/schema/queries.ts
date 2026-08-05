import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const queriesTable = pgTable("queries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  profile: text("profile").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  queryText: text("query_text").notNull(),
  replied: boolean("replied").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertQuerySchema = createInsertSchema(queriesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type QueryRecord = typeof queriesTable.$inferSelect;
