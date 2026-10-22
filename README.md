# LUXEPHINE — Next.js 16 + Tailwind CSS v4

## 1. Copy your media in (required — not included)
Put your two asset folders inside `public/`:

    public/imgandvid/   ← ii.png iii.png iv.png v.png nc.png logo.png picon.png nvi.mp4 …
    public/3frps/       ← 1.png … 15.png   (the silk-curtain frames)

Same file names as before. Paths in the code are now `/imgandvid/…` and `/3frps/…`.

## 2. Run it
    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

Needs Node.js 20.9 or newer.

## Where things live
    app/layout.tsx        <head> title + description (the Metadata API)
    app/page.tsx          the page, assembled from sections
    app/globals.css       Tailwind v4 (no Preflight) + your brand tokens (@theme)
    app/legacy.css        your original style.css, unchanged
    components/           one file per section; client components only where needed
    lib/search.ts         the search index + matching logic

## Using Tailwind
Utilities beat legacy.css, so you can migrate gradually:
    <p className="text-gold font-luxe tracking-[3px]">…</p>
Brand colours are available as bg-maroon, bg-maroon-deep, text-gold, text-gold-hi, etc.
