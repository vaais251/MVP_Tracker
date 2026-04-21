import React from 'react';
import { History, Code, Brain, Bell, Megaphone, MoreVertical, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SetupRequired } from '@/components/SupabaseGuard';

export default async function Dashboard() {
  const supabase = await createClient();
  if (!supabase) return <SetupRequired />;

  // Fetch from DB
  const { data: logs } = await supabase.from('execution_logs').select('*').order('created_at', { ascending: false }).limit(10);
  const { data: project } = await supabase.from('projects')
    .select('*')
    .eq('status', 'ACTIVE_BUILD')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const executionLogs = logs || [];

  const getHeatClass = (idx: number) => {
    if (idx < 5) return 'bg-[#1C1C1E]'; // Empty
    if (idx < 20) return 'bg-[#00E5FF]/20';
    if (idx < 35) return 'bg-[#00E5FF]/40';
    if (idx < 45) return 'bg-[#00E5FF]/60';
    return 'bg-[#00E5FF]';
  };

  const heatmapBlocks = Array.from({ length: 52 }).map((_, w) => (
    <div key={w} className="flex flex-col gap-1 flex-shrink-0">
      {Array.from({ length: 7 }).map((_, d) => {
        const val = (w * 7 + d * 13) % 50;
        return <div key={d} className={`w-2 h-2 md:w-3 md:h-3 ${getHeatClass(val)}`} />;
      })}
    </div>
  ));

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0e0e0f]">
      <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-0">
        
        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 bg-[#201f20] border border-[#2A2A2E] p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className="inline-block px-2 py-1 bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] font-label-caps text-[9px] mb-2">
                  {project?.status || 'NO_ACTIVE_PROJECT'}
                </span>
                <h3 className="font-headline-md text-[#e5e2e3] uppercase tracking-tight">
                  {project?.name || 'AWAITING_INITIALIZATION'}
                </h3>
              </div>
              <div className="flex gap-2">
                <div className="p-2 border border-[#2A2A2E] bg-[#2a2a2b] rounded-sm">
                  <Code className="text-[#00E5FF] w-5 h-5" />
                </div>
                <div className="p-2 border border-[#2A2A2E] bg-[#2a2a2b] rounded-sm">
                  <Brain className="text-[#00E5FF] w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-end mb-2">
                <span className="font-data-sm text-[#71717A] text-[10px]">PHASE: 04 / TESTING</span>
                <span className="font-data-lg text-[#00E5FF]">{project?.progress || 0}%</span>
              </div>
              <div className="h-1 bg-[#1C1C1E] w-full flex overflow-hidden">
                <div className={`h-full bg-[#00E5FF] transition-all duration-1000`} style={{ width: `${project?.progress || 0}%` }}></div>
              </div>
              <div className="grid grid-cols-7 gap-1 pt-2">
                <div className="text-[9px] font-label-caps text-[#00E5FF] text-center">D1</div>
                <div className="text-[9px] font-label-caps text-[#00E5FF] text-center">D2</div>
                <div className="text-[9px] font-label-caps text-[#00E5FF] text-center">D3</div>
                <div className="text-[9px] font-label-caps text-[#00E5FF] text-center font-bold">D4</div>
                <div className="text-[9px] font-label-caps text-[#444] text-center">D5</div>
                <div className="text-[9px] font-label-caps text-[#444] text-center">D6</div>
                <div className="text-[9px] font-label-caps text-[#444] text-center">D7</div>
              </div>
            </div>
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 to-transparent pointer-events-none opacity-20"></div>
          </section>

          <section className="lg:col-span-5 bg-[#00E5FF] text-black p-6 border border-[#00E5FF] relative overflow-hidden">
            <span className="font-label-caps text-[10px] text-black/60 block mb-1">CRITICAL_TASK</span>
            <h3 className="font-headline-md font-bold mb-8 leading-none text-black">
              {project?.problem_statement ? 'Review Issue Log' : 'Optimize Model Inference Speed'}
            </h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-label-caps text-[10px] text-black/60">SESSION_REMAINING</span>
                <div className="font-data-lg text-3xl font-black tracking-tighter">01:42:59</div>
              </div>
              <button className="bg-black text-[#00E5FF] px-4 py-2 text-xs font-label-caps hover:bg-black/80 transition-colors">
                COMPLETE_STEP
              </button>
            </div>
            <div className="absolute bottom-[-10px] right-[-10px] text-8xl font-black text-black/10 select-none pointer-events-none uppercase">
                FOCUS
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 bg-[#201f20] border border-[#2A2A2E] p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-label-caps text-xs text-[#71717A] flex items-center gap-2">
                <History className="w-4 h-4" /> CONSISTENCY_METRIC: 52_WEEKS
              </h4>
              <span className="text-[10px] font-data-sm text-[#00E5FF]">STREAK: 14 DAYS</span>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
              {heatmapBlocks}
            </div>
          </section>

          <section className="lg:col-span-4 space-y-4">
            <div className="bg-[#201f20] border border-[#2A2A2E] p-4 group hover:border-[#00E5FF] transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <Bell className="text-[#00E5FF] w-5 h-5 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold uppercase mb-1 font-['Space_Grotesk'] tracking-widest text-white">SYSTEM_NOTIFICATION</h5>
                  <p className="text-xs text-[#A1A1AA] font-body-md">Reminder: 2 hours to GitHub commit</p>
                </div>
              </div>
            </div>
            <div className="bg-[#201f20] border border-[#2A2A2E] p-4 group hover:border-[#2ff801] transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <Megaphone className="text-[#2ff801] w-5 h-5 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold uppercase mb-1 font-['Space_Grotesk'] tracking-widest text-[#2ff801]">SOCIAL_DRAFT</h5>
                  <p className="text-xs text-[#A1A1AA] font-body-md">Draft LinkedIn update for #MVPWeek4</p>
                  <button className="mt-3 text-[10px] font-label-caps text-[#00E5FF] border border-[#00E5FF]/30 px-2 py-1 hover:bg-[#00E5FF]/10 transition-colors">
                    EXECUTE_DRAFT
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-[#201f20] border border-[#2A2A2E] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#2ff801] animate-pulse rounded-full"></div>
                <span className="font-data-sm text-[10px] text-[#A1A1AA]">AI_SYNDICATE_ONLINE</span>
              </div>
              <span className="font-data-sm text-[10px] text-[#71717A]">LATENCY: {project?.latency_ms || 12}ms</span>
            </div>
          </section>
        </div>

        <section className="bg-[#201f20] border border-[#2A2A2E] rounded-sm">
          <div className="px-6 py-4 border-b border-[#2A2A2E] flex justify-between items-center">
            <h4 className="font-label-caps text-xs">EXECUTION_LOGS_V3</h4>
            <MoreVertical className="text-[#71717A] w-4 h-4" />
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left font-data-sm text-xs">
              <thead>
                <tr className="text-[#71717A] border-b border-[#1C1C1E]">
                  <th className="pb-3 uppercase tracking-tighter">Timestamp</th>
                  <th className="pb-3 uppercase tracking-tighter">Event_ID</th>
                  <th className="pb-3 uppercase tracking-tighter">Status</th>
                  <th className="pb-3 uppercase tracking-tighter">Description</th>
                </tr>
              </thead>
              <tbody className="text-[#A1A1AA]">
                {executionLogs.length > 0 ? executionLogs.map(log => (
                  <tr key={log.id} className="hover:bg-[#1C1C1E] transition-colors">
                    <td className="py-3">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    <td className="py-3 text-[#00E5FF]">{log.event_id}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 text-[10px] border ${
                        log.status === 'SUCCESS' ? 'bg-[#d7ffc5]/10 text-[#d7ffc5] border-[#d7ffc5]/20' :
                        log.status === 'WARNING' ? 'bg-[#ffb4ab]/10 text-[#ffb4ab] border-[#ffb4ab]/20' :
                        'bg-[#fec931]/10 text-[#fec931] border-[#fec931]/20'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 font-body-md text-white">{log.description}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="py-6 text-center text-[#71717A]">NO_EXECUTION_LOGS_FOUND_IN_SUPABASE</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
      
      {/* Contextual FAB */}
      <button className="fixed bottom-20 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-[#00E5FF] text-black rounded-sm shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group">
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  );
}
