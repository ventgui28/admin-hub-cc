"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Copy, Globe, Camera, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Sponsor {
  id: string
  nome: string
  hashtags_oficiais: string | null
  instagram: string | null
  website: string | null
  logo_url: string | null
}

export function SponsorsTable({ sponsors }: { sponsors: Sponsor[] }) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copiado!`, {
      description: text,
      icon: <Copy className="h-4 w-4" />,
    })
  }

  return (
    <div className="glass-card p-0 overflow-hidden border-none shadow-2xl animate-reveal delay-100">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-primary/[0.03] dark:bg-white/[0.02] border-b border-white/10">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="w-[400px] font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-8">Marca / Identidade</TableHead>
              <TableHead className="font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10">Comunicação Oficial</TableHead>
              <TableHead className="font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10">Canais Digitais</TableHead>
              <TableHead className="text-right font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center text-muted-foreground italic font-medium text-lg">
                  Nenhum patrocinador registado. Clique em "Novo Patrocinador".
                </TableCell>
              </TableRow>
            ) : (
              sponsors.map((sponsor) => (
                <TableRow key={sponsor.id} className="group hover:bg-primary/[0.03] dark:hover:bg-white/[0.02] transition-all duration-500 border-white/10 dark:border-white/5">
                  <TableCell className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white dark:bg-white/10 border border-primary/10 overflow-hidden shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ring-1 ring-black/5">
                        {sponsor.logo_url ? (
                          <img src={sponsor.logo_url} alt={sponsor.nome} className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                          <Building2 className="h-10 w-10 text-primary/20" />
                        )}
                      </div>
                      <span className="font-black text-2xl text-foreground tracking-tighter leading-none italic uppercase text-gradient transition-colors duration-500 group-hover:text-primary">{sponsor.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-10">
                    {sponsor.hashtags_oficiais ? (
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-fit h-10 px-6 gap-3 border-primary/20 hover:border-primary hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 rounded-xl shadow-lg shadow-primary/5"
                          onClick={() => copyToClipboard(sponsor.hashtags_oficiais!, "Hashtags")}
                        >
                          <Copy className="h-4 w-4" />
                          Copiar Hashtags
                        </Button>
                        <span className="text-[10px] text-primary/70 font-black uppercase tracking-[0.2em] truncate max-w-[280px] bg-primary/10 px-4 py-2 rounded-xl border border-primary/10 italic">
                          {sponsor.hashtags_oficiais}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-foreground/30 font-black uppercase tracking-[0.3em] italic">Sem hashtags oficiais</span>
                    )}
                  </TableCell>
                  <TableCell className="px-10">
                    <div className="flex items-center gap-4">
                      {sponsor.instagram && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-11 px-6 gap-3 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-500 shadow-inner"
                          onClick={() => copyToClipboard(sponsor.instagram!, "Instagram")}
                        >
                          <Camera className="h-4 w-4" />
                          Instagram
                        </Button>
                      )}
                      {sponsor.website && (
                        <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl border border-primary/10 hover:text-primary hover:bg-primary/10 transition-all duration-500 shadow-inner group/web">
                            <Globe className="h-6 w-6 group-hover/web:scale-110 transition-transform" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-primary/10 hover:text-primary transition-all duration-500 group/btn">
                          <MoreHorizontal className="h-7 w-7 group-hover/btn:scale-110" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-64 p-3 hyper-glass border-primary/10 rounded-2xl animate-reveal">
                        <DropdownMenuLabel className="text-[10px] uppercase text-primary/60 font-black tracking-[0.3em] px-4 py-4">Gestão da Parceria</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-primary/10 mx-2 mb-2" />
                        <DropdownMenuItem className="cursor-pointer font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 focus:bg-primary/10 focus:text-primary transition-all duration-300">
                          Editar Parceiro
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 transition-all duration-300">
                          Terminar Parceria
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

