import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, ShoppingCart, Heart, ArrowLeft, Play, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { products, brands } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">😕</p>
        <h2 className="text-2xl font-black text-[#0d1b4b]">Product not found</h2>
        <Link to="/products" className="text-[#e8174b] font-semibold flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Products
        </Link>
      </div>
    );
  }

  const brand = brands.find(b => b.id === product.brandId);
  const related = products.filter(p => p.brandId === product.brandId && p.id !== product.id).slice(0, 4);
  const allImages = [product.image, ...product.images.filter(img => img !== product.image)];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#e8174b]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#e8174b]">Products</Link>
          <span>/</span>
          {brand && <Link to={`/brands/${brand.slug}`} className="hover:text-[#e8174b]">{brand.name}</Link>}
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-48">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 mb-3 aspect-square">
              <ImageWithFallback
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-[#0a9c8e] text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-[#e8174b] text-white text-sm font-bold px-3 py-1 rounded-full">-{discount}%</span>
              )}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => Math.max(0, i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow text-gray-700 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => Math.min(allImages.length - 1, i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow text-gray-700 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0 ${i === selectedImage ? "border-[#e8174b]" : "border-transparent"}`}
                  >
                    <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {brand && (
              <Link to={`/brands/${brand.slug}`} className="inline-flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: brand.color + "20", color: brand.color }}
                >
                  {brand.name}
                </span>
              </Link>
            )}

            <h1 className="text-[#0d1b4b] font-black text-2xl lg:text-3xl mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "text-[#f5a623] fill-[#f5a623]" : "text-gray-200 fill-gray-200"}
                  />
                ))}
              </div>
              <span className="text-gray-700 font-semibold text-sm">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[#0d1b4b] font-black" style={{ fontSize: "2rem" }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-lg">${product.originalPrice.toFixed(2)}</span>
              )}
              {discount && (
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-full">Save {discount}%</span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-[#0d1b4b] text-sm mb-3 uppercase tracking-wide">What's Included</h3>
              <ul className="space-y-2">
                {product.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={15} className="text-[#0a9c8e] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta */}
            <div className="flex gap-4 mb-8 text-sm">
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex-1 text-center">
                <p className="text-gray-400 text-xs mb-0.5">Age Range</p>
                <p className="font-bold text-[#0d1b4b]">{product.ageRange} years</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex-1 text-center">
                <p className="text-gray-400 text-xs mb-0.5">Category</p>
                <p className="font-bold text-[#0d1b4b]">{product.categoryName}</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex-1 text-center">
                <p className="text-gray-400 text-xs mb-0.5">Stock</p>
                <p className={`font-bold ${product.inStock ? "text-[#0a9c8e]" : "text-[#e8174b]"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 hover:text-[#e8174b] font-bold transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-gray-800">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-600 hover:text-[#e8174b] font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-full text-sm transition-all ${
                  added
                    ? "bg-[#0a9c8e] text-white"
                    : product.inStock
                    ? "bg-[#0d1b4b] hover:bg-[#e8174b] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>

              <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#e8174b] hover:border-[#e8174b] transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Video section */}
        {product.videoUrl && (
          <section className="mt-16">
            <h2 className="text-[#0d1b4b] font-black text-2xl mb-6" style={{ fontFamily: "'Fredoka One', cursive" }}>
              See It in Action
            </h2>
            <div className="rounded-2xl overflow-hidden aspect-video bg-black max-w-2xl relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-[#e8174b] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <Play size={24} className="text-white fill-white ml-1" />
                </button>
              </div>
              <ImageWithFallback src={product.image} alt="Video thumbnail" className="w-full h-full object-cover opacity-50" />
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-[#0d1b4b] font-black text-2xl mb-6" style={{ fontFamily: "'Fredoka One', cursive" }}>
              More from {brand?.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
