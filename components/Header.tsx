type HeaderProps = {
  scrolled: boolean;
  navOpen: boolean;
  onToggleNav: () => void;
  onCloseNav: () => void;
  onOpenSearch: () => void;
};

const iconStyle = { width: 16, height: 16, verticalAlign: "middle" } as const;

export default function Header({ scrolled, navOpen, onToggleNav, onCloseNav, onOpenSearch }: HeaderProps) {
  return (
    <header id="header" className={scrolled ? "scrolled" : undefined}>
      <div className="header-inner">
        <div className="header-top">
          <div className="header-left">
            <div
              className={"nav-toggle" + (navOpen ? " active" : "")}
              id="navToggle"
              onClick={onToggleNav}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Contact Us: text on desktop, icon on small screens */}
            <a href="#contact" className="nav-icon contact-link" title="Contact Us">
              <svg
                className="contact-ico"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="1.5"></rect>
                <path d="M3 7l9 6.5L21 7"></path>
              </svg>
              <span className="contact-text">Contact Us</span>
            </a>

            {/* Search */}
            <span
              className="nav-icon search-icon"
              id="searchOpen"
              title="Search"
              role="button"
              tabIndex={0}
              aria-label="Search"
              aria-haspopup="dialog"
              style={{ fontSize: 16 }}
              onClick={onOpenSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenSearch();
                }
              }}
            >
              ⚲
            </span>
          </div>

          <a href="#" className="header-logo">LUXEPHINE</a>

          <div className="header-icons">
            {/* Wishlist */}
            <span className="nav-icon wishlist-icon" title="Wish list">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </span>

            {/* Profile */}
            <span className="nav-icon profile-icon" title="My Luxe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"></path>
              </svg>
            </span>

            {/* Shopping bag */}
            <span className="nav-icon bag-icon" title="Shopping Bag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
                <path d="M6 7L4 22h16L18 7H6z"></path>
                <path d="M9 10V5a3 3 0 0 1 6 0v5"></path>
              </svg>
            </span>
          </div>
        </div>

        <nav className={"header-nav" + (navOpen ? " open" : "")} id="navLinks">
          <a href="#collections" className="nav-link" onClick={onCloseNav}>Collections</a>
          <a href="#craftsmanship" className="nav-link" onClick={onCloseNav}>Bracelets</a>
          <a href="#craftsmanship" className="nav-link" onClick={onCloseNav}>Necklaces</a>
          <a href="#craftsmanship" className="nav-link" onClick={onCloseNav}>Rings</a>
          <a href="#craftsmanship" className="nav-link" onClick={onCloseNav}>Earrings</a>
          <a href="#craftsmanship" className="nav-link" onClick={onCloseNav}>Anklets</a>
          <a href="#about" className="nav-link" onClick={onCloseNav}>Our Story</a>
          <a href="#contact" className="nav-link" onClick={onCloseNav}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
