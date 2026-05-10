'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How can I track my Realmn order?',
    a: 'Once your order has been successfully processed and dispatched from our fulfillment center, Realmn provides tracking details through your registered WhatsApp number and email address. These updates allow you to monitor your shipment status, courier movement, and estimated delivery timeline in real time.',
  },
  {
    q: 'What is your return and replacement policy?',
    a: 'Realmn maintains a strict 48-hour return or replacement request window from the time of delivery. Products must remain unused, unwashed, and in original packaging with tags intact. A continuous unboxing video is mandatory for damaged or incorrect item claims.',
  },
  {
    q: 'Is Cash on Delivery (COD) available across India?',
    a: 'Yes, Realmn offers Cash on Delivery across most serviceable pin codes in India, subject to courier availability and fraud prevention checks.',
  },
  {
    q: 'Can I cancel my order after placing it?',
    a: 'Orders may only be cancelled within 6 hours of placement if they have not entered dispatch processing. Once shipped, cancellation is no longer possible.',
  },
  {
    q: 'What should I do if I receive a damaged or incorrect item?',
    a: 'Please contact support@realmn.com within 24 hours of delivery with your Order ID and complete unboxing video for verification.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen text-black p-6 md:p-24 font-sans max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter border-b-8 border-black pb-4 inline-block">
          F.A.Q.
        </h1>

        <p className="mt-8 text-sm md:text-base text-zinc-600 leading-relaxed uppercase tracking-wide font-semibold max-w-3xl">
          Welcome to the official Realmn Frequently Asked Questions center.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border-b border-zinc-200 pb-4"
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full py-4 flex justify-between items-center text-left"
            >
              <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] pr-4">
                {item.q}
              </span>

              <span className="text-2xl font-light">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            {openIndex === index && (
              <div className="mt-4">
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed uppercase tracking-tight font-medium">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 border-t-4 border-black pt-8">
        <h2 className="text-lg font-black uppercase italic mb-4">
          Additional Support
        </h2>

        <p className="text-sm text-zinc-600 leading-relaxed uppercase font-semibold">
          For further assistance, contact official Realmn support channels only.
        </p>
      </div>
    </div>
  );
}