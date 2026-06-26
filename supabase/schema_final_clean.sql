-- Plateforme Acquéreur UrbanHouse360
-- Schéma FINAL - Nettoyage complet et recréation
-- Ce script supprime TOUT et recrée proprement

-- 1. Supprimer la vue en premier
DROP VIEW IF EXISTS acquereurs_publics CASCADE;

-- 2. Supprimer les tables
DROP TABLE IF EXISTS acquereurs CASCADE;
DROP TABLE IF EXISTS ventes CASCADE;

-- 3. Créer la table des acquéreurs avec les NOUVEAUX champs
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
  quartiers TEXT[] NOT NULL,
  precision_localisation TEXT,

  -- Projet
  type_projet TEXT NOT NULL CHECK (type_projet IN ('residence_principale', 'residence_secondaire', 'investissement')),
  nature_projet TEXT CHECK (nature_projet IN ('primo_accedant', 'deuxieme_achat', 'investisseur', 'autre')),
  timing TEXT NOT NULL CHECK (timing IN ('court_terme', 'moyen_terme', 'long_terme')),
  types_bien TEXT[] NOT NULL,
  profil TEXT NOT NULL DEFAULT 'individuel' CHECK (profil IN ('individuel', 'couple', 'famille', 'investisseur', 'residence_secondaire')),

  -- Critères
  surface_min INTEGER,
  pieces_min INTEGER,
  budget_max INTEGER,
  criteres_principaux TEXT[],
  criteres_principaux_autre TEXT,
  criteres_secondaires TEXT,
  description_projet TEXT
);

-- 4. Index
CREATE INDEX idx_acquereurs_actif ON acquereurs(actif);
CREATE INDEX idx_acquereurs_quartiers ON acquereurs USING GIN(quartiers);
CREATE INDEX idx_acquereurs_timing ON acquereurs(timing);
CREATE INDEX idx_acquereurs_created_at ON acquereurs(created_at DESC);

-- 5. Créer la vue publique
CREATE VIEW acquereurs_publics AS
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

-- 6. Table des ventes
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

-- 7. Index ventes
CREATE INDEX idx_ventes_date ON ventes(date_vente DESC);
CREATE INDEX idx_ventes_quartier ON ventes(quartier);

-- 8. Row Level Security
ALTER TABLE acquereurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventes ENABLE ROW LEVEL SECURITY;

-- 9. Policies
CREATE POLICY "Insertion publique des acquéreurs"
ON acquereurs FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Lecture publique des acquéreurs anonymisés"
ON acquereurs FOR SELECT
TO anon, authenticated
USING (actif = true);

CREATE POLICY "Lecture publique des ventes"
ON ventes FOR SELECT
TO anon, authenticated
USING (true);

-- 10. Grants
GRANT SELECT ON acquereurs_publics TO anon, authenticated;

-- 11. Commentaires
COMMENT ON COLUMN acquereurs.nature_projet IS 'Nature du projet : primo-accédant, deuxième achat, investisseur, autre';
COMMENT ON COLUMN acquereurs.criteres_principaux IS 'Critères principaux de recherche';
COMMENT ON COLUMN acquereurs.profil IS 'Profil : individuel, couple, famille, investisseur, residence_secondaire';
