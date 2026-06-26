-- Migration : Ajout des colonnes test et source
-- Date : 26 juin 2026

-- Ajouter la colonne 'test' (boolean pour identifier les profils de test)
ALTER TABLE acquereurs
ADD COLUMN IF NOT EXISTS test BOOLEAN NOT NULL DEFAULT false;

-- Ajouter la colonne 'source' (origine de l'acquéreur)
ALTER TABLE acquereurs
ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'formulaire'
CHECK (source IN ('formulaire', 'agence', 'claude_code', 'import'));

-- Créer un index sur la colonne test pour filtrer rapidement
CREATE INDEX IF NOT EXISTS idx_acquereurs_test ON acquereurs(test);

-- Créer un index sur la colonne source
CREATE INDEX IF NOT EXISTS idx_acquereurs_source ON acquereurs(source);

-- Mettre à jour la vue publique pour inclure les nouvelles colonnes
DROP VIEW IF EXISTS acquereurs_publics;

CREATE VIEW acquereurs_publics AS
SELECT
  id,
  created_at,
  test,
  source,
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

-- Re-créer les grants
GRANT SELECT ON acquereurs_publics TO anon, authenticated;

-- Commentaires
COMMENT ON COLUMN acquereurs.test IS 'TRUE si c''est un profil de test/démo, FALSE pour un vrai acquéreur';
COMMENT ON COLUMN acquereurs.source IS 'Source de création : formulaire, agence, claude_code, import';
