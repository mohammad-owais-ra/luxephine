"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { norm, runSearch, stem } from "@/lib/search";
import { scrollToHash } from "@/lib/scroll";

function Highlight({ text, query }: { text: string; query: string }) {
  const words = norm(query)
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => stem(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!words.length) return <>{text}</>;
  const parts = text.split(new RegExp("(" + words.join("|") + ")", "ig"));
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

const CHIPS = [
  ["necklaces", "Necklaces"],
  ["bracelets", "Bracelets"],
  ["rings", "Rings"],
  ["earrings", "Earrings"],
  ["wedding", "Wedding"],
] as const;

const SPOTLIGHT = [
  ["ii", "Day Out"],
  ["iii", "Date Night"],
  ["v", "Wedding"],
  ["iv", "Office"],
] as const;

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim();
  const results = useMemo(() => (q ? runSearch(q) : []), [q]);

  // focus the field once the overlay has faded in; clear it after it has faded out
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
      return () => clearTimeout(t);
    }
    inputRef.current?.blur();
    const t = setTimeout(() => setQuery(""), 600);
    return () => clearTimeout(t);
  }, [open]);

  function goTo(hash: string | null) {
    onClose();
    if (!hash || hash.length < 2) return;
    setTimeout(() => scrollToHash(hash), 350);
  }

  return (
    <div
      className={"search-overlay" + (open ? " open" : "")}
      id="searchOverlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search LUXEPHINE"
      aria-hidden={!open}
      // arrow keys move through results
      onKeyDown={(e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        const root = overlayRef.current;
        if (!root) return;
        const links = Array.from(
          root.querySelectorAll<HTMLElement>(q ? ".search-result" : ".search-chip, .spot-card"),
        );
        if (!links.length) return;
        e.preventDefault();
        let i = links.indexOf(document.activeElement as HTMLElement);
        i = e.key === "ArrowDown" ? i + 1 : i - 1;
        if (i < 0) {
          inputRef.current?.focus();
          return;
        }
        links[Math.min(i, links.length - 1)].focus();
      }}
      // spotlight cards + result links (anything marked data-go)
      onClick={(e) => {
        const link = (e.target as HTMLElement).closest("[data-go]");
        if (link) {
          e.preventDefault();
          goTo(link.getAttribute("href"));
        }
      }}
    >
      <button className="search-close" id="searchClose" aria-label="Close search" onClick={onClose}>
        <span></span>
        <span></span>
      </button>
      <div className="search-inner">
        <a
          href="#"
          className="search-brand"
          id="searchBrand"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          LUXEPHINE
        </a>

        <form
          className="search-form"
          id="searchForm"
          role="search"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            if (results.length) goTo(results[0].href);
          }}
        >
          <input
            type="search"
            id="searchInput"
            className="search-input"
            placeholder="Search LUXEPHINE"
            aria-label="Search LUXEPHINE"
            enterKeyHint="search"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-submit" aria-label="Search">⚲</button>
        </form>

        <div className="search-default" id="searchDefault" hidden={!!q}>
          <h3 className="search-heading">Popular</h3>
          <div className="search-chips">
            {CHIPS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className="search-chip"
                data-q={value}
                onClick={() => {
                  setQuery(value);
                  inputRef.current?.focus();
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <h3 className="search-heading">Spotlight</h3>
          <div className="search-spotlight">
            {SPOTLIGHT.map(([img, label]) => (
              <a key={label} href="#collections" className="spot-card" data-go="">
                <span className="spot-img" style={{ backgroundImage: `url('/imgandvid/${img}.png')` }}></span>
                <span className="spot-label">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="search-results" id="searchResults" hidden={!q}>
          <p className="search-count" id="searchCount" aria-live="polite">
            {results.length ? results.length + (results.length === 1 ? " result" : " results") : ""}
          </p>
          <ul className="search-list" id="searchList">
            {q && !results.length && (
              <li className="search-empty">
                No results for “{q}”
                <small>
                  Try “rings”, “wedding” or “pearl” — or{" "}
                  <a href="#contact" data-go="">contact our team</a>.
                </small>
              </li>
            )}
            {results.map((r, i) => (
              <li key={r.title}>
                <a className={"search-result" + (i === 0 ? " is-first" : "")} href={r.href} data-go="">
                  <span>
                    <span className="result-type">{r.type}</span>
                    <span className="result-title"><Highlight text={r.title} query={q} /></span>
                    <span className="result-desc">{r.desc}</span>
                  </span>
                  <span className="result-arrow">&rarr;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
