"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { superbase } from '@/lib/superbase';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface FormData {
  firstName: string;
  mobile: string;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutModal({ product, size, isOpen, onClose }: { 
  product: Product, 
  size: string | null,  // ✅ size prop
  isOpen: boolean, 
  onClose: () => void 
}) {
  const [step, setStep] = useState<'FORM' | 'SUCCESS'>('FORM');
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'PREPAID'>('COD');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false); // ✅ T&C state

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    mobile: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const detectLocation = (): void => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      setSyncing(true);
      setStatusMsg('SYNCING PRECISE LOCATION...');

      navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
        try {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });

          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await res.json();

          if (data.address) {
            setFormData((prev: FormData) => ({
              ...prev,
              houseNo: data.address.house_number || data.address.building || prev.houseNo,
              street: data.address.road || data.address.suburb || data.address.neighbourhood || prev.street,
              city: data.address.city || data.address.town || data.address.village || prev.city,
              state: data.address.state || prev.state,
              pincode: data.address.postcode || prev.pincode
            }));
            setStatusMsg('LOCATION SYNCED ✓');
          }
        } catch (err: unknown) {
          setStatusMsg('SYNC FAILED. ENTER MANUALLY.');
        } finally {
          setSyncing(false);
        }
      }, (geoError: GeolocationPositionError) => {
        setStatusMsg('ACCESS DENIED. PLEASE TYPE ADDRESS.');
        setSyncing(false);
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(detectLocation, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOrderSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // ✅ T&C check
    if (!agreedToTerms) {
      alert('Please agree to Terms & Conditions first!');
      return;
    }

    setLoading(true);
    try {
      const mapsLink: string = coords
        ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
        : 'Manual Entry';

      const { error }: { error: PostgrestError | null } = await superbase.from('orders').insert([
        {
          "firstName": formData.firstName,
          "mobile": formData.mobile,
          "houseNo": formData.houseNo,
          "street": formData.street,
          "city": formData.city,
          "state": formData.state,
          "pincode": formData.pincode,
          "staticLocation": mapsLink,
          "product_id": product.id,
          "product_name": product.name,
          "product_image": product.image_url ?? null,
          "status": 'AWAITING_VERIFICATION',
          "size": size || 'M',  // ✅ size prop use karo
          "payment_method": paymentMethod
        }
      ]);

      if (error) {
        console.error("Supabase Save Error:", error.message);
        throw error;
      }

      const myNumber: string = "919084938127";
      const message: string = `*NEW ORDER - REALMN*%0A` +
        `--------------------------%0A` +
        `*Product:* ${product.name}%0A` +
        `*Size:* ${size || 'M'}%0A` +
        `*Customer:* ${formData.firstName}%0A` +
        `*Payment:* ${paymentMethod}%0A` +
        `*Location:* ${mapsLink}%0A` +
        `--------------------------%0A` +
        `*Action:* Shiprocket processing pending.`;

      window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
      setStep('SUCCESS');
    } catch (err: unknown) {
      if (err instanceof Error) console.error("Submit Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 z-100 font-sans text-black">
      <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-500 max-h-[90vh] overflow-y-auto">

        {step === 'FORM' && (
          <form onSubmit={handleOrderSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">CHECKOUT</h2>
              <button type="button" onClick={onClose} className="text-zinc-300 hover:text-black transition-all text-xl">✕</button>
            </div>

            {/* Size indicator */}
            {size && (
              <div className="bg-zinc-50 rounded-2xl px-4 py-3 flex justify-between items-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">SELECTED SIZE</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-black">{size}</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-1">
              <p className={`text-[8px] font-black uppercase tracking-[0.4em] italic ${syncing ? 'text-blue-500 animate-pulse' : 'text-zinc-400'}`}>
                {statusMsg}
              </p>
              <button
                type="button"
                onClick={detectLocation}
                className="text-[7px] font-black underline uppercase tracking-widest text-zinc-300 hover:text-black transition-colors"
              >
                {syncing ? 'SYNCING...' : 'NOT ACCURATE? RE-SYNC NOW'}
              </button>
            </div>

            <div className="space-y-4">
              <input placeholder="FULL NAME" className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black uppercase text-xs font-black italic" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
              <input placeholder="MOBILE NUMBER" type="tel" className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black text-xs font-black italic" onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required />

              <div className="space-y-4">
                <input placeholder="HOUSE / FLAT NO." value={formData.houseNo} className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black text-xs font-black italic uppercase" onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })} required />
                <input placeholder="STREET / LANDMARK" value={formData.street} className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black text-xs font-black italic uppercase" onChange={(e) => setFormData({ ...formData, street: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <input placeholder="CITY" value={formData.city} className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black text-xs font-black italic uppercase" onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                <input placeholder="PINCODE" value={formData.pincode} className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black text-xs font-black italic" onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} required />
              </div>
              <input placeholder="STATE" value={formData.state} className="w-full border-b-2 border-zinc-100 py-2 outline-none focus:border-black text-xs font-black italic uppercase" onChange={(e) => setFormData({ ...formData, state: e.target.value })} required />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400 italic">PAYMENT METHOD</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`py-4 rounded-2xl border-2 text-[9px] font-black uppercase tracking-widest italic transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 text-zinc-400 hover:border-zinc-400'
                  }`}
                >
                  💵 CASH ON DELIVERY
                </button>
                <button
                  type="button"
                  disabled
                  className="py-4 rounded-2xl border-2 border-zinc-100 text-[9px] font-black uppercase tracking-widest italic text-zinc-300 cursor-not-allowed"
                >
                  🔒 PREPAID
                  <span className="block text-[7px] font-black tracking-widest text-zinc-300 mt-1">COMING SOON</span>
                </button>
              </div>
            </div>

            {/* ✅ T&C Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-black cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 leading-relaxed cursor-pointer">
                I AGREE TO THE{' '}
                <Link href="/terms" target="_blank" className="text-black underline hover:text-zinc-600">
                  TERMS & CONDITIONS
                </Link>
                ,{' '}
                <Link href="/terms#privacy" target="_blank" className="text-black underline hover:text-zinc-600">
                  PRIVACY POLICY
                </Link>
                {' '}AND{' '}
                <Link href="/terms#returns" target="_blank" className="text-black underline hover:text-zinc-600">
                  RETURN POLICY
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !agreedToTerms}  // ✅ T&C check
              className={`w-full py-6 rounded-full font-black uppercase mt-4 tracking-[0.3em] text-[10px] italic shadow-xl active:scale-95 transition-all ${
                agreedToTerms
                  ? 'bg-black text-white hover:bg-zinc-800'
                  : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
              }`}
            >
              {loading ? 'DEPLOYING...' : 'CONFIRM ORDER'}
            </button>

          </form>
        )}

        {step === 'SUCCESS' && (
          <div className="text-center py-12">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4 text-black">ORDER PLACED</h2>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-8">
              YOU WILL RECEIVE A WHATSAPP CONFIRMATION SOON. 🖤
            </p>
            <button onClick={onClose} className="w-full border-2 border-black py-4 rounded-full font-black uppercase text-[10px] tracking-[0.4em] italic hover:bg-black hover:text-white transition-all">
              CLOSE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}