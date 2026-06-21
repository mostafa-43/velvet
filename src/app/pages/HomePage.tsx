import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Play, ArrowRight, Star } from "lucide-react";
import { brandService } from '../services/brandService';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import { bannerService } from '../services/bannerService';
import { videoService } from '../services/videoService';
import { newsletterService } from '../services/newsletterService';
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/ImageWithFallback";

// ─── Hero Slider ────────────────────────────────────────────────────────────
function HeroSlider() {
  const [banners, setBanners] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelected(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  useEffect(() => {
    const ac = new AbortController();
    bannerService.getActive(ac.signal).then(data => {
      if (!ac.signal.aborted) setBanners(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(420px, 60vw, 700px)" }}>
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {banners.map(banner => (
            <div key={banner.id} className="flex-[0_0_100%] relative h-full">
              <ImageWithFallback
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to right, ${banner.bgColor}dd 0%, ${banner.bgColor}88 50%, transparent 100%)` }}
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 lg:px-16 max-w-3xl">
                <p className="text-white/70 text-sm uppercase tracking-widest font-semibold mb-3">Velvet Kids — Play Reimagined</p>
                <h1
                  className="text-white mb-4 leading-none"
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  }}
                >
                  {banner.title}
                </h1>
                <p className="text-white/80 text-base lg:text-lg mb-8 max-w-xl">{banner.subtitle}</p>
                <div className="flex items-center gap-4">
                  <Link
                    to={banner.ctaLink}
                    className="bg-[#e8174b] hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wide"
                  >
                    {banner.ctaText}
                  </Link>
                  <Link to="/brands" className="text-white font-semibold flex items-center gap-1.5 hover:gap-3 transition-all text-sm">
                    View All Brands <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10">
        <ChevronLeft size={22} />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all ${i === selected ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Category Strip ──────────────────────────────────────────────────────────
function CategoryStrip() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    categoryService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) setCategories(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <section className="bg-white border-b border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform"
                style={{ backgroundColor: cat.color + "20" }}
              >
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-[#e8174b] transition-colors whitespace-nowrap">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Brands ─────────────────────────────────────────────────────────
function FeaturedBrands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    brandService.getFeatured(ac.signal).then(data => {
      if (!ac.signal.aborted) setBrands(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#e8174b] font-bold text-sm uppercase tracking-widest mb-2">Our World</p>
            <h2 className="text-[#0d1b4b] leading-none" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Featured Brands
            </h2>
          </div>
          <Link to="/brands" className="hidden md:flex items-center gap-1.5 text-[#0d1b4b] font-semibold hover:text-[#e8174b] transition-colors text-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {brands.map((brand, i) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.slug}`}
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ minHeight: i === 0 ? "400px" : "180px" }}
            >
              <ImageWithFallback
                src={brand.heroImage}
                alt={brand.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${brand.color}ee 0%, transparent 60%)` }}
              />
              <div className="absolute bottom-0 left-0 p-5">
                <h3
                  className="text-white mb-1"
                  style={{ fontFamily: "'Fredoka One', cursive", fontSize: i === 0 ? "2rem" : "1.25rem" }}
                >
                  {brand.name}
                </h3>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{brand.productCount} Products</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link to="/brands" className="inline-flex items-center gap-1.5 text-[#0d1b4b] font-semibold hover:text-[#e8174b] transition-colors text-sm">
            View All Brands <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Trending Products ────────────────────────────────────────────────────────
function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    productService.getTrending(ac.signal).then(data => {
      if (!ac.signal.aborted) setProducts(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#e8174b] font-bold text-sm uppercase tracking-widest mb-2">🔥 What's Hot</p>
            <h2 className="text-[#0d1b4b] leading-none" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Trending Now
            </h2>
          </div>
          <Link to="/products?filter=trending" className="hidden md:flex items-center gap-1.5 text-[#0d1b4b] font-semibold hover:text-[#e8174b] transition-colors text-sm">
            See More <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Brand Showcase (ZURU-style full-bleed sections) ──────────────────────────
function BrandShowcase() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    brandService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) setBrands(data.slice(0, 3));
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <section className="space-y-0">
      {brands.map((brand, i) => (
        <div
          key={brand.id}
          className="relative overflow-hidden"
          style={{ minHeight: "420px" }}
        >
          <ImageWithFallback
            src={brand.heroImage}
            alt={brand.name}
            className="w-full h-full object-cover absolute inset-0"
            style={{ minHeight: "420px" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: i % 2 === 0
                ? `linear-gradient(to right, ${brand.color}f0 0%, ${brand.color}88 45%, transparent 70%)`
                : `linear-gradient(to left, ${brand.color}f0 0%, ${brand.color}88 45%, transparent 70%)`,
            }}
          />
          <div
            className={`relative h-full flex flex-col justify-end pb-12 px-8 lg:px-16 max-w-7xl mx-auto ${i % 2 !== 0 ? "items-end text-right" : ""}`}
            style={{ minHeight: "420px" }}
          >
            <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-3">{brand.tagline}</p>
            <h2
              className="text-white mb-4 leading-none max-w-xl"
              style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {brand.name}
            </h2>
            <p className="text-white/80 text-sm mb-6 max-w-md">{brand.description}</p>
            <Link
              to={`/brands/${brand.slug}`}
              className="inline-flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm uppercase tracking-wide w-fit"
            >
              View Range <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── New Releases ─────────────────────────────────────────────────────────────
function NewReleases() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ac = new AbortController();
    productService.getNew(ac.signal).then(data => {
      if (!ac.signal.aborted) setProducts(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#0d1b4b" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-2">Just Arrived</p>
            <h2 className="text-white leading-none" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              New Releases
            </h2>
          </div>
          <Link to="/products?filter=new" className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm font-semibold">
            See All New <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-[#f5a623] font-bold uppercase tracking-wider">{product.brandName}</span>
                <h3 className="text-white font-bold text-sm mt-1 mb-2 leading-snug">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-lg">${product.price.toFixed(2)}</span>
                  <span className="bg-[#0a9c8e] text-white text-xs font-bold px-2 py-0.5 rounded-full">NEW</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Video Showcase ───────────────────────────────────────────────────────────
function VideoShowcase() {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    videoService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) {
        setVideos(data);
        if (data.length > 0) setActiveVideo(data[0]);
      }
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  if (!activeVideo) return null;

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#e8174b] font-bold text-sm uppercase tracking-widest mb-2">Watch & Play</p>
            <h2 className="text-[#0d1b4b] leading-none" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Video Showcase
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured video */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
              <ImageWithFallback
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-[#e8174b] hover:bg-red-600 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110">
                  <Play size={24} className="text-white fill-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black to-transparent">
                <p className="text-[#f5a623] text-xs font-bold uppercase tracking-wider">{activeVideo.brand}</p>
                <h3 className="text-white font-bold text-lg">{activeVideo.title}</h3>
                <div className="flex gap-3 mt-1 text-white/60 text-xs">
                  <span>{activeVideo.views} views</span>
                  <span>•</span>
                  <span>{activeVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video list */}
          <div className="space-y-3">
            {videos.map(video => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`w-full flex gap-3 p-3 rounded-xl border transition-all text-left ${
                  activeVideo.id === video.id
                    ? "border-[#e8174b] bg-red-50"
                    : "border-transparent hover:bg-gray-100"
                }`}
              >
                <div className="relative rounded-lg overflow-hidden flex-shrink-0 w-24 aspect-video">
                  <ImageWithFallback src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 bg-black/50 rounded-full flex items-center justify-center">
                      <Play size={12} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{video.duration}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#e8174b] text-xs font-bold uppercase tracking-wider">{video.brand}</p>
                  <p className="text-gray-800 font-semibold text-sm leading-snug mt-0.5 line-clamp-2">{video.title}</p>
                  <p className="text-gray-400 text-xs mt-1">{video.views} views</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { value: "8+", label: "Premium Brands" },
    { value: "400+", label: "Products" },
    { value: "50+", label: "Countries" },
    { value: "2M+", label: "Happy Kids" },
  ];

  return (
    <section className="bg-[#e8174b] py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map(stat => (
            <div key={stat.label}>
              <p className="text-4xl lg:text-5xl font-black mb-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
                {stat.value}
              </p>
              <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-[#0d1b4b] mb-3" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          Get Exclusive Deals
        </h2>
        <p className="text-gray-500 text-base mb-8">
          Subscribe for early access to new launches, special discounts, and play inspiration straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-[#0a9c8e]/10 border border-[#0a9c8e]/30 rounded-2xl p-8 text-[#0a9c8e]">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-bold text-lg">You're in! Welcome to the Velvet Kids family.</p>
          </div>
        ) : (
          <form
            onSubmit={async e => {
              e.preventDefault();
              if (email) {
                try {
                  await newsletterService.subscribe(email);
                  setSubmitted(true);
                } catch {}
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border-2 border-gray-200 focus:border-[#e8174b] rounded-full px-5 py-3 outline-none text-sm transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-[#e8174b] hover:bg-red-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}
        <p className="text-gray-400 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div>
      <HeroSlider />
      <CategoryStrip />
      <FeaturedBrands />
      <TrendingProducts />
      <BrandShowcase />
      <StatsBanner />
      <NewReleases />
      <VideoShowcase />
      <NewsletterSection />
    </div>
  );
}
