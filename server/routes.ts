import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendWhatsAppGroupInvite } from "./whatsapp";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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

  app.get(api.applications.list.path, async (req, res) => {
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

  app.get(api.contact.list.path, async (req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  // Ads endpoints
  app.get(api.ads.list.path, async (req, res) => {
    const ads = await storage.getAds();
    res.json(ads);
  });

  app.post(api.ads.create.path, async (req, res) => {
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

  app.patch(api.ads.update.path, async (req, res) => {
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

  app.delete(api.ads.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    await storage.deleteAd(id);
    res.status(204).send();
  });

  return httpServer;
}
