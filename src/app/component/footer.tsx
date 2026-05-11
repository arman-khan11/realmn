'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes! COD is available across India. You pay when your order arrives at your doorstep. No advance payment required.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 5–7 business days from the date of dispatch. You will receive a WhatsApp update once your order is confirmed and dispatched.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is confirmed, you will receive a tracking link on WhatsApp. You can use that link anytime to check your order status in real time.',
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'Yes, we accept returns within 7 days of delivery. The product must be unused, unwashed, and in original packaging with tags intact. COD orders get store credit; prepaid orders get a full refund within 5–7 business days.',
  },
  {
    q: 'How do I choose the right size?',
    a: 'Each product page has a size chart. We recommend checking your measurements before ordering. If you are between sizes, we suggest going one size up for a comfortable fit.',
  },
  {
    q: 'Can I cancel my order?',
    a: 'Orders can only be cancelled before they are dispatched. Once dispatched, cancellation is not possible. To cancel, contact us on WhatsApp immediately after placing the order.',
  },
  {
    q: 'What if I receive a damaged or wrong product?',
    a: 'We sincerely apologize if this happens. Please contact us on WhatsApp within 24 hours of delivery with a photo of the product. We will arrange a replacement or full refund at no extra cost.',
  },
  {
    q: 'Are the products true to the images shown?',
    a: 'We make every effort to display products as accurately as possible. Slight color variations may occur due to screen settings, but the product quality and design remain exactly as shown.',
  },
  {
    q: 'Do you ship outside India?',
    a: 'Currently, REALMN ships within India only. International shipping will be available soon. Stay tuned!',
  },
  {
    q: 'How do I contact REALMN support?',
    a: 'You can reach us on WhatsApp for the fastest response. We aim to reply within 24 hours. Your satisfaction is our priority.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left gap-4"
      >
        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-200">{q}</span>
        <span className={`text-zinc-400 text-lg shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <p className="text-[11px] text-zinc-400 leading-relaxed pb-4 pr-8 italic">
          {a}
        </p>
      )}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-black text-white font-sans">

      {/* Trust Signals */}
      <div className="border-b border-zinc-900 px-6 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { title: 'Cash On Delivery', sub: 'Available Across India' },
          { title: '7-Day Returns', sub: 'Hassle Free Policy' },
          { title: 'Secure Checkout', sub: 'SSL Encrypted' },
          { title: 'Support 24hrs', sub: 'WhatsApp Response' },
        ].map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">{item.title}</span>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Main Footer */}
      <div className="px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Brand */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">REALMN</h2>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mt-2">
              WEAR THE CONFIDENT.
            </p>
          </div>
          <p className="text-[12px] text-zinc-500 leading-relaxed max-w-xs">
            Premium outfit combos crafted for confidence, style, and modern fashion. Built for real men who wear their identity.
          </p>

          {/* Newsletter */}
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">
              STAY IN THE LOOP
            </p>
            {subscribed ? (
              <p className="text-[10px] font-black uppercase tracking-widest text-green-400">
                YOU&apos;RE IN. 🖤
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-3 outline-none grow placeholder:text-zinc-700 focus:border-zinc-600 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black text-[9px] font-black uppercase tracking-widest px-5 py-3 hover:bg-zinc-200 transition-all"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>

          {/* Instagram */}
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">FOLLOW US</p>
            <a
              href="https://instagram.com/realmn.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all border border-zinc-800 hover:border-zinc-600 px-4 py-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @REALMN.IN
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">NAVIGATE</p>
          {[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'About Us', href: '/about' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Support */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">SUPPORT</p>
          {[
            { label: 'WhatsApp Us', href: 'https://wa.me/919084938127' },
            { label: 'instagram', href: 'https://www.instagram.com/realmn.in/' },
            { label: 'tweeter', href: 'https://twitter.com/realmn_in' },
            { label: 'FAQ', href: '#faq' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="block text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">LEGAL</p>
          {[
            { label: 'Terms & Conditions', href: '/legal/terms' },
            { label: 'Privacy Policy', href: '/legal/terms#privacy' },
            { label: 'Return Policy', href: '/legal/terms#returns' },
            { label: 'Shipping Policy', href: '/legal/terms#shipping' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[11px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="lg:col-span-12 mt-8">
          <div className="border-t border-zinc-900 pt-12">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-2">GOT QUESTIONS?</p>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-10">FAQ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              <div>
                {faqs.slice(0, 5).map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
              <div>
                {faqs.slice(5).map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900 px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
          © 2025 REALMN. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
          MADE WITH 🖤 IN INDIA
        </p>
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">
          REALMN.IN
        </p>
      </div>

    </footer>
  );
}