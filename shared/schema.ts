import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const internshipApplications = pgTable("internship_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  yearOfStudy: text("year_of_study").notNull(),
  portfolioUrl: text("portfolio_url"),
  domain: text("domain").notNull(), 
  statement: text("statement").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertApplicationSchema = createInsertSchema(internshipApplications)
  .omit({ id: true, createdAt: true })
  .extend({
    domain: z.enum(['Artificial Intelligence', 'Full Stack Development', 'Frontend Development']),
  });

export const insertContactMessageSchema = createInsertSchema(contactMessages)
  .omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type InternshipApplication = typeof internshipApplications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type CreateApplicationRequest = InsertApplication;
export type CreateContactMessageRequest = InsertContactMessage;
