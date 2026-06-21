import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Menu, X, ChevronDown, Heart } from "lucide-react";
import logoImg from "../../imports/logo.jpeg";
import { ImageWithFallback } from "./ImageWithFallback";
import { brandService } from '../services/brandService';

export function Navbar() {
  const [brands, setBrands] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ac = new AbortController();
    brandService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) setBrands(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

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
      {/* Announcement bar */}
      <div style={{ backgroundColor: "#0d1b4b" }} className="text-white text-center py-2 px-4 text-sm">
        <span>🎉 Free shipping on orders over $50 · </span>
        <span className="font-semibold">Summer Sale — Up to 40% OFF!</span>
      </div>

      {/* Main nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <ImageWithFallback src={logoImg} alt="Velvet Kids" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Brands dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setBrandsOpen(true)}
                onMouseLeave={() => setBrandsOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-800 hover:text-[#e8174b] transition-colors py-6">
                  <span className="font-semibold">Our Brands</span>
                  <ChevronDown size={16} className={`transition-transform ${brandsOpen ? "rotate-180" : ""}`} />
                </button>

                {brandsOpen && (
                  <div className="absolute top-full left-0 bg-white shadow-2xl rounded-b-xl border-t-2 border-[#e8174b] w-[700px] p-6 grid grid-cols-3 gap-2 z-50">
                    {brands.map(b => (
                      <Link
                        key={b.id}
                        to={`/brands/${b.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        onClick={() => setBrandsOpen(false)}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: b.color }}
                        />
                        <span className="text-gray-700 group-hover:text-[#e8174b] transition-colors text-sm font-medium">{b.name}</span>
                      </Link>
                    ))}
                    <div className="col-span-3 border-t border-gray-100 mt-2 pt-4">
                      <Link
                        to="/brands"
                        className="text-[#e8174b] font-semibold text-sm hover:underline"
                        onClick={() => setBrandsOpen(false)}
                      >
                        View All Brands →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/products" className="font-semibold text-gray-800 hover:text-[#e8174b] transition-colors">
                Products
              </Link>
              <Link to="/about" className="font-semibold text-gray-800 hover:text-[#e8174b] transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="font-semibold text-gray-800 hover:text-[#e8174b] transition-colors">
                Contact
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search toys, brands..."
                    className="border border-gray-300 rounded-full px-4 py-1.5 text-sm outline-none focus:border-[#e8174b] w-48 lg:w-64"
                  />
                  <button type="submit" className="p-1.5 text-gray-600 hover:text-[#e8174b]">
                    <Search size={18} />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <>
                  <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-700 hover:text-[#e8174b] transition-colors" aria-label="Search">
                    <Search size={20} />
                  </button>
                  <button className="p-2 text-gray-700 hover:text-[#e8174b] transition-colors hidden lg:block" aria-label="Wishlist">
                    <Heart size={20} />
                  </button>
                  <Link to="/admin" className="hidden lg:flex items-center gap-1.5 bg-[#0d1b4b] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e8174b] transition-colors">
                    Admin
                  </Link>
                  <button
                    className="lg:hidden p-2 text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                  >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <Link to="/" className="block py-2 text-gray-800 font-semibold" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/brands" className="block py-2 text-gray-800 font-semibold" onClick={() => setMenuOpen(false)}>Our Brands</Link>
            <Link to="/products" className="block py-2 text-gray-800 font-semibold" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/about" className="block py-2 text-gray-800 font-semibold" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="block py-2 text-gray-800 font-semibold" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/admin" className="block py-2 text-[#e8174b] font-semibold" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
          </div>
        )}
      </nav>
    </>
  );
}
