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
import { updateSponsor } from "./actions"
import { toast } from "sonner"

interface EditSponsorDialogProps {
  sponsor: {
    id: string
    nome: string
    hashtags_oficiais: string | null
    instagram: string | null
    website: string | null
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditSponsorDialog({ sponsor, open, onOpenChange }: EditSponsorDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateSponsor(sponsor.id, formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Patrocinador atualizado com sucesso!")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Editar Parceiro</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Altera os dados da marca parceira oficial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Nome da Marca</Label>
              <Input 
                id="nome" 
                name="nome" 
                defaultValue={sponsor.nome}
                placeholder="Ex: Bicicletas Cantanhede" 
                required 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hashtags_oficiais" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Hashtags Oficiais</Label>
              <Input 
                id="hashtags_oficiais" 
                name="hashtags_oficiais" 
                defaultValue={sponsor.hashtags_oficiais || ""}
                placeholder="#CantanhedeCycling #MarcaX" 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Instagram</Label>
                <Input 
                  id="instagram" 
                  name="instagram" 
                  defaultValue={sponsor.instagram || ""}
                  placeholder="@user" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Website Oficial</Label>
                <Input 
                  id="website" 
                  name="website" 
                  type="url" 
                  defaultValue={sponsor.website || ""}
                  placeholder="https://www.marca.pt" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A atualizar..." : "Atualizar Parceiro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
