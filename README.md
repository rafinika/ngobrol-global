# Ngobrol Global — situs

Situs statis untuk podcast Ngobrol Global. Dibangun dengan
[Astro](https://astro.build), dihosting di Cloudflare Pages, dengan Google
Sheets sebagai database form dan Giscus untuk komentar.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Struktur

- `src/pages/index.astro` — beranda
- `src/pages/cerita/[slug].astro` — halaman episode (dari content collection)
- `src/pages/daftar.astro` — form pendaftaran tamu
- `src/content/cerita/` — episode dalam Markdown (lihat frontmatter di
  `src/content/config.ts` untuk field yang tersedia)
- `src/components/FormPendaftaran.astro`, `FormNewsletter.astro` — form yang
  mem-POST ke Apps Script Web App
- `src/components/Komentar.astro` — embed Giscus per halaman cerita
- `apps-script/Code.gs` — kode Google Apps Script (`doPost`) untuk disalin ke
  Extensions > Apps Script pada Google Sheet

## Status roadmap

- [x] 1. Setup proyek Astro — struktur folder, layout dasar, styling
- [x] 2. Migrasi konten dari Notion ke `src/content/cerita/` — 6 episode +
      6 profil narasumber sudah masuk. **Belum lengkap:** tanggal rilis
      Eps. 1–5 masih perkiraan urutan, dan bio narasumber Eps. 1–4 masih
      ringkas (ditandai `<!-- Catatan migrasi -->` di tiap file). Lengkapi
      dari data Notion asli sebelum publish.
- [ ] 3. Buat Google Sheet + Apps Script, deploy Web App, isi
      `APPS_SCRIPT_URL` di kedua komponen form
- [ ] 4. Uji form pendaftaran & newsletter end-to-end
- [ ] 5. Setup Giscus (giscus.app) — isi `data-repo`, `data-repo-id`,
      `data-category-id` di `Komentar.astro`
- [ ] 6. Deploy ke Cloudflare Pages (build command: `npm run build`,
      output dir: `dist`)
- [ ] 7. Arahkan domain custom via DNS
- [ ] 8. Testing end-to-end

Detail lengkap ada di rancangan migrasi awal.
