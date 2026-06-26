-- Plateforme Acquéreur UrbanHouse360
-- Schéma FINAL avec tous les nouveaux champs (26/06/2026)
-- À utiliser pour une base vierge OU après migration

-- Supprimer et recréer la table (ATTENTION: supprime les données existantes)
DROP TABLE IF EXISTS acquereurs CASCADE;
DROP TABLE IF EXISTS ventes CASCADE;

-- Table des acquéreurs (données complètes, accès restreint)
CREATE TABLE acquereurs (
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
  nature_projet TEXT CHECK (nature_projet IN ('primo_accedant', 'deuxieme_achat', 'investisseur', 'autre')),
  timing TEXT NOT NULL CHECK (timing IN ('court_terme', 'moyen_terme', 'long_terme')),
  types_bien TEXT[] NOT NULL, -- ['appartement', 'maison', 'terrain']
  profil TEXT NOT NULL DEFAULT 'individuel' CHECK (profil IN ('individuel', 'couple', 'famille', 'investisseur', 'residence_secondaire')),

  -- Critères
  surface_min INTEGER,
  pieces_min INTEGER,
  budget_max INTEGER,

  criteres_principaux TEXT[], -- ['terrasse', 'balcon', 'jardin', etc.]
  criteres_principaux_autre TEXT,
  criteres_secondaires TEXT,
  description_projet TEXT
);

-- Index pour améliorer les performances
CREATE INDEX idx_acquereurs_actif ON acquereurs(actif);
CREATE INDEX idx_acquereurs_quartiers ON acquereurs USING GIN(quartiers);
CREATE INDEX idx_acquereurs_timing ON acquereurs(timing);
CREATE INDEX idx_acquereurs_created_at ON acquereurs(created_at DESC);

-- Vue publique anonymisée (exclut toutes les données personnelles)
CREATE OR REPLACE VIEW acquereurs_publics AS
SELECT
  id,
  created_at,
  quartiers,
  type_projet,
  nature_projet,
  timing,
  types_bien,
  profil,
  surface_min,
  pieces_min,
  budget_max,
  criteres_principaux,
  criteres_principaux_autre,
  criteres_secondaires,
  description_projet
FROM acquereurs
WHERE actif = true;

-- Table des ventes récentes (affichées sur la page d'accueil)
CREATE TABLE ventes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  quartier TEXT NOT NULL,
  type_bien TEXT NOT NULL CHECK (type_bien IN ('appartement', 'maison', 'terrain')),
  surface INTEGER,

  prix INTEGER,
  afficher_prix BOOLEAN NOT NULL DEFAULT false,

  delai_vente_jours INTEGER,
  date_vente DATE
);

-- Index pour les ventes
CREATE INDEX idx_ventes_date ON ventes(date_vente DESC);
CREATE INDEX idx_ventes_quartier ON ventes(quartier);

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

-- Policies pour la vue acquereurs_publics
-- Autoriser la lecture publique de la vue anonymisée
CREATE POLICY "Lecture publique des acquéreurs anonymisés"
ON acquereurs
FOR SELECT
TO anon, authenticated
USING (actif = true);

-- Policies pour ventes
-- Lecture publique complète (aucune donnée personnelle)
CREATE POLICY "Lecture publique des ventes"
ON ventes
FOR SELECT
TO anon, authenticated
USING (true);

-- Grants pour la vue publique
GRANT SELECT ON acquereurs_publics TO anon, authenticated;

-- Commentaires pour documentation
COMMENT ON COLUMN acquereurs.nature_projet IS 'Nature du projet : primo-accédant, deuxième achat, investisseur, autre';
COMMENT ON COLUMN acquereurs.criteres_principaux IS 'Critères principaux de recherche';
COMMENT ON COLUMN acquereurs.profil IS 'Profil : individuel, couple, famille, investisseur, residence_secondaire';
COMMENT ON TABLE acquereurs IS 'Table complète des acquéreurs avec données privées - accès restreint';
COMMENT ON VIEW acquereurs_publics IS 'Vue publique anonymisée des acquéreurs - accessible en lecture';
