# Plateforme Acquéreur UrbanHouse360

Plateforme web publique et anonymisée pour mettre en relation acquéreurs immobiliers et vendeurs sur Toulouse et sa périphérie.

## Concept

Des acquéreurs immobiliers s'inscrivent via un formulaire public et apparaissent, de façon totalement anonymisée (icône de personne), sur une carte interactive de Toulouse, positionnés sur les quartiers qu'ils recherchent. Les vendeurs et l'agence peuvent ainsi visualiser la demande par quartier. L'agence dispose d'un accès pour saisir elle-même des acquéreurs.

## Stack technique

- **Next.js 15** (App Router, TypeScript)
- **Supabase** (PostgreSQL, client JS)
- **Leaflet** avec react-leaflet (carte OpenStreetMap)
- **Tailwind CSS**
- **Vercel** (déploiement)

## Fonctionnalités

### Pages publiques

- **/** : Page d'accueil avec hero, aperçu de la carte, chiffres clés, ventes récentes
- **/carte** : Carte interactive plein écran avec tous les acquéreurs anonymisés
- **/inscription** : Formulaire d'inscription en 4 étapes

### Espace agence

- **/agence** : Tableau de bord avec liste complète des acquéreurs (données privées incluses)
- **/agence/nouveau** : Formulaire pour ajouter un acquéreur depuis l'agence
- **/agence/ventes** : Gestion des ventes récentes affichées sur la page d'accueil

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd plateforme-acheteurs
npm install
```

### 2. Créer le projet Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL du projet et les clés API

### 3. Exécuter le script SQL

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Copiez tout le contenu du fichier `supabase/schema.sql`
3. Exécutez-le

Cela va créer :
- La table `acquereurs`
- La vue publique `acquereurs_publics` (anonymisée)
- La table `ventes`
- Les policies RLS (Row Level Security)

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role

# Accès agence
AGENCE_PASSWORD=votre-mot-de-passe-agence
```

**Où trouver les clés Supabase :**
- Dans le dashboard Supabase : **Settings** > **API**
- `NEXT_PUBLIC_SUPABASE_URL` : Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : anon / public
- `SUPABASE_SERVICE_ROLE_KEY` : service_role (⚠️ À garder secrète, ne jamais exposer côté client)

### 5. Insérer les données de démonstration

```bash
npx tsx scripts/seed.ts
```

Ce script insère :
- 10 acquéreurs fictifs
- 5 ventes récentes

### 6. Lancer le projet en local

```bash
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

### Via la CLI Vercel

```bash
# Installer la CLI Vercel
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel
```

### Configurer les variables d'environnement

Dans le dashboard Vercel :
1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez toutes les variables du `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AGENCE_PASSWORD`

### Redéployer

```bash
vercel --prod
```

## Structure du projet

```
plateforme-acheteurs/
├── app/
│   ├── page.tsx                      # Page d'accueil
│   ├── carte/
│   │   └── page.tsx                  # Carte interactive
│   ├── inscription/
│   │   ├── page.tsx                  # Formulaire d'inscription
│   │   └── confirmation/
│   │       └── page.tsx              # Page de confirmation
│   ├── agence/
│   │   ├── page.tsx                  # Dashboard agence
│   │   ├── login/
│   │   │   └── page.tsx              # Connexion agence
│   │   ├── nouveau/
│   │   │   └── page.tsx              # Nouvel acquéreur
│   │   └── ventes/
│   │       └── page.tsx              # Gestion des ventes
│   └── api/
│       ├── acquereurs/
│       │   └── route.ts              # API publique (inscription)
│       └── agence/
│           ├── login/
│           │   └── route.ts          # API connexion agence
│           └── acquereurs/
│               └── route.ts          # API agence (CRUD acquéreurs)
├── components/
│   ├── MapComponent.tsx              # Carte Leaflet
│   └── QuartiersSelector.tsx        # Sélecteur de quartiers
├── lib/
│   ├── types.ts                      # Types TypeScript
│   ├── quartiers.ts                  # Données des quartiers
│   ├── supabase.ts                   # Clients Supabase
│   └── auth.ts                       # Authentification agence
├── scripts/
│   └── seed.ts                       # Script de seed
├── supabase/
│   └── schema.sql                    # Schéma de la base de données
└── README.md
```

## Sécurité et anonymat

### Données anonymisées sur la carte

- Le front public utilise la **vue `acquereurs_publics`** qui exclut automatiquement :
  - Prénom
  - Email
  - Téléphone
  - Consentement

- La vue expose uniquement :
  - ID
  - Quartiers recherchés
  - Type de projet
  - Timing
  - Type de bien
  - Critères de recherche

### Vérification de l'anonymat

Pour vérifier que les données privées ne sont pas exposées :

1. Ouvrez les DevTools du navigateur (F12)
2. Allez dans l'onglet **Network**
3. Rechargez la page `/carte`
4. Vérifiez les réponses JSON : **aucune donnée personnelle ne doit apparaître**

### Accès agence

- Authentification simple par mot de passe (variable d'environnement `AGENCE_PASSWORD`)
- Cookie de session (7 jours)
- Accès aux données complètes via `supabaseAdmin` (service_role_key)

## Modèle de données

### Table `acquereurs`

| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Identifiant unique |
| created_at | timestamp | Date d'inscription |
| source | text | 'direct' ou 'agence' |
| actif | boolean | Actif/inactif |
| prenom | text | Prénom (privé) |
| email | text | Email (privé) |
| telephone | text | Téléphone (privé) |
| consentement_contact | boolean | Consentement (privé) |
| quartiers | text[] | Slugs des quartiers |
| precision_localisation | text | Précisions localisation |
| type_projet | text | Type de projet |
| timing | text | Timing du projet |
| types_bien | text[] | Types de bien |
| surface_min | integer | Surface minimum |
| pieces_min | integer | Pièces minimum |
| budget_max | integer | Budget maximum |
| criteres_indispensables | text[] | Critères indispensables |
| criteres_indispensables_autre | text | Autres critères |
| criteres_secondaires | text | Critères secondaires |
| description_projet | text | Description du projet |

### Table `ventes`

| Champ | Type | Description |
|-------|------|-------------|
| id | uuid | Identifiant unique |
| created_at | timestamp | Date de création |
| quartier | text | Slug du quartier |
| type_bien | text | Type de bien |
| surface | integer | Surface |
| prix | integer | Prix |
| afficher_prix | boolean | Afficher le prix publiquement |
| delai_vente_jours | integer | Délai de vente |
| date_vente | date | Date de vente |

## Quartiers couverts

La plateforme couvre **54 quartiers** répartis sur :

- **Centre** : Capitole, Carmes, Saint-Étienne, Saint-Georges...
- **Rive gauche** : Saint-Cyprien, Patte d'Oie, Arènes...
- **Nord** : Compans-Caffarelli, Minimes, Borderouge...
- **Est** : Marengo, Côte Pavée, Guilheméry, Roseraie...
- **Sud** : Rangueil, Saint-Agne, Empalot...
- **Ouest** : Purpan, Saint-Martin-du-Touch, Lardenne...
- **Périphérie** : Blagnac, Colomiers, Tournefeuille, Balma, L'Union...

Voir `lib/quartiers.ts` pour la liste complète avec coordonnées GPS.

## Développement futur

### Fonctionnalités prévues (non implémentées en V1)

- Matching automatique acquéreurs ↔ biens
- Envoi d'emails automatiques avec sélections de biens
- Affinage de la localisation à la rue (niveau 2)
- Comptes acquéreurs pour modifier leur recherche
- API pour l'intégration avec d'autres outils

### Structure anticipée

Le modèle de données et l'architecture sont conçus pour faciliter ces évolutions :
- Champ `precision_localisation` pour l'affinage niveau 2
- Champ `consentement_contact` pour les communications
- Séparation claire données publiques/privées

## Notes d'implémentation

### Jitter sur la carte

Les acquéreurs sont positionnés avec un décalage aléatoire (jitter) déterministe :
- Évite la superposition des marqueurs
- Le décalage est calculé à partir de l'ID de l'acquéreur + quartier
- Les positions restent stables entre les chargements

### Couleurs des marqueurs

- 🔴 **Rouge** : Court terme (< 6 mois)
- 🟠 **Orange** : Moyen terme (6-18 mois)
- 🟢 **Vert** : Long terme (> 18 mois)

### Revalidation

Les pages publiques utilisent `revalidate: 60` pour se mettre à jour toutes les 60 secondes (ISR).

## Support

Pour toute question ou problème :
- Consultez la documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
- Consultez la documentation Supabase : [supabase.com/docs](https://supabase.com/docs)

---

**UrbanHouse360** - Plateforme Acquéreur Publique Anonymisée
