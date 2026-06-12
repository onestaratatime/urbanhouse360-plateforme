-- Ajouter la colonne profil à la table acquereurs
ALTER TABLE acquereurs
ADD COLUMN profil TEXT NOT NULL DEFAULT 'personne_seule';

-- Ajouter une contrainte pour valider les valeurs
ALTER TABLE acquereurs
ADD CONSTRAINT profil_check CHECK (profil IN (
  'personne_seule',
  'couple',
  'famille',
  'famille_nombreuse',
  'investisseur',
  'residence_secondaire'
));

-- Mettre à jour la vue acquereurs_publics pour inclure le profil
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
