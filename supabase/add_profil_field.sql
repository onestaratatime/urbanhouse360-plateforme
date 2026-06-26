-- Migration : Ajouter le champ 'profil' à la table acquereurs
-- À exécuter APRÈS avoir créé le schéma initial

ALTER TABLE acquereurs
ADD COLUMN IF NOT EXISTS profil TEXT NOT NULL DEFAULT 'personne_seule'
CHECK (profil IN ('personne_seule', 'couple', 'famille', 'famille_nombreuse', 'investisseur', 'residence_secondaire'));

-- Mettre à jour la vue pour inclure le champ profil
CREATE OR REPLACE VIEW acquereurs_publics AS
SELECT
  id,
  created_at,
  quartiers,
  type_projet,
  timing,
  types_bien,
  profil,
  surface_min,
  pieces_min,
  budget_max,
  criteres_indispensables,
  criteres_indispensables_autre,
  criteres_secondaires,
  description_projet
FROM acquereurs
WHERE actif = true;

-- Re-grant les permissions
GRANT SELECT ON acquereurs_publics TO anon, authenticated;
