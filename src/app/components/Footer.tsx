import { Link } from "react-router";
import logoImg from "../../imports/logo.jpeg";

export function Footer() {
  return (
    <footer style={{ background: "#1B1B1C", color: "#fff" }}>
      {/* Top row: Logo + Links */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <Link to="/">
          <img src={logoImg} alt="Velvet Kids" style={{ height: "51px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <Link
            to="/careers"
            style={{
              color: "#D6001C",
              textDecoration: "none",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Careers
          </Link>
          <a
            href="#"
            style={{
              color: "#D6001C",
              textDecoration: "none",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Linked.In
          </a>
          <a
            href="#"
            style={{
              color: "#D6001C",
              textDecoration: "none",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            @lifeatvelvet
          </a>
        </div>
      </div>

      {/* Bottom row: Copyright + Policy links */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "12px",
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Velvet Kids 2026 &copy; All rights reserved. All audio, visual and textual content on this site (including all names, characters, images, trademarks and logos) are protected by trademarks, copyrights and other Intellectual Property rights owned by Velvet Kids&trade; or its subsidiaries, licensors, licensees, suppliers and accounts.
          </p>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/privacy" style={{ color: "#D6001C", textDecoration: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              Privacy
            </Link>
            <Link to="/terms" style={{ color: "#D6001C", textDecoration: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              Terms of Use
            </Link>
            <a href="#" style={{ color: "#D6001C", textDecoration: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              Patents
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
