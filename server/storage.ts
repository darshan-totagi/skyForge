import { db } from "./db";
import {
  internshipApplications,
  contactMessages,
  type CreateApplicationRequest,
  type CreateContactMessageRequest,
  type InternshipApplication,
  type ContactMessage
} from "@shared/schema";

export interface IStorage {
  createApplication(application: CreateApplicationRequest): Promise<InternshipApplication>;
  createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(application: CreateApplicationRequest): Promise<InternshipApplication> {
    const [created] = await db.insert(internshipApplications)
      .values(application)
      .returning();
    return created;
  }

  async createContactMessage(message: CreateContactMessageRequest): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
