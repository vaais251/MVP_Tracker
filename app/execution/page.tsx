import React from 'react';
import { Link2, Share2, Rocket } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SetupRequired } from '@/components/SupabaseGuard';

export default async function ExecutionPage() {
  const supabase = await createClient();
  if (!supabase) return <SetupRequired />;

  // Fetch tasks
  const { data: tasks } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });
  
  const codeTasks = tasks?.filter(t => t.category === 'CODE_TASKS') || [];
  const researchTasks = tasks?.filter(t => t.category === 'RESEARCH_PHASE') || [];
  const socialTasks = tasks?.filter(t => t.category === 'SOCIAL_DISTRIBUTION') || [];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] relative p-4 md:p-6 space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-full">
        {/* Section 1: Daily Interactive Checklist */}
        <section className="lg:col-span-4 space-y-4">
          <div className="border border-[#2A2A2E] bg-[#131314] p-4 relative">
            <div className="absolute -top-3 left-4 px-2 bg-[#131314] text-[#00E5FF] font-label-caps text-[9px] uppercase tracking-[0.2em] border border-[#2A2A2E]">
              EXECUTION_PROTOCOL
            </div>
            <div className="space-y-6 mt-4">
              
              {/* Category: Code */}
              <div>
                <h3 className="font-label-caps text-[#A1A1AA] text-[10px] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00E5FF]"></span> CODE_TASKS
                </h3>
                <div className="space-y-2">
                  {codeTasks.length > 0 ? codeTasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-3 p-2 border transition-all cursor-pointer group ${task.is_completed ? 'bg-[#1C1C1E] border-transparent hover:border-[#2A2A2E]' : 'bg-[#0A0A0B] border-[#2A2A2E] hover:border-[#00E5FF]/50'}`}>
                      <div className={`w-4 h-4 border flex items-center justify-center ${task.is_completed ? 'border-[#00E5FF]' : 'border-[#71717A]'}`}>
                        {task.is_completed && <span className="text-[#00E5FF] text-[12px] font-bold">✓</span>}
                      </div>
                      <span className={`font-['Space_Grotesk'] text-sm ${task.is_completed ? 'text-white' : 'text-[#71717A]'}`}>{task.title}</span>
                    </div>
                  )) : (
                     <div className="text-[10px] font-data-sm text-[#71717A]">NO_TASKS</div>
                  )}
                </div>
              </div>

              {/* Category: Research */}
              <div>
                <h3 className="font-label-caps text-[#A1A1AA] text-[10px] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#fec931]"></span> RESEARCH_PHASE
                </h3>
                <div className="space-y-2">
                  {researchTasks.length > 0 ? researchTasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-3 p-2 border transition-all cursor-pointer group ${task.is_completed ? 'bg-[#1C1C1E] border-transparent hover:border-[#2A2A2E]' : 'bg-[#0A0A0B] border-[#2A2A2E] hover:border-[#00E5FF]/50'}`}>
                      <div className={`w-4 h-4 border flex items-center justify-center ${task.is_completed ? 'border-[#fec931]' : 'border-[#71717A]'}`}>
                        {task.is_completed && <span className="text-[#fec931] text-[12px] font-bold">✓</span>}
                      </div>
                      <span className={`font-['Space_Grotesk'] text-sm ${task.is_completed ? 'text-white' : 'text-[#71717A]'}`}>{task.title}</span>
                    </div>
                  )) : (
                     <div className="text-[10px] font-data-sm text-[#71717A]">NO_TASKS</div>
                  )}
                </div>
              </div>

              {/* Category: Social Prep */}
              <div>
                <h3 className="font-label-caps text-[#A1A1AA] text-[10px] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#2ff801]"></span> SOCIAL_DISTRIBUTION
                </h3>
                <div className="space-y-2">
                  {socialTasks.length > 0 ? socialTasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-3 p-2 border transition-all cursor-pointer group ${task.is_completed ? 'bg-[#1C1C1E] border-transparent hover:border-[#2A2A2E]' : 'bg-[#0A0A0B] border-[#2A2A2E] hover:border-[#00E5FF]/50'}`}>
                      <div className={`w-4 h-4 border flex items-center justify-center ${task.is_completed ? 'border-[#2ff801]' : 'border-[#71717A]'}`}>
                        {task.is_completed && <span className="text-[#2ff801] text-[12px] font-bold">✓</span>}
                      </div>
                      <span className={`font-['Space_Grotesk'] text-sm ${task.is_completed ? 'text-white' : 'text-[#71717A]'}`}>{task.title}</span>
                    </div>
                  )) : (
                    <div className="text-[10px] font-data-sm text-[#71717A]">NO_TASKS</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Link Management */}
          <div className="border border-[#2A2A2E] bg-[#131314] p-4 relative">
            <div className="absolute -top-3 left-4 px-2 bg-[#131314] text-[#00E5FF] font-label-caps text-[9px] uppercase tracking-[0.2em] border border-[#2A2A2E]">
              DEPLOYMENT_LINKS
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <label className="font-label-caps text-[#71717A] text-[9px] block mb-1">GITHUB_REPOSITORY_URL</label>
                <div className="flex items-center bg-[#0A0A0B] border border-[#2A2A2E] focus-within:border-[#00E5FF] transition-all">
                  <Link2 className="w-4 h-4 px-2 box-content text-[#71717A]" />
                  <input className="bg-transparent border-none focus:ring-0 text-data-sm text-[#00E5FF] w-full py-2 outline-none" placeholder="https://github.com/..." type="text"/>
                </div>
              </div>
              <div>
                <label className="font-label-caps text-[#71717A] text-[9px] block mb-1">LINKEDIN_PUBLICATION_LINK</label>
                <div className="flex items-center bg-[#0A0A0B] border border-[#2A2A2E] focus-within:border-[#00E5FF] transition-all">
                  <Share2 className="w-4 h-4 px-2 box-content text-[#71717A]" />
                  <input className="bg-transparent border-none focus:ring-0 text-data-sm text-[#00E5FF] w-full py-2 outline-none" placeholder="https://linkedin.com/posts/..." type="text"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Drafter (Snipped for brevity similar to previous) */}
        <section className="lg:col-span-8 flex flex-col h-[calc(100vh-16rem)] lg:h-[calc(100vh-10rem)] pb-4">
          <div className="border border-[#2A2A2E] bg-[#131314] flex flex-col h-full overflow-hidden">
            
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1C1C1E] border-b border-[#2A2A2E]">
              <div className="flex gap-4">
                <button className="text-[#00E5FF] font-label-caps text-[10px] tracking-widest border-b border-[#00E5FF] pb-1">DRAFT_MODE</button>
                <button className="text-[#71717A] font-label-caps text-[10px] tracking-widest hover:text-white transition-colors pb-1">PREVIEW</button>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-[#00E5FF] text-[#00626e] font-label-caps text-[10px] hover:brightness-110 active:scale-[0.98] transition-all">
                  SYNC_REPO
                </button>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2A2A2E] overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="px-4 py-2 bg-[#0A0A0B] border-b border-[#2A2A2E] flex items-center justify-between shrink-0">
                  <span className="font-label-caps text-[10px] text-[#A1A1AA]">README.md</span>
                  <span className="text-[9px] text-[#71717A] font-data-sm">Markdown</span>
                </div>
                <div className="flex-1 p-4 bg-[#0A0A0B] font-data-sm text-sm text-white overflow-y-auto custom-scrollbar relative">
                  <div className="absolute inset-y-4 left-4 w-[1px] bg-[#2A2A2E]"></div>
                  <textarea 
                    className="w-full h-full bg-transparent border-none focus:ring-0 p-0 text-sm editor-line resize-none outline-none text-[#e5e2e3]" 
                    spellCheck="false" 
                    defaultValue={`# MVP_OPERATOR_v1.0

A clinical mission control center for developers.

### Run
npm run start`}
                  />
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="px-4 py-2 bg-[#0A0A0B] border-b border-[#2A2A2E] flex items-center justify-between shrink-0">
                  <span className="font-label-caps text-[10px] text-[#A1A1AA]">LINKEDIN_DRAFT</span>
                  <span className="text-[9px] text-[#71717A] font-data-sm">Text (UTF-8)</span>
                </div>
                <div className="flex-1 p-4 bg-[#0A0A0B] font-data-sm text-sm text-white overflow-y-auto custom-scrollbar relative">
                  <textarea 
                    className="w-full h-full bg-transparent border-none focus:ring-0 p-0 text-sm editor-line resize-none outline-none text-[#e5e2e3]" 
                    spellCheck="false"
                    defaultValue={`Build in public...`}
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-2 bg-[#1C1C1E] border-t border-[#2A2A2E] flex justify-between items-center shrink-0">
              <div className="flex gap-4 text-[9px] text-[#71717A] font-data-sm">
                <span>LINES: 42</span>
              </div>
              <div className="text-[9px] text-[#00E5FF] font-data-sm uppercase tracking-widest">
                  AUTO_SAVE: CLOUD_SYNC_OK
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-20 md:pb-4 shrink-0">
        <div className="border border-[#2A2A2E] bg-[#131314] p-3 flex flex-col">
          <span className="font-label-caps text-[9px] text-[#71717A]">DAILY_VELOCITY</span>
          <div className="flex flex-col md:flex-row justify-between md:items-end mt-1 gap-2">
            <span className="font-data-lg text-[#00E5FF]">84%</span>
            <div className="w-full md:w-24 h-1 bg-[#1C1C1E] relative">
              <div className="absolute inset-y-0 left-0 bg-[#00E5FF] w-[84%]"></div>
            </div>
          </div>
        </div>
        <div className="border border-[#2A2A2E] bg-[#131314] p-3 flex flex-col">
          <span className="font-label-caps text-[9px] text-[#71717A]">ACTIVE_SPRINT</span>
          <div className="flex justify-between items-end mt-1">
            <span className="font-data-lg text-[#2ae500]">04:12:33</span>
          </div>
        </div>
      </div>

      <button className="fixed bottom-20 md:bottom-6 right-6 bg-[#00E5FF] text-[#0A0A0B] w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all z-50 rounded-sm">
        <Rocket className="w-6 h-6" />
      </button>

    </div>
  );
}
