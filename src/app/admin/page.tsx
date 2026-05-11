'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { superbase } from '@/lib/superbase';
import Image from 'next/image';

export default function AdminPage() {
  const router = useRouter();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('SYSTEM_READY');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [sizes, setSizes] = useState('');
  const [qty, setQty] = useState('');
const [section, setSection] = useState<'Topwear' | 'Bottomwear' | 'Homepage'>('Homepage');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = () => {
      const auth = localStorage.getItem('realmn_auth_key');
      if (auth !== 'authenticated_user_777') {
        router.push('/admin/login');
      } else {
        setIsAuthorized(true);
      }
    };
    checkAccess();
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setStatus('ASSET_STAGED');
    }
  };

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      setStatus('ERROR: ASSET_MISSING');
      return;
    }
    
    setLoading(true);
    setStatus('SYNCING_WITH_DATABASE...');

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await superbase.storage
       .from('PRODUCT-IMAGES')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = superbase.storage.from('PRODUCT-IMAGES').getPublicUrl(fileName);
      
      const { error: insertError } = await superbase.from('products').insert([{
        name,
        price: Number(price),
        description: desc,
        sizes,
        quantity: Number(qty),
        image_url: urlData.publicUrl,
        section, // ✅ NEW
      }]);

      if (insertError) throw insertError;

      setStatus('SUCCESS: ARTICLE_ARCHIVED');
      
      setTimeout(() => {
        setName(''); setPrice(''); setDesc(''); setSizes(''); setQty('');
        setSection('Topwear');
        setImageFile(null); setPreview(null);
        setStatus('SYSTEM_READY');
      }, 2000);
      
    } catch (err) {
      console.error("ADMIN_ERROR:", err);
      setStatus('ERROR: OPERATION_FAILED');
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthorized) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-[10px] font-black uppercase tracking-[1em] animate-pulse">Authenticating_Realmn...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black font-sans flex flex-col items-center justify-start p-4 md:p-10">
      <div className="w-full max-w-lg">
        
        <header className="mb-10 text-center border-b-2 border-black pb-6">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">REALMN / ADMIN</h1>
          <div className="flex justify-between mt-4">
            <p className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-400">Terminal_v1.6</p>
            <p className={`text-[7px] font-black uppercase tracking-[0.5em] ${status.includes('ERROR') ? 'text-red-600' : 'text-black'}`}>
              STATUS // {status}
            </p>
          </div>
        </header>

        <form onSubmit={handleAddProduct} className="space-y-8">
          
          {/* IMAGE */}
          <div className="relative w-full h-48 bg-zinc-50 border-2 border-black overflow-hidden group">
            <div className="absolute top-2 left-2 z-20">
              <span className="text-[7px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5">Asset_Upload</span>
            </div>
            <div className="relative h-full w-full flex items-center justify-center">
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-contain p-4" unoptimized />
              ) : (
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300 italic">No_Visual_Selected</p>
              )}
              <input
                type="file" accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-30"
                onChange={handleImageChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-6" style={{ opacity: loading ? 0.4 : 1 }}>

            <div className="border-b-2 border-black">
              <label className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 block px-2 pt-1">Article_Name</label>
              <input
                placeholder="NAME"
                className="w-full bg-transparent px-2 py-2 uppercase font-black italic text-xl outline-none"
                value={name} onChange={e => setName(e.target.value)} required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-b-2 border-black">
                <label className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 block px-2 pt-1">Price (INR)</label>
                <input
                  placeholder="0.00"
                  className="w-full bg-transparent px-2 py-2 font-mono text-lg outline-none"
                  value={price} onChange={e => setPrice(e.target.value)} required
                />
              </div>
              <div className="border-b-2 border-black">
                <label className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 block px-2 pt-1">Quantity</label>
                <input
                  type="number" placeholder="0"
                  className="w-full bg-transparent px-2 py-2 font-mono text-lg outline-none"
                  value={qty} onChange={e => setQty(e.target.value)} required
                />
              </div>
            </div>

           {/* SECTION SELECTOR */}
<div className="border-b-2 border-black pb-4">
  <label className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 block px-2 pt-1 mb-3">Section</label>
  <div className="grid grid-cols-3 gap-3 px-2">
    {(['Homepage', 'Topwear', 'Bottomwear'] as const).map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => setSection(s)}
        className={`py-3 border-2 text-[9px] font-black uppercase tracking-widest transition-all ${
          section === s
            ? 'bg-black text-white border-black'
            : 'border-zinc-200 text-zinc-400 hover:border-black'
        }`}
      >
        {s === 'Homepage' ? '🏠' : s === 'Topwear' ? '👕' : '👖'} {s}
      </button>
    ))}
  </div>
</div>
            <div className="border-b-2 border-black">
              <label className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 block px-2 pt-1">Sizes</label>
              <input
                placeholder="S / M / L / XL"
                className="w-full bg-transparent px-2 py-2 uppercase text-xs font-bold tracking-widest outline-none"
                value={sizes} onChange={e => setSizes(e.target.value)}
              />
            </div>

            <div className="border-b-2 border-black">
              <label className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-400 block px-2 pt-1">Description</label>
              <textarea
                placeholder="FABRIC_DETAILS"
                className="w-full bg-transparent px-2 py-2 h-20 text-[10px] italic outline-none resize-none uppercase tracking-widest leading-relaxed"
                value={desc} onChange={e => setDesc(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 font-black uppercase tracking-[0.8em] text-[10px] hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              {loading ? 'INITIALIZING_SYNC...' : 'EXECUTE_SAVE'}
            </button>
          </div>
        </form>

        <div className="mt-10 border-2 border-black p-4 bg-zinc-50 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : status.includes('SUCCESS') ? 'bg-green-500' : 'bg-black'}`}></div>
          <p className="text-[9px] font-black uppercase tracking-widest">{status}</p>
        </div>
      </div>
    </div>
  );
}