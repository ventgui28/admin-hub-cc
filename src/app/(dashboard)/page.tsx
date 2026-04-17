import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Archive, Building2, Users, Bot, ClipboardList, PlusCircle, ArrowRight, Camera } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 py-4 md:py-8">
      {/* Welcome Section with Luxury Typography */}
      <div className="space-y-4 md:space-y-6 relative animate-reveal">
        <div className="absolute -left-4 md:-left-10 top-2 w-1.5 md:w-2 h-16 md:h-20 bg-primary rounded-full shadow-[0_0_30px_rgba(var(--primary),0.6)]" />
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic leading-none text-gradient">
            Admin Hub <span className="text-primary/20 not-italic font-thin mx-2 md:mx-4">/</span> Cantanhede
          </h1>
          <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl leading-relaxed text-balance font-medium">
            Bem-vindo de volta à central de comando. Gira a comunicação da tua equipa com elegância e precisão.
          </p>
        </div>
      </div>

      {/* Ultra-Premium Bento Grid */}
      <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto md:auto-rows-[240px]">
        {/* Atletas - Ultra Wide */}
        <Link href="/athletes" className="md:col-span-2 md:row-span-1 group animate-reveal delay-100">
          <div className="glass-card h-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 overflow-hidden relative p-6 md:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
            
            <div className="flex flex-col gap-4 md:gap-6 relative z-10 items-center md:items-start text-center md:text-left">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner ring-1 ring-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Users className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-gradient uppercase italic">Atletas</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm font-bold uppercase tracking-widest mt-1 opacity-70">Gestão de Equipa & Social</p>
              </div>
            </div>
            
            <div className="relative z-10 hidden md:block">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-8 group-hover:translate-x-0 shadow-2xl shadow-primary/40">
                <ArrowRight className="h-8 w-8" />
              </div>
            </div>
          </div>
        </Link>

        {/* Fotos e Logos - Elegant Tall */}
        <Link href="/vault" className="md:col-span-1 md:row-span-2 group animate-reveal delay-200">
          <div className="glass-card h-full min-h-[320px] md:min-h-0 flex flex-col justify-between overflow-hidden relative border-primary/5 p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-white/5 shadow-2xl flex items-center justify-center text-primary group-hover:-rotate-6 transition-all duration-700 ring-1 ring-black/5">
                <Camera className="h-10 w-10 md:h-12 md:w-12" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-gradient leading-none uppercase italic">Vault</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm leading-relaxed font-bold uppercase tracking-widest opacity-60">Conteúdo Visual & Logos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-primary font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] group-hover:gap-6 transition-all duration-500 relative z-10 mt-6 md:mt-0">
              Explorar Galeria <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </div>
          </div>
        </Link>

        {/* Textos - Square Premium */}
        <Link href="/texts" className="md:col-span-1 md:row-span-1 group animate-reveal delay-300">
          <div className="glass-card h-full min-h-[180px] md:min-h-0 flex flex-col justify-between overflow-hidden relative p-6 md:p-8">
            <div className="absolute -right-6 -top-6 h-32 w-32 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-all duration-500">
              <ClipboardList className="h-7 w-7 md:h-8 md:w-8" />
            </div>
            <div className="space-y-1 md:space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-gradient uppercase italic">Biblioteca</h3>
              <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Legendas & Tags</p>
            </div>
          </div>
        </Link>

        {/* Patrocinadores - Square Premium */}
        <Link href="/sponsors" className="md:col-span-1 md:row-span-1 group animate-reveal delay-100">
          <div className="glass-card h-full min-h-[180px] md:min-h-0 flex flex-col justify-between overflow-hidden relative p-6 md:p-8">
            <div className="absolute -right-6 -top-6 h-32 w-32 bg-orange-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-all duration-500">
              <Building2 className="h-7 w-7 md:h-8 md:w-8" />
            </div>
            <div className="space-y-1 md:space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-gradient uppercase italic">Parceiros</h3>
              <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Patrocínios</p>
            </div>
          </div>
        </Link>

        {/* IA Styles - Square Premium */}
        <Link href="/prompts" className="md:col-span-1 md:row-span-1 group animate-reveal delay-200">
          <div className="glass-card h-full min-h-[180px] md:min-h-0 flex flex-col justify-between overflow-hidden relative p-6 md:p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500">
              <Bot className="h-7 w-7 md:h-8 md:w-8" />
            </div>
            <div className="space-y-1 md:space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-gradient uppercase italic">IA Studio</h3>
              <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Prompts Criativos</p>
            </div>
          </div>
        </Link>

        {/* Provas - Square Premium */}
        <Link href="/races" className="md:col-span-1 md:row-span-1 group animate-reveal delay-300">
          <div className="glass-card h-full min-h-[180px] md:min-h-0 flex flex-col justify-between overflow-hidden relative p-6 md:p-8">
            <div className="absolute -right-6 -top-6 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-all duration-500">
              <Archive className="h-7 w-7 md:h-8 md:w-8" />
            </div>
            <div className="space-y-1 md:space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-gradient uppercase italic">Provas</h3>
              <p className="text-muted-foreground text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Calendário & Info</p>
            </div>
          </div>
        </Link>

        {/* Productivity Tip - Ultra Wide Bottom */}
        <div className="md:col-span-3 lg:col-span-3 md:row-span-1 glass-card bg-primary text-white border-none shadow-[0_20px_60px_-15px_rgba(var(--primary),0.3)] flex flex-col md:flex-row items-center gap-6 md:gap-12 overflow-hidden relative animate-reveal delay-400 p-8 md:p-10 text-center md:text-left">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 scale-150 pointer-events-none">
            <Bot className="w-60 h-60 md:w-80 md:h-80" />
          </div>
          <div className="h-24 w-24 md:h-28 md:w-28 rounded-[2rem] bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-3xl ring-1 ring-white/40 shadow-2xl relative z-10">
            <Bot className="h-10 w-10 md:h-14 md:w-14 text-white" />
          </div>
          <div className="space-y-3 md:space-y-4 relative z-10 max-w-2xl">
            <h4 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-none">Dica de Produtividade</h4>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
              Copia qualquer informação com um clique. O sistema formata automaticamente para as tuas redes sociais, garantindo que a comunicação da equipa é sempre impecável.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

