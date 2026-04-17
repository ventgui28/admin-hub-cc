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
import { Textarea } from "@/components/ui/textarea"
import { updateTextBlock } from "./actions"
import { toast } from "sonner"

interface EditTextDialogProps {
  block: {
    id: string
    titulo: string
    conteudo: string
    categoria: string | null
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTextDialog({ block, open, onOpenChange }: EditTextDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateTextBlock(block.id, formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Texto atualizado com sucesso!")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Editar Legenda</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Altera o conteúdo ou a categoria deste bloco de texto.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Título do Bloco</Label>
              <Input 
                id="titulo" 
                name="titulo" 
                defaultValue={block.titulo}
                placeholder="Ex: Legenda para Instagram" 
                required 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Categoria</Label>
              <Input 
                id="categoria" 
                name="categoria" 
                defaultValue={block.categoria || ""}
                placeholder="Ex: Instagram, Facebook, Site" 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conteudo" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Conteúdo do Texto</Label>
              <Textarea 
                id="conteudo" 
                name="conteudo" 
                defaultValue={block.conteudo}
                placeholder="Escreva aqui a sua legenda..." 
                required 
                className="min-h-[200px] bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-3xl focus-visible:ring-primary shadow-inner text-base font-medium leading-relaxed resize-none p-6"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A atualizar..." : "Atualizar Texto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
