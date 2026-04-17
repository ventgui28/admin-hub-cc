import { createClient } from "@/lib/supabase/server"
import { TextsHeader } from "./texts-header"
import { TextsList } from "./texts-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function TextsPage() {
  const supabase = await createClient()

  const { data: blocks, error } = await supabase
    .from("text_blocks")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao carregar textos:", error)
    return <div>Erro ao carregar os dados.</div>
  }

  // Agrupar por categorias
  const categories = Array.from(new Set((blocks || []).map(b => b.categoria)))

  return (
    <div className="flex flex-col gap-6">
      <TextsHeader />
      
      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos os Textos</TabsTrigger>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat!}>{cat}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="todos">
          <TextsList blocks={blocks || []} />
        </TabsContent>

        {categories.map(cat => (
          <TabsContent key={cat} value={cat!}>
            <TextsList blocks={(blocks || []).filter(b => b.categoria === cat)} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
