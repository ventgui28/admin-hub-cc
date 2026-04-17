"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileIcon, ImageIcon, MoreVertical, Trash2, Archive } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface FileObject {
  name: string
  id: string | null
  updated_at: string | null
  created_at: string | null
  last_accessed_at: string | null
  metadata: any
}

interface VaultTabsProps {
  photos: FileObject[]
  logos: FileObject[]
}

export function VaultTabs({ photos, logos }: VaultTabsProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleDownload = async (bucket: string, fileName: string) => {
    const { data, error } = await supabase.storage.from(bucket).download(fileName)

    if (error) {
      toast.error("Erro ao descarregar ficheiro")
      return
    }

    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const handleDelete = async (bucket: string, fileName: string) => {
    const { error } = await supabase.storage.from(bucket).remove([fileName])

    if (error) {
      toast.error("Erro ao apagar ficheiro")
    } else {
      toast.success("Ficheiro removido")
      router.refresh()
    }
  }

  const getPublicUrl = (bucket: string, fileName: string) => {
    return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl
  }

  const FileGrid = ({ files, bucket }: { files: FileObject[], bucket: string }) => {
    const filteredFiles = files.filter(f => f.name !== '.emptyFolderPlaceholder')

    if (filteredFiles.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed rounded-[2.5rem] bg-muted/20 animate-reveal">
          <Archive className="h-16 w-16 text-primary/10 mb-6" />
          <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs italic">Nenhum ficheiro encontrado neste bucket.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 animate-reveal delay-200">
        {filteredFiles.map((file, index) => {
          const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
          const publicUrl = isImage ? getPublicUrl(bucket, file.name) : null

          return (
            <Card key={file.id || file.name} className="overflow-hidden group border-none glass-card p-0 flex flex-col hover:-translate-y-3 transition-all duration-700 shadow-2xl hover:shadow-primary/20">
              <CardContent className="p-0 aspect-square bg-muted/30 flex items-center justify-center relative overflow-hidden">
                {isImage && publicUrl ? (
                  <img 
                    src={publicUrl} 
                    alt={file.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <div className="h-20 w-20 rounded-3xl bg-white/50 dark:bg-black/40 flex items-center justify-center shadow-inner ring-1 ring-black/5">
                      {bucket === 'photos' ? <ImageIcon className="h-10 w-10 text-primary/30" /> : <FileIcon className="h-10 w-10 text-primary/30" />}
                    </div>
                  </div>
                )}
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                  <Button 
                    className="h-14 w-14 rounded-full bg-white text-primary shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300"
                    onClick={() => handleDownload(bucket, file.name)}
                  >
                    <Download className="h-6 w-6" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="p-6 flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-xl border-t border-white/10 mt-auto">
                <div className="flex flex-col min-w-0 gap-1">
                  <span className="text-xs font-black text-foreground uppercase tracking-widest truncate max-w-[160px] italic">
                    {file.name}
                  </span>
                  <span className="text-[9px] text-primary/60 font-black uppercase tracking-[0.3em]">
                    {new Date(file.created_at || Date.now()).toLocaleDateString('pt-PT')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-300"
                    onClick={() => handleDelete(bucket, file.name)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <Tabs defaultValue="photos" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 animate-reveal delay-100">
        <TabsList className="grid w-full grid-cols-2 max-w-[500px] h-16 p-2 hyper-glass rounded-2xl ring-0">
          <TabsTrigger value="photos" className="rounded-xl font-black uppercase italic tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl shadow-primary/20 transition-all duration-500">
            <ImageIcon className="h-4 w-4 mr-2" />
            Fotos da Equipa
          </TabsTrigger>
          <TabsTrigger value="logos" className="rounded-xl font-black uppercase italic tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl shadow-primary/20 transition-all duration-500">
            <FileIcon className="h-4 w-4 mr-2" />
            Logótipos Oficiais
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="photos" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <FileGrid files={photos} bucket="photos" />
      </TabsContent>
      <TabsContent value="logos" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <FileGrid files={logos} bucket="logos" />
      </TabsContent>
    </Tabs>
  )
}
