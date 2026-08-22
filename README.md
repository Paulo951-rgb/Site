# Pierre & Pavin — Façonniers — Site officiel

Site vitrine éditorial de la maison **Pierre & Pavin — Façonniers**, atelier de bottier et maroquinier artisanal, 107 rue Blomet, 75015 Paris.

Ce n'est ni un site e-commerce, ni un site vitrine générique : aucun prix, aucun panier, aucune logique marchande. Le contenu repose exclusivement sur des faits confirmés par la maison.

## Stack

- **Next.js 14** (App Router) + **TypeScript strict**
- **Tailwind CSS** avec tokens de design personnalisés (aucune couleur par défaut)
- **Framer Motion** (animations sobres, respect strict de `prefers-reduced-motion`)
- **next/font** self-hosté (Fraunces + Inter), **next/image** (WebP/AVIF)
- **Zod** pour la validation du formulaire, **Resend** (ou SMTP) pour l'envoi d'emails
- Carte OpenStreetMap (ou Google Maps via variable d'environnement)
- Analytics optionnel : Plausible, chargé en différé, sans cookie

## Démarrage

```bash
npm install
cp .env.example .env.local   # renseigner les clés nécessaires
npm run dev
```

Production :

```bash
npm run build && npm start
```

Déploiement cible : **Vercel** (compatible Netlify / Cloudflare Pages, aucune dépendance propriétaire forte).

## Modifier le contenu sans toucher au code

Toutes les données éditables sont centralisées dans `/content` :

| Fichier | Contenu |
|---|---|
| `content/siteConfig.ts` | Coordonnées, horaires, réseaux sociaux, SEO, mentions légales |
| `content/creations.ts` | Fiches des créations (nom, catégorie, matière, images…) |
| `content/matieres.ts` | Matières et tanneries partenaires |
| `content/navigation.ts` | Menus du site |

### ⚠️ À confirmer avec le client avant mise en ligne

Ces points sont marqués `TODO` dans `content/siteConfig.ts` :

- **Téléphone** : cohérent sur deux annuaires mais absent du site officiel actuel.
- **Instagram** : deux comptes candidats (`@pierreetpavin` / `@pierre_pavin`) — le champ `reseaux.instagram` est volontairement vide.
- **Facebook** : à confirmer.
- **Horaires précis** : seul « du mardi au samedi » est confirmé.
- **Géolocalisation exacte** (latitude/longitude).
- **Mentions légales** : capital, dirigeant, hébergeur, directeur de publication, coordonnées RGPD.
- **URL de production** pour le SEO.

## Images

Les visuels actuels dans `/public/images/**` sont des **placeholders**. Chaque dossier contient un `README.md` précisant format, ratio et poids recommandés pour le remplacement par les photographies réelles. Remplacer en conservant les noms de fichiers, ou mettre à jour les chemins dans `content/creations.ts`.

## Formulaire de contact

- Validation serveur Zod, honeypot anti-spam, rate limiting basique (5 messages / 10 min / IP).
- Envoi via **Resend** par défaut (`EMAIL_PROVIDER=resend`) ou bascule SMTP (`EMAIL_PROVIDER=smtp`, ex. Brevo) — voir `.env.example` et `lib/email.ts`.

## Évolution vers un CMS

Les exports typés de `/content` (créations, matières, configuration) sont structurés pour être remplacés par une source CMS headless (Sanity, Payload, Contentful) sans refonte des pages : seul le chargement des données change.

## Règles de contenu (rappel)

- Jamais de prix, de panier, de disponibilité chiffrée ni de fausse urgence.
- Aucune matière, tannerie, prestation ou collaboration non confirmée par la maison.
- Vocabulaire interdit : *acheter, ajouter au panier, commander, prix, promo, soldes, stock*.
