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
  Copy, 
  Globe, 
  Camera, 
  MoreHorizontal, 
  User, 
  Search, 
  Filter,
  X
} from "lucide-react"
import { toast } from "sonner"
import { deleteAthlete } from "./actions"
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
import { EditAthleteDialog } from "./edit-athlete-dialog"

interface Athlete {
  id: string
  nome: string
  categoria: string | null
  instagram: string | null
  facebook: string | null
  ativo: boolean | null
}

export function AthletesTable({ athletes }: { athletes: Athlete[] }) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [editingAthlete, setEditingAthlete] = useState<Athlete | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Obter categorias únicas para o filtro
  const categories = useMemo(() => {
    const cats = new Set(athletes.map(a => a.categoria).filter(Boolean))
    return Array.from(cats).sort()
  }, [athletes])

  const filteredAthletes = useMemo(() => {
    return athletes.filter(athlete => {
      const matchesSearch = athlete.nome.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || athlete.categoria === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [athletes, search, categoryFilter])

  const handleEdit = (athlete: Athlete) => {
    setEditingAthlete(athlete)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    const result = await deleteAthlete(id)
    if (result.error) toast.error(result.error)
    else toast.success("Atleta removido")
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copiado!`, {
      description: text,
      icon: <Copy className="h-4 w-4" />,
    })
  }

  const clearFilters = () => {
    setSearch("")
    setCategoryFilter("all")
  }

  return (
    <div className="space-y-10">
      {/* Barra de Ferramentas / Filtros */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between animate-reveal delay-100">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
          <Input 
            placeholder="Pesquisar por nome do atleta..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-16 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold transition-all"
          />
          {search && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent text-muted-foreground hover:text-primary"
              onClick={() => setSearch("")}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 px-6 h-16 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-inner group">
            <Filter className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
            <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val ?? "all")}>
              <SelectTrigger className="border-none bg-transparent focus:ring-0 h-full font-black text-xs uppercase tracking-[0.2em] min-w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="hyper-glass border-white/20 rounded-2xl p-2">
                <SelectItem value="all" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Todas as Categorias</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat!} className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(search || categoryFilter !== "all") && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="h-16 px-8 rounded-2xl border-2 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.2em] gap-3 transition-all"
            >
              <X className="h-4 w-4" />
              Limpar
            </Button>
          )}
        </div>
      </div>

      <div className="glass-card p-0 overflow-hidden border-none shadow-2xl animate-reveal delay-200">
        <div className="overflow-x-auto pb-4">
          <Table className="border-separate border-spacing-y-2">
            <TableHeader className="bg-transparent border-none">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-full md:w-[400px] font-black text-primary/70 uppercase tracking-[0.3em] text-[10px] md:text-[11px] px-8 md:px-14 py-2">Atleta / Categoria</TableHead>
                <TableHead className="hidden md:table-cell font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-2">Presença Digital</TableHead>
                <TableHead className="hidden sm:table-cell text-center font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-10 py-2">Estado Atual</TableHead>
                <TableHead className="text-right font-black text-primary/70 uppercase tracking-[0.3em] text-[11px] px-8 md:px-14 py-2">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAthletes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center text-muted-foreground italic font-medium text-lg">
                    {athletes.length === 0 
                      ? "Nenhum atleta registado. Clique em \"Novo Atleta\" para começar."
                      : "Nenhum atleta corresponde aos filtros aplicados."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAthletes.map((athlete) => (
                  <TableRow 
                    key={athlete.id} 
                    className="group glass-card hover:bg-primary/[0.05] dark:hover:bg-white/[0.05] transition-all duration-500 border-none shadow-sm"
                  >
                    <TableCell className="px-8 md:px-14 py-4 md:py-5 first:rounded-l-[2rem]">
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-white dark:bg-black/40 text-primary border border-primary/20 shrink-0 shadow-lg group-hover:scale-110 transition-all duration-500 ring-1 ring-black/5">
                          <User className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          <span className="font-black text-base md:text-xl text-foreground leading-none tracking-tighter group-hover:text-primary transition-colors duration-500 italic uppercase">
                            {athlete.nome}
                          </span>
                          <span className="text-[8px] md:text-[9px] text-primary/60 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            {athlete.categoria || "Sem Categoria"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell px-10 py-4 md:py-5">
                      <div className="flex gap-2">
                        {athlete.instagram && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4 gap-2 border-primary/10 hover:border-primary hover:bg-primary hover:text-white transition-all duration-500 font-black text-[9px] uppercase tracking-[0.2em] rounded-lg"
                            onClick={() => copyToClipboard(athlete.instagram!, "Instagram")}
                          >
                            <Camera className="h-3 w-3" />
                            @{athlete.instagram.replace('@', '')}
                          </Button>
                        )}
                        {athlete.facebook && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 px-4 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 font-black text-[9px] uppercase tracking-[0.2em] rounded-lg"
                            onClick={() => copyToClipboard(athlete.facebook!, "Facebook")}
                          >
                            <Globe className="h-3 w-3" />
                            Facebook
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center px-10 py-4 md:py-5">
                      <div className="flex justify-center">
                        <Badge 
                          variant={athlete.ativo ? "default" : "outline"} 
                          className={`px-4 py-1 text-[8px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-700 ${
                            athlete.ativo 
                              ? "bg-primary hover:bg-primary/90" 
                              : "text-muted-foreground border-muted-foreground/20 bg-muted/50"
                          }`}
                        >
                          {athlete.ativo ? "Ativo" : "Inativo"}
                        </Badge>
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
                            <DropdownMenuLabel className="text-[10px] uppercase text-primary/60 font-black tracking-[0.3em] px-4 py-4">Opções de Gestão</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-primary/10 mx-2 mb-2" />
                            <DropdownMenuItem className="cursor-pointer font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 focus:bg-primary/10 focus:text-primary transition-all duration-300" onClick={() => handleEdit(athlete)}>
                              Editar Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-black text-xs uppercase tracking-[0.2em] rounded-xl py-4 px-5 transition-all duration-300" onClick={() => handleDelete(athlete.id)}>
                              Eliminar Registo
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

      {editingAthlete && (
        <EditAthleteDialog 
          athlete={editingAthlete} 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen} 
        />
      )}
    </div>
  )
}

