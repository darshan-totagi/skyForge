import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
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
  company: text("company"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  linkUrl: text("link_url").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  certificateId: text("certificate_id").notNull().unique(),
  domain: text("domain").notNull(),
  issueDate: timestamp("issue_date").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertApplicationSchema = createInsertSchema(internshipApplications)
  .omit({ id: true, createdAt: true })
  .extend({
    domain: z.enum(['Artificial Intelligence', 'Full Stack Development', 'Frontend Development']),
  });

export const insertContactMessageSchema = createInsertSchema(contactMessages)
  .omit({ id: true, createdAt: true });

export const insertAdSchema = createInsertSchema(ads).omit({ id: true, createdAt: true });

export const insertCertificateSchema = createInsertSchema(certificates).omit({ id: true, issueDate: true });
export const bulkInsertCertificateSchema = z.object({
  students: z.array(z.object({
    studentName: z.string(),
    domain: z.string(),
  }))
});

// === EXPLICIT API CONTRACT TYPES ===
export type InternshipApplication = typeof internshipApplications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Ad = typeof ads.$inferSelect;
export type InsertAd = z.infer<typeof insertAdSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type CreateApplicationRequest = InsertApplication;
export type CreateContactMessageRequest = InsertContactMessage;
export type CreateAdRequest = InsertAd;
export type UpdateAdRequest = Partial<InsertAd>;
