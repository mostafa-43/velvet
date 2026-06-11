import { useState } from "react";
import {
  LayoutDashboard, Package, Tag, Image, BarChart2, Settings,
  Plus, Search, Edit2, Trash2, Eye, Upload, ChevronDown,
  TrendingUp, ShoppingBag, Users, DollarSign, Bell, LogOut, X
} from "lucide-react";
import { products, brands, categories } from "../data/mockData";
import { ImageWithFallback } from "../components/ImageWithFallback";
import logoImg from "../../imports/logo.jpeg";

type AdminTab = "dashboard" | "products" | "brands" | "categories" | "media" | "homepage" | "settings";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: AdminTab; setActive: (t: AdminTab) => void }) {
  const navItems: { id: AdminTab; icon: React.ReactNode; label: string }[] = [
    { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { id: "products", icon: <Package size={18} />, label: "Products" },
    { id: "brands", icon: <Tag size={18} />, label: "Brands" },
    { id: "categories", icon: <BarChart2 size={18} />, label: "Categories" },
    { id: "media", icon: <Image size={18} />, label: "Media Library" },
    { id: "homepage", icon: <LayoutDashboard size={18} />, label: "Homepage" },
    { id: "settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <div className="w-60 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 border-b border-gray-100">
        <img src={logoImg} alt="Velvet Kids" className="h-8 w-auto object-contain" />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              active === item.id
                ? "bg-[#0d1b4b] text-white"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
          <Eye size={18} /> View Site
        </a>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────
function DashboardOverview() {
  const stats = [
    { label: "Total Revenue", value: "$48,230", change: "+12.5%", icon: <DollarSign size={20} />, color: "#0a9c8e" },
    { label: "Orders Today", value: "124", change: "+8.3%", icon: <ShoppingBag size={20} />, color: "#2255cc" },
    { label: "Active Products", value: "412", change: "+3", icon: <Package size={20} />, color: "#e8174b" },
    { label: "Total Users", value: "8,741", change: "+145", icon: <Users size={20} />, color: "#8a5dca" },
  ];

  const recentOrders = [
    { id: "#ORD-4821", customer: "Amira Khalil", product: "BrickWorld City Mega Set", amount: "$89.99", status: "Delivered" },
    { id: "#ORD-4820", customer: "Tom Baker", product: "TurboRace Max Pro 4WD", amount: "$129.99", status: "Processing" },
    { id: "#ORD-4819", customer: "Zara Patel", product: "MiniWorld Mystery Ball", amount: "$14.99", status: "Shipped" },
    { id: "#ORD-4818", customer: "Lucas Martin", product: "StarDolls Fashion House", amount: "$49.99", status: "Delivered" },
    { id: "#ORD-4817", customer: "Emma Chen", product: "RoboKids Starter Bot", amount: "$79.99", status: "Pending" },
  ];

  const statusColors: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.color + "20", color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-black text-[#0d1b4b]">{stat.value}</p>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-black text-[#0d1b4b]">Recent Orders</h3>
          <button className="text-[#e8174b] text-xs font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-bold text-[#0d1b4b]">{order.id}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-3.5 text-sm text-gray-600 max-w-xs truncate">{order.product}</td>
                  <td className="px-6 py-3.5 text-sm font-bold text-[#0d1b4b]">{order.amount}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button className="text-gray-400 hover:text-[#0d1b4b] p-1"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Products Management ──────────────────────────────────────────────────────
function ProductsManagement() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brandName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Products ({products.length})</h2>
        <button className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 max-w-sm">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 text-gray-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Tags</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800 max-w-36 truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.brandName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.categoryName}</td>
                  <td className="px-4 py-3 text-sm font-bold text-[#0d1b4b]">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {p.inStock ? "In Stock" : "Out"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {p.isNew && <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>}
                      {p.isTrending && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.5 rounded">HOT</span>}
                      {p.isFeatured && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded">FEAT</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 text-gray-400 hover:text-[#2255cc] hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="w-7 h-7 text-gray-400 hover:text-[#0a9c8e] hover:bg-teal-50 rounded-lg flex items-center justify-center transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button className="w-7 h-7 text-gray-400 hover:text-[#e8174b] hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Brands Management ────────────────────────────────────────────────────────
function BrandsManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Brands ({brands.length})</h2>
        <button className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16} /> Add Brand
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map(brand => (
          <div key={brand.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-28 relative overflow-hidden">
              <ImageWithFallback src={brand.heroImage} alt={brand.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${brand.color}cc, transparent)` }} />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-black text-[#0d1b4b]">{brand.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{brand.productCount} products</p>
                </div>
                <div className="flex gap-1">
                  <button className="w-7 h-7 text-gray-400 hover:text-[#0a9c8e] hover:bg-teal-50 rounded-lg flex items-center justify-center">
                    <Edit2 size={14} />
                  </button>
                  <button className="w-7 h-7 text-gray-400 hover:text-[#e8174b] hover:bg-red-50 rounded-lg flex items-center justify-center">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 line-clamp-1">{brand.tagline}</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: brand.color }} />
                <span className="text-xs text-gray-400">{brand.color}</span>
                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${brand.featured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {brand.featured ? "Featured" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Categories Management ────────────────────────────────────────────────────
function CategoriesManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Categories ({categories.length})</h2>
        <button className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Slug</th>
              <th className="px-6 py-3 text-left">Products</th>
              <th className="px-6 py-3 text-left">Color</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-400 font-mono">/{cat.slug}</td>
                <td className="px-6 py-3.5 text-sm font-bold text-[#0d1b4b]">{cat.productCount}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-gray-400 font-mono">{cat.color}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex gap-1">
                    <button className="w-7 h-7 text-gray-400 hover:text-[#0a9c8e] rounded-lg flex items-center justify-center">
                      <Edit2 size={14} />
                    </button>
                    <button className="w-7 h-7 text-gray-400 hover:text-[#e8174b] rounded-lg flex items-center justify-center">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Media Library ────────────────────────────────────────────────────────────
function MediaLibrary() {
  const mediaItems = [
    { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&h=200&fit=crop&auto=format", name: "brickworld-hero.jpg", size: "2.4 MB" },
    { url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop&auto=format", name: "stardolls-fashion.jpg", size: "1.8 MB" },
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format", name: "turborace-car.jpg", size: "3.1 MB" },
    { url: "https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=200&h=200&fit=crop&auto=format", name: "heroforce-titan.jpg", size: "2.2 MB" },
    { url: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=200&h=200&fit=crop&auto=format", name: "miniworld-ball.jpg", size: "1.5 MB" },
    { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop&auto=format", name: "colorsplash-kit.jpg", size: "2.9 MB" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Media Library</h2>
        <button className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Upload size={16} /> Upload Files
        </button>
      </div>

      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center mb-6 hover:border-[#e8174b] transition-colors cursor-pointer">
        <Upload size={32} className="text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-semibold text-sm">Drag & drop files here, or click to browse</p>
        <p className="text-gray-400 text-xs mt-1">JPG, PNG, GIF, SVG, MP4 — Max 50MB per file</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {mediaItems.map(item => (
          <div key={item.name} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-square overflow-hidden">
              <ImageWithFallback src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-2">
              <p className="text-[10px] text-gray-600 font-semibold truncate">{item.name}</p>
              <p className="text-[10px] text-gray-400">{item.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Homepage Management ──────────────────────────────────────────────────────
function HomepageManagement() {
  const sections = [
    { name: "Hero Slider", description: "3 active slides", enabled: true },
    { name: "Category Strip", description: "8 categories shown", enabled: true },
    { name: "Featured Brands", description: "6 brands featured", enabled: true },
    { name: "Trending Products", description: "6 products shown", enabled: true },
    { name: "Brand Showcase", description: "3 full-bleed sections", enabled: true },
    { name: "Stats Banner", description: "4 key metrics", enabled: true },
    { name: "New Releases", description: "4 new products", enabled: true },
    { name: "Video Showcase", description: "4 videos", enabled: true },
    { name: "Newsletter Section", description: "Email subscription form", enabled: true },
  ];

  return (
    <div>
      <h2 className="text-xl font-black text-[#0d1b4b] mb-6">Homepage Content</h2>
      <div className="space-y-3">
        {sections.map(section => (
          <div key={section.name} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-8 rounded-full ${section.enabled ? "bg-[#0a9c8e]" : "bg-gray-200"}`} />
              <div>
                <p className="font-bold text-[#0d1b4b] text-sm">{section.name}</p>
                <p className="text-gray-400 text-xs">{section.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-gray-400 hover:text-[#0d1b4b] px-3 py-1.5 rounded-lg hover:bg-gray-50 font-semibold transition-colors flex items-center gap-1">
                <Edit2 size={12} /> Edit
              </button>
              <div
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${section.enabled ? "bg-[#0a9c8e]" : "bg-gray-200"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow mt-0.5 transition-transform ${section.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsPanel() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-black text-[#0d1b4b]">Site Settings</h2>

      {[
        { title: "General", fields: [
          { label: "Site Name", value: "Velvet Kids", type: "text" },
          { label: "Tagline", value: "Play Without Limits.", type: "text" },
          { label: "Support Email", value: "hello@velvetkids.com", type: "email" },
          { label: "Support Phone", value: "+1 (800) VEL-KIDS", type: "text" },
        ]},
        { title: "Shipping", fields: [
          { label: "Free Shipping Threshold", value: "$50.00", type: "text" },
          { label: "Standard Shipping Rate", value: "$5.99", type: "text" },
        ]},
      ].map(group => (
        <div key={group.title} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-black text-[#0d1b4b] mb-4">{group.title}</h3>
          <div className="space-y-4">
            {group.fields.map(field => (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors"
                />
              </div>
            ))}
          </div>
          <button className="mt-4 bg-[#0d1b4b] hover:bg-[#e8174b] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const tabTitles: Record<AdminTab, string> = {
    dashboard: "Dashboard Overview",
    products: "Products Management",
    brands: "Brands Management",
    categories: "Categories Management",
    media: "Media Library",
    homepage: "Homepage Management",
    settings: "Site Settings",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview />;
      case "products": return <ProductsManagement />;
      case "brands": return <BrandsManagement />;
      case "categories": return <CategoriesManagement />;
      case "media": return <MediaLibrary />;
      case "homepage": return <HomepageManagement />;
      case "settings": return <SettingsPanel />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar active={activeTab} setActive={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="font-black text-[#0d1b4b] text-lg">{tabTitles[activeTab]}</h1>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#0d1b4b] relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e8174b] rounded-full" />
            </button>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <div className="w-7 h-7 bg-[#0d1b4b] rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
              <span className="text-sm font-semibold text-gray-700">Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
