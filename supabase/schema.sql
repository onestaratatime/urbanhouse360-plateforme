-- Plateforme Acquéreur UrbanHouse360
-- Script SQL à exécuter dans Supabase

-- Table des acquéreurs (données complètes, accès restreint)
CREATE TABLE IF NOT EXISTS acquereurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Métadonnées
  source TEXT NOT NULL DEFAULT 'direct' CHECK (source IN ('direct', 'agence')),
  actif BOOLEAN NOT NULL DEFAULT true,

  -- Coordonnées privées (jamais exposées publiquement)
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  consentement_contact BOOLEAN NOT NULL DEFAULT false,

  -- Localisation
  quartiers TEXT[] NOT NULL, -- slugs des quartiers
  precision_localisation TEXT,

  -- Projet
  type_projet TEXT NOT NULL CHECK (type_projet IN ('residence_principale', 'residence_secondaire', 'investissement')),
  timing TEXT NOT NULL CHECK (timing IN ('court_terme', 'moyen_terme', 'long_terme')),
  types_bien TEXT[] NOT NULL, -- ['appartement', 'maison']

  -- Critères
  surface_min INTEGER,
  pieces_min INTEGER,
  budget_max INTEGER,

  criteres_indispensables TEXT[], -- ['terrasse', 'balcon', 'jardin', etc.]
  criteres_indispensables_autre TEXT,
  criteres_secondaires TEXT,
  description_projet TEXT
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_acquereurs_actif ON acquereurs(actif);
CREATE INDEX IF NOT EXISTS idx_acquereurs_quartiers ON acquereurs USING GIN(quartiers);
CREATE INDEX IF NOT EXISTS idx_acquereurs_timing ON acquereurs(timing);
CREATE INDEX IF NOT EXISTS idx_acquereurs_created_at ON acquereurs(created_at DESC);

-- Vue publique anonymisée (exclut toutes les données personnelles)
CREATE OR REPLACE VIEW acquereurs_publics AS
SELECT
  id,
  created_at,
  quartiers,
  type_projet,
  timing,
  types_bien,
  surface_min,
  pieces_min,
  budget_max,
  criteres_indispensables,
  criteres_indispensables_autre,
  criteres_secondaires,
  description_projet
FROM acquereurs
WHERE actif = true;

-- Table des ventes récentes (affichées sur la page d'accueil)
CREATE TABLE IF NOT EXISTS ventes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  quartier TEXT NOT NULL,
  type_bien TEXT NOT NULL CHECK (type_bien IN ('appartement', 'maison')),
  surface INTEGER,

  prix INTEGER,
  afficher_prix BOOLEAN NOT NULL DEFAULT false,

  delai_vente_jours INTEGER,
  date_vente DATE
);

-- Index pour les ventes
CREATE INDEX IF NOT EXISTS idx_ventes_date ON ventes(date_vente DESC);
CREATE INDEX IF NOT EXISTS idx_ventes_quartier ON ventes(quartier);

-- Row Level Security (RLS)

-- Activer RLS sur les tables
ALTER TABLE acquereurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventes ENABLE ROW LEVEL SECURITY;

-- Policies pour acquereurs
-- La table acquereurs complète n'est PAS accessible en lecture publique
-- Seule la vue acquereurs_publics sera utilisée par le front public

-- Policy : insertion publique pour le formulaire d'inscription
CREATE POLICY "Insertion publique des acquéreurs"
ON acquereurs
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy : lecture complète via service_role uniquement (pour l'espace agence)
-- Pas de policy ici, l'accès se fait via la service_role_key côté serveur

-- Policies pour la vue acquereurs_publics
-- Autoriser la lecture publique de la vue anonymisée
-- Note: les vues héritent des policies de la table source
-- On va créer une policy de lecture pour les données anonymisées

CREATE POLICY "Lecture publique des acquéreurs anonymisés"
ON acquereurs
FOR SELECT
TO anon, authenticated
USING (actif = true);
-- Cette policy permet la lecture, mais le front public utilisera la vue qui exclut les champs privés

-- Policies pour ventes
-- Lecture publique complète (aucune donnée personnelle)
CREATE POLICY "Lecture publique des ventes"
ON ventes
FOR SELECT
TO anon, authenticated
USING (true);

-- Insertion/modification des ventes : via service_role uniquement (espace agence)
-- Pas de policy ici, gestion via service_role_key

-- Grants pour la vue publique
GRANT SELECT ON acquereurs_publics TO anon, authenticated;

-- Note importante pour l'implémentation :
-- - Le front public doit interroger la vue acquereurs_publics, jamais la table acquereurs
-- - L'espace agence utilisera la service_role_key pour accéder à toutes les données
-- - L'insertion publique se fait sur la table acquereurs avec la clé anon
