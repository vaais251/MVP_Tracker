import React from 'react';
import Image from 'next/image';
import { Layers, CalendarDays, Star, Code, Globe, Share2, ExternalLink, PlusCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SetupRequired } from '@/components/SupabaseGuard';

export default async function ArchivePage() {
  const supabase = await createClient();
  if (!supabase) return <SetupRequired />;

  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return <SetupRequired />;

  const { data: deployments } = await supabase.from('deployments').select('*').eq('user_id', user.id).order('deployed_at', { ascending: false });
  const activeDeployments = deployments || [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full h-full overflow-y-auto custom-scrollbar bg-[#0A0A0B]">
      
      {/* Global Stats */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-[#00E5FF]"></div>
          <h2 className="font-headline-md font-['Space_Grotesk'] uppercase tracking-tight">System_Metrics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#131314] border border-[#2A2A2E] p-6 relative overflow-hidden group">
            <div className="absolute top-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-16 h-16 text-white" />
            </div>
            <p className="text-label-caps font-label-caps text-[#71717A] mb-2">Total Builds</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#00E5FF] font-['Space_Grotesk']">{activeDeployments.length}</span>
              <span className="text-[#71717A] font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Completed_Units</span>
            </div>
          </div>
          <div className="bg-[#131314] border border-[#2A2A2E] p-6 relative overflow-hidden group">
            <div className="absolute top-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarDays className="w-16 h-16 text-white" />
            </div>
            <p className="text-label-caps font-label-caps text-[#71717A] mb-2">Consistent Weeks</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#00E5FF] font-['Space_Grotesk']">12</span>
              <span className="text-[#71717A] font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Streak_Active</span>
            </div>
          </div>
          <div className="bg-[#131314] border border-[#2A2A2E] p-6 relative overflow-hidden group">
            <div className="absolute top-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Star className="w-16 h-16 text-white" />
            </div>
            <p className="text-label-caps font-label-caps text-[#71717A] mb-2">GitHub Stars Gained</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#00E5FF] font-['Space_Grotesk']">450</span>
              <span className="text-[#71717A] font-['Space_Grotesk'] text-[10px] uppercase tracking-widest">Network_Reach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery View */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#00E5FF]"></div>
            <h2 className="font-headline-md font-['Space_Grotesk'] uppercase tracking-tight">Deployment_History</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {activeDeployments.length > 0 ? activeDeployments.map(dep => (
            <article key={dep.id} className="bg-[#131314] border border-[#2A2A2E] transition-all duration-300 glow-border group flex flex-col">
              <div className="h-48 relative overflow-hidden border-b border-[#2A2A2E]">
                <Image 
                  src={dep.image_url || `https://picsum.photos/seed/${dep.id}/1920/1080`}
                  alt={dep.title}
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/80 text-[#00E5FF] text-[9px] font-data-sm px-2 py-1 border border-[#00E5FF]/20 uppercase">{dep.category || 'GENERAL'}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline-md text-lg text-[#e5e2e3] font-['Space_Grotesk'] group-hover:text-[#00E5FF] transition-colors">{dep.title}</h3>
                    <p className="text-[11px] text-[#71717A] font-['Space_Grotesk'] uppercase tracking-widest mt-1">Deployed: {dep.deployed_at}</p>
                  </div>
                </div>
                <p className="text-body-md text-[#A1A1AA] mb-6 line-clamp-2">{dep.description}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-[#2A2A2E]/50">
                  <div className="flex gap-4">
                    {dep.github_url && (
                      <a href={dep.github_url} className="text-[#71717A] hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                        <Code className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">GitHub</span>
                      </a>
                    )}
                    {dep.demo_url && (
                      <a href={dep.demo_url} className="text-[#71717A] hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                        <Globe className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )) : null}

          {/* Placeholder */}
          <article className="border border-[#2A2A2E] border-dashed flex flex-col items-center justify-center p-8 opacity-40 hover:opacity-100 transition-opacity cursor-pointer min-h-[300px]">
            <PlusCircle className="text-[#71717A] w-12 h-12 mb-4" />
            <p className="font-label-caps tracking-widest uppercase text-[#71717A]">Awaiting_New_Deployment</p>
          </article>

        </div>
      </section>

      {/* Footer Activity Log */}
      <footer className="mt-auto pt-8 border-t border-[#2A2A2E] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#71717A] uppercase font-bold tracking-[0.2em]">Latest_Upload</span>
            <span className="text-xs font-data-sm text-[#e5e2e3]">AWAITING_SYNC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-[#71717A] uppercase font-bold tracking-[0.2em]">Server_Status</span>
            <span className="text-xs font-data-sm text-[#d7ffc5]">OPERATIONAL_NODE_04</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#71717A]">
          <span className="text-[10px] uppercase tracking-widest font-['Space_Grotesk']">© 2024 MVP_ARCHIVE_PROTOCOL</span>
          <div className="w-1 h-1 bg-[#2A2A2E] rounded-full"></div>
          <span className="text-[10px] uppercase tracking-widest font-['Space_Grotesk']">BUILD_ID: 0x8F92E</span>
        </div>
      </footer>
    </div>
  );
}
