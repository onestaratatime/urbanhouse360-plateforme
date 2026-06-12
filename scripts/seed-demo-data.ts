import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const demoAcquereurs = [
  {
    prenom: 'Sophie',
    email: 'sophie.demo@example.com',
    telephone: '0601020304',
    consentement_contact: true,
    quartiers: ['centre-ville', 'capitole', 'carmes'],
    type_projet: 'residence_principale',
    timing: 'court_terme',
    types_bien: ['appartement'],
    profil: 'couple',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Thomas',
    email: 'thomas.demo@example.com',
    telephone: '0602030405',
    consentement_contact: true,
    quartiers: ["saint-cyprien","minimes"],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['appartement'],
    profil: 'personne_seule',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Marie',
    email: 'marie.demo@example.com',
    telephone: '0603040506',
    consentement_contact: true,
    quartiers: ["rangueil","jolimont"],
    type_projet: 'residence_principale',
    timing: 'long_terme',
    types_bien: ['appartement'],
    profil: 'famille',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Lucas',
    email: 'lucas.demo@example.com',
    telephone: '0604050607',
    consentement_contact: true,
    quartiers: ["saint-michel","esquirol"],
    type_projet: 'investissement',
    timing: 'court_terme',
    types_bien: ['appartement'],
    profil: 'investisseur',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Emma',
    email: 'emma.demo@example.com',
    telephone: '0605060708',
    consentement_contact: true,
    quartiers: ["borderouge","croix-daurade"],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['appartement'],
    profil: 'famille_nombreuse',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Antoine',
    email: 'antoine.demo@example.com',
    telephone: '0606070809',
    consentement_contact: true,
    quartiers: ["saint-sernin","arnaud-bernard"],
    type_projet: 'residence_secondaire',
    timing: 'court_terme',
    types_bien: ['appartement'],
    profil: 'residence_secondaire',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Léa',
    email: 'léa.demo@example.com',
    telephone: '06070809010',
    consentement_contact: true,
    quartiers: ["les-chalets","rangueil"],
    type_projet: 'residence_principale',
    timing: 'long_terme',
    types_bien: ['appartement'],
    profil: 'couple',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Hugo',
    email: 'hugo.demo@example.com',
    telephone: '060809010011',
    consentement_contact: true,
    quartiers: ["compans-caffarelli","centre-ville"],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['appartement'],
    profil: 'personne_seule',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Camille',
    email: 'camille.demo@example.com',
    telephone: '0609010011012',
    consentement_contact: true,
    quartiers: ["saint-cyprien","saint-michel"],
    type_projet: 'residence_principale',
    timing: 'long_terme',
    types_bien: ['appartement'],
    profil: 'famille',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Julien',
    email: 'julien.demo@example.com',
    telephone: '06010011012013',
    consentement_contact: true,
    quartiers: ["minimes","borderouge"],
    type_projet: 'investissement',
    timing: 'court_terme',
    types_bien: ['appartement'],
    profil: 'investisseur',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  },
  {
    prenom: 'Clara',
    email: 'clara.demo@example.com',
    telephone: '06011012013014',
    consentement_contact: true,
    quartiers: ["esquirol","carmes"],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['appartement'],
    profil: 'famille_nombreuse',
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    description_projet: 'Recherche T3 avec balcon pour jeune couple',
    source: 'direct',
    actif: true
  }
];

async function seedDemoData() {
  console.log('🌱 Seeding demo data into Supabase...\n');

  // Clear existing demo data
  console.log('Clearing existing demo data...');
  const { error: deleteError } = await supabase
    .from('acquereurs')
    .delete()
    .like('email', '%.demo@example.com');

  if (deleteError) {
    console.error('Error clearing data:', deleteError);
  } else {
    console.log('✓ Existing data cleared\n');
  }

  // Insert demo data
  console.log('Inserting demo acquéreurs...');
  for (const acquereur of demoAcquereurs) {
    const { data, error} = await supabase
      .from('acquereurs')
      .insert([acquereur])
      .select();

    if (error) {
      console.error(`✗ Error inserting:`, error.message);
    } else {
      console.log(`✓ Inserted ${acquereur.timing} - ${acquereur.quartiers.join(', ')}`);
    }
  }

  // Verify
  const { data: allData, error: countError } = await supabase
    .from('acquereurs_publics')
    .select('*');

  if (countError) {
    console.error('\n✗ Error counting:', countError);
  } else {
    console.log(`\n✅ Successfully seeded ${allData?.length || 0} demo acquéreurs!`);

    // Stats
    const timingStats = {
      court_terme: allData?.filter(a => a.timing === 'court_terme').length || 0,
      moyen_terme: allData?.filter(a => a.timing === 'moyen_terme').length || 0,
      long_terme: allData?.filter(a => a.timing === 'long_terme').length || 0,
    };

    const nbQuartiers = new Set(allData?.flatMap(a => a.quartiers)).size;

    console.log('\n📊 Statistics:');
    console.log(`   - Immédiat (court_terme): ${timingStats.court_terme}`);
    console.log(`   - 6-12 mois (moyen_terme): ${timingStats.moyen_terme}`);
    console.log(`   - 1 an+ (long_terme): ${timingStats.long_terme}`);
    console.log(`   - Quartiers couverts: ${nbQuartiers}`);
  }
}

seedDemoData().catch(console.error);
