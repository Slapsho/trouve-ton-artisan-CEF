# Guide d'utilisation de Maildev

## Qu'est-ce que Maildev ?

Maildev est un serveur SMTP local qui permet de tester l'envoi d'emails en développement sans envoyer de vrais emails. Tous les emails sont capturés et consultables via une interface web.

## Installation et démarrage

### Option 1 : Lancer les deux serveurs séparément
```bash
# Terminal 1 - Lancer le serveur Next.js
npm run dev

# Terminal 2 - Lancer Maildev
npm run maildev
```

### Option 2 : Lancer les deux serveurs en même temps
```bash
npm run dev:full
```

## Accès à l'interface

Une fois Maildev lancé :
- **Interface web** : http://localhost:1080
- **Serveur SMTP** : localhost:1025

## Tester l'envoi d'emails

1. Lancez les serveurs (Next.js + Maildev)
2. Accédez au site : http://localhost:3000
3. Allez sur la fiche d'un artisan
4. Remplissez le formulaire de contact
5. Soumettez le formulaire
6. Consultez l'email reçu sur http://localhost:1080

## Fonctionnalités de Maildev

- ✅ Voir tous les emails envoyés
- ✅ Lire les emails en HTML et texte brut
- ✅ Voir les en-têtes complets
- ✅ Télécharger les pièces jointes
- ✅ Supprimer les emails
- ✅ Interface responsive

## Configuration

La configuration SMTP se trouve dans `.env.local` :
```env
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM=noreply@trouve-ton-artisan.fr
```

## En production

⚠️ **Important** : Maildev est uniquement pour le développement !

En production, vous devrez utiliser un vrai service SMTP comme :
- SendGrid
- Mailgun
- AWS SES
- SMTP de votre hébergeur

Il suffira de modifier les variables d'environnement.