# 🤖 AutoReply Pro — Plugin Levanter pour Entrepreneurs

> Plugin WhatsApp intelligent pour gérer automatiquement vos messages clients.  
> Auteur : **Diamant236** | Compatible avec [Levanter](https://github.com/lyfe00011/levanter)

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🔑 Auto-réponse par mots-clés | Répond automatiquement selon le contenu du message |
| 🌙 Mode absence | Message d'absence automatique quand vous n'êtes pas disponible |
| 📋 Menu/Catalogue | Affiche vos services d'un seul message |
| ⚡ Détection urgence | Alerte prioritaire sur les messages urgents |
| 👋 Accueil automatique | Réponse de bienvenue sur bonjour/salut/hello |

---

## 📦 Installation

1. Copiez le fichier `autoreply.js` dans le dossier `plugins/` de votre Levanter
2. Redémarrez votre bot
3. Le plugin est immédiatement disponible

```bash
# Copier dans votre bot Levanter
cp autoreply.js /chemin/vers/votre/levanter/plugins/
```

---

## 🎮 Commandes

| Commande | Description |
|---|---|
| `.autoreply on` | Active l'auto-réponse par mots-clés |
| `.autoreply off` | Désactive l'auto-réponse |
| `.autoreply status` | Affiche le statut actuel |
| `.absence on` | Active le mode absence |
| `.absence off` | Désactive le mode absence |
| `.menu` | Affiche le catalogue de services |

---

## 🔑 Mots-clés reconnus (automatiquement)

| Mot-clé | Réponse envoyée |
|---|---|
| `prix` / `tarif` / `combien` / `devis` | Message de demande de devis |
| `rdv` / `rendez` / `disponible` | Message de prise de rendez-vous |
| `service` / `catalogue` / `produit` | Menu des services |
| `urgent` | Alerte prioritaire |
| `bonjour` / `salut` / `hello` | Message de bienvenue |
| `contact` | Informations de contact |

---

## ⚙️ Personnalisation

Modifiez l'objet `KEYWORDS` dans `autoreply.js` pour adapter les réponses à votre activité :

```js
const KEYWORDS = {
  // Ajoutez vos propres mots-clés
  'votre-mot': 'Votre réponse personnalisée ici...',
}
```

Modifiez aussi la commande `.menu` pour afficher votre catalogue réel.

---

## 📋 Exemple d'utilisation

```
Client : "Bonjour, quels sont vos prix ?"
Bot    : 💰 Tarifs & Devis — Merci de votre intérêt ! Pour recevoir un devis...

Vous   : .absence on
Bot    : 🌙 Mode Absence activé !

Client : "Bonjour"
Bot    : 🌙 Message reçu à 14:30 — Je suis actuellement absent(e)...
```

---

## 🛠️ Structure du plugin

```
autoreply.js
├── state              → État interne (enabled, absence)
├── KEYWORDS           → Dictionnaire mots-clés → réponses
├── bot('autoreply')   → Commande on/off/status
├── bot('absence')     → Commande mode absence
├── bot('menu')        → Affichage catalogue
└── bot({ on:'text' }) → Listener global messages entrants
```

---

## 📄 Licence

MIT — Libre d'utilisation et de modification.

---

_Plugin créé pour [levanter.site](https://levanter.site) • Diamant236_
