import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";
import { contactService } from '../services/contactService';

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactService.submit(form);
      setSubmitted(true);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ backgroundColor: "#0d1b4b" }} className="py-20 px-4 text-center">
        <p className="text-[#f5a623] font-bold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="text-white" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          Contact Us
        </h1>
        <p className="text-white/60 text-base mt-3 max-w-xl mx-auto">
          Have a question about a product, order, or partnership? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: <Mail size={20} />, title: "Email Us", lines: ["hello@velvetkids.com", "support@velvetkids.com"], color: "#e8174b" },
              { icon: <Phone size={20} />, title: "Call Us", lines: ["+1 (800) VEL-KIDS", "Mon–Fri, 9am–6pm EST"], color: "#0a9c8e" },
              { icon: <MapPin size={20} />, title: "Visit Us", lines: ["123 Toy Street, Suite 400", "New York, NY 10001"], color: "#8a5dca" },
              { icon: <Clock size={20} />, title: "Business Hours", lines: ["Monday–Friday: 9am–6pm", "Saturday: 10am–4pm"], color: "#f5a623" },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color + "20", color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-[#0d1b4b] text-sm mb-1">{item.title}</p>
                  {item.lines.map(line => (
                    <p key={line} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-[#0a9c8e]/10 rounded-full flex items-center justify-center mb-4">
                  <Check size={28} className="text-[#0a9c8e]" />
                </div>
                <h3 className="font-black text-[#0d1b4b] text-2xl mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 text-[#e8174b] font-semibold text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-black text-[#0d1b4b] text-xl mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Sara Ahmed"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="sara@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors bg-white text-gray-700"
                    >
                      <option value="">Select a subject</option>
                      <option>Product Inquiry</option>
                      <option>Order Support</option>
                      <option>Partnership / Wholesale</option>
                      <option>Press & Media</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us how we can help..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#e8174b] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0d1b4b] hover:bg-[#e8174b] text-white font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
