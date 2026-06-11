import { Link } from "react-router";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import logoImg from "../../imports/logo.jpeg";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0d1b4b" }} className="text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Join the Adventure</p>
            <h3 className="text-2xl lg:text-3xl font-black" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Play Without Limits.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-gray-400 outline-none focus:border-[#e8174b] w-56"
              />
              <button
                type="submit"
                className="bg-[#e8174b] hover:bg-red-600 text-white rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">Quick Links</p>
          <ul className="space-y-2.5">
            {[["Home", "/"], ["Products", "/products"], ["Brands", "/brands"], ["New Arrivals", "/products?filter=new"], ["Sale", "/products?filter=sale"]].map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="text-gray-300 hover:text-white text-sm transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">Our Brands</p>
          <ul className="space-y-2.5">
            {[["BrickWorld", "/brands/brickworld"], ["StarDolls", "/brands/stardolls"], ["TurboRace", "/brands/turborace"], ["HeroForce", "/brands/heroforce"], ["MiniWorld", "/brands/miniworld"]].map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="text-gray-300 hover:text-white text-sm transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">Company</p>
          <ul className="space-y-2.5">
            {[["About Us", "/about"], ["Contact", "/contact"], ["Careers", "/careers"], ["Press", "/press"], ["Patents", "/patents"]].map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="text-gray-300 hover:text-white text-sm transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-semibold">Policies</p>
          <ul className="space-y-2.5">
            {[["Terms of Use", "/terms"], ["Privacy Policy", "/privacy"], ["Cookie Policy", "/cookies"], ["Returns", "/returns"], ["Shipping", "/shipping"]].map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="text-gray-300 hover:text-white text-sm transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Velvet Kids" className="h-8 w-auto object-contain brightness-0 invert opacity-80" />
            <p className="text-gray-400 text-xs">
              © 2026 Velvet Kids™. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
