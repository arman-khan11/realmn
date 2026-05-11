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

      {/* HEADER */}
      <header className="pt-16 pb-12 border-b border-zinc-100 text-center px-4">
        <h1 className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-none mb-2">
          REALMN
        </h1>
        <p className="text-[10px] uppercase tracking-[0.6em] text-zinc-400 font-bold">
          SYSTEMS / 2026
        </p>
      </header>

      {/* PRODUCT GRID */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-14">
          {products?.map((product: Product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-3/4 w-full bg-[#f2f2f0] overflow-hidden">

               

                {/* Product Image */}
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />

                {/* BUY NOW pill — desktop hover */}
                <div className="absolute bottom-5 left-0 right-0 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                  <span className="bg-white text-black text-[9px] font-black uppercase tracking-[0.4em] italic px-8 py-3 rounded-full shadow-xl">
                    BUY NOW →
                  </span>
                </div>

                {/* Mobile: permanent bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 sm:hidden bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] italic py-3 text-center">
                  BUY NOW
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 flex justify-between items-baseline border-b border-zinc-100 pb-3">
                <h3 className="text-[11px] font-black uppercase italic tracking-widest truncate pr-4 text-black">
                  {product.name}
                </h3>
                <span className="text-[11px] font-mono italic text-zinc-400 shrink-0">
                  ₹{product.price}
                </span>
              </div>

              {/* View details hint */}
              <p className="mt-2 text-[8px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-black transition-all duration-200">
                VIEW DETAILS →
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}