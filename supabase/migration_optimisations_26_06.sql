-- Migration : Optimisations du 26/06/2026
-- Nouveaux profils, nature_projet, terrain, critères principaux

-- 1. Ajouter le champ nature_projet
ALTER TABLE acquereurs
ADD COLUMN IF NOT EXISTS nature_projet TEXT
CHECK (nature_projet IN ('primo_accedant', 'deuxieme_achat', 'investisseur', 'autre'));

-- 2. Mettre à jour les contraintes pour les nouveaux profils
ALTER TABLE acquereurs
DROP CONSTRAINT IF EXISTS acquereurs_profil_check;

ALTER TABLE acquereurs
ADD CONSTRAINT acquereurs_profil_check
CHECK (profil IN ('individuel', 'couple', 'famille', 'investisseur', 'residence_secondaire'));

-- 3. Mettre à jour les profils existants
UPDATE acquereurs SET profil = 'individuel' WHERE profil = 'personne_seule';
UPDATE acquereurs SET profil = 'famille' WHERE profil IN ('famille', 'famille_nombreuse');

-- 4. Renommer les colonnes critères
ALTER TABLE acquereurs
RENAME COLUMN criteres_indispensables TO criteres_principaux;

ALTER TABLE acquereurs
RENAME COLUMN criteres_indispensables_autre TO criteres_principaux_autre;

-- 5. Mettre à jour la contrainte types_bien pour inclure 'terrain'
-- Note: types_bien est un array TEXT[], donc pas de contrainte à modifier

-- 6. Mettre à jour la vue publique
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

-- Re-grant les permissions
GRANT SELECT ON acquereurs_publics TO anon, authenticated;

-- Commentaires pour documentation
COMMENT ON COLUMN acquereurs.nature_projet IS 'Nature du projet : primo-accédant, deuxième achat, investisseur, autre';
COMMENT ON COLUMN acquereurs.criteres_principaux IS 'Critères principaux (anciennement critères indispensables)';
COMMENT ON COLUMN acquereurs.profil IS 'Profil simplifié : individuel, couple, famille, investisseur, residence_secondaire';
