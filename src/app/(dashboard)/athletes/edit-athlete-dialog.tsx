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
import { updateAthlete } from "./actions"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

interface EditAthleteDialogProps {
  athlete: {
    id: string
    nome: string
    categoria: string | null
    instagram: string | null
    facebook: string | null
    ativo: boolean | null
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditAthleteDialog({ athlete, open, onOpenChange }: EditAthleteDialogProps) {
  const [loading, setLoading] = useState(false)
  const [ativo, setAtivo] = useState(athlete.ativo ?? true)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    formData.append('ativo', ativo.toString())
    
    const result = await updateAthlete(athlete.id, formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Atleta atualizado com sucesso!")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Editar Atleta</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Altera os dados do membro do roster oficial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Nome Completo</Label>
              <Input 
                id="nome" 
                name="nome" 
                defaultValue={athlete.nome}
                placeholder="Ex: João Silva" 
                required 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Categoria / Escalão</Label>
              <Input 
                id="categoria" 
                name="categoria" 
                defaultValue={athlete.categoria || ""}
                placeholder="Ex: Sub-23" 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Instagram</Label>
                <Input 
                  id="instagram" 
                  name="instagram" 
                  defaultValue={athlete.instagram || ""}
                  placeholder="@user" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Facebook</Label>
                <Input 
                  id="facebook" 
                  name="facebook" 
                  defaultValue={athlete.facebook || ""}
                  placeholder="fb.com/user" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/10 shadow-inner group/status">
              <div className="space-y-1">
                <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 group-hover/status:text-primary transition-colors">Estado da Conta</Label>
                <p className="text-[10px] text-muted-foreground uppercase font-medium">Define se o atleta está ativo no roster</p>
              </div>
              <Checkbox checked={ativo} onCheckedChange={(checked) => setAtivo(checked === true)} />
            </div>
          </div>
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A atualizar..." : "Atualizar Atleta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
