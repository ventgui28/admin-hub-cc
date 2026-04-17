'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addSponsor(formData: FormData) {
  const nome = formData.get('nome') as string
  const hashtags_oficiais = formData.get('hashtags_oficiais') as string
  const instagram = formData.get('instagram') as string
  const website = formData.get('website') as string

  const supabase = await createClient()

  const { error } = await supabase.from('sponsors').insert([
    {
      nome,
      hashtags_oficiais,
      instagram,
      website,
    },
  ])

  if (error) {
    console.error('Erro ao adicionar patrocinador:', error)
    return { error: 'Falha ao guardar o patrocinador.' }
  }

  revalidatePath('/sponsors')
  return { success: true }
}
