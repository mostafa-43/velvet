import { Link } from "react-router";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "../data/mockData";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/products/${product.id}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-[#0a9c8e] text-white text-xs font-bold px-2.5 py-1 rounded-full">NEW</span>
          )}
          {discount && (
            <span className="bg-[#e8174b] text-white text-xs font-bold px-2.5 py-1 rounded-full">-{discount}%</span>
          )}
          {product.isTrending && !product.isNew && (
            <span className="bg-[#f5a623] text-white text-xs font-bold px-2.5 py-1 rounded-full">🔥 HOT</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-[#e8174b] shadow-sm opacity-0 group-hover:opacity-100 transition-all"
          onClick={e => { e.preventDefault(); }}
          aria-label="Add to wishlist"
        >
          <Heart size={15} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-bold text-sm px-4 py-2 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{product.brandName}</p>
        <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? "text-[#f5a623] fill-[#f5a623]" : "text-gray-200 fill-gray-200"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-[#0d1b4b]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="w-8 h-8 bg-[#0d1b4b] hover:bg-[#e8174b] text-white rounded-full flex items-center justify-center transition-colors"
            onClick={e => { e.preventDefault(); }}
            aria-label="Add to cart"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
