"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { updateRace } from "./actions"
import { toast } from "sonner"

interface EditRaceDialogProps {
  race: {
    id: string
    nome: string
    data: string
    local: string | null
    tipo: string | null
    url_oficial: string | null
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditRaceDialog({ race, open, onOpenChange }: EditRaceDialogProps) {
  const [loading, setLoading] = useState(false)
  const [tipo, setTipo] = useState(race.tipo || "Estrada")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    formData.append('tipo', tipo)
    
    const result = await updateRace(race.id, formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Prova atualizada com sucesso!")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Editar Prova</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Altera os detalhes do evento no calendário desportivo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Nome da Prova</Label>
              <Input 
                id="nome" 
                name="nome" 
                defaultValue={race.nome}
                placeholder="Ex: Volta a Cantanhede" 
                required 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Data do Evento</Label>
                <Input 
                  id="data" 
                  name="data" 
                  type="date" 
                  defaultValue={race.data}
                  required 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold px-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Tipo de Prova</Label>
                <Select value={tipo} onValueChange={(val) => setTipo(val ?? "")}>
                  <SelectTrigger className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner font-bold px-6">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent className="hyper-glass border-white/20 rounded-2xl p-2">
                    <SelectItem value="Estrada" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Estrada</SelectItem>
                    <SelectItem value="BTT" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">BTT</SelectItem>
                    <SelectItem value="Pista" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Pista</SelectItem>
                    <SelectItem value="Ciclocrosse" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Ciclocrosse</SelectItem>
                    <SelectItem value="Outro" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="local" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Localização</Label>
              <Input 
                id="local" 
                name="local" 
                defaultValue={race.local || ""}
                placeholder="Ex: Cantanhede, Coimbra" 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url_oficial" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">URL Oficial (Opcional)</Label>
              <Input 
                id="url_oficial" 
                name="url_oficial" 
                type="url" 
                defaultValue={race.url_oficial || ""}
                placeholder="https://..." 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A atualizar..." : "Atualizar Prova"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
