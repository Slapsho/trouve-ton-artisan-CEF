# Tests de l'API de Contact

## 1. Test avec curl
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Utilisateur",
    "subject": "Test email",
    "message": "Ceci est un message de test pour vérifier le bon fonctionnement de l API",
    "to": "artisan@example.com",
    "artisanName": "Artisan Test"
  }'
```

## 2. Vérifier que l'API fonctionne
```bash
curl http://localhost:3000/api/contact
```

Réponse attendue :
```json
{
  "status": "ok",
  "message": "API de contact opérationnelle",
  "maildev": {
    "web": "http://localhost:1080",
    "smtp": "localhost:1025"
  }
}
```

## 3. Tests à effectuer

### ✅ Test de succès
- Remplir tous les champs correctement
- Vérifier que l'email apparaît dans Maildev
- Vérifier que le formulaire se réinitialise
- Vérifier le message de succès

### ✅ Tests de validation
- Soumettre avec des champs vides
- Soumettre avec un message trop court (< 10 caractères)
- Soumettre avec un message trop long (> 1000 caractères)
- Vérifier que les messages d'erreur s'affichent

### ✅ Tests de sécurité
- Essayer d'injecter du HTML : `<script>alert('XSS')</script>`
- Vérifier que le HTML est échappé dans l'email
- Essayer d'injecter du SQL (ne devrait pas affecter)

## 4. Checklist avant livraison

- [ ] Maildev fonctionne en local
- [ ] L'API envoie bien les emails
- [ ] Le formulaire valide correctement
- [ ] Les données sont sanitizées
- [ ] Les messages d'erreur sont clairs
- [ ] Le design de l'email est correct
- [ ] Les emails apparaissent dans Maildev
- [ ] Documentation complète