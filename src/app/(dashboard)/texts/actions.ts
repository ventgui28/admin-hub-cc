'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTextBlock(formData: FormData) {
  const titulo = formData.get('titulo') as string
  const conteudo = formData.get('conteudo') as string
  const categoria = formData.get('categoria') as string

  const supabase = await createClient()

  const { error } = await supabase.from('text_blocks').insert([
    {
      titulo,
      conteudo,
      categoria,
    },
  ])

  if (error) {
    console.error('Erro ao adicionar bloco de texto:', error)
    return { error: 'Falha ao guardar o texto.' }
  }

  revalidatePath('/texts')
  return { success: true }
}

export async function deleteTextBlock(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('text_blocks').delete().eq('id', id)

  if (error) {
    return { error: 'Erro ao remover bloco.' }
  }

  revalidatePath('/texts')
  return { success: true }
}
