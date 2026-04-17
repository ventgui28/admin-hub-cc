'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addAthlete(formData: FormData) {
  const nome = formData.get('nome') as string
  const categoria = formData.get('categoria') as string
  const instagram = formData.get('instagram') as string
  const facebook = formData.get('facebook') as string
  const ativo = formData.get('ativo') === 'true'

  const supabase = await createClient()

  const { error } = await supabase.from('athletes').insert([
    {
      nome,
      categoria,
      instagram,
      facebook,
      ativo,
    },
  ])

  if (error) {
    console.error('Erro ao adicionar atleta:', error)
    return { error: 'Falha ao guardar o atleta.' }
  }

  revalidatePath('/athletes')
  return { success: true }
}

export async function addAthletesBulk(athletes: any[]) {
  const supabase = await createClient()

  const { error } = await supabase.from('athletes').insert(athletes)

  if (error) {
    console.error('Erro ao adicionar atletas em massa:', error)
    return { error: 'Falha ao guardar os atletas.' }
  }

  revalidatePath('/athletes')
  return { success: true }
}

export async function updateAthlete(id: string, formData: FormData) {
  const nome = formData.get('nome') as string
  const categoria = formData.get('categoria') as string
  const instagram = formData.get('instagram') as string
  const facebook = formData.get('facebook') as string
  const ativo = formData.get('ativo') === 'true'

  const supabase = await createClient()

  const { error } = await supabase
    .from('athletes')
    .update({
      nome,
      categoria,
      instagram,
      facebook,
      ativo,
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar atleta:', error)
    return { error: 'Falha ao atualizar o atleta.' }
  }

  revalidatePath('/athletes')
  return { success: true }
}

export async function deleteAthlete(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('athletes').delete().eq('id', id)

  if (error) {
    console.error('Erro ao remover atleta:', error)
    return { error: 'Falha ao remover o atleta.' }
  }

  revalidatePath('/athletes')
  return { success: true }
}
