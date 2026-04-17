'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addRace(formData: FormData) {
  const nome = formData.get('nome') as string
  const data = formData.get('data') as string
  const local = formData.get('local') as string
  const tipo = formData.get('tipo') as string
  const url_oficial = formData.get('url_oficial') as string

  const supabase = await createClient()

  const { error } = await supabase.from('races').insert([
    {
      nome,
      data,
      local,
      tipo,
      url_oficial,
    },
  ])

  if (error) {
    console.error('Erro ao adicionar prova:', error)
    return { error: 'Falha ao guardar a prova.' }
  }

  revalidatePath('/races')
  return { success: true }
}

export async function deleteRace(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('races').delete().eq('id', id)

  if (error) {
    console.error('Erro ao remover prova:', error)
    return { error: 'Falha ao remover a prova.' }
  }

  revalidatePath('/races')
  return { success: true }
}

export async function addParticipation(raceId: string, athleteId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('race_participations').insert([
    {
      race_id: raceId,
      athlete_id: athleteId,
    },
  ])

  if (error) {
    console.error('Erro ao convocar atleta:', error)
    return { error: 'Falha ao convocar o atleta.' }
  }

  revalidatePath(`/races/${raceId}`)
  revalidatePath('/races')
  return { success: true }
}

export async function removeParticipation(participationId: string, raceId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('race_participations').delete().eq('id', participationId)

  if (error) {
    console.error('Erro ao remover convocatória:', error)
    return { error: 'Falha ao remover o atleta da prova.' }
  }

  revalidatePath(`/races/${raceId}`)
  revalidatePath('/races')
  return { success: true }
}

export async function updateResult(participationId: string, raceId: string, resultado: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('race_participations')
    .update({ resultado })
    .eq('id', participationId)

  if (error) {
    console.error('Erro ao atualizar resultado:', error)
    return { error: 'Falha ao guardar o resultado.' }
  }

  revalidatePath(`/races/${raceId}`)
  return { success: true }
}
