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
import { updatePrompt } from "./actions"
import { toast } from "sonner"

interface EditPromptDialogProps {
  prompt: {
    id: string
    titulo: string
    prompt_text: string
    estilo_visual: string | null
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditPromptDialog({ prompt, open, onOpenChange }: EditPromptDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updatePrompt(prompt.id, formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Prompt atualizado!")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] hyper-glass border-white/20 p-8 rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Editar Estilo IA</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
              Ajusta as instruções de inteligência artificial e o estilo visual associado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Nome do Estilo</Label>
              <Input 
                id="titulo" 
                name="titulo" 
                defaultValue={prompt.titulo}
                placeholder="Ex: Foto de Ação Premium" 
                required 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estilo_visual" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Tag Visual</Label>
              <Input 
                id="estilo_visual" 
                name="estilo_visual" 
                defaultValue={prompt.estilo_visual || ""}
                placeholder="Ex: Cinematic, Hyper-realistic" 
                className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt_text" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Prompt Base</Label>
              <Textarea 
                id="prompt_text" 
                name="prompt_text" 
                defaultValue={prompt.prompt_text}
                placeholder="Instruções para a IA..." 
                required 
                className="min-h-[180px] bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-3xl focus-visible:ring-primary shadow-inner text-xs font-mono p-6 resize-none"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
            <Button type="submit" disabled={loading} className="btn-premium flex-[2] h-16 shadow-2xl">
              {loading ? "A guardar..." : "Guardar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
