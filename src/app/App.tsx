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
    <div className="min-h-screen flex flex-col">
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
      <h1
        className="text-foreground"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300 }}
      >
        404
      </h1>
      <p className="text-muted-foreground text-lg max-w-sm">This page doesn't exist.</p>
      <a
        href="/"
        className="mt-2 border border-foreground text-foreground px-7 py-3 rounded-full transition-colors text-sm font-normal"
        style={{ borderRadius: "30px" }}
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
