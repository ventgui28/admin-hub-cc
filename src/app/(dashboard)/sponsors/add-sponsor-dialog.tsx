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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { addSponsor } from "./actions"
import { toast } from "sonner"

export function AddSponsorDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await addSponsor(formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Patrocinador adicionado com sucesso!")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="btn-premium gap-3">
          <PlusCircle className="h-5 w-5" />
          Novo Patrocinador
        </Button>
      } />
      <DialogContent className="sm:max-w-[550px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Novo Parceiro</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Regista uma marca parceira para centralizar a comunicação oficial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Nome da Marca</Label>
              <Input 
                id="nome" 
                name="nome" 
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
                  placeholder="https://www.marca.pt" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A guardar..." : "Registar Parceiro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

