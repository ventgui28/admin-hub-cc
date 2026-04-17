import { createClient } from "@/lib/supabase/server"
import { AddRaceDialog } from "./add-race-dialog"
import { RacesTable } from "./races-table"

export default async function RacesPage() {
  const supabase = await createClient()

  const { data: races, error } = await supabase
    .from("races")
    .select("*")
    .order("data", { ascending: true })

  if (error) {
    console.error("Erro ao carregar provas:", error)
    return <div>Erro ao carregar os dados.</div>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between animate-reveal">
        <div className="flex flex-col gap-3">
          <div className="h-1 w-12 bg-primary rounded-full mb-2" />
          <h1 className="text-5xl font-black tracking-tighter text-gradient uppercase italic leading-none">
            Calendário & Provas
          </h1>
          <p className="text-muted-foreground text-lg font-medium max-w-xl">
            Gira os próximos eventos e consulta os resultados das provas concluídas no calendário oficial.
          </p>
        </div>
        <AddRaceDialog />
      </div>

      <RacesTable races={races || []} />
    </div>
  )
}

