import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Trash2, Edit2 } from "lucide-react"
import { toast } from "sonner"
import { deleteTextBlock } from "./actions"
import { EditTextDialog } from "./edit-text-dialog"

interface TextBlock {
  id: string
  titulo: string
  conteudo: string
  categoria: string | null
  created_at: string
}

export function TextsList({ blocks }: { blocks: TextBlock[] }) {
  const [editingBlock, setEditingBlock] = useState<TextBlock | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Texto copiado para o clipboard!", {
      icon: <Copy className="h-4 w-4" />,
      description: "Pronto para colar nas redes sociais.",
    })
  }

  const handleDelete = async (id: string) => {
    const result = await deleteTextBlock(id)
    if (result.error) toast.error(result.error)
    else toast.success("Texto removido")
  }

  const handleEdit = (block: TextBlock) => {
    setEditingBlock(block)
    setIsEditDialogOpen(true)
  }

  if (blocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed rounded-[2rem] bg-muted/20 animate-reveal">
        <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs italic">Nenhum texto nesta categoria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 animate-reveal delay-200">
      {blocks.map((block) => (
        <Card key={block.id} className="glass-card border-none p-0 flex flex-col h-full shadow-2xl hover:shadow-primary/20 overflow-hidden group">
          <CardHeader className="p-8 pb-6 flex flex-row items-start justify-between space-y-0 border-b border-white/10 bg-primary/[0.03] dark:bg-white/[0.02]">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/70">
                {block.categoria || 'Geral'}
              </span>
              <CardTitle className="text-3xl font-black tracking-tighter italic uppercase text-gradient leading-none">
                {block.titulo}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 text-muted-foreground/30 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all duration-300 active:scale-90"
                onClick={() => handleEdit(block)}
              >
                <Edit2 className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all duration-300 active:scale-90"
                onClick={() => handleDelete(block.id)}
              >
                <Trash2 className="h-6 w-6" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 flex flex-col gap-8 flex-1">
            <div className="relative rounded-3xl bg-white/50 dark:bg-black/40 p-8 text-base text-foreground/90 font-medium leading-relaxed border border-white/20 dark:border-white/10 shadow-inner whitespace-pre-wrap min-h-[180px] flex-1 group-hover:bg-white/70 dark:group-hover:bg-black/60 transition-colors duration-700">
              {block.conteudo}
              
              {/* Decorative Quote Mark */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] scale-[2] rotate-12 group-hover:scale-[2.2] transition-transform duration-700">
                <Copy className="w-24 h-24" />
              </div>
            </div>
            
            <Button 
              className="btn-premium w-full h-16" 
              onClick={() => copyToClipboard(block.conteudo)}
            >
              <Copy className="h-5 w-5" />
              Copiar Legenda
            </Button>
          </CardContent>
        </Card>
      ))}

      {editingBlock && (
        <EditTextDialog 
          block={editingBlock} 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen} 
        />
      )}
    </div>
  )
}

