import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SetupRequired } from '@/components/SupabaseGuard';

export default async function PlannerPage() {
  const supabase = await createClient();
  if (!supabase) return <SetupRequired />;

  // Fetch active project
  const { data: project } = await supabase.from('projects').select('*, tech_stacks(*), milestones(*)').limit(1).single();
  const milestones = project?.milestones?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 lg:p-8 cyber-grid bg-[#0A0A0B]">
      
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-headline-lg text-white uppercase tracking-tighter">WEEKLY_PLANNER</h1>
          <p className="font-data-sm text-[#849396] tracking-wider mt-1">MODULE://SYNC_BUILD_PROCESS_V1.04</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-transparent border border-[#00E5FF] text-[#00E5FF] px-6 py-2 font-label-caps hover:bg-[#00E5FF]/10 transition-all active:scale-95 uppercase">
            Discard_Draft
          </button>
          <button className="bg-[#00E5FF] text-[#00626e] px-6 py-2 font-label-caps hover:brightness-110 transition-all active:scale-95 uppercase">
            Initiate_Build
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scoping & Stack */}
        <div className="md:col-span-7 flex flex-col gap-8">
          
          {/* Project Scoping Form */}
          <section className="bg-[#131314] border border-[#2A2A2E] p-6 relative">
            <div className="absolute -top-3 left-4 bg-[#00E5FF] text-[#00626e] px-2 py-0.5 font-label-caps text-[9px] uppercase border border-[#00E5FF]">
              01_SCOPING
            </div>
            
            <div className="space-y-6 mt-4">
              <div className="group">
                <label className="font-label-caps text-[#71717A] uppercase mb-2 block tracking-widest">Project_Name</label>
                <input 
                  type="text" 
                  placeholder="ENTER_PROJECT_ID..." 
                  defaultValue={project?.name || ''}
                  className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#c3f5ff] px-4 py-3 font-data-lg transition-all outline-none" 
                />
              </div>
              <div className="group">
                <label className="font-label-caps text-[#71717A] uppercase mb-2 block tracking-widest">Problem_Statement</label>
                <textarea 
                  placeholder="DESCRIBE_THE_INEFFICIENCY..." 
                  rows={3} 
                  defaultValue={project?.problem_statement || ''}
                  className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#e5e2e3] px-4 py-3 font-body-md transition-all outline-none resize-none"
                ></textarea>
              </div>
              <div className="group">
                <label className="font-label-caps text-[#71717A] uppercase mb-2 block tracking-widest">AI-Based_Solution</label>
                <textarea 
                  placeholder="DEFINE_THE_INTELLIGENCE_LAYER..." 
                  rows={3} 
                  defaultValue={project?.ai_solution || ''}
                  className="w-full bg-[#0A0A0B] border border-[#2A2A2E] focus:border-[#00E5FF] focus:ring-0 text-[#e5e2e3] px-4 py-3 font-body-md transition-all outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Tech Stack Selector */}
          <section className="bg-[#131314] border border-[#2A2A2E] p-6 relative">
            <div className="absolute -top-3 left-4 bg-[#00E5FF] text-[#00626e] px-2 py-0.5 font-label-caps text-[9px] uppercase border border-[#00E5FF]">
              02_STACK_CONFIG
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {/* If no tech stacks bound yet, show empty or mapped */}
              {project?.tech_stacks && project.tech_stacks.length > 0 ? project.tech_stacks.map((stack: any) => (
                <button key={stack.id} className="group flex flex-col items-center justify-center gap-2 p-4 border border-[#00E5FF] bg-[#00E5FF]/5 active:scale-95">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#00E5FF]/10 border border-[#00E5FF] relative">
                    <span className="font-data-lg text-[#00E5FF]">{stack.name.charAt(0)}</span>
                  </div>
                  <span className="font-label-caps text-[10px] text-[#00E5FF] uppercase">{stack.name}</span>
                </button>
              )) : (
                <div className="col-span-full py-6 text-center border border-dashed border-[#2A2A2E] text-[#71717A] font-data-sm">
                  NO_STACK_CONFIGURED
                </div>
              )}

              {/* Custom Add Button */}
              <button className="group flex flex-col items-center justify-center gap-2 p-4 border border-dashed border-[#2A2A2E] bg-transparent hover:border-[#00E5FF] transition-all active:scale-95">
                <Plus className="text-[#71717A] group-hover:text-[#00E5FF]" />
                <span className="font-label-caps text-[10px] text-[#71717A] group-hover:text-[#00E5FF]">CUSTOM</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Milestone Roadmap */}
        <div className="md:col-span-5">
          <section className="bg-[#131314] border border-[#2A2A2E] p-6 relative min-h-[600px]">
            <div className="absolute -top-3 left-4 bg-[#00E5FF] text-[#00626e] px-2 py-0.5 font-label-caps text-[9px] uppercase border border-[#00E5FF]">
              03_MILESTONES
            </div>
            
            {/* Timeline Container */}
            <div className="relative mt-8 pl-8 pb-4">
              {/* Vertical Line */}
              <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00E5FF] via-[#2A2A2E] to-[#2A2A2E]"></div>
              
              <div className="space-y-10">
                {milestones.length > 0 ? milestones.map((ms: any, index: number) => (
                  <div key={ms.id} className="relative">
                    <div className={`absolute -left-9 top-1.5 w-4 h-4 bg-[#0A0A0B] border-2 ${index === 0 ? 'border-[#00E5FF]' : 'border-[#2A2A2E]'}`}></div>
                    <div className="flex flex-col">
                      <span className={`font-label-caps text-[10px] tracking-[0.2em] mb-1 ${index === 0 ? 'text-[#00E5FF]' : ms.status === 'SHIP' ? 'text-[#2ff801]' : 'text-[#71717A]'}`}>
                        {ms.day_label} {'//'} {ms.status}
                      </span>
                      <h3 className={`font-headline-md uppercase ${index === 0 ? 'text-white' : 'text-[#bac9cc]'}`}>{ms.title}</h3>
                      <p className={`font-body-md mt-1 ${index === 0 ? 'text-[#bac9cc]' : 'text-[#71717A]'}`}>{ms.description}</p>
                      {ms.tags && ms.tags.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {ms.tags.map((tag: string) => (
                             <span key={tag} className="bg-[#2A2A2E] text-[9px] px-2 py-0.5 font-label-caps text-[#e5e2e3] uppercase">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="text-[#71717A] font-data-sm text-sm">NO_MILESTONES_DEFINED</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-12 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-[#2A2A2E] pt-4 gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col">
            <span className="font-label-caps text-[9px] text-[#71717A] uppercase">Current_Sprint</span>
            <span className="font-data-sm text-[#e5e2e3]">{project?.sprint_name || 'MVP_SPRINT_W24'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-[9px] text-[#71717A] uppercase">Estimated_Time</span>
            <span className="font-data-sm text-[#e5e2e3]">{project?.estimated_hours || 168}_HOURS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-[9px] text-[#71717A] uppercase">Difficulty_Score</span>
            <span className="font-data-sm text-[#2ff801]">{project?.difficulty_score || '0.84_CRITICAL'}</span>
          </div>
        </div>
        <div className="text-[10px] font-data-sm text-[#71717A] uppercase">
          SYSTEM_STATUS: <span className="text-[#00E5FF]">OPTIMAL</span> <span className="mx-2">{'//'}</span> ENCRYPTION: <span className="text-[#00E5FF]">AES-256</span>
        </div>
      </div>
      
      {/* Contextual FAB */}
      <button className="fixed bottom-20 md:bottom-10 right-6 md:right-10 bg-[#00E5FF] text-[#001f24] w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-110 active:scale-95 transition-all z-50 rounded-sm">
        <Plus className="w-8 h-8" />
      </button>

    </div>
  );
}
