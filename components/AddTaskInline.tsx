'use client';
import { useState } from 'react';
import { createTypedBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function AddTaskInline({ projectId, userId, type, supabaseUrl, supabaseKey }: { projectId: string | undefined, userId: string, type: 'CODE_TASKS' | 'RESEARCH_PHASE' | 'SOCIAL_DISTRIBUTION', supabaseUrl: string, supabaseKey: string }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    
    setLoading(true);
    const supabase = createTypedBrowserClient(supabaseUrl, supabaseKey);
    if(supabase) {
        await supabase.from('tasks').insert({
            user_id: userId,
            project_id: projectId,
            category: type,
            title: title,
            is_completed: false
        });
        setTitle('');
        router.refresh();
    }
    setLoading(false);
  };

  if(!projectId) return null;

  return (
    <form onSubmit={handleAdd} className="mt-2 flex">
      <input 
        className="flex-1 bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[var(--theme-color)] text-[var(--theme-color)] px-3 py-1.5 text-xs outline-none" 
        style={{ '--theme-color': type === 'CODE_TASKS' ? '#00E5FF' : type === 'RESEARCH_PHASE' ? '#fec931' : '#2ff801' } as any}
        placeholder={`+ ADD_${type}`} 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <button disabled={loading || !title} type="submit" className="px-3 bg-[#1C1C1E] border border-l-0 border-[#2A2A2E] text-xs text-white hover:bg-[#2A2A2E]">
         ENTER
      </button>
    </form>
  );
}
