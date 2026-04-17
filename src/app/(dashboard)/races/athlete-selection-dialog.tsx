"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, UserPlus, Check, Users } from "lucide-react"
import { addParticipation } from "../actions"
import { toast } from "sonner"

interface Athlete {
  id: string
  nome: string
  categoria: string | null
}

interface AthleteSelectionDialogProps {
  raceId: string
  allAthletes: Athlete[]
  currentAthleteIds: string[]
}

export function AthleteSelectionDialog({ 
  raceId, 
  allAthletes, 
  currentAthleteIds 
}: AthleteSelectionDialogProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const availableAthletes = allAthletes.filter(
    athlete => !currentAthleteIds.includes(athlete.id) &&
    athlete.nome.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = async (athleteId: string) => {
    const result = await addParticipation(raceId, athleteId)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Atleta convocado!")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 gap-2 transition-all hover:scale-[1.02]">
          <UserPlus className="h-5 w-5" />
          Convocar Atleta
        </Button>
      } />
      <DialogContent className="sm:max-w-[500px] glass-card border-white/20 p-0 overflow-hidden">
        <div className="p-6 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tight text-primary">Convocatória</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium">
              Selecione os atletas para participar nesta prova.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar atleta..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-white/50 dark:bg-black/20 rounded-xl"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
            {availableAthletes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground italic text-sm">
                Nenhum atleta disponível para convocar.
              </div>
            ) : (
              availableAthletes.map(athlete => (
                <div 
                  key={athlete.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-white/5 border border-white/10 hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{athlete.nome}</span>
                    <span className="text-[10px] uppercase font-black text-primary/60">{athlete.categoria || "Sem Categoria"}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-lg hover:bg-primary hover:text-white"
                    onClick={() => handleAdd(athlete.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-primary/5 p-4 text-center border-t border-primary/10">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 flex items-center justify-center gap-2">
            <Users className="h-3 w-3" /> {availableAthletes.length} atletas disponíveis
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
