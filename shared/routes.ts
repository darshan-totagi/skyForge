import { z } from 'zod';
import { 
  insertApplicationSchema, internshipApplications, 
  insertContactMessageSchema, contactMessages,
  insertAdSchema, ads
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  applications: {
    create: {
      method: 'POST' as const,
      path: '/api/applications' as const,
      input: insertApplicationSchema,
      responses: {
        201: z.custom<typeof internshipApplications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/applications' as const,
      responses: {
        200: z.array(z.custom<typeof internshipApplications.$inferSelect>()),
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/contact' as const,
      responses: {
        200: z.array(z.custom<typeof contactMessages.$inferSelect>()),
      },
    },
  },
  ads: {
    list: {
      method: 'GET' as const,
      path: '/api/ads' as const,
      responses: {
        200: z.array(z.custom<typeof ads.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/ads' as const,
      input: insertAdSchema,
      responses: {
        201: z.custom<typeof ads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/ads/:id' as const,
      input: insertAdSchema.partial(),
      responses: {
        200: z.custom<typeof ads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/ads/:id' as const,
      responses: {
        204: z.void(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ApplicationInput = z.infer<typeof api.applications.create.input>;
export type ApplicationResponse = z.infer<typeof api.applications.create.responses[201]>;

export type ContactInput = z.infer<typeof api.contact.create.input>;
export type ContactResponse = z.infer<typeof api.contact.create.responses[201]>;

export type AdInput = z.infer<typeof api.ads.create.input>;
export type AdResponse = z.infer<typeof api.ads.create.responses[201]>;
