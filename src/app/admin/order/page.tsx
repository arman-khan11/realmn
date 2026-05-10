'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { superbase } from '@/lib/superbase';
import Image from 'next/image';
import { PostgrestError } from '@supabase/supabase-js';

interface Order {
  id: string;
  firstName: string;
  mobile: string;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  product_name: string;
  product_image: string;
  status: string;
  created_at: string;
  size: string;
  payment_method: string;
  staticLocation: string;
}

export default function AdminOrders() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await superbase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setIsAuthorized(true);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!isAuthorized) return;
    const loadOrders = async () => {
      setLoading(true);
      try {
        const { data, error } = await superbase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setOrders(data as Order[]);
      } catch (err: unknown) {
        if (err instanceof Error) console.error("System Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [isAuthorized]);

  const fetchOrders = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data, error } = await superbase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setOrders(data as Order[]);
    } catch (err: unknown) {
      if (err instanceof Error) console.error("System Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string): Promise<void> => {
    setUpdatingId(id);
    try {
      const { error }: { error: PostgrestError | null } = await superbase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error) console.error("Update Error:", err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ CONTACT button — tracking link + confirm msg jaayega
  const openWhatsApp = (order: Order): void => {
    const cleaned = order.mobile.replace(/\D/g, '');
    const number = cleaned.startsWith('91') && cleaned.length === 12
      ? cleaned
      : `91${cleaned}`;

    const trackingLink = `https://realmn.in/track/${order.id}`;

    const message = encodeURIComponent(
      `*REALMN — ORDER CONFIRMED* ✅\n` +
      `——————————————\n` +
      `*Product:* ${order.product_name}\n` +
      `*Name:* ${order.firstName}\n` +
      `*Size:* ${order.size || 'M'}\n` +
      `*Payment:* ${order.payment_method || 'COD'}\n` +
      `——————————————\n` +
      `YOUR ORDER IS LOCKED IN.\n` +
      `WE'LL DISPATCH IT SOON. 🖤\n` +
      `——————————————\n` +
      `*TRACK YOUR ORDER:*\n` +
      `${trackingLink}\n` +
      `——————————————\n` +
      `REALMN — WEAR THE CONFIDENT.`
    );

    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  // ✅ CONFIRM — sirf status update, koi msg nahi
  const confirmOrder = async (order: Order): Promise<void> => {
    await updateStatus(order.id, 'CONFIRMED');
  };

  const cancelOrder = async (id: string): Promise<void> => {
    const confirmed = window.confirm("Cancel this order?");
    if (!confirmed) return;
    await updateStatus(id, 'CANCELLED');
  };

  const handleLogout = async (): Promise<void> => {
    await superbase.auth.signOut();
    router.push('/admin/login');
  };

  const getStatusStyle = (status: string): string => {
    switch (status) {
      case 'CONFIRMED':  return 'bg-green-500 text-white';
      case 'CANCELLED':  return 'bg-red-500 text-white';
      case 'DISPATCHED': return 'bg-blue-500 text-white';
      case 'DELIVERED':  return 'bg-zinc-400 text-white';
      case 'SOLD':       return 'bg-purple-500 text-white';
      default:           return 'bg-black text-white';
    }
  };

  if (!isAuthorized) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-[10px] font-black uppercase tracking-[1em] animate-pulse">Authenticating_Realmn...</p>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white font-black italic tracking-[0.4em] animate-pulse uppercase text-xs">
        System: Scanning Database...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 font-sans text-black">
      <div className="max-w-6xl mx-auto">

        <header className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-7xl font-black italic tracking-tighter leading-none">ORDERS</h1>
            <p className="text-[10px] font-black tracking-[0.4em] text-zinc-400 mt-4 uppercase">REALMN ADMINISTRATIVE INTERFACE</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={fetchOrders}
              className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              SYNC
            </button>
            <button
              onClick={handleLogout}
              className="border-2 border-black text-black px-8 py-3 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-black hover:text-white transition-all"
            >
              LOGOUT
            </button>
          </div>
        </header>

        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order: Order) => (
              <div
                key={order.id}
                className={`bg-white border rounded-[2.5rem] p-8 flex flex-col lg:flex-row gap-10 items-center hover:shadow-2xl transition-all duration-500 ${
                  order.status === 'CANCELLED'  ? 'border-red-100 opacity-60' :
                  order.status === 'DELIVERED'  ? 'border-zinc-100 opacity-60' :
                  order.status === 'SOLD'       ? 'border-purple-100 opacity-60' :
                  order.status === 'CONFIRMED'  ? 'border-green-100' :
                  order.status === 'DISPATCHED' ? 'border-blue-100' :
                  'border-zinc-100'
                }`}
              >
                {/* Product Image */}
                <div className="relative w-full max-w-40 aspect-3/4 bg-zinc-100 rounded-3xl overflow-hidden shrink-0">
                  {order.product_image ? (
                    <Image
                      src={order.product_image}
                      alt="SKU"
                      fill
                      className="object-cover transition-all duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-[8px] font-black text-zinc-300">NO SKU ART</div>
                  )}
                </div>

                {/* Order Info */}
                <div className="grow w-full space-y-6">
                  <div className="flex justify-between items-start border-b border-zinc-50 pb-4">
                    <div>
                      <h3 className="text-3xl font-black italic tracking-tight uppercase leading-none">{order.firstName}</h3>
                      <p className="text-[11px] font-black text-zinc-400 mt-2 tracking-widest">{order.mobile}</p>
                    </div>
                    <span className={`px-5 py-1 rounded-full text-[9px] font-black italic uppercase tracking-[0.2em] ${getStatusStyle(order.status)}`}>
                      {order.status || 'PENDING'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[12px] font-bold uppercase italic text-zinc-600">
                    <div>
                      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">COORDINATES</p>
                      <p>{order.houseNo} {order.street}, {order.city}, {order.state} - {order.pincode}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">SKU DATA</p>
                      <p>{order.product_name} / SIZE: {order.size || 'M'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">PAYMENT</p>
                      <p>{order.payment_method || 'COD'}</p>
                    </div>
                    {order.staticLocation && order.staticLocation !== 'Manual Entry' && (
                      <div>
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-1">LIVE LOCATION</p>
                        <a
                          href={order.staticLocation}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline text-[11px] font-black italic"
                        >
                          VIEW ON MAP →
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full lg:w-auto min-w-40">

                  {/* ✅ CONTACT — tracking link wala msg jaayega */}
                  <button
                    onClick={() => openWhatsApp(order)}
                    className="bg-black text-white py-3 px-8 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-zinc-800 shadow-lg transition-all"
                  >
                    CONTACT
                  </button>

                  {/* ✅ CONFIRM — sirf status update, koi msg nahi */}
                  {order.status === 'AWAITING_VERIFICATION' && (
                    <button
                      onClick={() => confirmOrder(order)}
                      disabled={updatingId === order.id}
                      className="bg-green-500 text-white py-3 px-8 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-green-600 shadow-lg transition-all disabled:opacity-50"
                    >
                      {updatingId === order.id ? '...' : 'CONFIRM ✓'}
                    </button>
                  )}

                  {order.status === 'CONFIRMED' && (
                    <button
                      onClick={() => updateStatus(order.id, 'DISPATCHED')}
                      disabled={updatingId === order.id}
                      className="bg-blue-500 text-white py-3 px-8 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-blue-600 shadow-lg transition-all disabled:opacity-50"
                    >
                      {updatingId === order.id ? '...' : 'DISPATCH 🚚'}
                    </button>
                  )}

                  {order.status === 'DISPATCHED' && (
                    <button
                      onClick={() => updateStatus(order.id, 'DELIVERED')}
                      disabled={updatingId === order.id}
                      className="bg-zinc-500 text-white py-3 px-8 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-zinc-600 shadow-lg transition-all disabled:opacity-50"
                    >
                      {updatingId === order.id ? '...' : 'DELIVERED ✓'}
                    </button>
                  )}

                  {order.status === 'DELIVERED' && (
                    <button
                      onClick={() => updateStatus(order.id, 'SOLD')}
                      disabled={updatingId === order.id}
                      className="bg-purple-500 text-white py-3 px-8 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-purple-600 shadow-lg transition-all disabled:opacity-50"
                    >
                      {updatingId === order.id ? '...' : 'MARK SOLD 🖤'}
                    </button>
                  )}

                  {!['CANCELLED', 'DELIVERED', 'SOLD'].includes(order.status) && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      disabled={updatingId === order.id}
                      className="border-2 border-red-200 text-red-400 py-3 px-8 rounded-full text-[10px] font-black uppercase italic tracking-[0.2em] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50"
                    >
                      {updatingId === order.id ? '...' : 'CANCEL ✕'}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 rounded-[3rem] border-4 border-dashed border-zinc-100">
              <p className="text-zinc-200 text-2xl font-black italic uppercase tracking-[0.5em]">ZERO DEPLOYMENTS FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}