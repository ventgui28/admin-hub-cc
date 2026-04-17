const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const athletes = [
  { nome: "Carolina Bernardo – Campeã Nacional de Pista (Coimbra)", categoria: "Juvenil", ativo: true },
  { nome: "Tiago Neves (Pombal)", categoria: "Cadete", ativo: true },
  { nome: "Bruno Nogueira – Campeão Nacional de Pista em Scratch (Coimbra)", categoria: "Cadete", ativo: true },
  { nome: "Salvador Teixeira (Sanguinheira, Cantanhede)", categoria: "Cadete", ativo: true },
  { nome: "Lara Silva (Pombal)", categoria: "Juvenil", ativo: true },
  { nome: "Francisco Pereira (Pereira do Campo)", categoria: "Infantil", ativo: true },
  { nome: "João Calvario (Pombal)", categoria: "Cadete", ativo: true },
  { nome: "Miguel Lourenço (Mealhada)", categoria: "Cadete", ativo: true },
  { nome: "Noah Calvario (Pombal)", categoria: "Iniciado", ativo: true },
  { nome: "Afonso Cavadas (Camarneira, Cantanhede)", categoria: "Cadete", ativo: true },
  { nome: "Henrique Ferreira (Ferreira do Zêzere)", categoria: "Cadete", ativo: true },
  { nome: "Alice Fonseca (Tábua)", categoria: "Juvenil", ativo: true },
  { nome: "João Carvalho (Coimbra)", categoria: "Juvenil", ativo: true },
  { nome: "Lucas Costa (Cantanhede)", categoria: "Juvenil", ativo: true },
  { nome: "João Mesquita (Almalaguês, Coimbra)", categoria: "Benjamim", ativo: true },
  { nome: "Lucas Fernandes (Granja do Ulmeiro, Montemor-o-Velho)", categoria: "Iniciado", ativo: true },
  { nome: "Gabriel Cavadas (Cadima, Cantanhede)", categoria: "Juvenil", ativo: true },
  { nome: "Isaac Calvario (Pombal)", categoria: "Juvenil", ativo: true },
  { nome: "Rafael Fernandes (Granja do Ulmeiro, Montemor-o-Velho)", categoria: "Juvenil", ativo: true },
  { nome: "Joaquim Sítima (Cantanhede)", categoria: "Infantil", ativo: true },
  { nome: "Lourenço Costa (Cantanhede)", categoria: "Benjamim", ativo: true },
  { nome: "Mariano Meirinhos – Campeão Nacional em Estrada (Porto)", categoria: "Cadete", ativo: true }
];

async function addAthletes() {
  console.log('Inserting athletes...');
  const { data, error } = await supabase
    .from('athletes')
    .insert(athletes);

  if (error) {
    console.error('Error adding athletes:', error);
    process.exit(1);
  } else {
    console.log('Athletes added successfully!');
    console.log(data);
  }
}

addAthletes();
