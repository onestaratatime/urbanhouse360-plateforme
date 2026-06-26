#!/usr/bin/env tsx
/**
 * Script pour créer les tables Supabase à distance
 * Usage: npx tsx scripts/setup-supabase-remote.ts
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Variables d\'environnement manquantes');
  console.error('Assurez-vous que .env.local contient :');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🚀 Configuration de la base de données Supabase...\n');
  console.log(`URL: ${SUPABASE_URL}\n`);

  // Lire le fichier SQL
  const schemaPath = join(process.cwd(), 'supabase', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  console.log('📝 Exécution du script SQL...\n');

  // Exécuter le SQL via l'API Supabase
  const { data, error } = await supabase.rpc('exec_sql', { sql: schema });

  if (error) {
    console.error('❌ Erreur lors de l\'exécution du SQL:', error);
    console.log('\n⚠️  L\'API RPC n\'est pas disponible.');
    console.log('📋 Copiez le contenu du fichier supabase/schema.sql');
    console.log('   et exécutez-le manuellement dans le SQL Editor de Supabase.\n');

    console.log('🔗 Étapes à suivre :');
    console.log('1. Allez sur https://supabase.com/dashboard');
    console.log('2. Sélectionnez votre projet');
    console.log('3. Cliquez sur "SQL Editor" dans le menu de gauche');
    console.log('4. Créez une nouvelle query');
    console.log('5. Copiez-collez le contenu de supabase/schema.sql');
    console.log('6. Cliquez sur "Run"\n');

    return false;
  }

  console.log('✅ Base de données configurée avec succès!\n');

  // Vérifier que les tables ont été créées
  console.log('🔍 Vérification des tables...\n');

  const { data: tables, error: tablesError } = await supabase
    .from('acquereurs')
    .select('id')
    .limit(0);

  if (tablesError) {
    console.error('❌ Erreur lors de la vérification:', tablesError);
    return false;
  }

  console.log('✅ Table acquereurs : OK');

  const { data: ventes, error: ventesError } = await supabase
    .from('ventes')
    .select('id')
    .limit(0);

  if (ventesError) {
    console.error('❌ Erreur lors de la vérification:', ventesError);
    return false;
  }

  console.log('✅ Table ventes : OK');

  const { data: publics, error: publicsError } = await supabase
    .from('acquereurs_publics')
    .select('id')
    .limit(0);

  if (publicsError) {
    console.error('❌ Erreur lors de la vérification:', publicsError);
    return false;
  }

  console.log('✅ Vue acquereurs_publics : OK\n');

  return true;
}

setupDatabase().then((success) => {
  if (success) {
    console.log('🎉 Configuration terminée!\n');
    console.log('Prochaines étapes :');
    console.log('1. Testez la connexion avec: npx tsx test-connection.ts');
    console.log('2. Lancez le serveur local: npm run dev');
    console.log('3. Configurez Vercel avec les mêmes variables d\'environnement\n');
    process.exit(0);
  } else {
    console.log('⚠️  Veuillez suivre les étapes manuelles ci-dessus.\n');
    process.exit(1);
  }
});
