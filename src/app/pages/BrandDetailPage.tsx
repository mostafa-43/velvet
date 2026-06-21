import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { brandService } from '../services/brandService';
import { productService } from '../services/productService';
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function BrandDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [brand, setBrand] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const allBrands = await brandService.getAll(ac.signal);
        if (ac.signal.aborted) return;
        const found = allBrands.find(b => b.slug === slug);
        if (found) {
          setBrand(found);
          const result = await productService.getAll({ brandId: found.id }, ac.signal);
          if (!ac.signal.aborted) setBrandProducts(result.products || []);
        } else {
          setBrand(null);
        }
      } catch (err) {
        if (err.name !== 'AbortError') setBrand(null);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [slug]);

  if (!brand && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">😕</p>
        <h2 className="text-2xl font-black text-[#0d1b4b]">Brand not found</h2>
        <Link to="/brands" className="text-[#e8174b] font-semibold flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Brands
        </Link>
      </div>
    );
  }

  if (!brand) return null;

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
        <ImageWithFallback
          src={brand.heroImage}
          alt={brand.name}
          className="w-full h-full object-cover absolute inset-0"
          style={{ minHeight: "500px" } as CSSProperties}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${brand.color}f2 0%, ${brand.color}88 50%, transparent 80%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-end pb-16 pt-32" style={{ minHeight: "500px" }}>
          <Link to="/brands" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors w-fit">
            <ArrowLeft size={16} /> All Brands
          </Link>
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">{brand.tagline}</p>
          <h1
            className="text-white mb-4 leading-none"
            style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            {brand.name}
          </h1>
          <p className="text-white/80 text-base max-w-lg mb-6">{brand.description}</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/products"
              className="bg-white text-gray-900 font-bold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              Shop All Products
            </Link>
            <span className="bg-white/20 text-white font-bold px-6 py-3 rounded-full text-sm border border-white/30">
              {brand.productCount} Products
            </span>
          </div>
        </div>
      </div>

      {/* Brand story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-bold text-sm uppercase tracking-widest mb-3" style={{ color: brand.color }}>
                The Story
              </p>
              <h2 className="text-[#0d1b4b] mb-5" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Why Kids Love {brand.name}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                {brand.name} was born from a simple belief: play should be boundless. We create toys that challenge, inspire, and delight — building memories that last a lifetime.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Every product in the {brand.name} range is crafted with premium materials, tested for safety, and designed to grow with your child's imagination.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[["100%", "Safe Materials"], ["Ages 3+", "For All Kids"], ["Award", "Winning Design"]].map(([val, label]) => (
                  <div key={label} className="text-center p-4 rounded-xl" style={{ backgroundColor: brand.color + "15" }}>
                    <p className="font-black text-lg" style={{ color: brand.color }}>{val}</p>
                    <p className="text-xs text-gray-600 font-semibold mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src={brand.heroImage}
                alt={`${brand.name} showcase`}
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-bold text-sm uppercase tracking-widest mb-2" style={{ color: brand.color }}>
                The Range
              </p>
              <h2 className="text-[#0d1b4b] leading-none" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                {brand.name} Products
              </h2>
            </div>
          </div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {brandProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 font-semibold">Products coming soon for this brand.</p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-1.5 text-[#e8174b] font-semibold text-sm">
                Browse All Products <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other brands CTA */}
      <section className="py-14" style={{ backgroundColor: "#0d1b4b" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h3 className="text-white text-2xl font-black mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Explore More Brands
          </h3>
          <p className="text-white/60 text-sm mb-6">Each brand is a new world of play waiting to be discovered.</p>
          <Link to="/brands" className="inline-flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm">
            View All Brands <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
