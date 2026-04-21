'use client';
import { useState } from 'react';
import { createTypedBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Terminal } from 'lucide-react';

export function LoginForm({ supabaseUrl, supabaseKey }: { supabaseUrl: string, supabaseKey: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createTypedBrowserClient(supabaseUrl, supabaseKey);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        
        if (data.session) {
           // Email confirmation is disabled, logged in automatically
           router.push('/');
           router.refresh();
        } else {
           // Email confirmation is enabled
           setSuccess('REGISTRATION_OK:// Check your inbox for the verification link, then initiate session.');
           setIsSignUp(false);
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0A0A0B] h-screen">
      <div className="bg-[#131314] border border-[#2A2A2E] p-8 max-w-sm w-full">
         <div className="flex justify-center mb-6">
           <Terminal className="w-10 h-10 text-[#00E5FF]" />
         </div>
         <h1 className="text-xl text-center text-[#e5e2e3] font-['Space_Grotesk'] uppercase mb-6 tracking-widest">
           {isSignUp ? 'REGISTER_OPERATOR' : 'OPERATOR_AUTH'}
         </h1>
         <form onSubmit={handleAuth} className="space-y-4 font-data-sm">
           {error && <div className="text-[#ffb4ab] text-xs bg-[#ffb4ab]/10 p-2 border border-[#ffb4ab]/20 uppercase">ERROR:// {error}</div>}
           {success && <div className="text-[#00E5FF] text-xs bg-[#00E5FF]/10 p-2 border border-[#00E5FF]/20 uppercase">{success}</div>}
           <div>
             <input className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#00E5FF] px-4 py-2 transition-all outline-none" type="email" placeholder="OPERATOR_ID (EMAIL)" value={email} onChange={e => setEmail(e.target.value)} required />
           </div>
           <div>
             <input className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#00E5FF] px-4 py-2 transition-all outline-none" type="password" placeholder="PASSPHRASE" value={password} onChange={e => setPassword(e.target.value)} required />
           </div>
           <button disabled={loading} className="w-full bg-[#00E5FF] text-[#0A0A0B] font-label-caps py-2 hover:brightness-110 uppercase active:scale-95 transition-all outline-none mt-2">
             {loading ? 'PROCESSING...' : (isSignUp ? 'CREATE_ACCOUNT' : 'INITIATE_SESSION')}
           </button>
         </form>
         <div className="mt-8 text-center">
             <button
               onClick={() => { setIsSignUp(!isSignUp); setError(null); setSuccess(null); }}
               type="button"
               className="text-[10px] text-[#71717A] hover:text-[#00E5FF] font-label-caps uppercase transition-colors"
             >
               {isSignUp ? '< BACK_TO_LOGIN' : 'NO_ACCOUNT? REGISTER_NEW >'}
             </button>
         </div>
      </div>
    </div>
  );
}
