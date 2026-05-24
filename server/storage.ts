import { db } from "./db";
import {
  internshipApplications,
  contactMessages,
  ads,
  type CreateApplicationRequest,
  type CreateContactMessageRequest,
  type InternshipApplication,
  type ContactMessage,
  type CreateAdRequest,
  type UpdateAdRequest,
  type Ad,
  type Certificate,
  type InsertCertificate,
  certificates,
  offerLetters,
  type OfferLetter,
  type InsertOfferLetter,
  type User,
  type InsertUser,
  type Course,
  type Module,
  type Lesson,
  type Quiz,
  type Enrollment,
  type UserProgress,
  users,
  courses,
  modules,
  lessons,
  quizzes,
  enrollments,
  userProgress
} from "@shared/schema";
import { eq, or, and } from "drizzle-orm";

export interface IStorage {
  createApplication(application: CreateApplicationRequest): Promise<InternshipApplication>;
  getApplications(): Promise<InternshipApplication[]>;
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createAd(ad: CreateAdRequest): Promise<Ad>;
  getAds(): Promise<Ad[]>;
  updateAd(id: number, updates: UpdateAdRequest): Promise<Ad>;
  deleteAd(id: number): Promise<void>;
  createCertificate(cert: InsertCertificate): Promise<Certificate>;
  getCertificates(): Promise<Certificate[]>;
  verifyCertificate(query: string): Promise<Certificate | undefined>;
  createOfferLetter(letter: InsertOfferLetter): Promise<OfferLetter>;
  getOfferLetters(): Promise<OfferLetter[]>;
  
  // LMS Methods
  getUserByEmail(email: string): Promise<User | undefined>;
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  updateUserOtp(email: string, otp: string, expiry: Date): Promise<void>;
  
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: any): Promise<Course>;
  updateCourse(id: number, updates: any): Promise<Course>;
  deleteCourse(id: number): Promise<void>;
  
  getModules(courseId: number): Promise<Module[]>;
  createModule(module: any): Promise<Module>;
  deleteModule(id: number): Promise<void>;
  
  getLessons(moduleId: number): Promise<Lesson[]>;
  createLesson(lesson: any): Promise<Lesson>;
  deleteLesson(id: number): Promise<void>;
  
  getQuizzes(courseId: number): Promise<Quiz[]>;
  createQuiz(quiz: any): Promise<Quiz>;
  
  enrollUser(userId: number, courseId: number, razorpayData: any): Promise<Enrollment>;
  getUserEnrollments(userId: number): Promise<Enrollment[]>;
  
  updateProgress(userId: number, lessonId: number, isCompleted: boolean): Promise<UserProgress>;
  getProgress(userId: number, courseId: number): Promise<UserProgress[]>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(application: CreateApplicationRequest): Promise<InternshipApplication> {
    const [created] = await db.insert(internshipApplications).values(application).returning();
    return created;
  }

  async getApplications(): Promise<InternshipApplication[]> {
    return await db.select().from(internshipApplications).orderBy(internshipApplications.createdAt);
  }

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }

  async createAd(ad: CreateAdRequest): Promise<Ad> {
    const [created] = await db.insert(ads).values(ad).returning();
    return created;
  }

  async getAds(): Promise<Ad[]> {
    return await db.select().from(ads).orderBy(ads.createdAt);
  }

  async updateAd(id: number, updates: UpdateAdRequest): Promise<Ad> {
    const [updated] = await db.update(ads).set(updates).where(eq(ads.id, id)).returning();
    if (!updated) throw new Error("Ad not found");
    return updated;
  }

  async deleteAd(id: number): Promise<void> {
    await db.delete(ads).where(eq(ads.id, id));
  }

  async createCertificate(cert: InsertCertificate): Promise<Certificate> {
    const [created] = await db.insert(certificates).values(cert).returning();
    return created;
  }

  async getCertificates(): Promise<Certificate[]> {
    return await db.select().from(certificates).orderBy(certificates.issueDate);
  }

  async verifyCertificate(query: string): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(
      or(
        eq(certificates.certificateId, query),
        eq(certificates.studentName, query)
      )
    );
    return cert;
  }

  async createOfferLetter(letter: InsertOfferLetter): Promise<OfferLetter> {
    const [created] = await db.insert(offerLetters).values(letter).returning();
    return created;
  }

  async getOfferLetters(): Promise<OfferLetter[]> {
    return await db.select().from(offerLetters).orderBy(offerLetters.createdAt);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    if (!updated) throw new Error("User not found");
    return updated;
  }

  async updateUserOtp(email: string, otp: string, expiry: Date): Promise<void> {
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (existing) {
      await db.update(users).set({ otp, otpExpiry: expiry }).where(eq(users.email, email));
    } else {
      await db.insert(users).values({
        email,
        otp,
        otpExpiry: expiry,
        fullName: "Pending",
        password: "Pending_OTP"
      });
    }
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: any): Promise<Course> {
    const [created] = await db.insert(courses).values(course).returning();
    return created;
  }

  async updateCourse(id: number, updates: any): Promise<Course> {
    const [updated] = await db.update(courses).set(updates).where(eq(courses.id, id)).returning();
    return updated;
  }

  async deleteCourse(id: number): Promise<void> {
    // 1. Get all modules for this course
    const courseModules = await db.select().from(modules).where(eq(modules.courseId, id));
    
    // 2. Delete all lessons for each module
    for (const mod of courseModules) {
      await db.delete(lessons).where(eq(lessons.moduleId, mod.id));
    }
    
    // 3. Delete all modules for this course
    await db.delete(modules).where(eq(modules.courseId, id));
    
    // 4. Delete all enrollments for this course
    await db.delete(enrollments).where(eq(enrollments.courseId, id));
    
    // 5. Finally delete the course
    await db.delete(courses).where(eq(courses.id, id));
  }

  async getModules(courseId: number): Promise<Module[]> {
    return await db.select().from(modules).where(eq(modules.courseId, courseId)).orderBy(modules.order);
  }

  async createModule(module: any): Promise<Module> {
    const [created] = await db.insert(modules).values(module).returning();
    return created;
  }

  async deleteModule(id: number): Promise<void> {
    // 1. Delete all lessons for this module
    await db.delete(lessons).where(eq(lessons.moduleId, id));
    
    // 2. Delete the module
    await db.delete(modules).where(eq(modules.id, id));
  }

  async getLessons(moduleId: number): Promise<Lesson[]> {
    return await db.select().from(lessons).where(eq(lessons.moduleId, moduleId)).orderBy(lessons.order);
  }

  async createLesson(lesson: any): Promise<Lesson> {
    const [created] = await db.insert(lessons).values(lesson).returning();
    return created;
  }

  async deleteLesson(id: number): Promise<void> {
    await db.delete(lessons).where(eq(lessons.id, id));
  }

  async getQuizzes(courseId: number): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.courseId, courseId)).orderBy(quizzes.order);
  }

  async createQuiz(quiz: any): Promise<Quiz> {
    const [created] = await db.insert(quizzes).values(quiz).returning();
    return created;
  }

  async enrollUser(userId: number, courseId: number, razorpayData: any): Promise<Enrollment> {
    const [created] = await db.insert(enrollments).values({
      userId,
      courseId,
      razorpayPaymentId: razorpayData.paymentId,
      razorpayOrderId: razorpayData.orderId
    }).returning();
    return created;
  }

  async getUserEnrollments(userId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  async updateProgress(userId: number, lessonId: number, isCompleted: boolean): Promise<UserProgress> {
    const [existing] = await db.select().from(userProgress).where(
      and(eq(userProgress.userId, userId), eq(userProgress.lessonId, lessonId))
    );

    if (existing) {
      const [updated] = await db.update(userProgress)
        .set({ isCompleted, completedAt: isCompleted ? new Date() : null })
        .where(eq(userProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(userProgress).values({
        userId,
        lessonId,
        isCompleted,
        completedAt: isCompleted ? new Date() : null
      }).returning();
      return created;
    }
  }

  async getProgress(userId: number, courseId: number): Promise<UserProgress[]> {
    // This is simplified; in a real app, you'd join with lessons/modules to filter by courseId
    return await db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }
}

export const storage = new DatabaseStorage();
