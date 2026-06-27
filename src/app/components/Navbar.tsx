import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Menu, X, Heart } from "lucide-react";
import logoImg from "../../imports/logo.jpeg";
import { ImageWithFallback } from "./ImageWithFallback";
import { brandService } from '../services/brandService';

export function Navbar() {
  const [brands, setBrands] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerHidden, setHeaderHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ac = new AbortController();
    brandService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) setBrands(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 100) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-transform duration-300"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(3px)",
          borderBottom: "1px solid rgba(27,27,28,0.15)",
          transform: headerHidden ? "translateY(-110px)" : "translateY(0)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8" style={{ maxWidth: "1440px", padding: "0 40px" }}>
          <div className="flex items-center justify-between" style={{ minHeight: "50px" }}>
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" style={{ padding: "0.5rem 1rem 0.5rem 0" }}>
              <ImageWithFallback src={logoImg} alt="Velvet Kids" className="h-8 w-auto object-contain" />
            </Link>

            {/* Desktop center nav */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/products" className="text-sm font-normal text-foreground hover:text-primary transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Toys
              </Link>
              <Link to="/brands" className="text-sm font-normal text-foreground hover:text-primary transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Edge
              </Link>
              <Link to="/about" className="text-sm font-normal text-foreground hover:text-primary transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Tech
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3" style={{ justifyContent: "flex-end" }}>
              <Link to="/careers" className="hidden lg:block text-sm font-normal text-foreground hover:text-primary transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Careers
              </Link>
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="border border-gray-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-primary w-48 lg:w-64"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                  <button type="submit" className="p-1.5 text-gray-600 hover:text-primary">
                    <Search size={18} />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <>
                  <button onClick={() => setSearchOpen(true)} className="p-2 text-foreground hover:text-primary transition-colors" aria-label="Search">
                    <Search size={20} />
                  </button>
                  <button className="p-2 text-foreground hover:text-primary transition-colors hidden lg:block" aria-label="Wishlist">
                    <Heart size={20} />
                  </button>
                  <button
                    className="lg:hidden p-2 text-foreground"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                  >
                    {menuOpen ? <X size={22} /> : (
                      <svg width="22" height="22" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="1" width="13" height="1.5" fill="currentColor"/>
                        <rect y="6" width="13" height="1.5" fill="currentColor"/>
                        <rect y="11" width="13" height="1.5" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu popup */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md lg:hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <ImageWithFallback src={logoImg} alt="Velvet Kids" className="h-8 w-auto object-contain" />
              </Link>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-foreground">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.82837" y="0.100525" width="26" height="3" rx="1.5" transform="rotate(45 2.82837 0.100525)" fill="#1B1B1C"/>
                  <rect x="21.2139" y="2.82861" width="26" height="3" rx="1.5" transform="rotate(135 21.2139 2.82861)" fill="#1B1B1C"/>
                </svg>
              </button>
            </div>
            <div className="px-6 py-8 space-y-6">
              <Link to="/careers" className="block text-lg text-foreground font-normal" onClick={() => setMenuOpen(false)}>Careers</Link>
              <Link to="/open-roles" className="block text-lg text-foreground font-normal" onClick={() => setMenuOpen(false)}>Open Roles</Link>
              <Link to="/internships" className="block text-lg text-foreground font-normal" onClick={() => setMenuOpen(false)}>Internships</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
