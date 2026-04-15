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
  type InsertOfferLetter
} from "@shared/schema";
import { eq, or } from "drizzle-orm";

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
}

export class DatabaseStorage implements IStorage {
  async createApplication(application: CreateApplicationRequest): Promise<InternshipApplication> {
    const [created] = await db.insert(internshipApplications)
      .values(application)
      .returning();
    return created;
  }

  async getApplications(): Promise<InternshipApplication[]> {
    return await db.select().from(internshipApplications);
  }

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async createAd(ad: CreateAdRequest): Promise<Ad> {
    const [created] = await db.insert(ads).values(ad).returning();
    return created;
  }

  async getAds(): Promise<Ad[]> {
    return await db.select().from(ads);
  }

  async updateAd(id: number, updates: UpdateAdRequest): Promise<Ad> {
    const [updated] = await db.update(ads)
      .set(updates)
      .where(eq(ads.id, id))
      .returning();
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
    const [cert] = await db.select()
      .from(certificates)
      .where(or(
        eq(certificates.certificateId, query),
        eq(certificates.studentName, query)
      ));
    return cert;
  }

  async createOfferLetter(letter: InsertOfferLetter): Promise<OfferLetter> {
    const [created] = await db.insert(offerLetters).values(letter).returning();
    return created;
  }

  async getOfferLetters(): Promise<OfferLetter[]> {
    return await db.select().from(offerLetters).orderBy(offerLetters.createdAt);
  }
}

export const storage = new DatabaseStorage();
