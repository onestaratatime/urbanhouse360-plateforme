-- Créer la table proprietaires pour stocker les demandes des propriétaires
CREATE TABLE IF NOT EXISTS proprietaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Informations du bien
  adresse TEXT NOT NULL,

  -- Coordonnées du propriétaire
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,

  -- Métadonnées
  actif BOOLEAN DEFAULT true NOT NULL,
  source TEXT DEFAULT 'formulaire' NOT NULL,

  -- Géolocalisation (à remplir ultérieurement via API)
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  quartier TEXT,

  -- Statut de traitement
  statut TEXT DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'contacte', 'archive')),
  notes TEXT
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_proprietaires_created_at ON proprietaires(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proprietaires_actif ON proprietaires(actif);
CREATE INDEX IF NOT EXISTS idx_proprietaires_statut ON proprietaires(statut);
CREATE INDEX IF NOT EXISTS idx_proprietaires_email ON proprietaires(email);

-- Commenter les colonnes pour documentation
COMMENT ON TABLE proprietaires IS 'Propriétaires ayant manifesté leur intérêt pour découvrir les acquéreurs potentiels';
COMMENT ON COLUMN proprietaires.adresse IS 'Adresse complète du bien';
COMMENT ON COLUMN proprietaires.statut IS 'Statut de traitement: nouveau, contacte, archive';
COMMENT ON COLUMN proprietaires.source IS 'Source de la demande: formulaire, agence, import';

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE proprietaires ENABLE ROW LEVEL SECURITY;

-- Politique: Seuls les utilisateurs authentifiés (agence) peuvent lire les propriétaires
CREATE POLICY "Les agences peuvent voir tous les proprietaires"
  ON proprietaires
  FOR SELECT
  TO authenticated
  USING (true);

-- Politique: Tout le monde peut insérer (via le formulaire public)
CREATE POLICY "Tout le monde peut s'inscrire comme proprietaire"
  ON proprietaires
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politique: Seuls les utilisateurs authentifiés peuvent modifier
CREATE POLICY "Les agences peuvent modifier les proprietaires"
  ON proprietaires
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
