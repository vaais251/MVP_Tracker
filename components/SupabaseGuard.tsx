import React from 'react';
import { Database } from 'lucide-react';

export function SetupRequired() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-[#0A0A0B] h-full">
      <div className="bg-[#131314] border border-[#ffb4ab]/30 p-8 max-w-xl w-full">
        <div className="flex items-center gap-4 mb-6">
          <Database className="w-8 h-8 text-[#ffb4ab]" />
          <h2 className="font-headline-md text-[#e5e2e3] font-['Space_Grotesk'] uppercase tracking-tight">Database Required</h2>
        </div>
        <p className="text-body-md text-[#A1A1AA] mb-4">
          The MVP Operator requires Supabase to function. Hardcoded data has been removed per instructions.
        </p>
        <div className="bg-[#0A0A0B] p-4 border border-[#2A2A2E] font-data-sm text-xs text-[#71717A] space-y-2 mb-6">
          <p>1. Open <span className="text-[#00E5FF]">supabase-schema.sql</span> from the file tree and run it in Supabase SQL editor.</p>
          <p>2. Add your <span className="text-[#00E5FF]">NEXT_PUBLIC_SUPABASE_URL</span> to settings.</p>
          <p>3. Add your <span className="text-[#00E5FF]">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> to settings.</p>
          <p className="border-t border-[#2A2A2E] pt-2 mt-2">The application will automatically activate once provided.</p>
        </div>
        <p className="text-[10px] font-label-caps text-[#71717A] uppercase animate-pulse">Awaiting credentials to proceed...</p>
      </div>
    </div>
  );
}
