/**
 * Script de seed pour la base de données
 *
 * Usage:
 * npx tsx scripts/seed.ts
 *
 * Prérequis: avoir configuré les variables d'environnement Supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes');
  console.error('Assurez-vous que NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont définies');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const acquereursSeed = [
  {
    source: 'direct',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    telephone: '06 12 34 56 78',
    consentement_contact: true,
    quartiers: ['capitole', 'carmes', 'saint-etienne'],
    type_projet: 'residence_principale',
    timing: 'court_terme',
    types_bien: ['appartement'],
    surface_min: 60,
    pieces_min: 3,
    budget_max: 350000,
    criteres_indispensables: ['balcon', 'ascenseur'],
    criteres_secondaires: 'Proche métro, calme',
    description_projet: 'Premier achat, jeune couple avec un enfant',
    actif: true
  },
  {
    source: 'agence',
    prenom: 'Thomas',
    email: 'thomas.dubois@example.com',
    telephone: '06 23 45 67 89',
    consentement_contact: true,
    quartiers: ['saint-cyprien', 'arenes'],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['maison'],
    surface_min: 100,
    pieces_min: 4,
    budget_max: 450000,
    criteres_indispensables: ['jardin', 'parking'],
    criteres_secondaires: 'Famille avec 2 enfants, école à proximité',
    description_projet: 'Maison familiale avec extérieur',
    actif: true
  },
  {
    source: 'direct',
    prenom: 'Marie',
    email: 'marie.bernard@example.com',
    telephone: '06 34 56 78 90',
    consentement_contact: true,
    quartiers: ['compans-caffarelli', 'marengo-jolimont', 'guilhemery'],
    type_projet: 'investissement',
    timing: 'court_terme',
    types_bien: ['appartement'],
    surface_min: 40,
    pieces_min: 2,
    budget_max: 200000,
    criteres_indispensables: ['parking'],
    criteres_secondaires: 'Bon rendement locatif, proche transports',
    description_projet: 'Investissement locatif meublé',
    actif: true
  },
  {
    source: 'direct',
    prenom: 'Pierre',
    email: 'pierre.leroy@example.com',
    telephone: '06 45 67 89 01',
    consentement_contact: true,
    quartiers: ['rangueil', 'saint-agne'],
    type_projet: 'residence_principale',
    timing: 'long_terme',
    types_bien: ['maison', 'appartement'],
    surface_min: 80,
    pieces_min: 4,
    budget_max: 380000,
    criteres_indispensables: ['terrasse', 'parking'],
    criteres_secondaires: 'Proche université Paul Sabatier, lieu de travail',
    description_projet: 'Enseignant chercheur, flexibilité sur le timing',
    actif: true
  },
  {
    source: 'agence',
    prenom: 'Julie',
    email: 'julie.moreau@example.com',
    telephone: '06 56 78 90 12',
    consentement_contact: true,
    quartiers: ['blagnac', 'purpan'],
    type_projet: 'residence_principale',
    timing: 'court_terme',
    types_bien: ['maison'],
    surface_min: 120,
    pieces_min: 5,
    budget_max: 550000,
    criteres_indispensables: ['jardin', 'garage'],
    criteres_secondaires: 'Proche aéroport Toulouse-Blagnac, travaille à Airbus',
    description_projet: 'Maison familiale, 3 enfants',
    actif: true
  },
  {
    source: 'direct',
    prenom: 'Alexandre',
    email: 'alex.petit@example.com',
    telephone: '06 67 89 01 23',
    consentement_contact: true,
    quartiers: ['minimes', 'barriere-de-paris', 'borderouge'],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['appartement'],
    surface_min: 50,
    pieces_min: 2,
    budget_max: 250000,
    criteres_indispensables: ['balcon'],
    criteres_secondaires: 'Proche ligne B métro',
    description_projet: 'Premier achat, célibataire actif',
    actif: true
  },
  {
    source: 'direct',
    prenom: 'Camille',
    email: 'camille.durand@example.com',
    telephone: '06 78 90 12 34',
    consentement_contact: true,
    quartiers: ['colomiers', 'tournefeuille'],
    type_projet: 'residence_principale',
    timing: 'moyen_terme',
    types_bien: ['maison'],
    surface_min: 90,
    pieces_min: 4,
    budget_max: 350000,
    criteres_indispensables: ['jardin', 'parking'],
    criteres_secondaires: 'Environnement calme, espaces verts',
    description_projet: 'Couple avec 1 enfant, télétravail possible',
    actif: true
  },
  {
    source: 'agence',
    prenom: 'Laurent',
    email: 'laurent.rousseau@example.com',
    telephone: '06 89 01 23 45',
    consentement_contact: true,
    quartiers: ['balma', 'lunion', 'saint-orens-de-gameville'],
    type_projet: 'residence_principale',
    timing: 'court_terme',
    types_bien: ['maison'],
    surface_min: 110,
    pieces_min: 5,
    budget_max: 480000,
    criteres_indispensables: ['jardin', 'garage', 'plain_pied'],
    criteres_secondaires: 'Accès PMR, plain-pied préféré',
    description_projet: 'Famille, accessibilité importante',
    actif: true
  },
  {
    source: 'direct',
    prenom: 'Émilie',
    email: 'emilie.girard@example.com',
    telephone: '06 90 12 34 56',
    consentement_contact: true,
    quartiers: ['saint-michel', 'busca', 'croix-de-pierre'],
    type_projet: 'investissement',
    timing: 'moyen_terme',
    types_bien: ['appartement'],
    surface_min: 30,
    pieces_min: 1,
    budget_max: 150000,
    criteres_indispensables: [],
    criteres_secondaires: 'Studio ou T2 pour location étudiante',
    description_projet: 'Investissement locatif étudiant',
    actif: true
  },
  {
    source: 'direct',
    prenom: 'Nicolas',
    email: 'nicolas.lambert@example.com',
    telephone: '06 01 23 45 67',
    consentement_contact: true,
    quartiers: ['ramonville-saint-agne', 'castanet-tolosan'],
    type_projet: 'residence_secondaire',
    timing: 'long_terme',
    types_bien: ['maison'],
    surface_min: 70,
    pieces_min: 3,
    budget_max: 280000,
    criteres_indispensables: ['jardin'],
    criteres_secondaires: 'Calme, verdure, périphérie sud',
    description_projet: 'Résidence de week-end, pas pressé',
    actif: true
  }
];

const ventesSeed = [
  {
    quartier: 'capitole',
    type_bien: 'appartement',
    surface: 75,
    prix: 380000,
    afficher_prix: true,
    delai_vente_jours: 12,
    date_vente: '2024-05-15'
  },
  {
    quartier: 'saint-cyprien',
    type_bien: 'maison',
    surface: 110,
    prix: 465000,
    afficher_prix: false,
    delai_vente_jours: 28,
    date_vente: '2024-04-22'
  },
  {
    quartier: 'compans-caffarelli',
    type_bien: 'appartement',
    surface: 62,
    prix: 295000,
    afficher_prix: true,
    delai_vente_jours: 8,
    date_vente: '2024-05-30'
  },
  {
    quartier: 'blagnac',
    type_bien: 'maison',
    surface: 135,
    prix: null,
    afficher_prix: false,
    delai_vente_jours: 45,
    date_vente: '2024-03-18'
  },
  {
    quartier: 'rangueil',
    type_bien: 'appartement',
    surface: 85,
    prix: 320000,
    afficher_prix: true,
    delai_vente_jours: 18,
    date_vente: '2024-05-05'
  }
];

async function seed() {
  console.log('🌱 Début du seed...\n');

  // Seed des acquéreurs
  console.log('📝 Insertion des acquéreurs...');
  const { data: acquereurs, error: acquereursError } = await supabase
    .from('acquereurs')
    .insert(acquereursSeed)
    .select();

  if (acquereursError) {
    console.error('❌ Erreur lors de l\'insertion des acquéreurs:', acquereursError);
    process.exit(1);
  }

  console.log(`✅ ${acquereurs?.length || 0} acquéreurs insérés\n`);

  // Seed des ventes
  console.log('🏠 Insertion des ventes...');
  const { data: ventes, error: ventesError } = await supabase
    .from('ventes')
    .insert(ventesSeed)
    .select();

  if (ventesError) {
    console.error('❌ Erreur lors de l\'insertion des ventes:', ventesError);
    process.exit(1);
  }

  console.log(`✅ ${ventes?.length || 0} ventes insérées\n`);

  console.log('🎉 Seed terminé avec succès !');
  console.log('\nRésumé:');
  console.log(`- ${acquereurs?.length || 0} acquéreurs`);
  console.log(`- ${ventes?.length || 0} ventes`);
}

seed()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
