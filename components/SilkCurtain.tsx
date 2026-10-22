"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const FRAMES_PATH = "/3frps/"; // public/3frps/1.png … 15.png
const N = 15;
const OPEN_AT = 0.34; // fraction of the scroll used to open the curtain (the rest scrubs the frames)

// Starting position (% of the photo) for each hotspot; the frame tracker below moves them.
const HOTSPOTS = [
  { x: 35.39, y: 20.2, label: "Shop the Earring", aria: "Shop the earring" },
  { x: 35.97, y: 41.07, label: "Shop the Necklace", aria: "Shop the necklace" },
  { x: 44.11, y: 38.83, label: "Shop the Ring", aria: "Shop the ring" },
  { x: 36.44, y: 52.33, label: "Shop the Bracelet", aria: "Shop the bracelet" },
  { x: 37.15, y: 87.3, label: "Shop the Anklet", aria: "Shop the anklet" },
];

const LIST = [
  { num: "01", name: "Earrings", cta: "Shop the Earring", d: ".35s" },
  { num: "02", name: "Necklaces", cta: "Shop the Necklace", d: ".45s" },
  { num: "03", name: "Rings", cta: "Shop the Ring", d: ".55s" },
  { num: "04", name: "Bracelets", cta: "Shop the Bracelet", d: ".65s" },
  { num: "05", name: "Anklets", cta: "Shop the Anklet", d: ".75s" },
];

// jewelry position (% of the frame) per video frame: earring, necklace, ring, bracelet, anklet
const TRACK: number[][][] = [[[35.39,20.2],[35.61,20.13],[35.91,20.13],[36.24,20.13],[36.63,20.2],[37.08,20.3],[37.52,20.41],[37.93,20.53],[38.17,20.6],[38.18,20.5],[37.96,20.33],[37.47,20.11],[36.88,19.97],[36.19,19.93],[35.57,19.97]],[[35.97,41.07],[36.08,41.03],[36.32,41.07],[36.58,41.19],[36.87,41.17],[37.16,41.25],[37.44,41.33],[37.6,41.42],[37.71,41.43],[37.65,41.4],[37.54,41.31],[37.28,41.3],[36.95,41.25],[36.64,41.23],[36.39,41.17]],[[44.11,38.83],[44.23,37.31],[44.33,35.3],[44.41,33.46],[44.39,31.86],[44.3,31.29],[44.92,32.27],[45.68,33.6],[46.33,34.97],[46.9,36.47],[47.39,38.19],[47.63,39.91],[47.68,41.52],[47.45,42.75],[47.07,43.53]],[[36.44,52.33],[36.77,51.15],[37.2,49.74],[37.68,48.34],[38.25,47.41],[38.83,47.36],[39.42,48.23],[39.78,49.18],[39.89,49.99],[39.7,50.56],[39.43,51.08],[39.03,51.79],[38.62,52.37],[38.03,52.87],[37.57,53.77]],[[37.15,87.3],[36.79,86.85],[36.78,86.88],[36.84,86.93],[36.97,87.06],[37.08,87.24],[37.16,87.28],[37.26,87.37],[37.26,87.4],[37.31,87.42],[37.16,87.38],[37.06,87.31],[37.01,87.23],[36.94,87.15],[36.87,87.07]]];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function SilkCurtain() {
  const secRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curLRef = useRef<HTMLDivElement>(null);
  const curRRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const curL = curLRef.current;
    const curR = curRRef.current;
    const hint = hintRef.current;
    if (!sec || !frame || !canvas || !curL || !curR || !hint) return;
    const ctx = canvas.getContext("2d");

    const items = Array.from(sec.querySelectorAll<HTMLElement>(".silk-item"));
    const hots = Array.from(sec.querySelectorAll<HTMLElement>(".silk-hot"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    /* ═══ LIVING PHOTO: frames 1.png … 15.png painted on the canvas, scrubbed by scroll ═══ */
    const imgs: HTMLImageElement[] = [];
    const loaded: boolean[] = [];
    let sized = false;
    let lastU = -1;
    let curU = 0;

    // closest frame that has loaded
    function nearest(i: number) {
      for (let d = 0; d < N; d++) {
        if (loaded[i - d]) return i - d;
        if (loaded[i + d]) return i + d;
      }
      return -1;
    }

    function draw(u: number) {
      u = Math.min(N - 1, Math.max(0, u));
      curU = u;
      if (Math.abs(u - lastU) < 0.0005) return;
      lastU = u;
      const i = Math.min(N - 1, Math.floor(u));
      const j = Math.min(N - 1, i + 1);
      const f = u - i;
      const a = nearest(i);
      if (a >= 0 && ctx) {
        ctx.globalAlpha = 1;
        ctx.drawImage(imgs[a], 0, 0, canvas!.width, canvas!.height);
        const b = nearest(j);
        if (b >= 0 && b !== a && f > 0.003) {
          ctx.globalAlpha = f;
          ctx.drawImage(imgs[b], 0, 0, canvas!.width, canvas!.height);
          ctx.globalAlpha = 1;
        }
      }
      // hotspots follow the jewelry
      let on = -1;
      for (let p = 0; p < hots.length; p++) {
        const A = TRACK[p][i];
        const B = TRACK[p][j];
        const x = (A[0] + (B[0] - A[0]) * f).toFixed(2);
        const y = (A[1] + (B[1] - A[1]) * f).toFixed(2);
        hots[p].style.setProperty("--x", x + "%");
        hots[p].style.setProperty("--y", y + "%");
        hots[p].dataset.x = x;
        hots[p].dataset.y = y;
        if (hots[p].classList.contains("is-on")) on = p;
      }
      if (on > -1) {
        frame!.style.setProperty("--gx", hots[on].dataset.x + "%");
        frame!.style.setProperty("--gy", hots[on].dataset.y + "%");
      }
    }

    for (let k = 0; k < N; k++) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        loaded[k] = true;
        if (!sized) {
          sized = true;
          canvas.width = im.naturalWidth;
          canvas.height = im.naturalHeight;
          sec.style.setProperty("--ratio", (im.naturalWidth / im.naturalHeight).toFixed(4));
        }
        lastU = -1;
        draw(curU); // repaint as frames arrive
      };
      im.onerror = () => console.warn("LUXEPHINE: could not load " + im.src);
      im.src = FRAMES_PATH + (k + 1) + ".png";
      imgs[k] = im;
    }

    /* ═══ highlight helper (list item ↔ hotspot ↔ spotlight) ═══ */
    let active = -1;
    function setActive(i: number) {
      active = i;
      items.forEach((el, k) => el.classList.toggle("is-on", k === i));
      hots.forEach((el, k) => el.classList.toggle("is-on", k === i));
      sec!.classList.toggle("has-active", i > -1);
      if (i > -1) {
        frame!.style.setProperty("--gx", hots[i].dataset.x + "%");
        frame!.style.setProperty("--gy", hots[i].dataset.y + "%");
      }
    }

    /* idle tour: gently cycles through the jewels until the visitor interacts */
    let tour: ReturnType<typeof setInterval> | null = null;
    let hovering = false;
    function startTour() {
      if (tour || reduce) return;
      tour = setInterval(() => {
        if (!hovering) setActive((active + 1) % items.length);
      }, 2800);
    }
    function stopTour() {
      if (tour) clearInterval(tour);
      tour = null;
    }

    function bind(el: HTMLElement, i: number) {
      const enter = () => { hovering = true; setActive(i); };
      const leave = () => { hovering = false; };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("focus", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("blur", leave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("focus", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("blur", leave);
      });
    }
    items.forEach(bind);
    hots.forEach(bind);

    function setOpen(open: boolean) {
      if (open === sec!.classList.contains("is-open")) return;
      sec!.classList.toggle("is-open", open);
      if (open) { setActive(0); startTour(); }
      else { stopTour(); setActive(-1); }
    }

    cleanups.push(() => {
      stopTour();
      sec.classList.remove("is-open", "has-active", "silk--static");
      items.forEach((el) => el.classList.remove("is-on"));
      hots.forEach((el) => el.classList.remove("is-on"));
    });

    /* reduced motion: skip the pin, show everything */
    if (reduce) {
      sec.classList.add("silk--static");
      frame.style.setProperty("--zoom", "1");
      frame.style.setProperty("--bright", "1");
      setOpen(true);
      return () => cleanups.forEach((fn) => fn());
    }

    /* ═══ scroll-driven curtain ═══ */
    let target = 0;
    let cur = 0;
    let visible = false;
    let raf: number | null = null;

    function measure() {
      const r = sec!.getBoundingClientRect();
      const total = sec!.offsetHeight - window.innerHeight;
      target = clamp(-r.top / total, 0, 1);
    }

    function render() {
      const vel = target - cur;
      cur += vel * 0.08; // smoothing = the "silky" lag
      if (Math.abs(vel) < 0.0001) cur = target;

      const open = ease(clamp(cur / OPEN_AT, 0, 1));
      // pure slide: each panel simply moves aside
      curL!.style.transform = "translate3d(" + -open * 100 + "%,0,0)";
      curR!.style.transform = "translate3d(" + open * 100 + "%,0,0)";

      frame!.style.setProperty("--zoom", (1.14 - 0.14 * open).toFixed(4));
      frame!.style.setProperty("--bright", (0.5 + 0.5 * open).toFixed(3));
      hint!.style.opacity = String(clamp(1 - open * 3.5, 0, 1));

      // after the curtain is open, every bit of scroll moves the frames forward
      draw(clamp((cur - OPEN_AT) / (1 - OPEN_AT), 0, 1) * (N - 1));

      setOpen(cur > OPEN_AT * 0.92);

      raf = visible ? requestAnimationFrame(render) : null;
    }

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (e) => {
          visible = e[0].isIntersecting;
          if (visible && !raf) {
            measure();
            raf = requestAnimationFrame(render);
          }
        },
        { rootMargin: "100px" },
      );
      io.observe(sec);
    } else {
      visible = true;
    }

    measure();
    cur = target;
    raf = requestAnimationFrame(render);

    cleanups.push(() => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      visible = false;
      io?.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="silk" className="silk" aria-label="Shop by category" ref={secRef}>
      <div className="silk-pin">
        <div className="silk-backdrop" aria-hidden="true"></div>

        {/* the photograph */}
        <div className="silk-frame" id="silkFrame" ref={frameRef}>
          <div className="silk-photo">
            {/* fallback still, shown only until the frames have loaded */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="silk-img"
              src="/imgandvid/nc.png"
              alt="Model wearing LUXEPHINE earrings, necklace, ring, bracelet and anklet"
            />
            {/* 3frps/1.png … 15.png are painted here */}
            <canvas className="silk-canvas" id="silkCanvas" width={1280} height={720} aria-hidden="true" ref={canvasRef}></canvas>
          </div>
          <div className="silk-spot"></div>

          {/* hotspots: --x / --y are % positions on the photo (updated per frame) */}
          {HOTSPOTS.map((h, i) => (
            <a
              key={h.label}
              href="#collections"
              className="silk-hot"
              style={{ "--x": h.x + "%", "--y": h.y + "%", "--i": i } as Vars}
              data-x={h.x}
              data-y={h.y}
              aria-label={h.aria}
            >
              <span className="silk-dot"></span>
              <span className="silk-ring"></span>
              <span className="silk-tip"><span>{h.label}</span></span>
            </a>
          ))}
        </div>

        <div className="silk-vignette"></div>

        {/* the silk curtains */}
        <div className="silk-curtain silk-curtain--l" id="silkL" ref={curLRef}></div>
        <div className="silk-curtain silk-curtain--r" id="silkR" ref={curRRef}></div>

        <div className="silk-hint" id="silkHint" ref={hintRef}>
          <div className="silk-logo" role="img" aria-label="LUXEPHINE"></div>
          <span className="silk-hint-text">Scroll to part the curtain</span>
          <span className="silk-hint-line"></span>
        </div>

        {/* the empty space on the right, now alive */}
        <div className="silk-panel">
          <span className="silk-kicker" style={{ "--d": ".1s" } as Vars}>For You</span>
          <h3 className="silk-title" style={{ "--d": ".2s" } as Vars}>Shop by <em>category</em></h3>
          <span className="silk-rule" style={{ "--d": ".26s" } as Vars}></span>
          <p className="silk-desc" style={{ "--d": ".3s" } as Vars}>
            Find the piece that speaks your heart. Every category holds a little sparkle made just for you. Your next favorite sparkle is waiting.
          </p>
          <ul className="silk-list">
            {LIST.map((it) => (
              <li key={it.num} style={{ "--d": it.d } as Vars}>
                <a className="silk-item" href="#collections">
                  <span className="silk-num">{it.num}</span>
                  <span className="silk-name">{it.name}</span>
                  <span className="silk-cta">{it.cta} <i>&rarr;</i></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
