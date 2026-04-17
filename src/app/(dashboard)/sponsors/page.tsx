import { createClient } from "@/lib/supabase/server"
import { SponsorsTable } from "./sponsors-table"
import { AddSponsorDialog } from "./add-sponsor-dialog"

export default async function SponsorsPage() {
  const supabase = await createClient()

  const { data: sponsors, error } = await supabase
    .from("sponsors")
    .select("*")
    .order("nome", { ascending: true })

  if (error) {
    console.error("Erro ao carregar patrocinadores:", error)
    return <div>Erro ao carregar os dados.</div>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between animate-reveal">
        <div className="flex flex-col gap-3">
          <div className="h-1 w-12 bg-primary rounded-full mb-2" />
          <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none text-gradient">
            Parceiros & Marcas
          </h1>
          <p className="text-muted-foreground text-lg font-medium max-w-xl">
            Gere as marcas parceiras e aceda rapidamente a hashtags oficiais e links de redes sociais.
          </p>
        </div>
        <AddSponsorDialog />
      </div>

      <SponsorsTable sponsors={sponsors || []} />
    </div>
  )
}

