const CRAFT = [
  { delay: "0", title: "Gem Selection", text: "Only 0.1% of gemstones meet our exacting standards of cut, color, and clarity." },
  { delay: "150", title: "Hand Setting", text: "Each stone is meticulously set by hand by artisans with decades of experience." },
  { delay: "300", title: "Polishing", text: "Our proprietary polishing technique creates an unparalleled mirror finish." },
  { delay: "450", title: "Certification", text: "Every piece comes with a certificate of authenticity and lifetime guarantee." },
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="about-layout">
        <div className="about-image reveal">
          <div className="about-image-frame">
            <div className="about-image-inner" style={{ backgroundImage: 'url("/imgandvid/v.png")' }}></div>
          </div>
        </div>
        <div className="about-text reveal" data-delay="200">
          <span className="section-overline">Why We Exist</span>
          <h2 className="section-title">You, Unfiltered</h2>
          <div className="section-divider left"><span></span></div>
          <p>
            LUXEPHINE began with a simple belief: you were never meant to fit a mold. Neither the ones trends hand you, nor the ones anyone else expects. Feminine doesn’t mean fragile, and bold doesn’t mean borrowing someone else’s strength. You are never just one thing. You can be soft or sharp, quiet or loud, and a hundred other sides no label could hold while remaining completely yourself. Femininity was never a weakness. It’s simply you, owning who you are.
          </p>
          <p>
            What you wear is one of the ways you express it, so we choose jewelry that lets every side of you show. Pieces with a luxury feel that fit real life, in premium stainless steel that doesn’t tarnish, doesn’t mind water, and keeps its shine. You don’t wait to be chosen. You choose, and you own it.
          </p>
        </div>
      </div>
      <div className="section-header reveal">
        <span className="section-overline">Worth Choosing</span>
        <h2 className="section-title">Because You Choose</h2>
        <div className="section-divider"><span></span></div>
        <p className="section-desc">
          Four things that make LUXEPHINE feel less like something you buy and more like something that’s yours.
        </p>
      </div>
      <div className="craft-grid">
        {CRAFT.map((c) => (
          <div className="craft-item reveal" data-delay={c.delay} key={c.title}>
            <div className="craft-icon">&#9670;</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
