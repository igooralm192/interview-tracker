import { pgTable, varchar, text, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";

export const interviewContactTypeEnum = pgEnum("interview_contact_type", ["active", "passive"])
export const interviewPriorityEnum = pgEnum("interview_priority", ["low", "medium", "high"])

export const interviewsTable = pgTable("interviews", {
  id: uuid('id').primaryKey().defaultRandom(),
  company: varchar({ length: 255 }).notNull(),
  jobTitle: varchar({ length: 255 }).notNull(),
  jobDescription: text().notNull(),
  contactType: interviewContactTypeEnum().notNull(),
  priority: interviewPriorityEnum(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
