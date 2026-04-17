'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addPrompt(formData: FormData) {
  const titulo = formData.get('titulo') as string
  const prompt_text = formData.get('prompt_text') as string
  const estilo_visual = formData.get('estilo_visual') as string

  const supabase = await createClient()

  const { error } = await supabase.from('ai_prompts').insert([
    {
      titulo,
      prompt_text,
      estilo_visual,
    },
  ])

  if (error) {
    console.error('Erro ao adicionar prompt:', error)
    return { error: 'Falha ao guardar o prompt.' }
  }

  revalidatePath('/prompts')
  return { success: true }
}

export async function deletePrompt(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('ai_prompts').delete().eq('id', id)

  if (error) {
    return { error: 'Erro ao remover prompt.' }
  }

  revalidatePath('/prompts')
  return { success: true }
}

export async function updatePrompt(id: string, formData: FormData) {
  const titulo = formData.get('titulo') as string
  const prompt_text = formData.get('prompt_text') as string
  const estilo_visual = formData.get('estilo_visual') as string

  const supabase = await createClient()

  const { error } = await supabase
    .from('ai_prompts')
    .update({
      titulo,
      prompt_text,
      estilo_visual,
    })
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar prompt:', error)
    return { error: 'Falha ao atualizar o prompt.' }
  }

  revalidatePath('/prompts')
  return { success: true }
}
