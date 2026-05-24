import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

import { sendWhatsAppGroupInvite } from "./whatsapp";
import { 
  bulkInsertCertificateSchema, 
  insertOfferLetterSchema, 
  bulkInsertOfferLetterSchema,
  insertCourseSchema,
  insertModuleSchema,
  insertLessonSchema,
  insertQuizSchema,
  insertUserSchema
} from "@shared/schema";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
// @ts-ignore
import SibApiV3Sdk from "sib-api-v3-sdk";

// Setup Brevo SDK
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY || process.env.BREVO_PASS;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Setup Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// Setup multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ 
  storage: uploadStorage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Use verified sender from env or fallback
const SENDER_EMAIL = process.env.EMAIL_USER || "skyforgertechnologies@gmail.com";

// Reliable email sending using Brevo SDK (bypasses Render port blocks)
const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: { name: "SkyForger Technologies", email: SENDER_EMAIL },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
      htmlContent: html,
    });
  } catch (err) {
    console.error("Brevo SDK Error:", err);
    throw err;
  }
};
   

// Middleware to protect admin routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Middleware to protect student routes
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static("uploads"));

  // === AUTH ENDPOINTS ===
  
  app.post("/api/auth/send-otp", async (req, res) => {
    let { email } = req.body;
    if (email) email = email.trim().toLowerCase();
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    try {
      await storage.updateUserOtp(email, otp, expiry);
      
      const subject = "SkyForger - Verification Code";
      const text = `Your verification code is: ${otp}. It will expire in 10 minutes.`;
      const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0066cc;">Verification Code</h2>
          <p>Hello,</p>
          <p>Your verification code for SkyForger Technologies is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #000;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
          <p style="font-size: 12px; color: #888;">SkyForger Technologies - Empowering Your Future</p>
        </div>
      `;

      await sendEmail(email, subject, text, html);
      
      res.json({ success: true, message: "OTP sent to your email" });
    } catch (err: any) {
      console.error("Detailed OTP Error:", err);
      res.status(500).json({ 
        message: "Failed to send OTP. Please ensure your email is correct and try again.",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  });

  app.post("/api/auth/verify-otp", async (req, res) => {
    const { email, otp, fullName, password } = req.body;
    const user = await storage.getUserByEmail(email);

    if (!user || user.otp !== otp || new Date() > user.otpExpiry!) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update user with full info and clear OTP
    const updatedUser = await storage.updateUser(user.id, {
      fullName,
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
      role: user.role || "student" // Preserve existing role or default to student
    });

    (req.session as any).userId = updatedUser.id;
    (req.session as any).isAdmin = updatedUser.role?.trim() === "admin";
    
    req.session.save((err) => {
      if (err) return res.status(500).json({ message: "Session save failed" });
      res.json({ success: true, user: { id: updatedUser.id, email: updatedUser.email, fullName: updatedUser.fullName, role: updatedUser.role } });
    });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await storage.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    (req.session as any).userId = user.id;
    (req.session as any).isAdmin = user.role?.trim() === "admin";
    
    req.session.save((err) => {
      if (err) return res.status(500).json({ message: "Session save failed" });
      res.json({ success: true, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } });
    });
  });

  // Temporary endpoint to help you set admin role - DELETE THIS AFTER USE
  app.post("/api/admin/setup", async (req, res) => {
    const { email } = req.body;
    const user = await storage.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    await storage.updateUser(user.id, { role: "admin" });
    res.json({ success: true, message: `${email} is now an admin. Please logout and login again.` });
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    let { email } = req.body;
    if (email) email = email.trim().toLowerCase();
    
    const user = await storage.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    try {
      await storage.updateUserOtp(email, otp, expiry);
      const subject = "SkyForger - Password Reset Code";
      const text = `Your password reset code is: ${otp}. It will expire in 10 minutes.`;
      const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d32f2f;">Password Reset Code</h2>
          <p>Hello,</p>
          <p>You requested a password reset for your SkyForger account. Your reset code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; color: #000;">${otp}</div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please secure your account immediately.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
          <p style="font-size: 12px; color: #888;">SkyForger Technologies - Security Team</p>
        </div>
      `;

      await sendEmail(email, subject, text, html);
      res.json({ success: true, message: "Reset OTP sent" });
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      res.status(500).json({ 
        message: "Failed to send reset OTP",
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
      });
    }
  });

  // === COURSE MANAGEMENT (ADMIN) ===

  app.get("/api/courses", async (req, res) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });

  app.post("/api/courses", requireAdmin, async (req, res) => {
    const input = insertCourseSchema.parse(req.body);
    const course = await storage.createCourse(input);
    res.status(201).json(course);
  });

  app.delete("/api/courses/:id", requireAdmin, async (req, res) => {
    await storage.deleteCourse(Number(req.params.id));
    res.status(204).send();
  });

  app.patch("/api/courses/:id", requireAdmin, async (req, res) => {
    const course = await storage.updateCourse(Number(req.params.id), req.body);
    res.json(course);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(Number(req.params.id));
    if (!course) return res.status(404).send();
    res.json(course);
  });

  app.get("/api/courses/:id/modules", async (req, res) => {
    const modules = await storage.getModules(Number(req.params.id));
    res.json(modules);
  });

  app.post("/api/modules", requireAdmin, async (req, res) => {
    const input = insertModuleSchema.parse(req.body);
    const module = await storage.createModule(input);
    res.status(201).json(module);
  });

  app.delete("/api/modules/:id", requireAdmin, async (req, res) => {
    await storage.deleteModule(Number(req.params.id));
    res.status(204).send();
  });

  app.get("/api/modules/:id/lessons", async (req, res) => {
    const lessons = await storage.getLessons(Number(req.params.id));
    res.json(lessons);
  });

  app.post("/api/lessons", requireAdmin, async (req, res) => {
    const input = insertLessonSchema.parse(req.body);
    const lesson = await storage.createLesson(input);
    res.status(201).json(lesson);
  });

  app.delete("/api/lessons/:id", requireAdmin, async (req, res) => {
    await storage.deleteLesson(Number(req.params.id));
    res.status(204).send();
  });

  // === PROGRESS TRACKING ===

  app.post("/api/progress", requireAuth, async (req, res) => {
    const { lessonId, isCompleted } = req.body;
    const userId = (req.session as any).userId;
    const progress = await storage.updateProgress(userId, lessonId, isCompleted);
    res.json(progress);
  });

  // === PAYMENTS ===

  app.post("/api/payments/create-order", requireAuth, async (req, res) => {
    const { courseId } = req.body;
    const course = await storage.getCourse(Number(courseId));
    
    if (!course) return res.status(404).json({ message: "Course not found" });

    try {
      const options = {
        amount: Math.round(Number(course.price) * 100), // amount in the smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (err) {
      console.error("Razorpay Order Error:", err);
      res.status(500).json({ message: "Failed to create payment order" });
    }
  });

  app.post("/api/payments/verify", requireAuth, async (req, res) => {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      courseId 
    } = req.body;
    const userId = (req.session as any).userId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment verified
      const enrollment = await storage.enrollUser(userId, Number(courseId), {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
      res.json({ success: true, enrollment });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  });

  // Removed old admin login endpoint as it's unified now

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/check-auth", (req, res) => {
    if (req.session && (req.session as any).isAdmin) {
      res.json({ isAdmin: true, userId: (req.session as any).userId });
    } else if (req.session && (req.session as any).userId) {
      res.json({ isAdmin: false, userId: (req.session as any).userId });
    } else {
      res.json({ isAdmin: false, userId: null });
    }
  });

  app.get("/api/user", async (req, res) => {
    if (!req.session || !(req.session as any).userId) {
      return res.status(401).json({ message: "Not logged in" });
    }
    const user = await storage.getUser((req.session as any).userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user.id, email: user.email, fullName: user.fullName, role: user.role });
  });

  app.patch("/api/user/update", requireAuth, async (req, res) => {
    const userId = (req.session as any).userId;
    const { fullName, password } = req.body;
    const updates: any = {};
    if (fullName) updates.fullName = fullName;
    if (password) updates.password = await bcrypt.hash(password, 10);
    
    const updatedUser = await storage.updateUser(userId, updates);
    res.json({ success: true, user: { id: updatedUser.id, fullName: updatedUser.fullName } });
  });

  app.get("/api/user/progress/:courseId", requireAuth, async (req, res) => {
    const userId = (req.session as any).userId;
    const progress = await storage.getProgress(userId, Number(req.params.courseId));
    res.json(progress);
  });

  app.post("/api/certificates/generate", requireAuth, async (req, res) => {
    const userId = (req.session as any).userId;
    const { courseId } = req.body;
    
    // Check if user finished all lessons in course
    const courseModules = await storage.getModules(Number(courseId));
    let totalLessons = 0;
    for (const mod of courseModules) {
      const modLessons = await storage.getLessons(mod.id);
      totalLessons += modLessons.length;
    }
    
    const userProgress = await storage.getProgress(userId, Number(courseId));
    const completedCount = userProgress.filter(p => p.isCompleted).length;
    
    if (completedCount < totalLessons) {
      return res.status(400).json({ message: "Course not yet complete" });
    }
    
    const user = await storage.getUser(userId);
    const course = await storage.getCourse(Number(courseId));
    
    const cert = await storage.createCertificate({
      studentName: user!.fullName,
      domain: course!.title,
      certificateId: `CERT-${nanoid(10).toUpperCase()}`
    });
    
    res.json(cert);
  });

  app.post("/api/upload", requireAdmin, upload.single("video"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  app.post("/api/upload-image", requireAdmin, upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  // Application endpoints
  app.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse(req.body);
      const application = await storage.createApplication(input);
      // fire-and-forget: attempt to invite the phone to the WhatsApp group
      sendWhatsAppGroupInvite(application.phone).catch(() => {});
      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.applications.list.path, requireAdmin, async (req, res) => {
    const apps = await storage.getApplications();
    res.json(apps);
  });

  // Contact messages endpoint
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.contact.list.path, requireAdmin, async (req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  // Ads endpoints
  app.get(api.ads.list.path, async (req, res) => {
    const ads = await storage.getAds();
    res.json(ads);
  });

  app.post(api.ads.create.path, requireAdmin, async (req, res) => {
    try {
      const input = api.ads.create.input.parse(req.body);
      const ad = await storage.createAd(input);
      res.status(201).json(ad);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.patch(api.ads.update.path, requireAdmin, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const input = api.ads.update.input.parse(req.body);
      const ad = await storage.updateAd(id, input);
      res.json(ad);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.ads.delete.path, requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    await storage.deleteAd(id);
    res.status(204).send();
  });

  // Certificate endpoints
  app.post("/api/certificates/bulk", requireAdmin, async (req, res) => {
    try {
      const { students } = bulkInsertCertificateSchema.parse(req.body);
      const createdCerts = [];
      
      for (const student of students) {
        const certId = `SF-${nanoid(8).toUpperCase()}`;
        const cert = await storage.createCertificate({
          studentName: student.studentName,
          domain: student.domain,
          certificateId: certId
        });
        createdCerts.push(cert);
      }
      
      res.status(201).json(createdCerts);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get("/api/certificates", requireAdmin, async (req, res) => {
    const certs = await storage.getCertificates();
    res.json(certs);
  });

  app.get("/api/certificates/verify", async (req, res) => {
    const query = req.query.query as string;
    if (!query) return res.status(400).json({ message: "Query is required" });
    
    const cert = await storage.verifyCertificate(query);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });
    
    res.json(cert);
  });

  // Offer Letter endpoints
  app.post("/api/offer-letters", requireAdmin, async (req, res) => {
    try {
      const input = insertOfferLetterSchema.parse(req.body);
      const letter = await storage.createOfferLetter(input);
      res.status(201).json(letter);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get("/api/offer-letters", requireAdmin, async (req, res) => {
    const letters = await storage.getOfferLetters();
    res.json(letters);
  });

  app.post("/api/offer-letters/bulk", requireAdmin, async (req, res) => {
    try {
      const { students } = bulkInsertOfferLetterSchema.parse(req.body);
      const createdLetters = [];
      
      for (const student of students) {
        const letter = await storage.createOfferLetter(student);
        createdLetters.push(letter);
      }
      
      res.status(201).json(createdLetters);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Review endpoints
  app.get(api.reviews.list.path, async (req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  app.post(api.reviews.create.path, requireAdmin, async (req, res) => {
    try {
      console.log("Creating review with input:", req.body);
      const input = api.reviews.create.input.parse(req.body);
      const review = await storage.createReview(input);
      console.log("Review created successfully:", review.id);
      res.status(201).json(review);
    } catch (err) {
      console.error("Error creating review:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error saving review" });
    }
  });

  app.delete(api.reviews.delete.path, requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    await storage.deleteReview(id);
    res.status(204).send();
  });

  return httpServer;
}
