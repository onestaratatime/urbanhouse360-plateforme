# ✅ Solution : Empêcher Supabase de se mettre en pause

## 🔍 Problème identifié

**Supabase Free Plan** met les projets en pause après **7 jours d'inactivité**.

Symptômes :
- La carte devient vide
- Les données disparaissent
- Erreur "database not found" ou timeout

## 💡 Solution mise en place : Cron Job automatique

J'ai créé un **cron job Vercel** qui "ping" votre base Supabase **tous les 6 jours** pour la maintenir active.

### Fichiers créés :

1. **`app/api/cron/keep-alive/route.ts`** - Endpoint qui fait une requête à Supabase
2. **`vercel.json`** - Configuration du cron job

### Comment ça marche :

- ⏰ **Tous les 6 jours** (avant les 7 jours de limite)
- 🔄 Vercel appelle automatiquement `/api/cron/keep-alive`
- 📡 Le endpoint fait une simple requête à Supabase
- ✅ Supabase reste actif, ne se met jamais en pause

## 🚀 Configuration requise sur Vercel

### Étape 1 : Ajouter la variable d'environnement CRON_SECRET

1. Allez sur : https://vercel.com/onestaratatimes-projects/urbanhouse360-plateforme/settings/environment-variables

2. Ajoutez cette variable :

| Nom | Valeur | Environnements |
|-----|--------|----------------|
| `CRON_SECRET` | `NmzQZxXx5wORFW6kKRtkNzNo0fGz6YII/pgHHRvqzuE=` | ☑️ Production uniquement |

⚠️ **Important** : Cochez UNIQUEMENT "Production" pour cette variable (pas Preview ni Development)

### Étape 2 : Pousser le code et déployer

```bash
git add .
git commit -m "Add cron job to keep Supabase alive"
git push
```

Ou déployer directement :

```bash
npx vercel --prod
```

### Étape 3 : Vérifier que le cron fonctionne

Après le déploiement, allez sur :

👉 https://vercel.com/onestaratatimes-projects/urbanhouse360-plateforme/settings/crons

Vous devriez voir :

```
Path: /api/cron/keep-alive
Schedule: 0 0 */6 * *  (tous les 6 jours à minuit)
Status: Active
```

## 🧪 Tester manuellement

Vous pouvez tester le cron manuellement :

```bash
curl https://urbanhouse360-plateforme.vercel.app/api/cron/keep-alive \
  -H "Authorization: Bearer NmzQZxXx5wORFW6kKRtkNzNo0fGz6YII/pgHHRvqzuE="
```

Réponse attendue :
```json
{
  "success": true,
  "message": "Supabase kept alive successfully",
  "timestamp": "2025-06-26T10:30:00.000Z",
  "recordsChecked": 0
}
```

## 📊 Monitoring

Pour voir les logs du cron :

1. Allez sur : https://vercel.com/onestaratatimes-projects/urbanhouse360-plateforme/logs
2. Filtrez par `/api/cron/keep-alive`
3. Vous verrez les exécutions toutes les 6 jours

## ⚠️ Limitations du plan gratuit Supabase

Même avec le cron, le plan gratuit a ces limites :

- **500 MB database** (max)
- **5 GB bandwidth/month**
- **50,000 monthly active users**
- **Pause après 7 jours d'inactivité** ← résolu avec le cron ✅

## 🆙 Alternative : Passer au plan Pro (25$/mois)

Si vous voulez :
- ✅ Pas de pause automatique
- ✅ 8 GB database
- ✅ 100,000 monthly active users
- ✅ Daily backups (7 jours)
- ✅ Email support

👉 https://supabase.com/pricing

## ✅ Récapitulatif

Avec cette solution **100% gratuite** :

✅ Votre base Supabase **ne se mettra plus jamais en pause**
✅ Vos données restent **toujours accessibles**
✅ Aucune maintenance manuelle requise
✅ Fonctionne automatiquement en arrière-plan

---

**Date de mise en place** : 26 juin 2025
**Prochaine exécution du cron** : Dans 6 jours (vérifier dans Vercel > Settings > Crons)
