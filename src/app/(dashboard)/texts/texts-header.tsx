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
import { PlusCircle } from "lucide-react"
import { addTextBlock } from "./actions"
import { toast } from "sonner"

export function TextsHeader() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await addTextBlock(formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Bloco de texto guardado!")
      setOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-between animate-reveal">
      <div className="flex flex-col gap-3">
        <div className="h-1 w-12 bg-primary rounded-full mb-2" />
        <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none text-gradient">
          Central de Textos
        </h1>
        <p className="text-muted-foreground text-lg font-medium max-w-xl">
          Gere as tuas legendas padrão, hashtags e estruturas de resultados para copy-paste imediato.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={
          <Button className="btn-premium gap-3">
            <PlusCircle className="h-5 w-5" />
            Novo Texto
          </Button>
        } />
        <DialogContent className="sm:max-w-[600px] hyper-glass border-white/20 p-8 rounded-[2rem]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Novo Bloco de Texto</DialogTitle>
              <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                Cria uma estrutura de texto para usar repetidamente nas redes sociais.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="titulo" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Título do Bloco</Label>
                <Input 
                  id="titulo" 
                  name="titulo" 
                  placeholder="ex: Legenda de Resultados" 
                  required 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Categoria</Label>
                <Input 
                  id="categoria" 
                  name="categoria" 
                  placeholder="ex: Hashtags, Resultados" 
                  defaultValue="Geral" 
                  className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner text-base font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="conteudo" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Conteúdo</Label>
                <Textarea 
                  id="conteudo" 
                  name="conteudo" 
                  placeholder="Escreve ou cola aqui o texto..." 
                  className="min-h-[250px] bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner p-6 text-base leading-relaxed"
                  required 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading} className="btn-premium w-full h-16">
                {loading ? "A guardar..." : "Guardar Bloco de Texto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

