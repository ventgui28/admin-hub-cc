import { createClient } from "@/lib/supabase/server"
import { AthletesTable } from "./athletes-table"
import { AddAthleteDialog } from "./add-athlete-dialog"

export default async function AthletesPage() {
  const supabase = await createClient()

  const { data: athletes, error } = await supabase
    .from("athletes")
    .select("*")
    .order("nome", { ascending: true })

  if (error) {
    console.error("Erro ao carregar atletas:", error)
    return <div>Erro ao carregar os dados.</div>
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between animate-reveal">
        <div className="flex flex-col gap-3">
          <div className="h-1 w-12 bg-primary rounded-full mb-2" />
          <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase italic leading-none text-gradient">
            Gestão de Atletas
          </h1>
          <p className="text-muted-foreground text-lg font-medium max-w-xl">
            Gira os membros da equipa Cantanhede Cycling e acede rapidamente aos seus dados e redes sociais.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <AddAthleteDialog />
        </div>
      </div>

      <AthletesTable athletes={athletes || []} />
    </div>
  )
}

