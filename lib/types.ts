// Types pour l'application UrbanHouse360

export type TypeProjet = 'residence_principale' | 'residence_secondaire' | 'investissement';
export type NatureProjet = 'primo_accedant' | 'deuxieme_achat' | 'investisseur' | 'autre';
export type Timing = 'court_terme' | 'moyen_terme' | 'long_terme';
export type TypeBien = 'appartement' | 'maison' | 'terrain';
export type Source = 'direct' | 'agence';
export type Profil = 'individuel' | 'couple' | 'famille' | 'investisseur' | 'residence_secondaire';

export type CriterePrincipal =
  | 'terrasse'
  | 'balcon'
  | 'jardin'
  | 'plain_pied'
  | 'etage_eleve'
  | 'ascenseur'
  | 'parking'
  | 'garage';

// Interface complète d'un acquéreur (avec données privées)
// Utilisée uniquement dans l'espace agence
export interface AcquereurComplet {
  id: string;
  created_at: string;
  source: Source;
  actif: boolean;

  // Coordonnées privées
  prenom: string;
  email: string;
  telephone: string;
  consentement_contact: boolean;

  // Localisation
  quartiers: string[];
  precision_localisation?: string;

  // Projet
  type_projet: TypeProjet;
  nature_projet?: NatureProjet;
  timing: Timing;
  types_bien: TypeBien[];
  profil: Profil;

  // Critères
  surface_min?: number;
  pieces_min?: number;
  budget_max?: number;

  criteres_principaux?: CriterePrincipal[];
  criteres_principaux_autre?: string;
  criteres_secondaires?: string;
  description_projet?: string;
}

// Interface publique anonymisée d'un acquéreur
// Utilisée pour l'affichage sur la carte et dans les popups
export interface AcquereurPublic {
  id: string;
  created_at: string;

  // Localisation
  quartiers: string[];

  // Projet
  type_projet: TypeProjet;
  nature_projet?: NatureProjet;
  timing: Timing;
  types_bien: TypeBien[];
  profil: Profil;

  // Critères
  surface_min?: number;
  pieces_min?: number;
  budget_max?: number;

  criteres_principaux?: CriterePrincipal[];
  criteres_principaux_autre?: string;
  criteres_secondaires?: string;
  description_projet?: string;
}

// Interface pour les ventes récentes
export interface Vente {
  id: string;
  created_at: string;
  quartier: string;
  type_bien: TypeBien;
  surface?: number;
  prix?: number;
  afficher_prix: boolean;
  delai_vente_jours?: number;
  date_vente?: string;
}

// Données du formulaire d'inscription
export interface FormulaireInscription {
  // Coordonnées
  prenom: string;
  email: string;
  telephone: string;
  consentement_contact: boolean;

  // Localisation
  quartiers: string[];
  precision_localisation?: string;

  // Projet
  type_projet: TypeProjet;
  nature_projet?: NatureProjet;
  timing: Timing;
  types_bien: TypeBien[];
  profil: Profil;

  // Critères
  surface_min?: number;
  pieces_min?: number;
  budget_max?: number;

  criteres_principaux?: CriterePrincipal[];
  criteres_principaux_autre?: string;
  criteres_secondaires?: string;
  description_projet?: string;
}

// Labels pour l'affichage
export const TYPE_PROJET_LABELS: Record<TypeProjet, string> = {
  residence_principale: 'Achat résidence principale',
  residence_secondaire: 'Achat résidence secondaire',
  investissement: 'Achat pour investissement'
};

export const TIMING_LABELS: Record<Timing, string> = {
  court_terme: 'Immédiat',
  moyen_terme: '6-12 mois',
  long_terme: '1 an+'
};

export const TIMING_COLORS: Record<Timing, string> = {
  court_terme: '#fb9393', // rouge pastel plus visible (entre red-300 et red-400)
  moyen_terme: '#fac638', // jaune pastel plus visible (entre amber-300 et amber-400)
  long_terme: '#5edbaa'   // vert pastel plus visible (entre emerald-300 et emerald-400)
};

export const TYPE_BIEN_LABELS: Record<TypeBien, string> = {
  appartement: 'Appartement',
  maison: 'Maison',
  terrain: 'Terrain'
};

export const NATURE_PROJET_LABELS: Record<NatureProjet, string> = {
  primo_accedant: 'Primo-accédant (premier achat)',
  deuxieme_achat: 'Deuxième achat ou plus',
  investisseur: 'Investisseur',
  autre: 'Autre'
};

export const CRITERES_PRINCIPAUX_OPTIONS: { value: CriterePrincipal; label: string }[] = [
  { value: 'terrasse', label: 'Terrasse' },
  { value: 'balcon', label: 'Balcon' },
  { value: 'jardin', label: 'Jardin' },
  { value: 'plain_pied', label: 'Plain-pied' },
  { value: 'etage_eleve', label: 'Étage élevé' },
  { value: 'ascenseur', label: 'Ascenseur' },
  { value: 'parking', label: 'Parking' },
  { value: 'garage', label: 'Garage' }
];

export const PIECES_OPTIONS = [
  { value: 1, label: 'T1' },
  { value: 2, label: 'T2' },
  { value: 3, label: 'T3' },
  { value: 4, label: 'T4' },
  { value: 5, label: 'T5' },
  { value: 6, label: 'T6+' }
];

export const PROFIL_LABELS: Record<Profil, string> = {
  individuel: 'Individuel',
  couple: 'Couple',
  famille: 'Famille',
  investisseur: 'Investisseur',
  residence_secondaire: 'Résidence secondaire'
};

export const PROFIL_EMOJIS: Record<Profil, string> = {
  individuel: '👤',
  couple: '👥',
  famille: '👨‍👩‍👧‍👦',
  investisseur: '💰',
  residence_secondaire: '🏖️'
};
