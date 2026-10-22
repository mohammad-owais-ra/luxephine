"use client";

import { useEffect, useRef } from "react";

const CARDS = [
  { category: "DAY OUT", sub: "Effortless elegance", img: "ii.png" },
  { category: "DATE NIGHT", sub: "Alluring sophistication", img: "iii.png" },
  { category: "WEDDING", sub: "Forever cherished", img: "v.png" },
  { category: "OFFICE", sub: "Refined confidence", img: "iv.png" },
  { category: "EVENING", sub: "Unforgettable glamour", img: "ii.png" },
];

// 3 identical sets so there is always a card on both sides of the viewport.
// Sets 2 and 3 are decorative copies (aria-hidden), exactly like the original clones.
const SETS = [0, 1, 2];

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const total = CARDS.length;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const AUTO_DURATION = 45000; // ms for one full loop
    const TWEEN_TIME = 450; // arrow slide duration
    const RESUME_DELAY = 0;

    let setWidth = 0;
    let offset = 0;
    let hovered = false;
    let tween: { from: number; to: number; start: number } | null = null;
    let resumeAt = 0;
    let lastTime: number | null = null;
    let activeCard: HTMLElement | null = null;
    let raf = 0;

    // Width of one full set of cards (works at every breakpoint)
    function measure() {
      const newSet = cards[total].offsetLeft - cards[0].offsetLeft;
      offset = setWidth ? newSet * (offset / setWidth) : newSet;
      setWidth = newSet;
      tween = null;
    }

    // Keep offset inside the middle copy; the jump is invisible because the sets are identical
    function normalize() {
      let shift = 0;
      while (offset >= 2 * setWidth) {
        offset -= setWidth;
        shift -= total;
      }
      while (offset < setWidth) {
        offset += setWidth;
        shift += total;
      }

      // If we jumped, move the highlight to the identical copy instantly (no re-animation)
      if (shift && activeCard) {
        const twin = cards[cards.indexOf(activeCard) + shift];
        if (twin) {
          activeCard.style.transition = "none";
          twin.style.transition = "none";
          activeCard.classList.remove("active");
          twin.classList.add("active");
          void twin.offsetWidth; // force the browser to apply it instantly
          activeCard.style.transition = "";
          twin.style.transition = "";
          activeCard = twin;
        }
      }
    }

    const viewportCenter = () => {
      const r = viewport.getBoundingClientRect();
      return r.left + r.width / 2;
    };
    const cardCenter = (card: HTMLElement) => {
      const r = card.getBoundingClientRect();
      return r.left + r.width / 2;
    };

    // Highlight the card closest to the centre of the carousel
    function highlightCenterCard() {
      const centerX = viewportCenter();
      let closest: HTMLElement | null = null;
      let closestDist = Infinity;
      for (const card of cards) {
        const dist = Math.abs(cardCenter(card) - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closest = card;
        }
      }
      if (closest && closest !== activeCard) {
        activeCard?.classList.remove("active");
        closest.classList.add("active");
        activeCard = closest;
      }
    }

    // dir = 1 → next, dir = -1 → previous
    function goStep(dir: number) {
      if (tween || !activeCard) return;
      const vc = viewportCenter();
      const ac = cardCenter(activeCard);
      let targetCenter: number | null = null;
      let bestGap = Infinity;
      for (const card of cards) {
        const gap = (cardCenter(card) - ac) * dir;
        if (gap > 5 && gap < bestGap) {
          bestGap = gap;
          targetCenter = cardCenter(card);
        }
      }
      if (targetCenter === null) return;
      const now = performance.now();
      tween = { from: offset, to: offset + (targetCenter - vc), start: now };
      resumeAt = now + TWEEN_TIME + RESUME_DELAY;
    }

    function frame(now: number) {
      const dt = lastTime === null ? 0 : Math.min(now - lastTime, 50);
      lastTime = now;

      if (tween) {
        const p = Math.min((now - tween.start) / TWEEN_TIME, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        offset = tween.from + (tween.to - tween.from) * eased;
        if (p >= 1) {
          tween = null;
          normalize();
        }
      } else {
        if (!reduceMotion && !hovered && now >= resumeAt) {
          offset += (setWidth / AUTO_DURATION) * dt;
        }
        normalize();
      }

      track!.style.transform = `translateX(${-offset}px)`;
      highlightCenterCard();
      raf = requestAnimationFrame(frame);
    }

    const onNext = () => goStep(1);
    const onPrev = () => goStep(-1);
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
    const next = nextRef.current;
    const prev = prevRef.current;

    next?.addEventListener("click", onNext);
    prev?.addEventListener("click", onPrev);
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", measure);

    measure();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      next?.removeEventListener("click", onNext);
      prev?.removeEventListener("click", onPrev);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", measure);
      activeCard?.classList.remove("active");
    };
  }, []);

  return (
    <div className="carousel-wrapper reveal">
      <div className="carousel-container">
        <button className="carousel-arrow carousel-prev" aria-label="Previous collection" ref={prevRef}>
          &#10094;
        </button>
        <div className="carousel-viewport">
          {/* JS drives the movement, so the CSS auto-scroll animation is switched off from the start */}
          <div className="carousel-track" id="carouselTrack" ref={trackRef} style={{ animation: "none" }}>
            {SETS.map((set) =>
              CARDS.map((c) => (
                <div
                  className="carousel-card"
                  data-category={c.category}
                  key={`${set}-${c.category}`}
                  aria-hidden={set > 0 ? true : undefined}
                >
                  <div className="carousel-card-image" style={{ backgroundImage: `url("/imgandvid/${c.img}")` }}></div>
                  <div className="carousel-card-gradient"></div>
                  <div className="carousel-card-label">
                    <span className="card-category">{c.category}</span>
                    <span className="card-sub">{c.sub}</span>
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
        <button className="carousel-arrow carousel-next" aria-label="Next collection" ref={nextRef}>
          &#10095;
        </button>
      </div>
    </div>
  );
}
