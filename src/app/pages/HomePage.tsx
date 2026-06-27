import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import img1 from "../../imports/WhatsApp_Image_2026-06-10_at_6.35.48_PM.jpeg";
import img2 from "../../imports/WhatsApp_Image_2026-06-10_at_6.36.20_PM.jpeg";
import img3 from "../../imports/WhatsApp_Image_2026-06-10_at_6.36.46_PM.jpeg";
import img4 from "../../imports/WhatsApp_Image_2026-06-10_at_6.37.53_PM.jpeg";
import img5 from "../../imports/WhatsApp_Image_2026-06-10_at_6.38.01_PM.jpeg";
import img6 from "../../imports/WhatsApp_Image_2026-06-10_at_9.18.09_PM.jpeg";

// ─── Hero Section (3 expandable cards) ──────────────────────────────────────
function HeroSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  const cards = [
    {
      title: "Toys",
      link: "/products",
      image: img1,
      color: "#D6001C",
    },
    {
      title: "Edge",
      link: "/brands",
      image: img2,
      color: "#D6001C",
    },
    {
      title: "Tech",
      link: "/about",
      image: img3,
      color: "#D6001C",
    },
  ];

  const handleMouseEnter = (idx: number) => {
    setHovered(idx);
    const card = document.getElementById(`hero-card-${idx}`);
    if (card) {
      const video = card.querySelector("video");
      if (video) video.style.opacity = "1";
    }
  };

  const handleMouseLeave = (idx: number) => {
    setHovered(null);
    const card = document.getElementById(`hero-card-${idx}`);
    if (card) {
      const video = card.querySelector("video");
      if (video) video.style.opacity = "0";
    }
  };

  return (
    <section style={{ padding: "40px 0", background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8" style={{ maxWidth: "1800px", padding: "0 40px" }}>
        <div
          className="hero-section"
          style={{
            display: "flex",
            gap: "20px",
            minHeight: "calc(100vh - 130px)",
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              id={`hero-card-${idx}`}
              className="hero-card"
              style={{
                position: "relative",
                flex: hovered === idx ? 1.5 : 1,
                overflow: "hidden",
                borderRadius: "5px",
                transition: "flex 0.5s ease",
                cursor: "pointer",
              }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <ImageWithFallback
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 1, width: "100%", height: "100%" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  height: "25%",
                  width: "100%",
                  bottom: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  zIndex: 1,
                  position: "absolute",
                }}
              />
              <div
                className="text-wrapper"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "40px",
                }}
              >
                <div
                  className="bottom-wrapper"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "clamp(1.75rem, 3vw, 48px)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {card.title}
                  </span>
                  <Link
                    to={card.link}
                    className="hero-button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "white",
                      border: "1px solid white",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      background: "transparent",
                      fontSize: "16px",
                      textDecoration: "none",
                      opacity: hovered === idx ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    Learn more
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8.5H17M17 8.5L10.5 2M17 8.5L10.5 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Counter Hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}

// ─── Tomorrow Reimagined Section ────────────────────────────────────────────
function TomorrowReimaginedSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 5000, suffix: "+", label: "Team members" },
    { value: 34, suffix: "", label: "Offices worldwide" },
    { value: 120, suffix: "+", label: "Markets worldwide" },
    { value: 100, suffix: "+", label: "Acres of automated manufacturing" },
  ];

  const counters = stats.map((s, i) => ({
    ...s,
    count: useCountUp(s.value, 2000, inView),
    delay: i * 200,
  }));

  return (
    <section ref={ref} style={{ padding: "2.5rem 0", background: "#fff" }}>
      <div className="widescreen-boxed" style={{ maxWidth: "1800px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {/* Left column */}
          <div style={{ flex: "1 1 50%", minWidth: "300px" }}>
            <p
              className={inView ? "animate-fade-in-up delay-0" : "opacity-0"}
              style={{
                fontSize: "10px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(27,27,28,0.5)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              Disrupting across industries
            </p>
            <h2
              className={inView ? "animate-fade-in-up delay-200" : "opacity-0"}
              style={{
                fontSize: "clamp(2rem, 3vw, 3rem)",
                fontWeight: 400,
                lineHeight: "100%",
                fontFamily: "'DM Sans', sans-serif",
                color: "#1B1B1C",
                paddingRight: "100px",
                marginBottom: "1.5rem",
              }}
            >
              Tomorrow Reimagined
            </h2>
            <div className={inView ? "animate-fade-in-up delay-400" : "opacity-0"}>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.02rem",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#1B1B1C",
                  marginBottom: "1rem",
                }}
              >
                We wake up everyday to <strong>reimagine tomorrow</strong>. Where categories are stagnant and the next generation of consumers demand more, we are there. We relentlessly reimagine the future, engineering products and brands that completely redefine what's possible.
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.02rem",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#1B1B1C",
                  marginBottom: "1rem",
                }}
              >
                Founded in 2003, Velvet Kids Group has rapidly grown and now spans three core divisions — Velvet Toys, Velvet Edge (consumer goods) and Velvet Tech (construction).
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.02rem",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#1B1B1C",
                }}
              >
                Known for its <strong>cutting-edge software</strong> and <strong>world-leading automation</strong> and manufacturing systems, Velvet Kids has over 5,000 team members in over 30 global locations, making it perfectly placed to continue building its reputation as one of the fastest-growing and most disruptive companies in the world.
              </p>
            </div>

            {/* Stats row (left column) */}
            <div
              className={inView ? "animate-fade-in-up delay-600" : "opacity-0"}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginTop: "2rem",
              }}
            >
              {counters.map((stat, i) => (
                <div key={i} style={{ flex: "1 1 40%" }}>
                  <p
                    className="counter-number"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 69px)",
                      fontWeight: 300,
                      color: "#1B1B1C",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1,
                      marginBottom: "5px",
                    }}
                  >
                    {stat.count}{stat.suffix}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 300,
                      letterSpacing: "0.02rem",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#1B1B1C",
                      borderTop: "1px solid rgba(27,27,28,0.15)",
                      paddingTop: "5px",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column (duplicated stats for desktop) */}
          <div style={{ flex: "1 1 50%", minWidth: "300px", display: "none", flexDirection: "column", gap: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {counters.map((stat, i) => (
                <div key={i} style={{ flex: "1 1 40%" }}>
                  <p
                    className="counter-number"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 69px)",
                      fontWeight: 300,
                      color: "#1B1B1C",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: 1,
                      marginBottom: "5px",
                    }}
                  >
                    {stat.count}{stat.suffix}
                  </p>
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 300,
                      letterSpacing: "0.02rem",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#1B1B1C",
                      paddingTop: "5px",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Division Section (Edge / Toys / Tech) ──────────────────────────────────
function DivisionSection({
  subtitle,
  title,
  description,
  ctaText,
  ctaLink,
  image,
  reverse,
}: {
  subtitle: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  reverse?: boolean;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="sticky-division"
      style={{
        position: "sticky",
        top: 0,
        minHeight: "85vh",
        padding: 0,
        background: "#fff",
      }}
    >
      <div className="widescreen-boxed" style={{ maxWidth: "1800px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: reverse ? "row-reverse" : "row",
            gap: 0,
            minHeight: "85vh",
            flexWrap: "wrap",
          }}
        >
          {/* Image side */}
          <div
            className={inView ? "animate-fade-in-up delay-0" : "opacity-0"}
            style={{
              flex: "1 1 50%",
              minHeight: "300px",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "50vh" }}
            />
          </div>

          {/* Content side */}
          <div
            className={inView ? "animate-fade-in-up delay-200" : "opacity-0"}
            style={{
              flex: "1 1 50%",
              background: "#fff",
              border: "1px solid rgba(2,1,1,0.15)",
              borderRadius: "5px",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                color: "rgba(27,27,28,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {subtitle}
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                fontWeight: 400,
                fontFamily: "'DM Sans', sans-serif",
                color: "#1B1B1C",
                lineHeight: "100%",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.02rem",
                fontFamily: "'DM Sans', sans-serif",
                color: "#1B1B1C",
              }}
            >
              {description}
            </p>
            <Link
              to={ctaLink}
              className="animated-underline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.875rem",
                fontWeight: 400,
                fontFamily: "'DM Sans', sans-serif",
                color: "#1B1B1C",
                textDecoration: "none",
                padding: 0,
                background: "none",
                border: "none",
                width: "fit-content",
              }}
            >
              {ctaText}
              <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8.5H17M17 8.5L10.5 2M17 8.5L10.5 15" stroke="#2A2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Come Work With Us Section ──────────────────────────────────────────────
function ComeWorkWithUsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "40px 0", background: "#EEEFEF" }}>
      <div className="widescreen-boxed" style={{ maxWidth: "1800px", margin: "0 auto", padding: "0 40px" }}>
        <div
          className={inView ? "animate-fade-in-up delay-0" : "opacity-0"}
          style={{
            borderRadius: "5px",
            overflow: "hidden",
            textAlign: "center",
            position: "relative",
            padding: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 3vw, 3rem)",
              fontWeight: 400,
              fontFamily: "'DM Sans', sans-serif",
              color: "#1B1B1C",
              lineHeight: "100%",
              marginBottom: "1.5rem",
            }}
          >
            Come work with us
          </h2>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: "150%",
              letterSpacing: "-0.02rem",
              fontFamily: "'DM Sans', sans-serif",
              color: "#1B1B1C",
              maxWidth: "500px",
              margin: "0 auto 2rem",
            }}
          >
            Here at Velvet Kids, we're on a quest to reimagine tomorrow. We're building a team of people who look at things differently, carve their own path and build creative solutions. It's time to do things differently. Are you coming?
          </p>
          <Link
            to="/careers"
            className="animated-underline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.875rem",
              fontWeight: 400,
              fontFamily: "'DM Sans', sans-serif",
              color: "#1B1B1C",
              textDecoration: "none",
            }}
          >
            View Open Roles
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8.5H17M17 8.5L10.5 2M17 8.5L10.5 15" stroke="#2A2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Floating images */}
          <div style={{ position: "relative", marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <ImageWithFallback
              src={img4}
              alt="Team working"
              className="rounded-lg object-cover"
              style={{ width: "280px", height: "380px", objectFit: "cover", borderRadius: "5px" }}
            />
            <ImageWithFallback
              src={img5}
              alt="Team collaboration"
              className="rounded-lg object-cover"
              style={{ width: "280px", height: "380px", objectFit: "cover", borderRadius: "5px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HomePage ────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div>
      <HeroSection />
      <TomorrowReimaginedSection />
      <DivisionSection
        subtitle="Consumer Goods"
        title="Edge"
        description="Velvet Edge is disrupting stale consumer goods categories and building new generation brands to better serve modern consumers. Arguably the fastest-growing consumer goods company in the world today, Velvet Edge has a key focus on building tomorrow's brands across five key verticals—Pet Care, Baby Care, Personal Care & Beauty, Home Care and Health & Wellness."
        ctaText="Visit VELVETEDGE.COM"
        ctaLink="/brands"
        image={img6}
      />
      <DivisionSection
        subtitle=""
        title="Toys"
        description="Inspired by kids and imaginative play, Velvet Toys distributes to all major retailers in over 120 countries and has delighted millions of families all over the world with brands such as Mini Brands™, Fuggler™, Bunch O Balloons™, XSHOT™, Rainbocorns™, Robo Alive™, Smashers™, 5 Surprise™ and Pets Alive™ and partnerships with entertainment properties, including Nickelodeon, Disney, Universal Studios and DreamWorks."
        ctaText="Visit VELVETTOYS.COM"
        ctaLink="/products"
        image={img1}
        reverse
      />
      <DivisionSection
        subtitle="Construction / housing"
        title="Tech"
        description="Velvet Tech is revolutionizing the way the world builds to bring greater flexibility, speed, affordability, quality and sustainability to the construction industry. Ten years in the making, Velvet Tech has reinvented every aspect of the construction process, developing the world's first BIM software that directly connects to fully automated production."
        ctaText="Visit VELVETTECH.COM"
        ctaLink="/about"
        image={img2}
      />
      <ComeWorkWithUsSection />
    </div>
  );
}
