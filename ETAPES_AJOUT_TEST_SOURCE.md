# 🔧 Ajout des colonnes test et source - Étapes à suivre

## ✅ Étape 1 : Exécuter la migration SQL sur Supabase

### Action à faire :

1. Ouvrez **Supabase Dashboard** : https://supabase.com/dashboard
2. Sélectionnez votre projet : **supabase-coffee-engine**
3. Allez dans **SQL Editor** (dans le menu de gauche)
4. Cliquez sur **New query**
5. Copiez-collez ce SQL :

```sql
-- Ajout des colonnes test et source
ALTER TABLE acquereurs ADD COLUMN IF NOT EXISTS test BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE acquereurs ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'formulaire';

-- Index
CREATE INDEX IF NOT EXISTS idx_acquereurs_test ON acquereurs(test);
CREATE INDEX IF NOT EXISTS idx_acquereurs_source ON acquereurs(source);

-- Mise à jour de la vue
DROP VIEW IF EXISTS acquereurs_publics;
CREATE VIEW acquereurs_publics AS
SELECT id, created_at, test, source, quartiers, type_projet, nature_projet, timing, types_bien, profil, surface_min, pieces_min, budget_max, criteres_principaux, criteres_principaux_autre, criteres_secondaires, description_projet
FROM acquereurs WHERE actif = true;

GRANT SELECT ON acquereurs_publics TO anon, authenticated;
```

6. Cliquez sur **Run** (ou Ctrl+Enter)
7. Vérifiez que vous voyez "Success. No rows returned"

---

## ✅ Étape 2 : Créer les 23 profils d'acquéreurs test

### Action à faire :

Une fois la migration SQL exécutée, revenez dans Claude Code et dites :

**"J'ai exécuté le SQL, tu peux créer les 23 profils test maintenant"**

Je lancerai alors le script :
```bash
npx tsx scripts/create-test-acquereurs.ts
```

---

## 📊 Ce qui sera créé

### Nouvelles colonnes dans la base :

| Colonne | Type | Valeur par défaut | Description |
|---------|------|------------------|-------------|
| `test` | BOOLEAN | `false` | TRUE pour profils de test, FALSE pour vrais acquéreurs |
| `source` | TEXT | `'formulaire'` | Origine : formulaire, agence, claude_code, import |

### 23 Profils test :

- ✅ **test = true** (facilement identifiables et supprimables)
- ✅ **source = 'claude_code'** (pour tracer l'origine)
- ✅ **Quartiers aléatoires** (répartis sur Toulouse)
- ✅ **Profils variés** : individuel, couple, famille, investisseur, résidence secondaire
- ✅ **Budgets réalistes** : de 150k€ à 800k€
- ✅ **Surfaces variées** : de 50m² à 200m²
- ✅ **Critères cohérents** : terrasse, jardin, parking, etc.
- ✅ **Descriptions réalistes** : "Recherche bien lumineux avec vue dégagée", etc.

---

## 🎯 Résultat attendu

Après ces 2 étapes :

1. ✅ La base de données aura 2 nouvelles colonnes
2. ✅ 23 nouveaux marqueurs apparaîtront sur la carte
3. ✅ Vous pourrez filtrer les profils test vs les vrais acquéreurs
4. ✅ Vous pourrez supprimer tous les profils test d'un coup avec :
   ```sql
   DELETE FROM acquereurs WHERE test = true;
   ```

---

## 🔄 Prochaine étape

**Dites-moi quand vous avez exécuté le SQL dans Supabase, et je créerai les 23 profils test !** 🚀
