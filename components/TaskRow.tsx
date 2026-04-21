'use client';
import { useRouter } from 'next/navigation';
import { createTypedBrowserClient } from '@/lib/supabase/client';

export function TaskRow({ task, themeColor, supabaseUrl, supabaseKey }: { task: any, themeColor: string, supabaseUrl: string, supabaseKey: string }) {
  const router = useRouter();

  const toggleTask = async () => {
    const supabase = createTypedBrowserClient(supabaseUrl, supabaseKey);
    if(supabase) {
        const isNowComplete = !task.is_completed;
        await supabase.from('tasks').update({ is_completed: isNowComplete }).eq('id', task.id);
        
        // Optionally create log
        await supabase.from('execution_logs').insert({
            user_id: task.user_id,
            project_id: task.project_id,
            event_id: 'TASK_EVENT',
            status: 'SUCCESS',
            description: `Task ${task.title} marked ${isNowComplete ? 'COMPLETE' : 'INCOMPLETE'}`
        });

        router.refresh();
    }
  };

  return (
    <div onClick={toggleTask} className={`flex items-center gap-3 p-2 border transition-all cursor-pointer group ${task.is_completed ? 'bg-[#1C1C1E] border-transparent hover:border-[#2A2A2E]' : 'bg-[#0A0A0B] border-[#2A2A2E] hover:border-[var(--theme-color)]/50'}`} style={{ '--theme-color': themeColor } as any}>
      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${task.is_completed ? 'border-[var(--theme-color)]' : 'border-[#71717A]'}`}>
        {task.is_completed && <span className="text-[var(--theme-color)] text-[12px] font-bold">✓</span>}
      </div>
      <span className={`font-['Space_Grotesk'] text-sm ${task.is_completed ? 'text-white' : 'text-[#71717A]'}`}>{task.title}</span>
    </div>
  );
}
