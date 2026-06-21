import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Package, Tag, Image, BarChart2, Settings,
  Plus, Search, Edit2, Trash2, Eye, Upload, ChevronDown,
  TrendingUp, ShoppingBag, Users, DollarSign, Bell, LogOut, X, LogIn
} from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import logoImg from "../../imports/logo.jpeg";
import { productService } from '../services/productService';
import { brandService } from '../services/brandService';
import { categoryService } from '../services/categoryService';
import { adminService } from '../services/adminService';
import { homepageService } from '../services/homepageService';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

type AdminTab = "dashboard" | "products" | "brands" | "categories" | "media" | "homepage" | "settings";

interface ProductForm {
  name: string; price: string; originalPrice: string; brandId: string; categoryId: string;
  description: string; ageRange: string; inStock: boolean; isNew: boolean; isTrending: boolean; isFeatured: boolean;
}

interface BrandForm {
  name: string; slug: string; tagline: string; description: string; color: string; featured: boolean;
}

interface CategoryForm {
  name: string; slug: string; icon: string; color: string;
}

const emptyProductForm: ProductForm = {
  name: "", price: "", originalPrice: "", brandId: "", categoryId: "",
  description: "", ageRange: "", inStock: true, isNew: false, isTrending: false, isFeatured: false,
};

const emptyBrandForm: BrandForm = {
  name: "", slug: "", tagline: "", description: "", color: "#2255cc", featured: false,
};

const emptyCategoryForm: CategoryForm = {
  name: "", slug: "", icon: "", color: "#2255cc",
};

// ─── Login Modal ─────────────────────────────────────────────────────────────
function LoginModal({ onClose, forceShow }: { onClose: () => void; forceShow?: boolean }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={forceShow ? undefined : onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-[#0d1b4b] text-lg">Admin Login</h3>
          {!forceShow && <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><X size={18} /></button>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text" value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}
          <button
            type="submit" disabled={submitting}
            className="w-full bg-[#0d1b4b] hover:bg-[#e8174b] text-white font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm Dialog ──────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <p className="text-sm text-gray-700 font-semibold mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#e8174b] hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLoginClick }: { active: AdminTab; setActive: (t: AdminTab) => void; onLoginClick: () => void }) {
  const { user, logout } = useAuth();

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
        {user ? (
          <button
            onClick={() => { logout(); window.location.href = '/'; }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-[#0d1b4b] transition-colors"
          >
            <LogIn size={18} /> Login
          </button>
        )}
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
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyProductForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    brandService.getAll().then(res => setBrands(Array.isArray(res) ? res : [])).catch(() => {});
    categoryService.getAll().then(res => setCategories(Array.isArray(res) ? res : [])).catch(() => {});
  }, []);

  const fetchProducts = useRef(async () => {
    setLoading(true);
    try {
      const res = await productService.getAll({ search: debouncedSearch || undefined });
      const list = Array.isArray(res) ? res : (res?.products ?? []);
      setProducts(list);
      setTotal(Array.isArray(res) ? list.length : (res?.total ?? list.length));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchProducts.current();
  }, [debouncedSearch]);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyProductForm);
    setModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      originalPrice: product.originalPrice != null ? String(product.originalPrice) : "",
      brandId: product.brandId || "",
      categoryId: product.categoryId || "",
      description: product.description || "",
      ageRange: product.ageRange || "",
      inStock: product.inStock ?? true,
      isNew: product.isNew ?? false,
      isTrending: product.isTrending ?? false,
      isFeatured: product.isFeatured ?? false,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: any = {
        name: form.name,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
        brandId: form.brandId,
        categoryId: form.categoryId,
        description: form.description,
        ageRange: form.ageRange,
        inStock: form.inStock,
        isNew: form.isNew,
        isTrending: form.isTrending,
        isFeatured: form.isFeatured,
      };
      if (editingProduct) {
        const updated = await productService.update(editingProduct.id, payload);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? (updated?.product || updated || { ...p, ...payload }) : p));
      } else {
        const created = await productService.create(payload);
        const newProduct = created?.product || created || { ...payload, id: Date.now().toString() };
        setProducts(prev => [...prev, newProduct]);
        setTotal(prev => prev + 1);
      }
      setModalOpen(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await productService.delete(confirmDelete.id);
      setProducts(prev => prev.filter(p => p.id !== confirmDelete.id));
      setTotal(prev => prev - 1);
    } catch {
      // ignore
    } finally {
      setConfirmDelete(null);
    }
  };

  const updateForm = (key: keyof ProductForm, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div>
      {confirmDelete && (
        <ConfirmDialog
          message={`Delete "${confirmDelete.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[#0d1b4b] text-lg">{editingProduct ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input type="text" value={form.name} onChange={e => updateForm("name", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => updateForm("price", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Original Price</label>
                  <input type="number" step="0.01" value={form.originalPrice} onChange={e => updateForm("originalPrice", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Brand</label>
                  <select value={form.brandId} onChange={e => updateForm("brandId", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors">
                    <option value="">Select brand</option>
                    {brands.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select value={form.categoryId} onChange={e => updateForm("categoryId", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors">
                    <option value="">Select category</option>
                    {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={e => updateForm("description", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Age Range</label>
                <input type="text" value={form.ageRange} onChange={e => updateForm("ageRange", e.target.value)} placeholder="e.g. 8-14" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(["inStock", "isNew", "isTrending", "isFeatured"] as const).map(key => (
                  <label key={key} className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={form[key] as boolean} onChange={e => updateForm(key, e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-[#e8174b] focus:ring-[#e8174b]" />
                    {key === "inStock" ? "In Stock" : key === "isNew" ? "New" : key === "isTrending" ? "Trending" : "Featured"}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e8174b] hover:bg-red-600 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : editingProduct ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Products ({total})</h2>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-400 font-semibold">Loading...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-400 font-semibold">No products found.</td>
                </tr>
              ) : products.map(p => (
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
                  <td className="px-4 py-3 text-sm font-bold text-[#0d1b4b]">${(p.price ?? 0).toFixed(2)}</td>
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
                      <button onClick={() => openEditModal(p)} className="w-7 h-7 text-gray-400 hover:text-[#0a9c8e] hover:bg-teal-50 rounded-lg flex items-center justify-center transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setConfirmDelete({ id: p.id, name: p.name })} className="w-7 h-7 text-gray-400 hover:text-[#e8174b] hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors">
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
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<any | null>(null);
  const [form, setForm] = useState<BrandForm>(emptyBrandForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await brandService.getAll();
      setBrands(Array.isArray(res) ? res : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBrands(); }, []);

  const openAddModal = () => {
    setEditingBrand(null);
    setForm(emptyBrandForm);
    setModalOpen(true);
  };

  const openEditModal = (brand: any) => {
    setEditingBrand(brand);
    setForm({
      name: brand.name || "",
      slug: brand.slug || "",
      tagline: brand.tagline || "",
      description: brand.description || "",
      color: brand.color || "#2255cc",
      featured: brand.featured ?? false,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: any = { ...form };
      if (editingBrand) {
        await brandService.update(editingBrand.id, payload);
        setBrands(prev => prev.map(b => b.id === editingBrand.id ? { ...b, ...payload } : b));
      } else {
        const created = await brandService.create(payload);
        const newBrand = created?.brand || created || { ...payload, id: Date.now().toString(), productCount: 0 };
        setBrands(prev => [...prev, newBrand]);
      }
      setModalOpen(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await brandService.delete(confirmDelete.id);
      setBrands(prev => prev.filter(b => b.id !== confirmDelete.id));
    } catch {
      // ignore
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div>
      {confirmDelete && (
        <ConfirmDialog
          message={`Delete brand "${confirmDelete.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[#0d1b4b] text-lg">{editingBrand ? "Edit Brand" : "Add Brand"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                  <input type="text" value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tagline</label>
                <input type="text" value={form.tagline} onChange={e => setForm(prev => ({ ...prev, tagline: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={form.color} onChange={e => setForm(prev => ({ ...prev, color: e.target.value }))} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                    <input type="text" value={form.color} onChange={e => setForm(prev => ({ ...prev, color: e.target.value }))} className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors font-mono" />
                  </div>
                </div>
                <div className="flex items-end pb-2.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))} className="w-4 h-4 rounded border-gray-300 text-[#e8174b] focus:ring-[#e8174b]" />
                    Featured
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e8174b] hover:bg-red-600 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : editingBrand ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Brands ({brands.length})</h2>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus size={16} /> Add Brand
        </button>
      </div>

      {loading ? (
        <div className="text-center text-sm text-gray-400 font-semibold py-8">Loading...</div>
      ) : (
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
                    <p className="text-xs text-gray-400 mt-0.5">{brand.productCount ?? 0} products</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(brand)} className="w-7 h-7 text-gray-400 hover:text-[#0a9c8e] hover:bg-teal-50 rounded-lg flex items-center justify-center">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => setConfirmDelete({ id: brand.id, name: brand.name })} className="w-7 h-7 text-gray-400 hover:text-[#e8174b] hover:bg-red-50 rounded-lg flex items-center justify-center">
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
      )}
    </div>
  );
}

// ─── Categories Management ────────────────────────────────────────────────────
function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyCategoryForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAll();
      setCategories(Array.isArray(res) ? res : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setForm(emptyCategoryForm);
    setModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name || "",
      slug: cat.slug || "",
      icon: cat.icon || "",
      color: cat.color || "#2255cc",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: any = { ...form };
      if (editingCategory) {
        await categoryService.update(editingCategory.id, payload);
        setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...payload } : c));
      } else {
        const created = await categoryService.create(payload);
        const newCat = created?.category || created || { ...payload, id: Date.now().toString(), productCount: 0 };
        setCategories(prev => [...prev, newCat]);
      }
      setModalOpen(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await categoryService.delete(confirmDelete.id);
      setCategories(prev => prev.filter(c => c.id !== confirmDelete.id));
    } catch {
      // ignore
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div>
      {confirmDelete && (
        <ConfirmDialog
          message={`Delete category "${confirmDelete.name}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[#0d1b4b] text-lg">{editingCategory ? "Edit Category" : "Add Category"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
                  <input type="text" value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Icon (emoji)</label>
                <input type="text" value={form.icon} onChange={e => setForm(prev => ({ ...prev, icon: e.target.value }))} placeholder="e.g. 🦸" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={form.color} onChange={e => setForm(prev => ({ ...prev, color: e.target.value }))} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                  <input type="text" value={form.color} onChange={e => setForm(prev => ({ ...prev, color: e.target.value }))} className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors font-mono" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#e8174b] hover:bg-red-600 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Categories ({categories.length})</h2>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400 font-semibold">Loading...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400 font-semibold">No categories found.</td>
              </tr>
            ) : categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-sm text-gray-400 font-mono">/{cat.slug}</td>
                <td className="px-6 py-3.5 text-sm font-bold text-[#0d1b4b]">{cat.productCount ?? 0}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-gray-400 font-mono">{cat.color}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(cat)} className="w-7 h-7 text-gray-400 hover:text-[#0a9c8e] rounded-lg flex items-center justify-center">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => setConfirmDelete({ id: cat.id, name: cat.name })} className="w-7 h-7 text-gray-400 hover:text-[#e8174b] rounded-lg flex items-center justify-center">
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
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mediaItems = [
    { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&h=200&fit=crop&auto=format", name: "brickworld-hero.jpg", size: "2.4 MB" },
    { url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop&auto=format", name: "stardolls-fashion.jpg", size: "1.8 MB" },
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format", name: "turborace-car.jpg", size: "3.1 MB" },
    { url: "https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=200&h=200&fit=crop&auto=format", name: "heroforce-titan.jpg", size: "2.2 MB" },
    { url: "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=200&h=200&fit=crop&auto=format", name: "miniworld-ball.jpg", size: "1.5 MB" },
    { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop&auto=format", name: "colorsplash-kit.jpg", size: "2.9 MB" },
  ];

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await adminService.uploadFile(formData);
      setUploadedFiles(prev => [...prev, result]);
    } catch {
      // ignore
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = '';
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,video/*"
      />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-[#0d1b4b]">Media Library</h2>
        <button
          onClick={handleDropZoneClick}
          disabled={uploading}
          className="flex items-center gap-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          <Upload size={16} /> {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>

      <div
        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center mb-6 hover:border-[#e8174b] transition-colors cursor-pointer"
        onClick={handleDropZoneClick}
      >
        <Upload size={32} className="text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-semibold text-sm">Drag & drop files here, or click to browse</p>
        <p className="text-gray-400 text-xs mt-1">JPG, PNG, GIF, SVG, MP4 — Max 50MB per file</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {uploadedFiles.map((item, idx) => (
          <div key={`upload-${idx}`} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-square overflow-hidden">
              <ImageWithFallback src={item.url || item.path || ''} alt={item.name || item.filename || `Upload ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-2">
              <p className="text-[10px] text-gray-600 font-semibold truncate">{item.name || item.filename || `Upload ${idx + 1}`}</p>
              <p className="text-[10px] text-gray-400">{item.size ? (item.size + (typeof item.size === 'number' ? ' KB' : '')) : '—'}</p>
            </div>
          </div>
        ))}
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
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultSections = [
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

  useEffect(() => {
    homepageService.getSections()
      .then(res => {
        const list = Array.isArray(res) ? res : (res?.sections ?? []);
        setSections(list.length > 0 ? list : defaultSections);
      })
      .catch(() => setSections(defaultSections))
      .finally(() => setLoading(false));
  }, []);

  const toggleSection = async (idx: number) => {
    const section = sections[idx];
    const newEnabled = !section.enabled;
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, enabled: newEnabled } : s));
    try {
      await homepageService.updateSection(section.id || section.name, { enabled: newEnabled });
    } catch {
      setSections(prev => prev.map((s, i) => i === idx ? { ...s, enabled: !newEnabled } : s));
    }
  };

  if (loading) {
    return <div className="text-center text-sm text-gray-400 font-semibold py-8">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-black text-[#0d1b4b] mb-6">Homepage Content</h2>
      <div className="space-y-3">
        {sections.map((section, idx) => (
          <div key={section.name || idx} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 transition-colors">
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
                onClick={() => toggleSection(idx)}
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
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const defaultSettings: Record<string, string> = {
    siteName: "Velvet Kids",
    tagline: "Play Without Limits.",
    supportEmail: "hello@velvetkids.com",
    supportPhone: "+1 (800) VEL-KIDS",
    freeShippingThreshold: "$50.00",
    standardShippingRate: "$5.99",
  };

  useEffect(() => {
    adminService.getSettings()
      .then(res => {
        const data = res?.settings || res || {};
        setSettings({ ...defaultSettings, ...data });
      })
      .catch(() => setSettings(defaultSettings))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await adminService.updateSetting(key, value);
      }
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const groups = [
    { title: "General", keys: ["siteName", "tagline", "supportEmail", "supportPhone"] as const, labels: {
      siteName: "Site Name", tagline: "Tagline", supportEmail: "Support Email", supportPhone: "Support Phone",
    }, types: {
      siteName: "text", tagline: "text", supportEmail: "email", supportPhone: "text",
    }},
    { title: "Shipping", keys: ["freeShippingThreshold", "standardShippingRate"] as const, labels: {
      freeShippingThreshold: "Free Shipping Threshold", standardShippingRate: "Standard Shipping Rate",
    }, types: {
      freeShippingThreshold: "text", standardShippingRate: "text",
    }},
  ];

  if (loading) {
    return <div className="text-center text-sm text-gray-400 font-semibold py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-black text-[#0d1b4b]">Site Settings</h2>

      {groups.map(group => (
        <div key={group.title} className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-black text-[#0d1b4b] mb-4">{group.title}</h3>
          <div className="space-y-4">
            {group.keys.map(key => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{group.labels[key]}</label>
                <input
                  type={group.types[key]}
                  value={settings[key] ?? ""}
                  onChange={e => updateSetting(key, e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 bg-[#0d1b4b] hover:bg-[#e8174b] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const { user, isAuthenticated } = useAuth();

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoginModal onClose={() => {}} forceShow={true} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar active={activeTab} setActive={setActiveTab} onLoginClick={() => {}} />

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
              <div className="w-7 h-7 bg-[#0d1b4b] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {(user?.name?.[0] || user?.email?.[0] || 'A')}
              </div>
              <span className="text-sm font-semibold text-gray-700">{user?.name || user?.email || 'Admin'}</span>
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
