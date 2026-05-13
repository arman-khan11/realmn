import { superbase } from '@/lib/superbase';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import Footer from './component/footer';

export default async function HomePage() {
  const { data: products } = await superbase
    .from('products')
    .select('*')
    .eq('section', 'Homepage')
    .order('created_at', { ascending: false });

  return (
    <div className="bg-white min-h-screen text-black font-sans">

      {/* ───── HERO ───── */}
      <section className="relative w-full h-[100svh] overflow-hidden">

        {/* Hero Image */}
        <Image
          src="/Arman's hero.png"
          alt="REALMN — Wear Confident"
          fill
          priority
          className="object-cover object-top"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-white to-transparent" />

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-2xl">
            REALMN
          </h1>
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.6em] text-white/60 mt-3 md:mt-5">
            WEAR THE CONFIDENT
          </p>
          <Link
            href="#products"
            className="mt-6 md:mt-10 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] italic px-8 md:px-12 py-3 md:py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-2xl active:scale-95"
          >
            SHOP NOW →
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-6 md:h-8 bg-white/30" />
          <p className="text-[6px] font-black uppercase tracking-widest text-white/30">SCROLL</p>
        </div>
      </section>

      {/* ───── PRODUCTS ───── */}
      <main id="products" className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30">
            NEW ARRIVALS
          </span>
          <div className="flex-1 h-px bg-zinc-100" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-14">
          {products?.map((product: Product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full bg-[#f2f2f0] overflow-hidden">

                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* BUY NOW — desktop hover */}
                <div className="absolute bottom-5 left-0 right-0 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                  <span className="bg-white text-black text-[9px] font-black uppercase tracking-[0.4em] italic px-8 py-3 rounded-full shadow-xl">
                    BUY NOW →
                  </span>
                </div>

                {/* Mobile bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 sm:hidden bg-black text-white text-[8px] font-black uppercase tracking-[0.3em] italic py-2 text-center">
                  BUY NOW
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-3 md:mt-4 flex justify-between items-baseline border-b border-zinc-100 pb-2 md:pb-3">
                <h3 className="text-[10px] md:text-[11px] font-black uppercase italic tracking-widest truncate pr-2 md:pr-4 text-black">
                  {product.name}
                </h3>
                <span className="text-[10px] md:text-[11px] font-mono italic text-zinc-400 shrink-0">
                  ₹{product.price}
                </span>
              </div>

              <p className="mt-1 md:mt-2 text-[8px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-all duration-200">
                VIEW DETAILS →
              </p>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {(!products || products.length === 0) && (
          <div className="text-center py-32 border-2 border-dashed border-zinc-100">
            <p className="text-zinc-300 text-xl font-black italic uppercase tracking-[0.5em]">
              COLLECTION LOADING...
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}