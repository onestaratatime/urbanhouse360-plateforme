import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Fonction pour générer une phrase d'accroche adaptée
function genererPhraseAccroche(profil: string, timing: string): string {
  const phrasesParProfil: Record<string, string[]> = {
    'individuel': [
      'Jeune actif, premier achat',
      'Télétravail, besoin espace calme',
      'Célibataire, projet personnel',
      'Primo-accédant motivé',
      'Installation Toulouse'
    ],
    'couple': [
      'Couple expatrié, retour France',
      'Jeune couple, projet de vie',
      'Couple trentenaire, premier achat',
      'Mutation professionnelle couple',
      'Rapprochement familial'
    ],
    'famille': [
      'Famille, agrandissement nécessaire',
      'Retour région natale, 2 enfants',
      'Jeune famille, projet maison',
      'Recomposition familiale',
      'Famille, proximité écoles importante'
    ],
    'investisseur': [
      'Investisseur patrimonial',
      'Projet locatif étudiant',
      'Investissement déficit foncier',
      'Constitution patrimoine locatif',
      'Placement immobilier rentable'
    ],
    'residence_secondaire': [
      'Résidence secondaire week-ends',
      'Pied-à-terre déplacements pros',
      'Maison vacances famille',
      'Projet résidence campagne',
      'Escapades week-end Toulouse'
    ]
  };

  const phrasesParTiming: Record<string, string[]> = {
    'court_terme': [
      'achat immédiat',
      'recherche urgente',
      'projet très rapide',
      'besoin immédiat',
      'disponible de suite'
    ],
    'moyen_terme': [
      'projet 6-12 mois',
      'achat rentrée 2026',
      'horizon fin année',
      'projet automne',
      'concrétisation prochains mois'
    ],
    'long_terme': [
      'projet 2026-2027',
      'horizon 12-18 mois',
      'préparation long terme',
      'réflexion avancée',
      'projet futur structuré'
    ]
  };

  const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const basePhrase = random(phrasesParProfil[profil] || phrasesParProfil['couple']);
  const timingPhrase = random(phrasesParTiming[timing] || phrasesParTiming['moyen_terme']);

  return `${basePhrase}, ${timingPhrase}`;
}

async function updateOldAcquereurs() {
  console.log('🔄 Mise à jour des anciens acquéreurs sans phrase d\'accroche...\n');

  // Récupérer tous les acquéreurs sans phrase_accroche
  const { data: acquereurs, error: fetchError } = await supabaseAdmin
    .from('acquereurs')
    .select('id, profil, timing, phrase_accroche')
    .is('phrase_accroche', null);

  if (fetchError) {
    console.error('❌ Erreur lors de la récupération :', fetchError);
    process.exit(1);
  }

  if (!acquereurs || acquereurs.length === 0) {
    console.log('✅ Tous les acquéreurs ont déjà une phrase d\'accroche !');
    return;
  }

  console.log(`📝 ${acquereurs.length} acquéreur(s) à mettre à jour\n`);

  // Mettre à jour chaque acquéreur
  let updated = 0;
  for (const acquereur of acquereurs) {
    const phrase = genererPhraseAccroche(acquereur.profil, acquereur.timing);

    const { error: updateError } = await supabaseAdmin
      .from('acquereurs')
      .update({ phrase_accroche: phrase })
      .eq('id', acquereur.id);

    if (updateError) {
      console.error(`❌ Erreur pour ${acquereur.id}:`, updateError);
    } else {
      updated++;
      console.log(`✓ ${acquereur.id.substring(0, 8)}... : "${phrase}"`);
    }
  }

  console.log(`\n✅ ${updated}/${acquereurs.length} acquéreur(s) mis à jour avec succès !`);
  console.log('\n🗺️  Actualisez la carte pour voir les nouvelles phrases d\'accroche !');
}

updateOldAcquereurs();
