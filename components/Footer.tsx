const iconStyle = { width: 16, height: 16, verticalAlign: "middle" } as const;
const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  style: iconStyle,
};

const COLUMNS = [
  { title: "Collections", links: ["Diamond Brilliance", "Pearl Elegance", "Sapphire Dreams", "Ruby Passion"] },
  { title: "The Maison", links: ["Our Story", "Craftsmanship", "Ateliers", "Careers"] },
  { title: "Client Services", links: ["Private Appointments", "Care & Repair", "Shipping & Returns", "Lifetime Warranty"] },
];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">LUXEPHINE</span>
          <p>
            For every side of you. Premium stainless steel jewelry, waterproof and tarnish-free, made for the life you actually live and chosen by you.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div className="footer-links" key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((l) => (
              <a href="#" key={l}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 LUXEPHINE. All rights reserved.</p>
        <div className="social-links">
          {/* Instagram */}
          <a href="#" className="nav-icon social-icon" aria-label="Instagram" title="Instagram">
            <svg {...svgProps}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" className="nav-icon social-icon" aria-label="Facebook" title="Facebook">
            <svg {...svgProps}>
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>

          {/* Pinterest */}
          <a href="#" className="nav-icon social-icon" aria-label="Pinterest" title="Pinterest">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/imgandvid/picon.png" alt="" className="social-img" width={16} height={16} />
          </a>

          {/* YouTube */}
          <a href="#" className="nav-icon social-icon" aria-label="YouTube" title="YouTube">
            <svg {...svgProps}>
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
