'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Search, SquareTerminal, Settings, LayoutGrid, Network, Archive,
  FileText, HelpCircle, Plus
} from 'lucide-react';
import Image from 'next/image';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: LayoutGrid },
    { href: '/planner', label: 'Planner', icon: Network },
    { href: '/execution', label: 'Execution', icon: SquareTerminal },
    { href: '/archive', label: 'Archive', icon: Archive },
  ];

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0A0A0B] text-white overflow-hidden font-body-md selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#0A0A0B] text-[#00E5FF] font-['Space_Grotesk'] tracking-tight flex justify-between items-center px-4 h-14 z-50 border-b border-[#2A2A2E]">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-[#00E5FF] uppercase">MVP_OPERATOR_v1.0</span>
          {pathname === '/archive' && (
            <span className="bg-[#00E5FF]/10 text-[#00E5FF] text-[9px] px-1.5 py-0.5 font-data-sm border border-[#00E5FF]/30 hidden md:block">ARCHIVE_MODE</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-[#1C1C1E] px-3 py-1.5 border border-[#2A2A2E] h-9">
            <Search className="w-4 h-4 text-[#71717A] mr-2" />
            <input
              type="text"
              placeholder="CMD+K TO SEARCH"
              className="bg-transparent border-none focus:ring-0 text-xs font-data-sm text-white placeholder-[#71717A] w-48 uppercase outline-none"
            />
          </div>
          <div className="flex gap-3 text-[#A1A1AA]">
            <SquareTerminal className="w-5 h-5 cursor-pointer hover:text-[#00E5FF] transition-all" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-[#00E5FF] transition-all" />
          </div>
          <div className="w-8 h-8 rounded-sm shrink-0 border border-[#2A2A2E] overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQm4VgV-XOb4LJEOtvusIKxMDeZuz-eDlBNKNO9GFMz_xzV1h0PHJqfy8XvOAx5pHRr0hH1lnvq0vLAKrkJFxcDHVWh4ACBTk-xb90xtWycp8Hy2CMvllBhiFPqDBh4IptXuy64IlBRemNTP7qMIrRi0KwCGnP94BPl0-NS_s6mvflnT__ijOMWC3lTAtLdLGxOqCO-bABhI0eXbpNFPlkgiBxZDU5G_c83X7ZLjX6H_wHOGt0_qjn7mG0ObqebVK5B3uQfRD6BcI"
              alt="Profile"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] flex-col z-40 bg-[#0A0A0B] w-64 border-r border-[#2A2A2E] hidden md:flex">
        <div className="p-6 pb-4 border-b border-[#2A2A2E]">
          <h2 className="text-lg font-black text-[#00E5FF] tracking-tighter font-['Space_Grotesk'] uppercase">CONTROL_PANEL</h2>
          <p className="font-['Space_Grotesk'] text-[10px] font-medium uppercase tracking-[0.2em] text-[#71717A] mt-1">
            AI_PROJECT_SYNC: <span className="text-[#2ff801]">ACTIVE</span>
          </p>
        </div>
        <nav className="flex-1 px-0 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-6 py-3 gap-3 font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest transition-all ${
                  isActive
                    ? 'text-[#00E5FF] bg-[#00E5FF]/5 border-l-2 border-[#00E5FF]'
                    : 'text-[#71717A] hover:bg-[#1C1C1E] border-left hover:text-[#00E5FF] border-transparent border-l-2'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="pb-6 border-t border-[#2A2A2E] pt-4 space-y-1">
          <Link href="#" className="text-[#71717A] hover:bg-[#1C1C1E] hover:text-[#00E5FF] flex items-center px-6 py-3 gap-3 font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest transition-all">
            <FileText className="w-5 h-5" /> Documentation
          </Link>
          <Link href="#" className="text-[#71717A] hover:bg-[#1C1C1E] hover:text-[#00E5FF] flex items-center px-6 py-3 gap-3 font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest transition-all">
            <HelpCircle className="w-5 h-5" /> Support
          </Link>
        </div>
      </aside>

      {/* Main Canvas Container */}
      <main className="flex-1 md:ml-64 pt-14 flex flex-col h-screen relative overflow-hidden bg-[#0A0A0B]">
        {children}
      </main>

      {/* Mobile nav placeholder - visible on small screens only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0B] border-t border-[#2A2A2E] flex justify-around items-center h-16 z-50 px-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#00E5FF]' : 'text-[#71717A]'}`}>
              <link.icon className="w-5 h-5" />
              <span className="text-[9px] font-label-caps">{link.label.slice(0,4)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
