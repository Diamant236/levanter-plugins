const { bot, lang } = require('../lib/')

// ============================================================
//  AutoReply Pro — Plugin entrepreneur pour Levanter
//  Auteur : Diamant236
//  Commandes : .autoreply on/off | .absence on/off | .menu
// ============================================================

// ---------- État interne (réinitialisé au redémarrage) ----------
const state = {
  enabled: false,       // auto-réponse par mots-clés active ?
  absence: false,       // mode absence activé ?
  absenceStart: null,   // heure de début d'absence
}

// ---------- Catalogue de mots-clés → réponses ----------
const KEYWORDS = {
  // Tarifs / devis
  prix:      '💰 *Tarifs & Devis*\n\nMerci de votre intérêt ! Pour recevoir un devis personnalisé, envoyez-moi :\n• Votre besoin en détail\n• Votre délai souhaité\n\nJe vous réponds dans les plus brefs délais. 🙏',
  devis:     '📋 *Demande de devis*\n\nBienvenue ! Pour établir votre devis, j\'ai besoin de quelques informations.\nPouvez-vous me décrire votre projet ? Je prépare une proposition adaptée.',
  tarif:     '💰 *Tarifs & Devis*\n\nMerci de votre intérêt ! Pour recevoir un devis personnalisé, envoyez-moi :\n• Votre besoin en détail\n• Votre délai souhaité\n\nJe vous réponds dans les plus brefs délais. 🙏',
  combien:   '💰 *Tarifs & Devis*\n\nMerci de votre intérêt ! Pour recevoir un devis personnalisé, envoyez-moi :\n• Votre besoin en détail\n• Votre délai souhaité\n\nJe vous réponds dans les plus brefs délais. 🙏',

  // Disponibilité / RDV
  disponible:   '📅 *Prise de rendez-vous*\n\nJe suis disponible pour un rendez-vous !\nMerci de me préciser :\n• La date et l\'heure souhaitées\n• L\'objet de la rencontre\n\nJe confirme rapidement. ✅',
  rendez:       '📅 *Prise de rendez-vous*\n\nJe suis disponible pour un rendez-vous !\nMerci de me préciser :\n• La date et l\'heure souhaitées\n• L\'objet de la rencontre\n\nJe confirme rapidement. ✅',
  rdv:          '📅 *Prise de rendez-vous*\n\nJe suis disponible pour un rendez-vous !\nMerci de me préciser :\n• La date et l\'heure souhaitées\n• L\'objet de la rencontre\n\nJe confirme rapidement. ✅',
  appointment:  '📅 *Prise de rendez-vous*\n\nJe suis disponible pour un rendez-vous !\nMerci de me préciser :\n• La date et l\'heure souhaitées\n• L\'objet de la rencontre\n\nJe confirme rapidement. ✅',

  // Services / catalogue
  service:   '🛎️ *Nos Services*\n\n✅ Consultation personnalisée\n✅ Accompagnement projet\n✅ Suivi client dédié\n✅ Support réactif\n\nEnvoyez *.menu* pour le catalogue complet.',
  catalogue: '📦 *Catalogue*\n\nEnvoyez *.menu* pour consulter tous nos produits et services en détail.',
  produit:   '📦 *Catalogue*\n\nEnvoyez *.menu* pour consulter tous nos produits et services en détail.',

  // Contact / urgence
  urgent:  '🚨 *Message urgent reçu !*\n\nJ\'ai bien noté votre urgence. Je vous contacte dans les 30 minutes. Merci de votre patience.',
  contact: '📞 *Nous contacter*\n\nPour toute demande :\n• WhatsApp : ce numéro\n• Email : (configurez votre email ici)\n\nRéponse garantie sous 2h en journée.',
  bonjour: '👋 *Bonjour !*\n\nBienvenue, je suis ravi(e) de vous accueillir !\nComment puis-je vous aider aujourd\'hui ?\n\nEnvoyez *.menu* pour voir nos services.',
  hello:   '👋 *Bonjour !*\n\nBienvenue, je suis ravi(e) de vous accueillir !\nComment puis-je vous aider aujourd\'hui ?\n\nEnvoyez *.menu* pour voir nos services.',
  salut:   '👋 *Bonjour !*\n\nBienvenue, je suis ravi(e) de vous accueillir !\nComment puis-je vous aider aujourd\'hui ?\n\nEnvoyez *.menu* pour voir nos services.',
}

// ============================================================
//  1. Commande : .autoreply on | off | status
// ============================================================
bot(
  {
    pattern: 'autoreply ?(.*)',
    desc: 'Active/désactive l\'auto-réponse intelligente (on | off | status)',
    type: 'entrepreneur',
  },
  async (message, match) => {
    const arg = (match || '').trim().toLowerCase()

    if (arg === 'on') {
      state.enabled = true
      return message.send(
        '✅ *AutoReply Pro activé !*\n\nJe répondrai automatiquement aux messages contenant des mots-clés (prix, devis, rdv, service…)\n\nDésactivez avec *.autoreply off*'
      )
    }

    if (arg === 'off') {
      state.enabled = false
      return message.send(
        '🔴 *AutoReply Pro désactivé.*\n\nPlus aucune réponse automatique ne sera envoyée.\n\nRéactivez avec *.autoreply on*'
      )
    }

    // status par défaut
    return message.send(
      `📊 *Statut AutoReply Pro*\n\n• Auto-réponse : ${state.enabled ? '✅ Activée' : '🔴 Désactivée'}\n• Mode absence : ${state.absence ? '🌙 Activé' : '☀️ Désactivé'}\n\nCommandes :\n• *.autoreply on/off* — activer/désactiver\n• *.absence on/off* — mode absent\n• *.menu* — afficher le catalogue`
    )
  }
)

// ============================================================
//  2. Commande : .absence on | off
// ============================================================
bot(
  {
    pattern: 'absence ?(.*)',
    desc: 'Active/désactive le message d\'absence automatique',
    type: 'entrepreneur',
  },
  async (message, match) => {
    const arg = (match || '').trim().toLowerCase()

    if (arg === 'on') {
      state.absence = true
      state.absenceStart = new Date()
      return message.send(
        '🌙 *Mode Absence activé !*\n\nTout message reçu obtiendra une réponse d\'absence automatique.\n\nDésactivez à votre retour avec *.absence off*'
      )
    }

    if (arg === 'off') {
      state.absence = false
      const duration = state.absenceStart
        ? Math.round((new Date() - state.absenceStart) / 60000)
        : 0
      state.absenceStart = null
      return message.send(
        `☀️ *Mode Absence désactivé.*\n\nDurée d'absence : ${duration} minute(s).\nBienvenue de retour ! 👋`
      )
    }

    return message.send(
      `🌙 *Mode Absence*\n\nStatut actuel : ${state.absence ? 'Activé ✅' : 'Désactivé 🔴'}\n\nUsage :\n• *.absence on* — activer\n• *.absence off* — désactiver`
    )
  }
)

// ============================================================
//  3. Commande : .menu  — Catalogue / menu interactif
// ============================================================
bot(
  {
    pattern: 'menu',
    desc: 'Affiche le menu/catalogue de services',
    type: 'entrepreneur',
  },
  async (message) => {
    const menuText =
      `🏢 *Menu & Catalogue*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `📦 *Nos Services*\n` +
      `1️⃣  Consultation & conseil\n` +
      `2️⃣  Accompagnement projet\n` +
      `3️⃣  Suivi client personnalisé\n` +
      `4️⃣  Formation & coaching\n\n` +
      `💬 *Mots-clés reconnus*\n` +
      `• _prix_ ou _devis_ → demande de tarif\n` +
      `• _rdv_ ou _disponible_ → prise de RDV\n` +
      `• _service_ → liste des services\n` +
      `• _urgent_ → alerte prioritaire\n\n` +
      `📞 *Nous joindre*\n` +
      `Répondez directement sur ce numéro.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Powered by AutoReply Pro • Diamant236_`

    return message.send(menuText)
  }
)

// ============================================================
//  4. Listener global — détection de mots-clés entrants
//     (s'active uniquement si autoreply est ON)
// ============================================================
bot(
  {
    on: 'text',       // intercepte tous les messages texte entrants
    desc: 'Listener auto-réponse mots-clés',
    type: 'entrepreneur',
  },
  async (message) => {
    // Ignorer les commandes bot (commençant par le préfixe)
    const text = (message.text || '').toLowerCase().trim()
    if (text.startsWith('.') || text.startsWith('/') || text.startsWith('!')) return

    // ---- Mode absence ----
    if (state.absence) {
      const now = new Date()
      const heure = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      return message.send(
        `🌙 *Message reçu à ${heure}*\n\nJe suis actuellement absent(e) et vous répondrai dès mon retour.\n\nPour les urgences, mentionnez le mot *urgent* dans votre message.\n\n_AutoReply Pro • Diamant236_`
      )
    }

    // ---- Auto-réponse mots-clés ----
    if (!state.enabled) return

    for (const [keyword, response] of Object.entries(KEYWORDS)) {
      if (text.includes(keyword)) {
        return message.send(response)
      }
    }
  }
)
