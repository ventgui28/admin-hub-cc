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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Save, User, Award, Check } from "lucide-react"
import { removeParticipation, updateResult } from "./actions"
import { toast } from "sonner"

interface Participation {
  id: string
  resultado: string | null
  athletes: {
    id: string
    nome: string
    categoria: string | null
  }
}

interface ParticipationsTableProps {
  raceId: string
  participations: Participation[]
}

export function ParticipationsTable({ raceId, participations }: ParticipationsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [resultValue, setResultValue] = useState("")

  const handleRemove = async (id: string) => {
    const result = await removeParticipation(id, raceId)
    if (result.error) toast.error(result.error)
    else toast.success("Atleta removido da convocatória")
  }

  const handleSaveResult = async (id: string) => {
    const result = await updateResult(id, raceId, resultValue)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Resultado atualizado!")
      setEditingId(null)
    }
  }

  return (
    <div className="glass-card p-0 overflow-hidden border-none shadow-2xl animate-in delay-100">
      <Table className="border-separate border-spacing-y-2">
        <TableHeader className="bg-transparent">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[300px] font-black text-primary/70 uppercase tracking-[0.2em] text-[10px] px-10 py-2">Atleta</TableHead>
            <TableHead className="font-black text-primary/70 uppercase tracking-[0.2em] text-[10px] px-10 py-2">Classificação / Resultado</TableHead>
            <TableHead className="text-right font-black text-primary/70 uppercase tracking-[0.2em] text-[10px] px-10 py-2">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-48 text-center text-muted-foreground italic font-medium">
                Nenhum atleta convocado para esta prova.
              </TableCell>
            </TableRow>
          ) : (
            participations.map((part) => (
              <TableRow key={part.id} className="group glass-card hover:bg-primary/[0.05] dark:hover:bg-white/[0.05] transition-all duration-500 border-none shadow-sm">
                <TableCell className="px-10 py-4 first:rounded-l-[2rem]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-base text-foreground leading-none tracking-tight group-hover:text-primary transition-colors">
                        {part.athletes.nome}
                      </span>
                      <span className="text-[9px] text-primary/60 font-black uppercase tracking-[0.15em] mt-1">
                        {part.athletes.categoria || "Sem Categoria"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-10 py-4">
                  {editingId === part.id ? (
                    <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                      <Input 
                        value={resultValue} 
                        onChange={(e) => setResultValue(e.target.value)}
                        placeholder="Resultado..."
                        className="h-9 bg-white/50 dark:bg-black/20 border-primary/20 rounded-lg font-bold text-sm"
                        autoFocus
                      />
                      <Button size="icon" onClick={() => handleSaveResult(part.id)} className="h-9 w-9 shrink-0 rounded-lg shadow-lg shadow-primary/20">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="flex items-center gap-3 cursor-pointer group/result"
                      onClick={() => {
                        setEditingId(part.id)
                        setResultValue(part.resultado || "")
                      }}
                    >
                      <Award className={`h-4 w-4 ${part.resultado ? 'text-yellow-500' : 'text-primary/20'}`} />
                      <span className={`font-black text-[11px] uppercase tracking-widest ${part.resultado ? 'text-foreground' : 'text-muted-foreground italic'}`}>
                        {part.resultado || "Registar..."}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right px-10 py-4 last:rounded-r-[2rem]">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                    onClick={() => handleRemove(part.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
