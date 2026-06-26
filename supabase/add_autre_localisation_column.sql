-- Ajouter la colonne autre_localisation pour permettre aux utilisateurs
-- de saisir des communes qui ne sont pas dans la liste prédéfinie

ALTER TABLE acquereurs
ADD COLUMN IF NOT EXISTS autre_localisation TEXT;

-- Commenter la colonne pour documentation
COMMENT ON COLUMN acquereurs.autre_localisation IS 'Commune/village saisi manuellement si non trouvé dans la liste prédéfinie';

-- Recréer la vue publique pour inclure le nouveau champ
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
  description_projet
FROM acquereurs
WHERE actif = true;
