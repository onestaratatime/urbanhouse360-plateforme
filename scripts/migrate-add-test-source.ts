import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log('🔄 Migration : Ajout des colonnes test et source...\n');

  // Lire le fichier SQL
  const sqlPath = path.join(process.cwd(), 'supabase', 'add_test_source_columns.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');

  try {
    // Exécuter la migration via l'API Supabase
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error('❌ Erreur lors de la migration :', error);
      process.exit(1);
    }

    console.log('✅ Migration réussie !');
    console.log('\nColonnes ajoutées :');
    console.log('  - test : BOOLEAN (default: false)');
    console.log('  - source : TEXT (default: formulaire)');
    console.log('\nVue acquereurs_publics mise à jour ✅');

  } catch (err) {
    console.error('❌ Erreur :', err);
    process.exit(1);
  }
}

migrate();
