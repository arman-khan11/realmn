'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { superbase } from '@/lib/superbase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('SYSTEM_LOCKED');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('AUTHENTICATING...');

    const { error } = await superbase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus('ERROR: ACCESS_DENIED');
    } else {
      setStatus('ACCESS_GRANTED');
      // ✅ localStorage bhi set karo — admin page check karta hai
      localStorage.setItem('realmn_auth_key', 'authenticated_user_777');
      router.push('/admin');
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 font-sans text-black">
      <div className="w-full max-w-sm border-2 border-black p-8 md:p-12 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
        
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">REALMN / CORE</h1>
          <div className="flex justify-between mt-4 border-b border-zinc-100 pb-2">
            <p className="text-[7px] font-black uppercase tracking-[0.5em] text-zinc-400">Security_Gate</p>
            <p className={`text-[7px] font-black uppercase tracking-[0.5em] ${status.includes('ERROR') ? 'text-red-600' : 'text-black'}`}>
              {status}
            </p>
          </div>
        </header>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="border-b-2 border-black focus-within:bg-zinc-50 transition-all duration-300">
            <label className="text-[7px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2 pt-1 block">Identity_Protocol</label>
            <input
              type="email"
              // ✅ uppercase hata diya
              className="w-full bg-transparent px-2 py-2 outline-none text-sm font-bold tracking-widest placeholder:text-zinc-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL_ADDRESS"
              required
            />
          </div>

          <div className="border-b-2 border-black focus-within:bg-zinc-50 transition-all duration-300">
            <label className="text-[7px] font-black uppercase tracking-[0.4em] text-zinc-400 px-2 pt-1 block">Access_Key</label>
            <input
              type="password"
              // ✅ uppercase hata diya
              className="w-full bg-transparent px-2 py-2 outline-none text-sm font-bold tracking-widest placeholder:text-zinc-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="w-full bg-black text-white py-5 font-black uppercase tracking-[1em] text-[10px] hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-xl">
            UNLOCK_SYSTEM
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-[6px] font-black uppercase tracking-[0.3em] text-zinc-300">
            Authorized_Personnel_Only // Unauthorized_Access_Is_Logged
          </p>
        </footer>
      </div>
    </div>
  );
}