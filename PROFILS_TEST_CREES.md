# 🎉 23 Profils d'Acquéreurs Test - Créés avec Succès

**Date :** 26 juin 2026, 13:43
**Méthode :** Script automatisé via Claude Code

---

## ✅ Caractéristiques des profils test

### 🔍 Identification

| Champ | Valeur |
|-------|--------|
| `test` | `true` (facilement identifiable) |
| `source` | `claude_code` (traçable) |
| `actif` | `true` (visibles sur la carte) |

### 🏘️ Répartition géographique

**23 profils** répartis aléatoirement sur **28 quartiers de Toulouse** :
- Capitole, Jean Jaurès, Les Carmes, Saint-Cyprien
- Arnaud Bernard, Esquirol, Compans-Caffarelli
- Saint-Aubin-Dupuy, Amidonniers, Minimes
- Guilheméry, Purpan, Lalande, Barrière de Paris
- Croix-Daurade, Roseraie, Sept Deniers, Bonnefoy
- Côte Pavée, Fontaine Lestang, Casselardit, Empalot
- Saint-Agne, Nuit de Mai, Sauzelong, Saint-Michel
- Busca, Ramonville

**Nombre de quartiers par profil :** 1 à 4 quartiers (aléatoire)

### 👥 Profils variés

**5 types de profils :**
- 👤 Individuel
- 👫 Couple
- 👨‍👩‍👧‍👦 Famille
- 💼 Investisseur
- 🏖️ Résidence secondaire

### 🏠 Types de projets

**Type de projet :**
- 🏡 Résidence principale
- 🏖️ Résidence secondaire
- 💰 Investissement

**Nature du projet (70% des profils) :**
- 🆕 Primo-accédant
- 🔄 Deuxième achat
- 💼 Investisseur
- ➕ Autre

### ⏰ Timing

**3 niveaux de timing :**
- 🔴 Court terme (immédiat)
- 🟠 Moyen terme (6-12 mois)
- 🟢 Long terme (1 an+)

### 🏘️ Types de bien

**1 à 2 types par profil :**
- 🏢 Appartement
- 🏡 Maison
- 🏗️ Terrain

### 💰 Budgets

**Budgets réalistes (80% des profils) :**
- Minimum : 150 000 €
- Maximum : 800 000 €
- Paliers : multiples de 10 000 €

### 📐 Surfaces

**Surfaces variées (70% des profils) :**
- Minimum : 50 m²
- Maximum : 200 m²
- Paliers : multiples de 10 m²

### 🛏️ Pièces

**Nombre de pièces (60% des profils) :**
- Minimum : T1
- Maximum : T5

### ✨ Critères principaux

**0 à 4 critères par profil :**
- 🌿 Terrasse
- 🪴 Balcon
- 🌳 Jardin
- 🏠 Plain-pied
- 🏢 Étage élevé
- 🛗 Ascenseur
- 🅿️ Parking
- 🚗 Garage

### 📝 Descriptions

**23 descriptions variées et réalistes :**
- "Recherche bien lumineux avec vue dégagée"
- "Idéalement proche des commerces et transports"
- "Quartier calme et familial souhaité"
- "Proche écoles et espaces verts"
- "Bien avec cachet, possibilité travaux"
- "Recherche investissement locatif rentable"
- "Pied-à-terre pour déplacements professionnels"
- "Maison avec jardin pour enfants"
- "Appartement moderne avec parking"
- "Bien avec possibilité d'extension"
- "Proche métro ligne A ou B"
- "Quartier dynamique avec commerces"
- "Calme, lumineux, bien entretenu"
- "Potentiel locatif étudiant"
- "Résidence récente avec ascenseur"
- "Maison de ville avec cour"
- "Studio ou T2 bien placé"
- "Duplex ou triplex avec caractère"
- "Bien atypique avec charme"
- "Proche centre-ville, toutes commodités"
- "Résidence sécurisée avec parking"
- "Maison rénovée, prête à habiter"
- "Terrain constructible viabilisé"

---

## 🗺️ Visualisation

**Carte interactive :** http://localhost:3000/carte

Tous les profils test apparaissent sur la carte avec :
- 📍 Marqueurs colorés selon le timing (court/moyen/long terme)
- 😊 Emojis selon le profil (👤👫👨‍👩‍👧‍👦💼🏖️)
- 💬 Popups détaillés avec toutes les informations

---

## 🧹 Nettoyage

Pour supprimer tous les profils test d'un coup :

```sql
DELETE FROM acquereurs WHERE test = true;
```

Pour supprimer uniquement ceux créés par Claude Code :

```sql
DELETE FROM acquereurs WHERE source = 'claude_code';
```

Pour voir combien de profils test il y a :

```sql
SELECT COUNT(*) FROM acquereurs WHERE test = true;
```

---

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Profils créés** | 23 |
| **test = true** | 23 |
| **source = claude_code** | 23 |
| **Quartiers couverts** | 28 |
| **Profils différents** | 5 |
| **Types de bien** | 3 |
| **Range de budget** | 150k€ - 800k€ |
| **Range de surface** | 50m² - 200m² |

---

## ✅ Prochaines étapes

1. ✅ Vérifier l'affichage sur la carte locale
2. ✅ Commit et push vers GitHub
3. ✅ Déployer sur Vercel
4. ✅ Vérifier sur https://urbanhouse360-plateforme.vercel.app/carte

---

**Félicitations ! La carte est maintenant alimentée avec des données réalistes !** 🎉
