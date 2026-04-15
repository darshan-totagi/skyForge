import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendWhatsAppGroupInvite } from "./whatsapp";
import { bulkInsertCertificateSchema, insertOfferLetterSchema, bulkInsertOfferLetterSchema } from "@shared/schema";
import { nanoid } from "nanoid";

// Middleware to protect admin routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Admin login endpoint
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      (req.session as any).isAdmin = true;
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Failed to save session" });
        }
        res.json({ success: true });
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });

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
      res.json({ isAdmin: true });
    } else {
      res.json({ isAdmin: false });
    }
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
