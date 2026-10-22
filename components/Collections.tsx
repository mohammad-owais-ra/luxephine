import Carousel from "./Carousel";

export default function Collections() {
  return (
    <section id="collections" className="section collections-section">
      <div className="section-header reveal">
        <span className="section-overline">Exclusive</span>
        <h2 className="section-title">SHOP BY OCCASION</h2>
        <div className="section-divider"><span></span></div>
        <p className="section-desc">
          Each piece tells a story of unparalleled craftsmanship and timeless elegance, designed for those who appreciate the finest things in life.
        </p>
      </div>
      <Carousel />
    </section>
  );
}
