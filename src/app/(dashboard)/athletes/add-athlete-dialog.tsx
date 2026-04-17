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
import { addAthlete } from "./actions"
import { toast } from "sonner"

export function AddAthleteDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await addAthlete(formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Atleta adicionado com sucesso!")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="btn-premium gap-3">
          <PlusCircle className="h-5 w-5" />
          Novo Atleta
        </Button>
      } />
      <DialogContent className="sm:max-w-[550px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Novo Atleta</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Introduz os dados do novo membro para o roster oficial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Nome Completo</Label>
              <Input 
                id="nome" 
                name="nome" 
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
                  placeholder="@user" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Facebook</Label>
                <Input 
                  id="facebook" 
                  name="facebook" 
                  placeholder="fb.com/user" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
            </div>
            <input type="hidden" name="ativo" value="true" />
          </div>
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A guardar..." : "Registar Atleta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

