"use client"

import { useState, useMemo } from "react"
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
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Trash2, 
  Search, 
  Filter,
  X,
  MoreHorizontal
} from "lucide-react"
import { toast } from "sonner"
import { deleteRace } from "./actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EditRaceDialog } from "./edit-race-dialog"

interface Race {
  id: string
  nome: string
  data: string
  local: string | null
  tipo: string | null
  url_oficial: string | null
}

export function RacesTable({ races }: { races: Race[] }) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [editingRace, setEditingRace] = useState<Race | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredRaces = useMemo(() => {
    return races.filter(race => {
      const matchesSearch = race.nome.toLowerCase().includes(search.toLowerCase()) || 
                           (race.local?.toLowerCase().includes(search.toLowerCase()) ?? false)
      const matchesType = typeFilter === "all" || race.tipo === typeFilter
      return matchesSearch && matchesType
    })
  }, [races, search, typeFilter])

  const handleDelete = async (id: string) => {
    const result = await deleteRace(id)
    if (result.error) toast.error(result.error)
    else toast.success("Prova removida")
  }

  const handleEdit = (race: Race) => {
    setEditingRace(race)
    setIsEditDialogOpen(true)
  }

  const isFuture = (dateStr: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const raceDate = new Date(dateStr)
    return raceDate >= today
  }

  return (
    <div className="space-y-10">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between animate-reveal delay-100">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
          <Input 
            placeholder="Pesquisar por prova ou local..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-16 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold transition-all"
          />
          {search && (
            <Button variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent text-muted-foreground hover:text-primary" onClick={() => setSearch("")}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 px-6 h-16 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-inner group">
            <Filter className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
            <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val ?? "all")}>
              <SelectTrigger className="border-none bg-transparent focus:ring-0 h-full font-black text-xs uppercase tracking-[0.2em] min-w-[180px]">
                <SelectValue placeholder="Tipo de Prova" />
              </SelectTrigger>
              <SelectContent className="hyper-glass border-white/20 rounded-2xl p-2">
                <SelectItem value="all" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Todos os Tipos</SelectItem>
                <SelectItem value="Estrada" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Estrada</SelectItem>
                <SelectItem value="BTT" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">BTT</SelectItem>
                <SelectItem value="Pista" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Pista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="glass-card p-0 overflow-hidden border-none shadow-2xl animate-reveal delay-200">
        <div className="overflow-x-auto pb-4">
          <Table className="border-separate border-spacing-y-4">
            <TableHeader className="bg-transparent border-none">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-full md:w-[400px] font-black text-primary/70 uppercase tracking-[0.3em] text-[10px] md:text-[11px] px-6 md:px-10 py-2">Prova / Cronologia</TableHead>
                <TableHead className="hidden md:table-cell font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-2">Localização</TableHead>
                <TableHead className="hidden sm:table-cell text-center font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-2">Status</TableHead>
                <TableHead className="text-right font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-6 md:px-10 py-2">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRaces.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center text-muted-foreground italic font-medium text-lg">
                    Nenhuma prova encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRaces.map((race) => (
                  <TableRow key={race.id} className="group glass-card hover:bg-primary/[0.05] dark:hover:bg-white/[0.05] transition-all duration-500 border-none shadow-sm hover:shadow-xl hover:-translate-y-1">
                    <TableCell className="px-6 md:px-10 py-8 md:py-10 first:rounded-l-[2rem]">
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-white dark:bg-black/40 text-primary border border-primary/20 shrink-0 shadow-lg md:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ring-1 ring-black/5">
                          <Calendar className="h-6 w-6 md:h-8 md:w-8" />
                        </div>
                        <div className="flex flex-col gap-1 md:gap-1.5">
                          <span className="font-black text-lg md:text-2xl text-foreground leading-none tracking-tighter group-hover:text-primary transition-colors duration-500 italic uppercase">
                            {race.nome}
                          </span>
                          <span className="text-[9px] md:text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] md:tracking-[0.25em] flex items-center gap-2">
                            <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary/40 animate-pulse" />
                            {new Date(race.data).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-10 py-8 md:py-10">
                      <div className="flex items-center gap-3 text-foreground/70 font-black uppercase tracking-widest text-xs italic">
                        <MapPin className="h-5 w-5 text-primary/40" />
                        {race.local || "Não definido"}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center px-10 py-8 md:py-10">
                      <div className="flex justify-center">
                        <Badge 
                          variant={isFuture(race.data) ? "default" : "outline"} 
                          className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl transition-all duration-700 ${
                            isFuture(race.data) 
                              ? "bg-primary hover:bg-primary/90 shadow-primary/30 ring-4 ring-primary/10" 
                              : "text-muted-foreground border-muted-foreground/20 bg-muted/50"
                          }`}
                        >
                          {isFuture(race.data) ? "Brevemente" : "Concluída"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-6 md:px-10 py-8 md:py-10 last:rounded-r-[2rem]">
                      <div className="flex justify-end gap-2 md:gap-3">
                        {race.url_oficial && (
                          <a href={race.url_oficial} target="_blank" rel="noopener noreferrer" className="hidden xs:block">
                            <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl border border-primary/10 hover:text-primary hover:bg-primary/10 transition-all duration-500 shadow-inner group/web">
                              <ExternalLink className="h-5 w-5 md:h-6 md:w-6 group-hover/web:scale-110" />
                            </Button>
                          </a>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger render={
                            <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl hover:bg-primary/10 hover:text-primary transition-all duration-500 group/btn">
                              <MoreHorizontal className="h-6 w-6 md:h-7 md:w-7 group-hover/btn:scale-110" />
                            </Button>
                          } />
                          <DropdownMenuContent align="end" className="w-64 p-3 hyper-glass border-primary/10 rounded-2xl animate-reveal">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel className="text-[10px] uppercase text-primary/60 font-black tracking-[0.3em] px-4 py-4">Gestão de Prova</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-primary/10 mx-2 mb-2" />
                              <DropdownMenuItem className="cursor-pointer font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 focus:bg-primary/10 focus:text-primary transition-all duration-300" onClick={() => handleEdit(race)}>
                                Editar Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 transition-all duration-300" onClick={() => handleDelete(race.id)}>
                                Eliminar Evento
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {editingRace && (
        <EditRaceDialog 
          race={editingRace} 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen} 
        />
      )}
    </div>
  )
}

