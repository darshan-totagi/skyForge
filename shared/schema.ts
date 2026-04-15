import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
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

export const offerLetters = pgTable("offer_letters", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  linkedinUrl: text("linkedin_url"),
  imageUrl: text("image_url"),
  rating: integer("rating").default(5),
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

export const insertAdSchema = createInsertSchema(ads).omit({ id: true, createdAt: true });

export const insertReviewSchema = createInsertSchema(reviews)
  .omit({ id: true, createdAt: true })
  .extend({
    linkedinUrl: z.string().optional().nullable().transform(v => v === "" ? null : v),
    imageUrl: z.string().optional().nullable().transform(v => v === "" ? null : v),
    rating: z.number().optional().default(5),
  });

export const insertCertificateSchema = createInsertSchema(certificates).omit({ id: true, issueDate: true });
export const bulkInsertCertificateSchema = z.object({
  students: z.array(z.object({
    studentName: z.string(),
    domain: z.string(),
  }))
});

export const insertOfferLetterSchema = createInsertSchema(offerLetters).omit({ id: true, createdAt: true });
export const bulkInsertOfferLetterSchema = z.object({
  students: z.array(z.object({
    studentName: z.string(),
    position: z.string(),
    department: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }))
});

// === EXPLICIT API CONTRACT TYPES ===
export type InternshipApplication = typeof internshipApplications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Ad = typeof ads.$inferSelect;
export type InsertAd = z.infer<typeof insertAdSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type OfferLetter = typeof offerLetters.$inferSelect;
export type InsertOfferLetter = z.infer<typeof insertOfferLetterSchema>;

export type CreateApplicationRequest = InsertApplication;
export type CreateContactMessageRequest = InsertContactMessage;
export type CreateAdRequest = InsertAd;
export type UpdateAdRequest = Partial<InsertAd>;
export type CreateReviewRequest = InsertReview;
