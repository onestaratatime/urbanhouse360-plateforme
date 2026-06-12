# Guide de Déploiement - UrbanHouse360

## 🚀 Déploiement sur Netlify

### Prérequis
- Compte GitHub (https://github.com)
- Compte Netlify (https://netlify.com)
- Base de données Supabase configurée (voir SETUP_SUPABASE.md)

### Étape 1 : Créer le dépôt GitHub

1. Va sur **https://github.com/new**
2. Nom du repository : `urbanhouse360-plateforme` (ou autre)
3. **Laisse en Public** (ou Private si tu préfères)
4. **NE coche PAS** "Add a README file" (on en a déjà un)
5. Clique sur **"Create repository"**

### Étape 2 : Pousser le code vers GitHub

Dans ton terminal, depuis le dossier du projet :

```bash
# Ajouter le dépôt distant
git remote add origin https://github.com/TON_USERNAME/urbanhouse360-plateforme.git

# Pousser le code
git push -u origin main
```

Remplace `TON_USERNAME` par ton nom d'utilisateur GitHub.

### Étape 3 : Connecter Netlify

1. Va sur **https://app.netlify.com**
2. Clique sur **"Add new site"** → **"Import an existing project"**
3. Choisis **"Deploy with GitHub"**
4. Autorise Netlify à accéder à ton compte GitHub si demandé
5. Sélectionne le repository **urbanhouse360-plateforme**

### Étape 4 : Configurer les paramètres de build

Netlify devrait détecter automatiquement Next.js. Vérifie que :

- **Base directory :** (vide)
- **Build command :** `npm run build`
- **Publish directory :** `.next`
- **Functions directory :** (vide)

### Étape 5 : Ajouter les variables d'environnement

⚠️ **IMPORTANT** : Clique sur **"Advanced settings"** → **"Add environment variables"**

Ajoute ces 4 variables :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kerjmvkpwhkhnynmdmbe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlcmptdmtwd2hraG55bm1kbWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjA5OTMsImV4cCI6MjA5NjgzNjk5M30.gdiPGE7NweGBXMaL9vfhm4-4pR3LJjdUtdO1brBOPME` |
| `SUPABASE_SERVICE_ROLE_KEY` | Ta clé service_role (voir .env.local) |
| `AGENCE_PASSWORD` | `demo123` (ou change) |

### Étape 6 : Déployer !

1. Clique sur **"Deploy"**
2. Attends 2-3 minutes que Netlify build et déploie
3. Tu verras un message **"Site is live"** avec une URL du type :
   `https://gracious-something-123456.netlify.app`

### Étape 7 : Tester le site

1. Visite l'URL fournie par Netlify
2. Teste l'inscription d'un acquéreur
3. Vérifie que la carte affiche les marqueurs
4. Teste l'espace agence avec le mot de passe

## 📝 Domaine personnalisé (Optionnel)

Si tu veux un domaine comme `urbanhouse360.fr` :

1. Dans Netlify, va dans **"Domain settings"**
2. Clique sur **"Add custom domain"**
3. Suis les instructions pour configurer ton DNS

## 🔄 Mises à jour automatiques

Chaque fois que tu push du code sur GitHub :
```bash
git add .
git commit -m "Description des changements"
git push
```

Netlify redéploiera automatiquement le site !

## 🆘 Dépannage

### Le site ne se build pas
- Vérifie que toutes les variables d'environnement sont présentes
- Regarde les logs de build dans Netlify

### Les formulaires ne fonctionnent pas
- Vérifie les clés Supabase dans les variables d'environnement
- Teste la connexion à Supabase depuis Netlify (voir les logs)

### La carte ne s'affiche pas
- C'est probablement un problème de build côté client
- Vérifie que `MapWrapper.tsx` est bien en `'use client'`

## ✅ Checklist finale

- [ ] Code pushé sur GitHub
- [ ] Site déployé sur Netlify
- [ ] Variables d'environnement configurées
- [ ] Formulaire d'inscription fonctionne
- [ ] Carte affiche les acquéreurs
- [ ] Espace agence accessible
- [ ] Données Supabase accessibles

---

🎉 **Ton site est en ligne !**

Partage l'URL avec tes clients et commence à recevoir des inscriptions d'acquéreurs.
