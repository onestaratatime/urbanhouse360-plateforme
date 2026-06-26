-- Ajouter le champ phrase_accroche à la table acquereurs
ALTER TABLE acquereurs
ADD COLUMN IF NOT EXISTS phrase_accroche TEXT;

COMMENT ON COLUMN acquereurs.phrase_accroche IS 'Phrase d''accroche personnalisée décrivant le projet de l''acquéreur (visible publiquement)';

-- Recréer la vue acquereurs_publics pour inclure phrase_accroche
DROP VIEW IF EXISTS acquereurs_publics;

CREATE VIEW acquereurs_publics AS
SELECT
  id,
  created_at,
  test,
  source,
  quartiers,
  autre_localisation,
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
  description_projet,
  phrase_accroche  -- AJOUT
FROM acquereurs
WHERE actif = true;

COMMENT ON VIEW acquereurs_publics IS 'Vue publique des acquéreurs actifs (sans données personnelles)';
