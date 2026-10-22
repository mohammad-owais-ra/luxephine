/** Smooth-scroll to an in-page #hash, leaving room for the fixed header (same 140px as the original). */
export function scrollToHash(hash: string | null | undefined, offset = 140) {
  if (!hash || hash.length < 2) return;
  let target: Element | null = null;
  try {
    target = document.querySelector(hash);
  } catch {
    return;
  }
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}
