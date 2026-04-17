import { createClient } from "@/lib/supabase/server"
import { PromptsHeader } from "./prompts-header"
import { PromptsList } from "./prompts-list"

export default async function PromptsPage() {
  const supabase = await createClient()

  const { data: prompts, error } = await supabase
    .from("ai_prompts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao carregar prompts:", error)
    return <div>Erro ao carregar os dados.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <PromptsHeader />
      <PromptsList prompts={prompts || []} />
    </div>
  )
}
