# Guide : Reconnecter Supabase à Vercel

## 🎯 Problème résolu
Les données n'apparaissaient pas sur la carte car l'ancienne base Supabase avait été supprimée.

## ✅ Solution : Mise à jour des variables d'environnement

### Étape 1 : Récupérer les credentials Supabase

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez le projet **supabase-coffee-engine**
3. Allez dans **Settings > API**
4. Copiez les 3 valeurs suivantes :

| Variable | Où la trouver |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (⚠️ secret) |

### Étape 2 : Mettre à jour Vercel

Sur Vercel, actuellement les variables sont créées avec le préfixe `STORAGE_`. Vous devez :

1. Aller sur https://vercel.com/onestaratatime/plateforme-acheteurs
2. Cliquer sur **Settings** > **Environment Variables**
3. **SUPPRIMER** ou **RENOMMER** les anciennes variables :

#### Variables à renommer :

| Ancienne variable Vercel | Nouvelle variable (à créer) |
|--------------------------|----------------------------|
| `STORAGE_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `NEXT_PUBLIC_STORAGE_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |

4. **AJOUTER** une nouvelle variable :
   - Nom : `SUPABASE_SERVICE_ROLE_KEY`
   - Valeur : La service_role key depuis Supabase
   - Environnements : **Production, Preview, Development** (tous cochés)

5. **AJOUTER** si elle n'existe pas :
   - Nom : `AGENCE_PASSWORD`
   - Valeur : `demo123` (ou votre mot de passe)
   - Environnements : **Production, Preview, Development**

### Étape 3 : Redéployer

Après avoir modifié les variables d'environnement :

1. Allez dans l'onglet **Deployments**
2. Cliquez sur le dernier déploiement
3. Cliquez sur les **3 points** (⋮) en haut à droite
4. Sélectionnez **"Redeploy"**
5. Cochez **"Use existing Build Cache"** (NON)
6. Cliquez sur **"Redeploy"**

### Étape 4 : Vérifier

1. Attendez que le déploiement soit terminé (2-3 minutes)
2. Visitez votre site : https://plateforme-acheteurs.vercel.app
3. La carte devrait maintenant afficher les données !

## 📝 Variables d'environnement requises sur Vercel

Voici la liste complète des variables nécessaires :

```env
NEXT_PUBLIC_SUPABASE_URL=https://yagstozywicgrqastmkx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...votre_clé_complète
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...votre_clé_service_role_complète
AGENCE_PASSWORD=demo123
```

## 🔍 Comment vérifier que tout fonctionne

1. **Localement** :
   ```bash
   npm run dev
   ```
   Puis allez sur http://localhost:3000/carte

2. **Sur Vercel** :
   - Visitez https://plateforme-acheteurs.vercel.app/carte
   - Vous devriez voir les marqueurs sur la carte

## ⚠️ Important pour l'avenir

- **NE JAMAIS** supprimer le projet Supabase sans backup
- Les variables `NEXT_PUBLIC_*` sont exposées côté client (OK pour URL et anon key)
- La `SERVICE_ROLE_KEY` doit rester secrète (jamais côté client)
- Vercel redémarre automatiquement quand vous changez les variables d'environnement

## 🆘 En cas de problème

Si la carte ne s'affiche toujours pas :

1. Vérifiez les logs Vercel : https://vercel.com/onestaratatime/plateforme-acheteurs/deployments
2. Vérifiez que les tables existent dans Supabase (voir SETUP_SUPABASE.md)
3. Testez la connexion localement avec `npx tsx test-connection.ts`
