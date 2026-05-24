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

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").default("student"), // student, admin
  otp: text("otp"),
  otpExpiry: timestamp("otp_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(), // String to handle decimals/currency
  thumbnail: text("thumbnail").notNull(),
  demoVideoUrl: text("demo_video_url"),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  courseId: serial("course_id").references(() => courses.id),
  title: text("title").notNull(),
  order: serial("order").notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: serial("module_id").references(() => modules.id),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  content: text("content"),
  order: serial("order").notNull(),
  isDemo: boolean("is_demo").default(false),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  courseId: serial("course_id").references(() => courses.id),
  lessonId: serial("lesson_id").references(() => lessons.id),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON string of options
  correctAnswer: text("correct_answer").notNull(),
  order: serial("order").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  courseId: serial("course_id").references(() => courses.id),
  purchasedAt: timestamp("purchased_at").defaultNow(),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpayOrderId: text("razorpay_order_id"),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  lessonId: serial("lesson_id").references(() => lessons.id),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true, createdAt: true });
export const insertModuleSchema = createInsertSchema(modules).omit({ id: true });
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });
export const insertQuizSchema = createInsertSchema(quizzes).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;

export type InternshipApplication = typeof internshipApplications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type CreateApplicationRequest = InsertApplication;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type CreateContactMessageRequest = z.infer<typeof insertContactMessageSchema>;

export type Ad = typeof ads.$inferSelect;
export type CreateAdRequest = z.infer<typeof insertAdSchema>;
export type UpdateAdRequest = Partial<CreateAdRequest>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type OfferLetter = typeof offerLetters.$inferSelect;
export type InsertOfferLetter = z.infer<typeof insertOfferLetterSchema>;
<<<<<<< HEAD
=======

export type CreateApplicationRequest = InsertApplication;
export type CreateContactMessageRequest = InsertContactMessage;
export type CreateAdRequest = InsertAd;
export type UpdateAdRequest = Partial<InsertAd>;
export type CreateReviewRequest = InsertReview;
>>>>>>> 0e2907bd68bc744b0421b8b8b6e74ec63d4e3626
