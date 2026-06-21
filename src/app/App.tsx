import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AuthProvider } from './context/AuthContext.jsx';
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { BrandsPage } from "./pages/BrandsPage";
import { BrandDetailPage } from "./pages/BrandDetailPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";

{/* MARKER-MAKE-KIT-INVOKED */}

function ScrollToTop() {
  const { pathname } = useLocation();
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brands/:slug" element={<BrandDetailPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-6xl">🧸</p>
      <h1
        className="text-[#0d1b4b]"
        style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(3rem, 8vw, 6rem)" }}
      >
        Oops!
      </h1>
      <p className="text-gray-500 text-lg max-w-sm">This page seems to have wandered off to play somewhere else.</p>
      <a
        href="/"
        className="mt-2 bg-[#e8174b] hover:bg-red-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm"
      >
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
