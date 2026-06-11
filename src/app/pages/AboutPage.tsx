import type { CSSProperties } from "react";
import { Play, Award, Globe, Heart, Users } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function AboutPage() {
  const values = [
    { icon: <Heart size={24} />, title: "Safety First", desc: "Every product undergoes rigorous safety testing. We meet and exceed international safety standards.", color: "#e8174b" },
    { icon: <Globe size={24} />, title: "Worldwide Joy", desc: "Present in 50+ countries, bringing smiles to children on every continent.", color: "#0a9c8e" },
    { icon: <Award size={24} />, title: "Award Winning", desc: "Recipients of 30+ international toy design and innovation awards.", color: "#f5a623" },
    { icon: <Users size={24} />, title: "Community", desc: "Building a global community of playful, creative, and curious kids.", color: "#8a5dca" },
  ];

  const team = [
    { name: "Sara Ahmed", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format" },
    { name: "James Carter", role: "Chief Creative Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format" },
    { name: "Priya Singh", role: "Head of Product Design", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format" },
    { name: "Luca Rossi", role: "VP of Operations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format" },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: "500px", backgroundColor: "#0d1b4b" }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=1600&h=700&fit=crop&auto=format"
          alt="About Velvet Kids"
          className="w-full h-full object-cover absolute inset-0 opacity-30"
          style={{ minHeight: "500px" } as CSSProperties}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-center items-center text-center py-32">
          <p className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-4">Our Story</p>
          <h1
            className="text-white mb-6 leading-none"
            style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            About Velvet Kids
          </h1>
          <p className="text-white/70 text-base lg:text-lg max-w-2xl">
            We believe every child deserves extraordinary play. Since 2012, Velvet Kids has been crafting premium toys
            that inspire imagination, spark creativity, and create memories that last a lifetime.
          </p>

          {/* Video CTA */}
          <button className="mt-8 flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors">
            <div className="w-8 h-8 bg-[#e8174b] rounded-full flex items-center justify-center">
              <Play size={14} className="fill-white text-white ml-0.5" />
            </div>
            Watch Our Story
          </button>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#e8174b] font-bold text-sm uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-[#0d1b4b] mb-6 leading-tight" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Play Without Limits.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Velvet Kids, we believe that play is the language of childhood. It's how children learn, grow, and discover who they are. That's why we pour our hearts into every toy we create.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We partner with world-class brands and designers to bring the most innovative, safe, and delightful toys to children around the world — from the simplest building blocks to the most advanced robotic kits.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[["2012", "Founded"], ["400+", "Products"], ["50+", "Countries"], ["2M+", "Happy Kids"]].map(([val, label]) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-5">
                    <p className="font-black text-3xl text-[#e8174b]" style={{ fontFamily: "'Fredoka One', cursive" }}>{val}</p>
                    <p className="text-gray-500 text-sm font-semibold mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=500&fit=crop&auto=format"
                alt="Kids playing"
                className="rounded-2xl w-full h-64 object-cover mt-8"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=500&fit=crop&auto=format"
                alt="Toys"
                className="rounded-2xl w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#e8174b] font-bold text-sm uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="text-[#0d1b4b]" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: v.color + "20", color: v.color }}
                >
                  {v.icon}
                </div>
                <h3 className="font-black text-[#0d1b4b] text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#e8174b] font-bold text-sm uppercase tracking-widest mb-3">The People Behind the Play</p>
            <h2 className="text-[#0d1b4b]" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Meet the Team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="text-center group">
                <div className="rounded-2xl overflow-hidden mb-4 aspect-square">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-black text-[#0d1b4b]">{member.name}</h3>
                <p className="text-[#e8174b] text-sm font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: "#e8174b" }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Come Work With Us
          </h2>
          <p className="text-white/80 mb-6">Join the team that's reimagining play for the next generation.</p>
          <button className="bg-white text-[#e8174b] font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm">
            View Open Positions →
          </button>
        </div>
      </section>
    </div>
  );
}
