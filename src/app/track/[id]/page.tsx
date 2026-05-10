'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { superbase } from '@/lib/superbase';
import Image from 'next/image';
import Link from 'next/link';

interface Order {
  id: string;
  firstName: string;
  product_name: string;
  product_image: string;
  status: string;
  size: string;
  created_at: string;
  city: string;
  state: string;
  mobile: string;
}

const STATUS_STEPS = [
  { key: 'AWAITING_VERIFICATION', label: 'ORDER PLACED',  desc: 'Your order has been received' },
  { key: 'CONFIRMED',             label: 'CONFIRMED',     desc: 'Order verified & being prepared' },
  { key: 'DISPATCHED',            label: 'DISPATCHED',    desc: 'On the way to you' },
  { key: 'DELIVERED',             label: 'DELIVERED',     desc: 'Order delivered successfully' },
  { key: 'SOLD',                  label: 'COMPLETED',     desc: 'Thank you for shopping with us' },
];

export default function TrackPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await superbase
          .from('orders')
          .select('id, firstName, product_name, product_image, status, size, created_at, city, state, mobile')
          .eq('id', id)
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setOrder(data as Order);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!order) return;
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmed) return;

    setCancelling(true);
    try {
      const { error } = await superbase
        .from('orders')
        .update({ status: 'CANCELLED' })
        .eq('id', order.id);

      if (error) throw error;
      setOrder({ ...order, status: 'CANCELLED' });
      setCancelled(true);
    } catch (err) {
      console.error("Cancel Error:", err);
    } finally {
      setCancelling(false);
    }
  };

  const currentStep = STATUS_STEPS.findIndex(s => s.key === order?.status);
  const isCancelled = order?.status === 'CANCELLED';
  const canCancel = order?.status === 'AWAITING_VERIFICATION';

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black italic tracking-tighter text-black uppercase">REALMN</h1>
        <p className="text-black/40 font-black italic tracking-[0.4em] animate-pulse uppercase text-[9px]">
          LOCATING ORDER...
        </p>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-5xl font-black italic tracking-tighter text-black uppercase">REALMN</h1>
      <div className="border-2 border-black/10 rounded-3xl p-10 text-center max-w-sm w-full">
        <p className="text-5xl font-black italic uppercase tracking-tight text-black mb-2">404</p>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 mb-4">Order Not Found</p>
        <p className="text-[9px] font-black uppercase tracking-widest text-black/30">
          Invalid link or order does not exist.
        </p>
      </div>
      <Link href="/" className="text-[9px] font-black uppercase tracking-widest text-black/30 hover:text-black transition-all underline">
        GO TO HOMEPAGE →
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black font-sans">
      <div className="max-w-lg mx-auto px-5 py-10">

        {/* Header */}
        <header className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none hover:opacity-60 transition-all">
              REALMN
            </h1>
          </Link>
          <p className="text-[8px] font-black uppercase tracking-[0.6em] text-black/30 mt-2">
            ORDER TRACKING
          </p>
        </header>

        {/* Cancelled Banner */}
        {isCancelled && (
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-5 mb-6 text-center">
            <p className="text-[11px] font-black uppercase tracking-widest text-red-500">
              ✕ ORDER CANCELLED
            </p>
            <p className="text-[9px] font-black uppercase tracking-widest text-red-400/60 mt-1">
              This order has been cancelled
            </p>
          </div>
        )}

        {/* Product Hero Card — big image */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden mb-5 shadow-sm border border-black/5">

          {/* Big Image */}
          <div className="relative w-full h-80 bg-zinc-100">
            {order?.product_image ? (
              <Image
                src={order.product_image}
                alt={order.product_name}
                fill
                className="object-contain aspectRatio: '3/4'"
                unoptimized
              />
            ) : (
              <div className="h-full flex items-center justify-center text-[9px] font-black text-black/20 uppercase tracking-widest">
                NO IMAGE
              </div>
            )}
            {/* Status pill over image */}
            {!isCancelled && currentStep >= 0 && (
              <div className="absolute top-4 left-4">
                <span className="bg-black text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  {STATUS_STEPS[currentStep]?.label}
                </span>
              </div>
            )}
            {isCancelled && (
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  CANCELLED
                </span>
              </div>
            )}
          </div>

          {/* Product Info below image */}
          <div className="p-6">
            <p className="text-[7px] font-black uppercase tracking-[0.5em] text-black/30 mb-1">YOUR ORDER</p>
            <h2 className="text-2xl font-black italic tracking-tight uppercase leading-tight mb-4">
              {order?.product_name}
            </h2>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-black/5 rounded-2xl px-4 py-2">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/40">CUSTOMER</p>
                <p className="text-[11px] font-black uppercase tracking-wide">{order?.firstName}</p>
              </div>
              <div className="bg-black/5 rounded-2xl px-4 py-2">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/40">SIZE</p>
                <p className="text-[11px] font-black uppercase tracking-wide">{order?.size || 'M'}</p>
              </div>
              <div className="bg-black/5 rounded-2xl px-4 py-2">
                <p className="text-[7px] font-black uppercase tracking-widest text-black/40">LOCATION</p>
                <p className="text-[11px] font-black uppercase tracking-wide">{order?.city}, {order?.state}</p>
              </div>
              {order?.created_at && (
                <div className="bg-black/5 rounded-2xl px-4 py-2">
                  <p className="text-[7px] font-black uppercase tracking-widest text-black/40">PLACED</p>
                  <p className="text-[11px] font-black uppercase tracking-wide">{formatDate(order.created_at)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        {!isCancelled && (
          <div className="bg-white rounded-[2.5rem] p-7 mb-5 shadow-sm border border-black/5">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black/30 mb-8">
              TRACKING TIMELINE
            </p>

            <div className="space-y-0">
              {STATUS_STEPS.map((step, index) => {
                const isDone    = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div key={step.key} className="flex items-stretch gap-5">

                    {/* Dot + Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full shrink-0 mt-1 transition-all duration-500 ${
                        isCurrent ? 'bg-black scale-125 shadow-[0_0_12px_rgba(0,0,0,0.25)]' :
                        isDone    ? 'bg-black' :
                                    'bg-black/10'
                      }`} />
                      {index < STATUS_STEPS.length - 1 && (
                        <div className={`w-0.5 grow my-1 transition-all duration-500 ${
                          isDone ? 'bg-black' : 'bg-black/10'
                        }`} />
                      )}
                    </div>

                    {/* Label */}
                    <div className="pb-7">
                      <p className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                        isCurrent ? 'text-black' :
                        isDone    ? 'text-black/40' :
                                    'text-black/15'
                      }`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-[8px] font-black text-black/30 uppercase tracking-widest mt-1">
                          {step.desc}
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cancel Button */}
        {canCancel && !cancelled && (
          <div className="bg-white rounded-[2.5rem] p-6 mb-5 shadow-sm border border-black/5">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-black/30 mb-1">
              WANT TO CANCEL?
            </p>
            <p className="text-[9px] text-black/30 uppercase tracking-widest mb-5 font-black">
              Orders can only be cancelled before confirmation.
            </p>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full border-2 border-red-300 text-red-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-40"
            >
              {cancelling ? 'CANCELLING...' : 'CANCEL ORDER ✕'}
            </button>
          </div>
        )}

        {/* Support */}
        <div className="bg-black rounded-[2.5rem] p-8 text-center mb-5">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40 mb-4">
            NEED HELP?
          </p>
          <a
            href="https://wa.me/919084938127"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
          >
            CONTACT ON WHATSAPP →
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[7px] font-black uppercase tracking-[0.5em] text-black/20">
            REALMN — WEAR CONFIDENT.
          </p>
        </div>

      </div>
    </div>
  );
}