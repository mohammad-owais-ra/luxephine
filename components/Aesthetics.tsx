import AutoVideo from "./AutoVideo";

const bg = (file: string, position?: string) => ({
  backgroundImage: `url('/imgandvid/${file}')`,
  ...(position ? { backgroundPosition: position } : {}),
});

export default function Aesthetics() {
  return (
    <section id="pagedecor" className="section page-decor aes">
      <div className="section-header reveal">
        <span className="section-overline">Wear It Everywhere</span>
        <h2 className="section-title">Made for Real Life</h2>
        <div className="section-divider"><span></span></div>
        <p className="section-desc">
          Premium, tarnish-free, waterproof stainless steel jewelry designed to be worn every day. Shower in it, swim in it, sleep in it, and it keeps its shine. Beautiful jewelry that fits your life and your budget.
        </p>
      </div>

      {/* 1 · Two tall editorial tiles */}
      <div className="aes-duo">
        <article className="aes-tile reveal" data-delay="0">
          <a href="#collections" className="aes-media aes-media--tall" aria-label="Signature Edit">
            <span className="aes-img" style={bg("ii.png", "center 30%")}></span>
          </a>
          <h3 className="aes-title">The Everyday <em>Edit</em></h3>
          <p className="aes-text">Your daily essentials, made to be worn from morning to night.</p>
          <a href="#collections" className="aes-link">Shop Now</a>
        </article>
        <article className="aes-tile reveal" data-delay="150">
          <a href="#collections" className="aes-media aes-media--tall" aria-label="Timeless Bands">
            <span className="aes-img" style={bg("iii.png", "center 60%")}></span>
          </a>
          <h3 className="aes-title">Dive <em> In</em></h3>
          <p className="aes-text">Waterproof and tarnish-free, so you never have to take it off.</p>
          <a href="#collections" className="aes-link">Shop Now</a>
        </article>
      </div>

      {/* 2 · Image + text split */}
      <div className="aes-feature reveal">
        <a href="#collections" className="aes-media aes-media--wide" aria-label="Most Desired Styles">
          <span className="aes-img" style={bg("v.png")}></span>
        </a>
        <div className="aes-panel">
          <span className="aes-kicker">Born to Choose</span>
          <h3 className="aes-title aes-title--lg">Delicate<em>, Not Weak </em></h3>
          <p className="aes-text">
            Your choices speak before you do, and your jewelry is one of them. For the presentation, the interview, the formal night and every room you walk into. Bold in its own quiet way, graceful but never fragile, and entirely yours. Wear what feels like you.
          </p>
          <a href="#collections" className="aes-link">Shop the Look</a>
        </div>
      </div>

      {/* 3 · Cinematic banner (video + poster) */}
      <div className="aes-banner reveal">
        <AutoVideo className="aes-video" poster="/imgandvid/iv.png" src="/imgandvid/nvi.mp4" />
        <div className="aes-banner-shade"></div>
        <div className="aes-banner-copy">
          <span className="aes-kicker">The New Season</span>
          <h3 className="aes-banner-title">Feels Like  <em>You</em></h3>
          <p>Not what’s trending, what’s yours. A new season, a new you, or simply more of the one you already are..</p>
          <a href="#collections" className="btn-secondary">Explore the Collection</a>
        </div>
      </div>

      {/* 4 · Mirrored split */}
      <div className="aes-feature aes-feature--flip reveal">
        <a href="#collections" className="aes-media aes-media--wide" aria-label="Love and Celebration">
          <span className="aes-img" style={bg("iii.png", "center 40%")}></span>
        </a>
        <div className="aes-panel">
          <span className="aes-kicker">Turn it up</span>
          <h3 className="aes-title aes-title--lg">Main <em>Character</em> Energy</h3>
          <p className="aes-text">
            Pick the pieces that make you feel like the main character. Dress up, show up and stand out. Wherever the party is, the spotlight finds you.
          </p>
          <a href="#about" className="aes-link">Shop the Look</a>
        </div>
      </div>

      {/* 5 · The Experience */}
      <div className="aes-experience-head reveal">
        <h3 className="aes-title aes-title--lg">The LUXEPHINE <em>Experience</em></h3>
      </div>
      <div className="aes-trio">
        <article className="aes-tile reveal" data-delay="150">
          <a href="#craftsmanship" className="aes-media aes-media--square" aria-label="Personalization">
            <span className="aes-img" style={bg("iv.png", "center 25%")}></span>
          </a>
          <h3 className="aes-title"><em>Signature Gift Packaging</em></h3>
          <p className="aes-text">Each piece arrives in our signature box, ready to give, with a handwritten note if you wish.</p>
          <a href="#craftsmanship" className="aes-link">Learn More</a>
        </article>
        <article className="aes-tile reveal" data-delay="0">
          <a href="#contact" className="aes-media aes-media--square" aria-label="Book an Appointment">
            <span className="aes-img" style={bg("ii.png", "70% center")}></span>
          </a>
          <h3 className="aes-title">Complimentary <em>Delivery</em></h3>
          <p className="aes-text">Every order is delivered to your door, fully insured and beautifully packaged.</p>
        </article>
        <article className="aes-tile reveal" data-delay="300">
          <a href="#contact" className="aes-media aes-media--square" aria-label="Contact Us">
            <span className="aes-img" style={bg("v.png", "30% center")}></span>
          </a>
          <h3 className="aes-title">Contact <em>Us</em></h3>
          <p className="aes-text">uestions about a piece or an order? Our team is here to help by email or chat.</p>
          <a href="#contact" className="aes-link">Get in Touch</a>
        </article>
      </div>
    </section>
  );
}
