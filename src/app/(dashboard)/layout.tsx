"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Função simples para definir o título da página no topo
  const getPageTitle = () => {
    switch (pathname) {
      case "/": return "Visão Geral"
      case "/athletes": return "Gestão de Atletas"
      case "/races": return "Calendário de Provas"
      case "/sponsors": return "Parceiros & Patrocínios"
      case "/vault": return "Vault de Conteúdo"
      case "/texts": return "Biblioteca de Textos"
      case "/prompts": return "Laboratório de IA"
      default: return "Admin Hub"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-transparent relative flex flex-col min-h-screen overflow-hidden">
        {/* Decorative Aura Background Elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[40%] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none animate-pulse duration-[15s]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[40%] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none animate-pulse duration-[12s]" />
        
        <header className="flex h-24 shrink-0 items-center gap-4 px-10 sticky top-0 z-40 hyper-glass border-b-0 shadow-none">
          <div className="flex items-center gap-8 w-full max-w-7xl mx-auto">
            <div className="flex flex-col gap-1.5 animate-reveal">
              <span className="font-black text-[10px] uppercase tracking-[0.4em] text-primary/70 leading-none">
                Cantanhede Cycling
              </span>
              <div className="font-black text-3xl text-foreground uppercase tracking-tighter italic leading-none text-gradient">
                {getPageTitle()}
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Sincronizado
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <main className="flex-1 p-10 relative z-10 w-full max-w-7xl mx-auto animate-reveal delay-100">
          <div className="relative z-10">
            {children}
          </div>
        </main>

        <footer className="p-12 text-center relative z-10">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-foreground/10 to-transparent mx-auto mb-8" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40">
            © {new Date().getFullYear()} Cantanhede Cycling Admin Hub • Ultra Premium Edition
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}

