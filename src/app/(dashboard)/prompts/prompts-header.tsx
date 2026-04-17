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
import { Textarea } from "@/components/ui/textarea"
import { Bot, PlusCircle } from "lucide-react"
import { addPrompt } from "./actions"
import { toast } from "sonner"

export function PromptsHeader() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await addPrompt(formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Prompt guardado com sucesso!")
      setOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Prompts IA</h1>
        <p className="text-muted-foreground">
          Registo de engenharia de prompts para gerar imagens e estilos visuais da equipa.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gap-2">
          <PlusCircle className="h-4 w-4" />
          Novo Prompt
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Guardar Novo Prompt</DialogTitle>
              <DialogDescription>
                Registe as instruções e o estilo visual para replicar no futuro.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título / Contexto</Label>
                <Input id="titulo" name="titulo" placeholder="Ex: Fotos de Ação - Estilo Épico" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estilo_visual">Estilo Visual (Opcional)</Label>
                <Input id="estilo_visual" name="estilo_visual" placeholder="Ex: Cinematic, High Contrast, 8k" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt_text">O Prompt (Texto Completo)</Label>
                <Textarea 
                  id="prompt_text" 
                  name="prompt_text" 
                  placeholder="Cole aqui o prompt que usaste..." 
                  className="min-h-[150px]"
                  required 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "A guardar..." : "Guardar Prompt"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
