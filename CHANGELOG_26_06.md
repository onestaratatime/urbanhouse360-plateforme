# Changelog - Optimisations du 26/06/2026

## ✅ Modifications effectuées

### 1. Types TypeScript mis à jour (`lib/types.ts`)

#### Nouveaux types :
- ✅ `NatureProjet` : 'primo_accedant' | 'deuxieme_achat' | 'investisseur' | 'autre'
- ✅ `TypeBien` : ajout de 'terrain' (appartement | maison | **terrain**)
- ✅ `Profil` : simplification
  - Avant : 'personne_seule' | 'couple' | 'famille' | 'famille_nombreuse' | 'investisseur' | 'residence_secondaire'
  - Après : '**individuel**' | 'couple' | '**famille**' | 'investisseur' | 'residence_secondaire'
- ✅ `CriterePrincipal` : renommage de `CritereIndispensable`

#### Nouveaux labels :
- ✅ `NATURE_PROJET_LABELS` : labels pour la nature du projet
- ✅ `TYPE_BIEN_LABELS` : ajout de 'Terrain'
- ✅ `CRITERES_PRINCIPAUX_OPTIONS` : renommage de `CRITERES_INDISPENSABLES_OPTIONS`
- ✅ `PROFIL_LABELS` & `PROFIL_EMOJIS` : mis à jour avec les nouveaux profils

### 2. Migration SQL (`supabase/migration_optimisations_26_06.sql`)

- ✅ Ajout du champ `nature_projet` (optionnel)
- ✅ Mise à jour des contraintes pour les nouveaux profils
- ✅ Migration automatique des anciennes données :
  - `personne_seule` → `individuel`
  - `famille` + `famille_nombreuse` → `famille`
- ✅ Renommage des colonnes :
  - `criteres_indispensables` → `criteres_principaux`
  - `criteres_indispensables_autre` → `criteres_principaux_autre`
- ✅ Mise à jour de la vue `acquereurs_publics`

### 3. Page d'accueil (`app/page.tsx`)

Mise à jour des 3 étapes :

**Avant :**
1. Indiquez vos quartiers de rêve, votre type de bien, votre budget et vos critères préférés
2. Votre recherche devient visible pour les propriétaires du quartier, votre profil reste privé
3. Nous vous envoyons des informations sur les biens qui matchent avec votre recherche

**Après :**
1. **Décrivez votre bien idéal : quartier/ville, type de bien, critères, budget, timing**
2. **Votre recherche devient visible pour les propriétaires, votre identité reste confidentielle**
3. **Recevez directement les offres qui correspondent à votre projet**

---

## 📋 Modifications à faire

### 🔄 En cours

#### 4. Ajouter des villes en périphérie de Toulouse (`lib/quartiers.ts`)

Villes à ajouter :
- Blagnac
- Colomiers
- Tournefeuille
- Cugnaux
- Balma
- L'Union
- Ramonville-Saint-Agne
- Castanet-Tolosan
- Muret
- Plaisance-du-Touch
- Cornebarrieu
- Saint-Orens-de-Gameville
- Portet-sur-Garonne
- Aucamville

### ⏳ À faire

#### 5. Restructurer le formulaire d'inscription

**Structure actuelle** : formulaire en une page

**Nouvelle structure** : 5 catégories distinctes

1. **Localisation**
   - Mode simple : sélection ville/quartier classique
   - Mode avancé : clic sur zones de la carte
   - Ajouter les villes de périphérie

2. **Profil**
   - Choix du profil (comment vous serez affiché sur la carte)
   - Individuel, Couple, Famille, Investisseur, Résidence secondaire

3. **Projet** (étape séparée)
   - Type de projet (résidence principale, secondaire, investissement)
   - **Nature du projet** : Primo-accédant, Deuxième achat, Investisseur, Autre
   - **Timing** : Immédiat, 6-12 mois, 1 an+
   - **Type de bien** : Appartement, Maison, **Terrain**

4. **Critères**
   - Renommer "Critères indispensables" → "**Critères principaux**"
   - Surface min, Pièces min, Budget max
   - Critères principaux : terrasse, balcon, jardin, etc.
   - Critères secondaires (texte libre)

5. **Coordonnées**
   - Prénom, Email, Téléphone
   - Consentement contact

**Design à corriger :**
- ✅ Bouton "Suivant" : ajouter un fond de couleur pour qu'il soit visible quand le questionnaire est complété

#### 6. Créer des données d'exemple réalistes

Mettre à jour les exemples avec :
- Nouveaux profils (Individuel, Famille au lieu de Seul, Famille nombreuse)
- Nature du projet
- Type de bien incluant Terrain
- Critères principaux

Exemples à créer :
- Couple primo-accédant cherchant appartement T3 Blagnac
- Famille cherchant maison avec jardin Colomiers
- Individuel cherchant appartement centre Toulouse
- Investisseur cherchant terrain Tournefeuille

---

## 📝 Instructions pour exécuter les migrations

### 1. Exécuter la migration SQL sur Supabase

```sql
-- Copier le contenu de supabase/migration_optimisations_26_06.sql
-- et l'exécuter dans le SQL Editor de Supabase
```

### 2. Redéployer l'application

```bash
git add .
git commit -m "Optimisations formulaire et types (26/06)"
git push
```

### 3. Ajouter des données d'exemple

Une fois le formulaire restructuré, ajouter 5-10 exemples réalistes via le formulaire.

---

## 🎯 Objectifs

- ✅ Simplifier les profils (regrouper Famille)
- ✅ Ajouter la nature du projet (primo-accédant, etc.)
- ✅ Ajouter "terrain" dans les types de bien
- ✅ Renommer "critères indispensables" en "critères principaux"
- ✅ Optimiser le texte de la homepage
- 🔄 Ajouter villes en périphérie
- ⏳ Restructurer le formulaire en 5 étapes claires
- ⏳ Ajouter mode simple/avancé pour la localisation
- ⏳ Corriger le design du bouton Suivant
- ⏳ Créer des données d'exemple réalistes
