import { createClient } from "@/lib/supabase/server"
import { VaultHeader } from "./vault-header"
import { VaultTabs } from "./vault-tabs"

export default async function VaultPage() {
  const supabase = await createClient()

  // Buscar ficheiros dos dois buckets principais
  const { data: photos, error: photosError } = await supabase
    .storage
    .from('photos')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  const { data: logos, error: logosError } = await supabase
    .storage
    .from('logos')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (photosError || logosError) {
    console.error("Erro ao carregar ficheiros:", photosError || logosError)
    // Se der erro aqui, é provável que os buckets ainda não existam
  }

  return (
    <div className="flex flex-col gap-6">
      <VaultHeader />
      <VaultTabs photos={photos || []} logos={logos || []} />
    </div>
  )
}
