export type SearchItem = {
  title: string;
  type: string;
  href: string;
  desc: string;
  keys: string;
};

// Everything searchable. Add new entries (e.g. real products) here.
export const SEARCH_INDEX: SearchItem[] = [
  { title: "Bracelets", type: "Category", href: "#craftsmanship", desc: "Bangles, cuffs and chains for the wrist", keys: "bracelet bangle cuff chain wrist tennis charm" },
  { title: "Necklaces", type: "Category", href: "#craftsmanship", desc: "Pendants, chokers and timeless chains", keys: "necklace pendant choker chain collar locket neck" },
  { title: "Rings", type: "Category", href: "#craftsmanship", desc: "Solitaires, bands and statement rings", keys: "ring band solitaire engagement signet finger proposal" },
  { title: "Earrings", type: "Category", href: "#craftsmanship", desc: "Studs, hoops and drops", keys: "earring stud hoop drop dangle ear" },
  { title: "Anklets", type: "Category", href: "#craftsmanship", desc: "Delicate chains for the ankle", keys: "anklet ankle chain foot" },
  { title: "Day Out", type: "Occasion", href: "#collections", desc: "Effortless elegance", keys: "day casual daily everyday out" },
  { title: "Date Night", type: "Occasion", href: "#collections", desc: "Alluring sophistication", keys: "date night romantic dinner love" },
  { title: "Wedding", type: "Occasion", href: "#collections", desc: "Forever cherished", keys: "wedding bridal bride engagement marriage ceremony" },
  { title: "Office", type: "Occasion", href: "#collections", desc: "Refined confidence", keys: "office work professional business" },
  { title: "Evening", type: "Occasion", href: "#collections", desc: "Unforgettable glamour", keys: "evening gala party formal glamour night" },
  { title: "Diamond Brilliance", type: "Collection", href: "#collections", desc: "Light, captured in every facet", keys: "diamond brilliance sparkle white" },
  { title: "Pearl Elegance", type: "Collection", href: "#collections", desc: "Quiet, luminous grace", keys: "pearl elegance classic" },
  { title: "Sapphire Dreams", type: "Collection", href: "#collections", desc: "Deep blue, endlessly rare", keys: "sapphire dreams blue gemstone" },
  { title: "Ruby Passion", type: "Collection", href: "#collections", desc: "Bold red, unmistakably precious", keys: "ruby passion red gemstone" },
  { title: "Our Story", type: "The Maison", href: "#about", desc: "A century of excellence since 1928", keys: "story about heritage history maison 1928 brand century" },
  { title: "Craftsmanship", type: "The Maison", href: "#craftsmanship", desc: "Gem selection, hand setting, polishing, certification", keys: "craft craftsmanship gem selection hand setting polishing certification artisan atelier quality" },
  { title: "Contact Us", type: "Client Services", href: "#contact", desc: "Private appointments and enquiries", keys: "contact appointment enquiry help support message email service" },
];

export function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// loose singular/plural handling: "rings" ~ "ring"
export function stem(w: string) {
  return w.length > 3 ? w.replace(/(es|s)$/, "") : w;
}

export function runSearch(raw: string): SearchItem[] {
  const tokens = norm(raw).split(/\s+/).filter(Boolean).map(stem);
  if (!tokens.length) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  SEARCH_INDEX.forEach((item) => {
    const title = norm(item.title);
    const hay = title + " " + norm(item.keys) + " " + norm(item.desc) + " " + norm(item.type);
    let score = 0;
    const ok = tokens.every((t) => {
      if (title.split(" ").some((w) => w.startsWith(t))) { score += 10; return true; }
      if (norm(item.keys).split(" ").some((w) => stem(w).startsWith(t))) { score += 4; return true; }
      if (hay.split(/\s+/).some((w) => stem(w).startsWith(t))) { score += 1; return true; }
      return false;
    });
    if (ok) scored.push({ item, score });
  });
  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}
