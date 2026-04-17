"use client"

import { useState } from "react"
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
import { deleteSponsor } from "./actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditSponsorDialog } from "./edit-sponsor-dialog"

interface Sponsor {
  id: string
  nome: string
  hashtags_oficiais: string | null
  instagram: string | null
  website: string | null
  logo_url: string | null
}

export function SponsorsTable({ sponsors }: { sponsors: Sponsor[] }) {
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copiado!`, {
      description: text,
      icon: <Copy className="h-4 w-4" />,
    })
  }

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const result = await deleteSponsor(id)
    if (result.error) toast.error(result.error)
    else toast.success("Patrocinador removido")
  }

  return (
    <div className="space-y-10">
      <div className="glass-card p-0 overflow-hidden border-none shadow-2xl animate-reveal delay-100">
        <div className="overflow-x-auto pb-4">
          <Table className="border-separate border-spacing-y-2">
            <TableHeader className="bg-transparent border-none">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-full md:w-[400px] font-black text-primary/70 uppercase tracking-[0.3em] text-[10px] md:text-[11px] px-8 md:px-14 py-2">Marca / Identidade</TableHead>
                <TableHead className="hidden md:table-cell font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-2">Comunicação Oficial</TableHead>
                <TableHead className="hidden sm:table-cell font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-2">Canais Digitais</TableHead>
                <TableHead className="text-right font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-8 md:px-14 py-2">Ações</TableHead>
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
                  <TableRow key={sponsor.id} className="group glass-card hover:bg-primary/[0.05] dark:hover:bg-white/[0.05] transition-all duration-500 border-none shadow-sm">
                    <TableCell className="px-8 md:px-14 py-4 md:py-5 first:rounded-l-[2rem]">
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl bg-white dark:bg-white/10 border border-primary/10 overflow-hidden shrink-0 shadow-lg group-hover:scale-110 transition-all duration-500 ring-1 ring-black/5">
                          {sponsor.logo_url ? (
                            <img src={sponsor.logo_url} alt={sponsor.nome} className="h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-110" />
                          ) : (
                            <Building2 className="h-5 w-5 md:h-8 md:w-8 text-primary/20" />
                          )}
                        </div>
                        <span className="font-black text-base md:text-xl text-foreground tracking-tighter leading-none italic uppercase text-gradient transition-colors duration-500 group-hover:text-primary">{sponsor.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-10 py-4 md:py-5">
                      {sponsor.hashtags_oficiais ? (
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-fit h-8 px-4 gap-2 border-primary/10 hover:border-primary hover:bg-primary hover:text-white font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-500 rounded-lg"
                            onClick={() => copyToClipboard(sponsor.hashtags_oficiais!, "Hashtags")}
                          >
                            <Copy className="h-3 w-3" />
                            Copiar
                          </Button>
                          <span className="text-[9px] text-primary/70 font-black uppercase tracking-[0.2em] truncate max-w-[240px] italic">
                            {sponsor.hashtags_oficiais}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[9px] text-muted-foreground/30 font-black uppercase tracking-[0.3em] italic">Sem hashtags</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell px-10 py-4 md:py-5">
                      <div className="flex items-center gap-2">
                        {sponsor.instagram && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-9 px-4 gap-2 font-black text-[9px] uppercase tracking-[0.2em] rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-500"
                            onClick={() => copyToClipboard(sponsor.instagram!, "Instagram")}
                          >
                            <Camera className="h-3 w-3" />
                            Instagram
                          </Button>
                        )}
                        {sponsor.website && (
                          <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-primary/10 hover:text-primary hover:bg-primary/10 transition-all duration-500 shadow-inner group/web">
                              <Globe className="h-5 w-5 group-hover/web:scale-110 transition-transform" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-8 md:px-14 py-4 md:py-5 last:rounded-r-[2rem]">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={
                          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-500">
                            <MoreHorizontal className="h-5 w-5 md:h-6 md:w-6" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end" className="w-64 p-3 hyper-glass border-primary/10 rounded-2xl animate-reveal">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-[10px] uppercase text-primary/60 font-black tracking-[0.3em] px-4 py-4">Gestão da Parceria</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-primary/10 mx-2 mb-2" />
                            <DropdownMenuItem className="cursor-pointer font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 focus:bg-primary/10 focus:text-primary transition-all duration-300" onClick={() => handleEdit(sponsor)}>
                              Editar Parceiro
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 transition-all duration-300" onClick={() => handleDelete(sponsor.id)}>
                              Terminar Parceria
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
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

      {editingSponsor && (
        <EditSponsorDialog 
          sponsor={editingSponsor} 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen} 
        />
      )}
    </div>
  )
}

