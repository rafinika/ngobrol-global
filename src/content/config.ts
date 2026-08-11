import { defineCollection, reference, z } from 'astro:content';

const cerita = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tamu: z.string(),               // guest name
    narasumber: reference('narasumber').optional(), // link to full profile, if published
    negara: z.string(),             // guest's country
    kota: z.string().optional(),    // guest's city
    tanggal: z.date(),
    ringkasan: z.string(),          // short summary for cards
    audioUrl: z.string().url().optional(),
    durasi: z.string().optional(),  // e.g. "42 min"
    tags: z.array(z.string()).default([]),
    unggulan: z.boolean().default(false), // featured on homepage
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
  }),
});

const narasumber = defineCollection({
  type: 'content',
  schema: z.object({
    nama: z.string(),
    negara: z.string(),
    kota: z.string().optional(),
    peran: z.string(),              // e.g. "Pendiri startup teknologi air"
    bidang: z.string(),             // for hub_bidang relation
    ringkasan: z.string(),
    fotoUrl: z.string().optional(),
    episode: z.array(reference('cerita')).default([]),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    pertanyaan: z.string(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).default([]),
    kategori: z.string().optional(),
  }),
});

export const collections = { cerita, narasumber, faq };
