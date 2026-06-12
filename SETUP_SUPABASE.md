# Configuration Supabase - Guide Rapide ⚡

## Étape 1 : Créer un compte Supabase (2 min)

1. Va sur **https://supabase.com**
2. Clique sur **"Start your project"**
3. Connecte-toi avec GitHub (recommandé) ou email
4. C'est gratuit ! ✅

## Étape 2 : Créer un nouveau projet (1 min)

1. Clique sur **"New Project"**
2. Donne un nom : `urbanhouse360` ou autre
3. Choisis un mot de passe fort pour la base de données
4. Région : **Europe (West)** - Paris (plus proche de Toulouse)
5. Plan : **Free** (largement suffisant pour commencer)
6. Clique sur **"Create new project"**
7. ⏳ Attends 2-3 minutes que le projet se crée

## Étape 3 : Exécuter le script SQL (2 min)

1. Dans le menu de gauche, clique sur **"SQL Editor"**
2. Clique sur **"New query"**
3. Copie TOUT le contenu du fichier `supabase/schema.sql`
4. Colle-le dans l'éditeur
5. Clique sur **"Run"** (en bas à droite) ▶️
6. Tu devrais voir : **"Success. No rows returned"** ✅

## Étape 4 : Récupérer les clés API (1 min)

1. Dans le menu de gauche, clique sur **"Project Settings"** ⚙️ (roue crantée en bas)
2. Clique sur **"API"** dans le menu
3. Tu verras 3 informations importantes :

   📋 **Project URL** : `https://xxxxx.supabase.co`
   📋 **anon/public key** : `eyJhbGc...` (longue clé)
   📋 **service_role key** : `eyJhbGc...` (longue clé, section en bas)

## Étape 5 : Configurer les variables d'environnement

Ouvre le fichier `.env.local` et remplace les valeurs :

```env
# Remplace par ton Project URL
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Remplace par ta clé anon/public
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Remplace par ta clé service_role
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Tu peux garder ou changer le mot de passe agence
AGENCE_PASSWORD=demo123
```

## Étape 6 : Redémarrer le serveur

1. Dans le terminal, fais **Ctrl+C** pour arrêter le serveur
2. Relance avec `npm run dev`
3. Teste l'inscription ! 🎉

## Étape 7 : Ajouter des données de démonstration

```bash
npx tsx scripts/seed.ts
```

Cela va ajouter 10 acquéreurs fictifs et 5 ventes pour rendre le site vivant !

## ✅ C'est terminé !

Maintenant :
- Le formulaire d'inscription fonctionne
- Les données sont sauvegardées dans Supabase
- La carte affiche les acquéreurs
- L'espace agence est accessible (mot de passe : `demo123`)

## 🆘 Problème ?

Si ça ne marche toujours pas :
1. Vérifie que tu as bien copié les 3 clés
2. Vérifie qu'il n'y a pas d'espaces avant/après les clés
3. Redémarre le serveur (`Ctrl+C` puis `npm run dev`)
4. Vide le cache du navigateur (Cmd+Shift+R ou Ctrl+Shift+R)

---

Durée totale : **~10 minutes** ⏱️
