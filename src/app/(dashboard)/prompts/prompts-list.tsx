"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Prompt {
  id: string
  titulo: string
  prompt_text: string
  estilo_visual: string | null
  created_at: string
}

export function PromptsList({ prompts }: { prompts: Prompt[] }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Prompt copiado para o clipboard!", {
      icon: <Bot className="h-4 w-4" />,
      description: "Pronto para usar no Midjourney ou ChatGPT.",
    })
  }

  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-3xl bg-muted/30 animate-in">
        <Bot className="h-12 w-12 text-muted-foreground mb-4 opacity-10" />
        <p className="text-muted-foreground font-medium italic text-sm">Nenhum prompt registado. Comece por criar um!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 animate-in">
      {prompts.map((prompt) => (
        <Card key={prompt.id} className="glass-card border-none p-0 flex flex-col h-full shadow-xl hover:shadow-primary/20 overflow-hidden group relative">
          {/* AI Pulse Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
          
          <CardHeader className="p-8 pb-4 relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-inner">
                    <Bot className="h-4 w-4" />
                  </div>
                  {prompt.estilo_visual && (
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
                      {prompt.estilo_visual}
                    </span>
                  )}
                </div>
                <CardTitle className="text-3xl font-black tracking-tighter italic uppercase text-gradient leading-none mt-2">
                  {prompt.titulo}
                </CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0 flex-1 flex flex-col gap-8 relative z-10">
            <div className="relative rounded-2xl bg-black/5 dark:bg-black/40 p-6 font-mono text-xs leading-relaxed text-foreground/70 border border-white/20 dark:border-white/5 shadow-inner flex-1 group-hover:text-foreground transition-colors duration-500 overflow-hidden">
              <p className="line-clamp-6 whitespace-pre-wrap">{prompt.prompt_text}</p>
              
              {/* Decorative Matrix Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <Button 
              className="w-full gap-3 h-14 text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-2xl bg-primary hover:bg-primary/90" 
              onClick={() => copyToClipboard(prompt.prompt_text)}
            >
              <Copy className="h-5 w-5" />
              Copiar Prompt IA
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { Bot } from "lucide-react"
