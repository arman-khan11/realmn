'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* Hero */}
      <div className="border-b-2 border-black px-6 md:px-16 py-16 md:py-24">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4">REALMN / OUR STORY</p>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-6">
          ABOUT<br />REALMN
        </h1>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 mt-8">
          WEAR THE CONFIDENT.
        </p>
      </div>

      {/* Story */}
     {/* Story */}
<div className="px-6 md:px-16 py-16 border-b border-zinc-100">
  <div className="mb-8">
    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4">THE BEGINNING</p>
    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">
      BORN FROM<br />CONFIDENCE
    </h2>
  </div>
  <div className="space-y-6 max-w-2xl">
    <p className="text-sm text-zinc-500 leading-relaxed">
      REALMN was built for one reason — because finding clothes that actually make you feel confident shouldn&apos;t be hard. We started with a simple idea: premium outfit combos, crafted with intention, delivered to your door.
    </p>
    <p className="text-sm text-zinc-500 leading-relaxed">
      We are not just a clothing brand. We are a statement. Every piece we put together is designed to make you walk taller, feel stronger, and own every room you walk into. That is what REALMN means — being real, being confident, being you.
    </p>
    <p className="text-sm text-zinc-500 leading-relaxed">
      Built in India. Made for men who know their worth. REALMN is just getting started.
    </p>
  </div>
</div>
      {/* Values */}
      <div className="px-6 md:px-16 py-16 border-b border-zinc-100">
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-12">WHAT WE STAND FOR</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              number: '01',
              title: 'QUALITY FIRST',
              desc: 'Every product is carefully selected. We do not compromise on fabric, fit, or finish. If it does not meet our standard, it does not reach you.',
            },
            {
              number: '02',
              title: 'CONFIDENCE IS THE FIT',
              desc: 'We do not sell clothes. We sell confidence. Every combo is put together so you look and feel your best — without thinking twice.',
            },
            {
              number: '03',
              title: 'REAL & HONEST',
              desc: 'No fake reviews. No inflated prices. No gimmicks. Just real products, honest pricing, and a brand that actually cares about its customers.',
            },
          ].map((val) => (
            <div key={val.number} className="space-y-4 border-t-2 border-black pt-6">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-300">{val.number}</span>
              <h3 className="text-xl font-black italic uppercase tracking-tight">{val.title}</h3>
              <p className="text-[12px] text-zinc-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promise */}
      <div className="px-6 md:px-16 py-16 border-b border-zinc-100">
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-12">OUR PROMISE</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'Cash on Delivery available across India',
            '7-day hassle free return policy',
            'Every order personally verified before dispatch',
            'WhatsApp support — real people, real responses',
            'Premium quality at honest pricing',
            'Your confidence is our responsibility',
          ].map((promise) => (
            <div key={promise} className="flex items-center gap-4 border border-zinc-100 rounded-2xl px-6 py-4">
              <span className="text-black font-black text-lg">🖤</span>
              <p className="text-[11px] font-black uppercase tracking-widest text-zinc-600">{promise}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-16 py-20 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4">READY?</p>
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-10">
          WEAR THE<br />CONFIDENT.
        </h2>
        <a
          href="/products"
          className="inline-block  bg-black text-white px-6 py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-zinc-800 transition-all"
        >
          SHOP NOW
        </a>
      </div>

    </div>
  );
}