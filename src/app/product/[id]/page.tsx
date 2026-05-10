'use client';
import { useState, useEffect, use } from 'react';
import { superbase } from '@/lib/superbase';
import Image from 'next/image';
import CheckoutModal from '@/app/component/CheckoutModal';
import { Product } from '@/types/product';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetails({ params }: PageProps) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const { data } = await superbase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
      if (data) setProduct(data as Product);
      setLoading(false);
    }
    getProduct();
  }, [resolvedParams.id]);

  if (loading || !product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-[10px] font-black uppercase tracking-[1em] animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const sizeArray = String(product.sizes || "").split(',').map(s => s.trim()).filter(s => s !== "");

  return (
    <div className="bg-white text-black min-h-screen font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-black italic uppercase tracking-tighter">REALMN</Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-all">← BACK</Link>
          </div>
        </div>
      </nav>

      <div className="pt-14 flex flex-col md:flex-row min-h-screen">

        {/* LEFT — IMAGE */}
        <div className="relative w-full md:w-[55%] md:h-screen md:sticky md:top-14 bg-zinc-50 flex items-center justify-center p-8">

          {/* Badge */}
          <div className="absolute top-8 left-8 z-10">
            <span className="text-[7px] font-black uppercase tracking-[0.3em] bg-black text-white px-3 py-1 italic">
              REALMN / 26
            </span>
          </div>

          {/* COD Badge */}
          <div className="absolute top-8 right-8 z-10">
            <span className="text-[7px] font-black uppercase tracking-widest border border-zinc-300 text-zinc-500 px-3 py-1">
              COD AVAILABLE
            </span>
          </div>

          <div className="relative w-full max-w-sm aspect-3/4">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* RIGHT — INFO */}
        <div className="w-full md:w-[45%] px-8 md:px-16 py-12 md:py-20 flex flex-col justify-center">

          {/* Brand tag */}
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-6">
            REALMN — 2026 COLLECTION
          </p>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-8">
            <p className="text-3xl font-black tracking-tighter">
              ₹{product.price.toLocaleString()}
            </p>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2 py-1">
              INCL. ALL TAXES
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-100 mb-8" />

          {/* Description */}
          {product.description && (
            <p className="text-[12px] text-zinc-500 leading-relaxed mb-8 uppercase tracking-wide">
              {product.description}
            </p>
          )}

          {/* Size */}
          {sizeArray.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400">
                  SELECT SIZE
                </p>
                {selectedSize && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-black">
                    SELECTED: {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {sizeArray.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 flex items-center justify-center text-[11px] font-black transition-all uppercase
                    ${selectedSize === size
                      ? 'bg-black text-white border-black shadow-lg scale-110'
                      : 'border-zinc-200 hover:border-black text-zinc-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trust signals */}
          <div className="grid grid-cols-3 gap-4 mb-8 border border-zinc-100 p-4">
            {[
              { title: 'COD', sub: 'Cash on Delivery' },
              { title: '7 DAYS', sub: 'Easy Returns' },
              { title: 'ALL INDIA', sub: 'Delivery' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <p className="text-[10px] font-black uppercase tracking-tight">{item.title}</p>
                <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-1">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-6 font-black uppercase tracking-[0.4em] text-[10px] transition-all active:scale-95 shadow-xl ${
              selectedSize
                ? 'bg-black text-white hover:bg-zinc-800'
                : 'bg-black text-white hover:bg-zinc-800'
            }`}
          >
            {selectedSize ? `ORDER NOW — ${selectedSize}` : 'CHOOSE YOUR SIZE'}
          </button>

          {/* Disclaimer */}
          <p className="text-[8px] text-zinc-400 uppercase tracking-widest text-center mt-4">
            FREE SHIPPING ON PREPAID ORDERS
          </p>

        </div>
      </div>

      <CheckoutModal
        product={product}
        size={selectedSize}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}