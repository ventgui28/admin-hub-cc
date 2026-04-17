"use client"

import { Button } from "@/components/ui/button"
import { Archive, PlusCircle } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import imageCompression from 'browser-image-compression'

export function VaultHeader() {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [bucket, setBucket] = useState("photos")
  const router = useRouter()

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let file = formData.get('file') as File
    
    if (!file || file.size === 0) {
      toast.error("Por favor, selecione um ficheiro.")
      return
    }

    setUploading(true)

    // Se for para o bucket de fotos e for uma imagem, vamos comprimir
    if (bucket === "photos" && file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 1.5, // Alvo de 1.5MB para alta qualidade
          maxWidthOrHeight: 2048, // Resolução ideal para redes sociais
          useWebWorker: true,
        }
        
        toast.info("A otimizar imagem para upload rápido...")
        const compressedFile = await imageCompression(file, options)
        
        // Criar um novo ficheiro com o nome original mas dados comprimidos
        file = new File([compressedFile], file.name, {
          type: compressedFile.type,
          lastModified: Date.now(),
        })
      } catch (error) {
        console.error("Erro na compressão:", error)
        toast.error("Erro ao otimizar imagem. O upload continuará com o original.")
      }
    }

    const supabase = createClient()

    // Gerar um nome único para o ficheiro
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    setUploading(false)

    if (error) {
      toast.error(`Erro no upload: ${error.message}`)
    } else {
      toast.success("Ficheiro carregado com sucesso!")
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-between animate-reveal">
      <div className="flex flex-col gap-3">
        <div className="h-1 w-12 bg-primary rounded-full mb-2" />
        <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none text-gradient">Galeria</h1>
        <p className="text-muted-foreground text-lg font-medium max-w-xl">
          Repositório central de fotos e logótipos da equipa Cantanhede Cycling.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={
          <Button className="btn-premium gap-3">
            <PlusCircle className="h-5 w-5" />
            Carregar Ficheiro
          </Button>
        } />
        <DialogContent className="sm:max-w-[550px] hyper-glass border-white/20 p-8 rounded-[2rem]">
          <form onSubmit={handleUpload} className="space-y-8">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-gradient">Upload para a Galeria</DialogTitle>
              <DialogDescription className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                Organiza o teu conteúdo selecionando o destino apropriado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="bucket" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Destino do Conteúdo</Label>
                <Select value={bucket} onValueChange={(val) => setBucket(val ?? "fotos")}>
                  <SelectTrigger className="h-14 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner font-bold px-6">
                    <SelectValue placeholder="Selecione o destino" />
                  </SelectTrigger>
                  <SelectContent className="hyper-glass border-white/20 rounded-2xl p-2">
                    <SelectItem value="photos" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Fotos da Equipa</SelectItem>
                    <SelectItem value="logos" className="font-black text-xs uppercase tracking-[0.2em] py-3 rounded-xl focus:bg-primary/10 focus:text-primary">Logótipos Oficiais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file" className="font-black text-[10px] uppercase tracking-[0.2em] text-primary/60 ml-1">Ficheiro</Label>
                <div className="relative">
                  <Input 
                    id="file" 
                    name="file" 
                    type="file" 
                    required 
                    className="h-auto py-6 bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10 rounded-2xl focus-visible:ring-primary shadow-inner px-6 file:mr-6 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all" 
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex gap-4 pt-4">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest text-muted-foreground hover:bg-foreground/5">Cancelar</Button>
              <Button type="submit" disabled={uploading} className="btn-premium flex-[2] h-16 shadow-2xl">
                {uploading ? "A carregar..." : "Iniciar Upload"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

