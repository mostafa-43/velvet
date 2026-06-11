import { useState } from "react";
import { Link } from "react-router";
import { Search, ArrowRight } from "lucide-react";
import { brands } from "../data/mockData";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function BrandsPage() {
  const [search, setSearch] = useState("");

  const filtered = brands.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ backgroundColor: "#0d1b4b" }} className="py-20 px-4 text-center">
        <p className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-3">Our Universe</p>
        <h1 className="text-white mb-4" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Our Brands
        </h1>
        <p className="text-white/70 text-base max-w-xl mx-auto">
          Each brand brings a unique world of play. Explore premium toy lines crafted for imagination, adventure, and discovery.
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 max-w-sm mx-auto mt-8">
          <Search size={16} className="text-white/50" />
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white placeholder:text-white/50 outline-none text-sm flex-1"
          />
        </div>
      </div>

      {/* Brand grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-semibold">No brands found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(brand => (
              <Link
                key={brand.id}
                to={`/brands/${brand.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-44">
                  <ImageWithFallback
                    src={brand.heroImage}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${brand.color}cc 0%, transparent 60%)` }}
                  />
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.productCount} Products
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-[#0d1b4b] font-black text-lg mb-1">{brand.name}</h3>
                  <p className="text-[#e8174b] text-xs font-bold uppercase tracking-wider mb-3">{brand.tagline}</p>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{brand.description}</p>
                  <div
                    className="flex items-center gap-1.5 font-bold text-sm transition-colors"
                    style={{ color: brand.color }}
                  >
                    Explore Brand <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
