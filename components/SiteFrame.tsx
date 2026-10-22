"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import SearchOverlay from "./SearchOverlay";
import { scrollToHash } from "@/lib/scroll";

/**
 * Client shell: owns the header (scroll state, mobile nav), the search overlay,
 * the scroll-lock, smooth anchor scrolling and the scroll-reveal animation.
 * The page sections are passed in as `children`, so they stay Server Components.
 */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  const openSearch = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    lastFocus.current?.focus?.({ preventScroll: true });
  }, []);

  // ─── header gets its background after 80px of scroll ───
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── lock page scroll while the mobile menu or search is open ───
  useEffect(() => {
    document.body.style.overflow = navOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen, searchOpen]);

  // ─── smooth scroll for every in-page #link (search results handle their own) ───
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a || a.hasAttribute("data-go")) return;
      e.preventDefault();
      scrollToHash(a.getAttribute("href"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // ─── keyboard: "/" opens search, Esc closes it ───
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) closeSearch();
      if (
        e.key === "/" &&
        !searchOpen &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "")
      ) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen, openSearch, closeSearch]);

  // ─── scroll reveal (.reveal → .reveal.visible, honouring data-delay) ───
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => {
        el.classList.add("visible");
        el.style.transition = "none";
      });
      return;
    }

    const scheduled = new Set<HTMLElement>();
    const timers: ReturnType<typeof setTimeout>[] = [];

    const check = () => {
      const limit = window.innerHeight - 100;
      els.forEach((el) => {
        if (scheduled.has(el)) return;
        if (el.getBoundingClientRect().top < limit) {
          scheduled.add(el);
          const delay = parseInt(el.getAttribute("data-delay") ?? "0", 10) || 0;
          timers.push(setTimeout(() => el.classList.add("visible"), delay));
        }
      });
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div id="homepage">
        <Header
          scrolled={scrolled}
          navOpen={navOpen}
          onToggleNav={() => setNavOpen((v) => !v)}
          onCloseNav={() => setNavOpen(false)}
          onOpenSearch={openSearch}
        />
        {children}
      </div>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
