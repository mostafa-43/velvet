import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { brandService } from '../services/brandService';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import { ProductCard } from "../components/ProductCard";

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get("filter") || "");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ac = new AbortController();
    brandService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) setBrands(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    categoryService.getAll(ac.signal).then(data => {
      if (!ac.signal.aborted) setCategories(data);
    }).catch(() => {});
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (selectedBrand) params.brandId = selectedBrand;
        if (selectedCategory) {
          const cat = categories.find(c => c.slug === selectedCategory);
          if (cat) params.categoryId = cat.id;
        }
        if (selectedFilter) params.filter = selectedFilter;
        if (sortBy !== 'featured') params.sort = sortBy;
        params.page = page;
        params.limit = 12;
        const result = await productService.getAll(params, ac.signal);
        if (!ac.signal.aborted) {
          setProductsData(result.products);
          setTotal(result.total);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setProductsData([]);
          setTotal(0);
          setTotalPages(0);
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [search, selectedBrand, selectedCategory, selectedFilter, sortBy, page]);

  const clearFilters = () => {
    setSearch(""); setSelectedBrand(""); setSelectedCategory("");
    setSelectedFilter(""); setSortBy("featured"); setPage(1);
  };

  const activeFilterCount = [search, selectedBrand, selectedCategory, selectedFilter].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ backgroundColor: "#0d1b4b" }} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-2">Discover</p>
          <h1 className="text-white mb-2" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            All Products
          </h1>
          <p className="text-white/60 text-sm">{total} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 flex-1 min-w-52">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent outline-none text-sm flex-1 text-gray-800"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Brand filter */}
          <div className="relative">
            <select
              value={selectedBrand}
              onChange={e => { setSelectedBrand(e.target.value); setPage(1); }}
              className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2.5 pr-8 text-sm text-gray-700 outline-none cursor-pointer"
            >
              <option value="">All Brands</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); setPage(1); }}
              className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2.5 pr-8 text-sm text-gray-700 outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Special filters */}
          <div className="flex gap-2">
            {[["", "All"], ["new", "New"], ["trending", "🔥 Trending"], ["sale", "Sale"], ["featured", "Featured"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setSelectedFilter(val); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  selectedFilter === val
                    ? "bg-[#e8174b] border-[#e8174b] text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#e8174b] hover:text-[#e8174b]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2.5 pr-8 text-sm text-gray-700 outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-[#e8174b] font-semibold hover:text-red-700">
              <X size={14} /> Clear ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-24 text-gray-400">
            <p className="font-semibold">Loading products...</p>
          </div>
        ) : productsData.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-semibold text-lg">No products match your filters.</p>
            <button onClick={clearFilters} className="mt-4 text-[#e8174b] font-semibold text-sm">Clear all filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {productsData.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 disabled:opacity-40 hover:border-[#e8174b] hover:text-[#e8174b] transition-colors"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full border text-sm font-semibold transition-colors ${
                      page === p
                        ? "bg-[#e8174b] border-[#e8174b] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#e8174b] hover:text-[#e8174b]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 disabled:opacity-40 hover:border-[#e8174b] hover:text-[#e8174b] transition-colors"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
