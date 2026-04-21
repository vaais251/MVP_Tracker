'use client';
import { useState } from 'react';
import { createTypedBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function CreateProjectForm({ supabaseUrl, supabaseKey, userId }: { supabaseUrl: string, supabaseKey: string, userId: string }) {
  const [name, setName] = useState('');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setLoading(true);
    const supabase = createTypedBrowserClient(supabaseUrl, supabaseKey);
    if(supabase) {
        await supabase.from('projects').insert({
            user_id: userId,
            name: name,
            problem_statement: problem,
            status: 'ACTIVE_BUILD',
            progress: 0
        });
        
        await supabase.from('execution_logs').insert({
            user_id: userId,
            event_id: 'PROJECT_INIT',
            status: 'SUCCESS',
            description: `Project ${name} initialized.`
        });
        
        router.refresh();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleCreate} className="mt-4 space-y-4 font-data-sm relative z-20">
      <div>
        <input 
          className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#00E5FF] px-4 py-2 transition-all outline-none" 
          placeholder="ENTER_PROJECT_NAME" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <textarea 
          className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#71717A] px-4 py-2 transition-all outline-none resize-none" 
          placeholder="PROBLEM_STATEMENT..." 
          value={problem} 
          onChange={e => setProblem(e.target.value)} 
          required 
        />
      </div>
      <button disabled={loading} className="w-full bg-[#00E5FF] text-[#0A0A0B] font-label-caps py-2 hover:brightness-110 uppercase active:scale-95 transition-all outline-none">
        {loading ? 'INITIALIZING...' : 'INITIALIZE_PROJECT'}
      </button>
    </form>
  );
}
