import AutoVideo from "./AutoVideo";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-video-wrapper">
        <AutoVideo className="hero-video" poster="/imgandvid/ii.png" src="/imgandvid/nvi.mp4" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">Est. 1928</div>
        <h1 className="hero-title">LUXEPHINE</h1>
        <p className="hero-subtitle">Where precious stones meet timeless artistry</p>
        <div className="hero-cta">
          <a href="#collections" className="btn-primary">Discover the Collection</a>
          <a href="#about" className="btn-secondary">Our Heritage</a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
