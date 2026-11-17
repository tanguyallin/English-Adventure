const STORAGE_KEY = "englishAdventureProgressV1";

const LESSONS = {
  colors: {
    title: "Les couleurs",
    subtitle: "Les couleurs sont partout autour de toi !",
    icon: "🌈",
    words: [
      { word: "Red", fr: "rouge", emoji: "🔴" },
      { word: "Blue", fr: "bleu", emoji: "🔵" },
      { word: "Green", fr: "vert", emoji: "🟢" },
      { word: "Yellow", fr: "jaune", emoji: "🟡" },
      { word: "Purple", fr: "violet", emoji: "🟣" },
      { word: "Orange", fr: "orange", emoji: "🟠" }
    ]
  },
  animals: {
    title: "Les animaux",
    subtitle: "Rencontre les animaux et apprends leurs noms !",
    icon: "🐾",
    words: [
      { word: "Dog", fr: "chien", emoji: "🐶" },
      { word: "Cat", fr: "chat", emoji: "🐱" },
      { word: "Rabbit", fr: "lapin", emoji: "🐰" },
      { word: "Bear", fr: "ours", emoji: "🐻" },
      { word: "Frog", fr: "grenouille", emoji: "🐸" },
      { word: "Lion", fr: "lion", emoji: "🦁" }
    ]
  }
};

const ALL_WORDS = Object.keys(LESSONS).flatMap(function (key) {
  return LESSONS[key].words;
});

const DEFAULT_STATE = {
  diamonds: 0,
  completedLessons: [],
  wordsLearned: [],
  bestScore: 0,
  sessions: 0,
  parentPin: "2468",
  soundEnabled: true
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const migrated = Object.assign({}, saved);
    if (typeof migrated.diamonds !== "number") migrated.diamonds = Number(migrated.stars) || 0;
    delete migrated.stars;
    return Object.assign({}, DEFAULT_STATE, migrated, {
      completedLessons: Array.isArray(saved.completedLessons) ? saved.completedLessons : [],
      wordsLearned: Array.isArray(saved.wordsLearned) ? saved.wordsLearned : []
    });
  } catch (error) {
    return Object.assign({}, DEFAULT_STATE);
  }
}

let state = loadState();
let activeView = "home";
let activeLesson = "colors";
let game = null;
let conversation = null;
let speechRecognition = null;
let deferredInstallPrompt = null;

const app = document.getElementById("app");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char];
  });
}

function speakWithLanguage(text, language, rate, cancelCurrent) {
  if (!state.soundEnabled) {
    showToast("Le son est désactivé dans l'espace parents.");
    return;
  }
  if (!("speechSynthesis" in window)) {
    showToast("La lecture audio n'est pas disponible sur cet appareil.");
    return;
  }
  if (cancelCurrent) window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = rate;
  utterance.pitch = language === "fr-FR" ? 1 : 1.08;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

function speak(word) {
  speakWithLanguage(word, "en-GB", 0.78, true);
}

function speakFrench(text) {
  speakWithLanguage(text, "fr-FR", 0.9, true);
}

function speakEnglishAfterCurrent(word) {
  speakWithLanguage(word, "en-GB", 0.78, false);
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(function () {
    toast.classList.remove("visible");
  }, 2600);
}

function progressPercent() {
  return Math.min(100, Math.round((state.completedLessons.length / Object.keys(LESSONS).length) * 100));
}

function renderHome() {
  return '<section class="welcome-card">' +
    '<div class="welcome-copy"><span class="eyebrow">TA PETITE AVENTURE ANGLAISE</span>' +
    '<h1>Hello ! <span class="wave">👋</span></h1>' +
    '<p>Prête à apprendre de nouveaux mots avec moi ?</p>' +
    '<div class="session-note">⏱️ Une petite aventure de 10 à 15 minutes</div>' +
    '<button class="primary-button" data-view="learn">C\'est parti ! <span>→</span></button></div>' +
    '<div class="fox-mascot" aria-label="Petit renard">🦊<span>✨</span></div>' +
    '</section>' +
    '<section class="quick-stats">' +
    '<div class="stat-card"><span class="stat-icon">💎</span><strong>' + state.diamonds + '</strong><small>diamants</small></div>' +
    '<div class="stat-card"><span class="stat-icon">📚</span><strong>' + state.completedLessons.length + '/2</strong><small>leçons terminées</small></div>' +
    '<div class="stat-card"><span class="stat-icon">🗣️</span><strong>' + state.wordsLearned.length + '</strong><small>mots découverts</small></div>' +
    '</section>' +
    '<section class="section-block"><div class="section-heading"><div><span class="eyebrow">ON CONTINUE ?</span><h2>Choisis ton activité</h2></div><span class="heading-emoji">🎈</span></div>' +
    '<div class="activity-grid">' +
    '<button class="activity-card peach" data-view="learn"><span>📖</span><strong>Apprendre</strong><small>Découvre les mots</small></button>' +
    '<button class="activity-card lavender" data-view="play"><span>🧩</span><strong>Jouer</strong><small>Teste tes connaissances</small></button>' +
    '<button class="activity-card mint" data-view="listen"><span>🎧</span><strong>Écouter</strong><small>Reconnais les sons</small></button>' +
    '<button class="activity-card butter" data-view="rewards"><span>🏆</span><strong>Mes diamants</strong><small>Regarde tes progrès</small></button>' +
    '</div></section>' +
    '<section class="progress-panel"><div class="progress-title"><strong>Mon aventure</strong><span>' + progressPercent() + '%</span></div>' +
    '<div class="progress-track"><span style="width:' + progressPercent() + '%"></span></div>' +
    '<p>Chaque mot appris te fait grandir. Bravo ! 💛</p></section>' +
    (deferredInstallPrompt ? '<button class="install-button" data-action="install">📲 Installer sur cette tablette</button>' : '');
}

function renderLearn() {
  return '<section class="page-intro"><span class="eyebrow">JE DÉCOUVRE</span><h1>Apprendre 📚</h1><p>Choisis une leçon. Écoute bien et répète les mots en anglais !</p></section>' +
    '<div class="lesson-list">' + Object.keys(LESSONS).map(function (key) {
      const lesson = LESSONS[key];
      const done = state.completedLessons.includes(key);
      return '<button class="lesson-card ' + (done ? "is-done" : "") + '" data-topic="' + key + '">' +
        '<span class="lesson-illustration">' + lesson.icon + '</span><span class="lesson-info"><strong>' + lesson.title + '</strong><small>' + lesson.words.length + ' mots à découvrir</small></span>' +
        '<span class="lesson-status">' + (done ? "✅" : "→") + '</span></button>';
    }).join("") + '</div>' +
    '';
}

function renderLesson() {
  const lesson = LESSONS[activeLesson];
  const done = state.completedLessons.includes(activeLesson);
  return '<button class="back-button" data-view="learn">← Toutes les leçons</button>' +
    '<section class="page-intro lesson-intro"><span class="lesson-big-icon">' + lesson.icon + '</span><span class="eyebrow">MA LEÇON</span><h1>' + lesson.title + '</h1><p>' + lesson.subtitle + '</p></section>' +
    '<div class="word-grid">' + lesson.words.map(function (item) {
      const learned = state.wordsLearned.includes(item.word);
      return '<button class="word-card" data-action="speak" data-word="' + item.word + '"><span class="word-emoji">' + item.emoji + '</span><strong>' + item.word + '</strong><small>' + item.fr + '</small><span class="listen-hint">🔊 Écouter</span>' + (learned ? '<span class="learned-check">✓</span>' : '') + '</button>';
    }).join("") + '</div>' +
    '<div class="tip-card">💡 <span>Astuce : touche chaque carte pour entendre le mot en anglais. Essaie de le répéter à voix haute !</span></div>' +
    '<button class="primary-button full-button" data-action="complete-lesson" data-topic="' + activeLesson + '">' + (done ? "Leçon déjà terminée ✓" : "J'ai terminé cette leçon ! 💎") + '</button>';
}

function renderPlay() {
  return '<section class="page-intro"><span class="eyebrow">À TOI DE JOUER</span><h1>Les petits jeux 🧩</h1><p>10 questions pour gagner des diamants. Tu peux recommencer autant de fois que tu veux !</p></section>' +
    '<button class="game-mode-card quiz-mode" data-action="start-game" data-mode="quiz"><span class="mode-icon">🧠</span><span><strong>Le quiz des mots</strong><small>Lis le mot français et trouve son nom anglais.</small></span><span class="mode-arrow">→</span></button>' +
    '<button class="game-mode-card listen-mode" data-action="start-game" data-mode="listen"><span class="mode-icon">🎧</span><span><strong>L\'oreille magique</strong><small>Écoute le mot anglais et choisis la bonne image.</small></span><span class="mode-arrow">→</span></button>' +
    '<button class="game-mode-card conversation-mode" data-action="conversation-menu"><span class="mode-icon">💬</span><span><strong>On discute en anglais !</strong><small>Fais 3 échanges avec le petit renard.</small></span><span class="mode-arrow">→</span></button>' +
    '<div class="tip-card">💎 <span>Une bonne réponse = un diamant à la fin du jeu. Il y a 10 questions !</span></div>' +
    '<div class="best-score">🏅 Ton meilleur score : <strong>' + state.bestScore + '/10</strong></div>';
}

function renderListen() {
  return '<section class="page-intro"><span class="eyebrow">J\'ÉCOUTE ET JE RÉPÈTE</span><h1>Les mots à l\'oreille 🎧</h1><p>Touche une carte pour écouter le mot en anglais. À toi de le répéter !</p></section>' +
    Object.keys(LESSONS).map(function(key){ return '<div class="listen-group"><h2>' + LESSONS[key].icon + ' ' + LESSONS[key].title + '</h2><div class="listen-grid">' + LESSONS[key].words.map(wordCard).join("") + '</div></div>'; }).join("");
}

function wordCard(item) {
  return '<button class="listen-card" data-action="speak" data-word="' + item.word + '"><span>' + item.emoji + '</span><strong>' + item.word + '</strong><small>' + item.fr + '</small><em>🔊</em></button>';
}

function renderRewards() {
  const milestones = [
    { count: 1, icon: "💎", title: "Premier diamant", note: "Tu as commencé ton aventure !" },
    { count: 5, icon: "🦋", title: "Petite exploratrice", note: "5 diamants gagnés" },
    { count: 10, icon: "🦄", title: "Super championne", note: "10 diamants gagnés" },
    { count: 20, icon: "👑", title: "Reine de l'anglais", note: "20 diamants gagnés" }
  ];
  return '<section class="page-intro"><span class="eyebrow">BRAVO À TOI !</span><h1>Mes récompenses 🏆</h1><p>Chaque bonne réponse te rapproche d\'une nouvelle récompense.</p></section>' +
    '<div class="diamond-total"><span>💎</span><strong>' + state.diamonds + '</strong><small>diamants gagnés</small></div>' +
    '<div class="reward-list">' + milestones.map(function (item) {
      const unlocked = state.diamonds >= item.count;
      return '<div class="reward-card ' + (unlocked ? "unlocked" : "locked") + '"><span>' + item.icon + '</span><div><strong>' + item.title + '</strong><small>' + item.note + '</small></div><b>' + (unlocked ? "✓" : "🔒") + '</b></div>';
    }).join("") + '</div>' +
    '<div class="tip-card">💛 <span>Tu progresses à ton rythme. Le plus important, c\'est d\'essayer et de s\'amuser !</span></div>';
}

function renderParents() {
  return '<section class="page-intro"><span class="eyebrow">ESPACE FAMILLE</span><h1>Espace parents 🔐</h1><p>Un petit aperçu des progrès et quelques réglages.</p></section>' +
    '<div class="parent-stats"><div><strong>' + state.sessions + '</strong><small>jeux terminés</small></div><div><strong>' + state.wordsLearned.length + '</strong><small>mots écoutés / appris</small></div><div><strong>' + state.bestScore + '/10</strong><small>meilleur score</small></div></div>' +
    '<div class="parent-card"><h2>🔊 Son et prononciation</h2><p>Les mots sont prononcés avec une voix anglaise lorsque l\'appareil le permet.</p><button class="setting-button" data-action="toggle-sound">' + (state.soundEnabled ? "🔊 Son activé" : "🔇 Son désactivé") + '</button></div>' +
    '<div class="parent-card"><h2>🔑 Code parent</h2><p>Change le code utilisé pour ouvrir cet espace.</p><button class="setting-button" data-action="change-pin">Modifier le code</button></div>' +
    '<div class="parent-card danger-zone"><h2>♻️ Recommencer</h2><p>Efface les diamants et la progression enregistrés sur cette tablette.</p><button class="setting-button danger-button" data-action="reset">Réinitialiser la progression</button></div>' +
    '<p class="parent-disclaimer">Le code parent évite les ouvertures accidentelles, mais il ne remplace pas un véritable verrouillage de sécurité.</p>';
}

function gameInstruction(question) {
  return game.mode === "quiz"
    ? 'Comment dit-on « ' + question.item.fr + ' » en anglais ?'
    : "Écoute le mot en anglais, puis choisis l'image qui correspond.";
}

function readGameInstruction() {
  if (!game || game.complete) return;
  const question = game.questions[game.index];
  speakFrench(gameInstruction(question));
  if (game.mode === "listen") speakEnglishAfterCurrent(question.item.word);
}

function renderGame() {
  if (!game) return renderPlay();
  if (game.complete) {
    const message = game.correct === 10 ? "Incroyable ! Un sans-faute ! 🎉" : game.correct >= 7 ? "Super travail ! Tu progresses très bien ! 💎" : "Bravo d'avoir essayé ! On recommence quand tu veux. 💛";
    return '<section class="result-card"><div class="result-confetti">🎉 💎 🎈</div><span class="eyebrow">JEU TERMINÉ</span><h1>' + message + '</h1><div class="score-circle"><strong>' + game.correct + '</strong><small>/ 10</small></div><p>Tu gagnes <strong>' + game.correct + ' diamants</strong> !</p><button class="primary-button full-button" data-action="start-game" data-mode="' + game.mode + '">Rejouer 🔁</button><button class="secondary-button full-button" data-view="play">Retour aux jeux</button></section>';
  }
  const question = game.questions[game.index];
  const progress = Math.round((game.index / game.questions.length) * 100);
  const prompt = gameInstruction(question);
  return '<button class="back-button" data-view="play">← Quitter le jeu</button>' +
    '<section class="game-panel"><div class="game-progress-row"><span>Question ' + (game.index + 1) + ' sur 10</span><span>💎 ' + game.correct + '</span></div>' +
    '<div class="progress-track"><span style="width:' + progress + '%"></span></div>' +
    '<button class="instruction-replay" data-action="replay-instruction">🔊 Réécouter la consigne</button>' +
    '<h1>' + prompt + '</h1>' +
    (game.mode === "listen" ? '<button class="listen-prompt" data-action="replay-word">🔊 Réécouter le mot anglais</button>' : '<div class="question-emoji">' + question.item.emoji + '</div>') +
    '<div class="answer-grid">' + question.options.map(function (option, index) {
      let cls = "answer-option";
      if (game.answered && option.word === question.item.word) cls += " answer-correct";
      else if (game.answered && game.selected === index) cls += " answer-wrong";
      else if (!game.answered && game.selected === index) cls += " answer-selected";
      return '<button class="' + cls + '" data-action="answer" data-answer="' + index + '"' + (game.answered ? " disabled" : "") + '>' +
        (game.mode === "quiz" ? '<strong>' + option.word + '</strong>' : '<span class="answer-emoji">' + option.emoji + '</span><strong>' + option.fr + '</strong>') + '</button>';
    }).join("") + '</div>' +
    (game.answered
      ? '<div class="answer-feedback ' + (game.lastCorrect ? "good" : "try-again") + '">' + (game.lastCorrect ? "Bravo, bonne réponse ! 💎" : "Bien essayé ! La bonne réponse était " + question.item.word + ".") + '</div><button class="primary-button full-button" data-action="next-question">' + (game.index === 9 ? "Voir mon résultat" : "Question suivante →") + '</button>'
      : '<button class="primary-button full-button validate-button" data-action="validate-answer"' + (game.selected < 0 ? " disabled" : "") + '>Valider ma réponse ✓</button>') +
    '</section>';
}


const CONVERSATION_THEMES = {
  introduce: { title: "Je me présente", icon: "👋", turns: [
    { prompt: "How old are you?", french: "Quel âge as-tu ?" },
    { prompt: "What's your name?", french: "Comment tu t'appelles ?" },
    { prompt: "What do you like?", french: "Qu'est-ce que tu aimes ?" }
  ]},
  meeting: { title: "Faire connaissance", icon: "🐻", turns: [
    { prompt: "Hello! How are you today?", french: "Bonjour ! Comment vas-tu aujourd'hui ?" },
    { prompt: "What's your favourite animal?", french: "Quel est ton animal préféré ?" },
    { prompt: "What colour do you like?", french: "Quelle couleur aimes-tu ?" }
  ]}
};

function conversationReply(themeKey, index, transcript) {
  const text = transcript.toLowerCase().replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
  const ageWords = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10 };
  const ageMatch = text.match(/\b(\d{1,2})\b/);
  let age = ageMatch ? Number(ageMatch[1]) : null;
  if (!age) Object.keys(ageWords).some(function(word){ if (new RegExp("\\b"+word+"\\b").test(text)) { age=ageWords[word]; return true; } return false; });

  if (themeKey === "introduce") {
    if (index === 0) return age ? "I'm 6! You're " + age + "! What's your name?" : "I'm 6! And what's your name?";
    if (index === 1) {
      const nameMatch = transcript.match(/(?:my name is|i am|i'm|this is|it's)\s+([a-z][a-z'-]*)/i);
      let name = nameMatch ? nameMatch[1] : transcript.trim().split(/\s+/)[0];
      name = (name || "").replace(/[^a-z'-]/gi, "");
      if (/^(my|name|is|i|am|hello|hi|it's|this)$/i.test(name)) name = "";
      return name ? "Nice to meet you, " + name + "! What do you like?" : "Nice to meet you! What do you like?";
    }
    const likes = ["cats","dogs","pandas","dinosaurs","music","dancing","drawing","football","chocolate","ice cream","reading"];
    const like = likes.find(function(item){ return text.includes(item); });
    return like ? "I like " + like + " too! It was lovely talking to you!" : "That sounds fun! I like having fun too! Well done!";
  }

  if (index === 0) return "I'm great, thank you! What's your favourite animal?";
  if (index === 1) {
    const animals = ["cats","dogs","lions","rabbits","pandas","horses","bears","tigers","elephants","dolphins"];
    const animal = animals.find(function(item){ return text.includes(item) || text.includes(item.replace(/s$/, "")); });
    return animal ? "I love " + animal + " too! What colour do you like?" : "That's a lovely choice! What colour do you like?";
  }
  const colors = ["blue","red","green","pink","purple","yellow","orange","black","white"];
  const color = colors.find(function(item){ return new RegExp("\\b"+item+"\\b").test(text); });
  return color ? "I like " + color + " too! It was lovely talking to you!" : "That's a lovely colour! It was lovely talking to you!";
}

function renderConversationMenu() {
  return '<button class="back-button" data-view="play">← Retour aux jeux</button><section class="page-intro"><span class="eyebrow">JE PARLE EN ANGLAIS</span><h1>À toi de discuter ! 💬</h1><p>Le renard te parle en anglais et te répond comme un vrai petit compagnon. Vous allez faire 3 échanges.</p></section>' +
    Object.keys(CONVERSATION_THEMES).map(function(key){ const theme=CONVERSATION_THEMES[key]; return '<button class="game-mode-card conversation-mode" data-action="start-conversation" data-theme="'+key+'"><span class="mode-icon">'+theme.icon+'</span><span><strong>'+theme.title+'</strong><small>3 petites questions à l’oral</small></span><span class="mode-arrow">→</span></button>'; }).join('');
}

function renderConversation() {
  if (!conversation) return renderConversationMenu();
  if (conversation.complete) return '<section class="result-card"><div class="result-confetti">🦊 💎 🎉</div><span class="eyebrow">CONVERSATION TERMINÉE</span><h1>Well done !</h1><p>Tu as discuté en anglais avec le renard. Bravo d’avoir parlé !</p><div class="score-circle"><strong>3</strong><small>/ 3</small></div><p>Tu gagnes <strong>3 diamants 💎</strong> !</p><button class="primary-button full-button" data-action="conversation-menu">Choisir une autre conversation</button><button class="secondary-button full-button" data-view="play">Retour aux jeux</button></section>';
  const theme=CONVERSATION_THEMES[conversation.theme], turn=theme.turns[conversation.index];
  return '<button class="back-button" data-action="conversation-menu">← Choisir un thème</button><section class="game-panel conversation-panel"><div class="game-progress-row"><span>'+theme.icon+' '+theme.title+'</span><span>Échange '+(conversation.index+1)+' / 3</span></div><div class="progress-track"><span style="width:'+((conversation.index)/3*100)+'%"></span></div><div class="conversation-fox">🦊</div><div class="conversation-prompt"><span class="eyebrow">LE RENARD DIT EN ANGLAIS</span><h2>'+turn.prompt+'</h2><p>'+turn.french+'</p><button class="instruction-replay" data-action="repeat-conversation">🔊 Réécouter</button></div>' +
  (conversation.transcript ? '<div class="conversation-transcript"><strong>Toi :</strong> “'+escapeHtml(conversation.transcript)+'”</div>' : '') +
  (conversation.reply ? '<div class="conversation-reply"><strong>Le renard répond :</strong> “'+escapeHtml(conversation.reply)+'”</div>' : '') +
  (conversation.listening ? '<p class="listening-status">🎙️ Je t’écoute… Parle en anglais !</p>' : '') +
  (conversation.feedback ? '<div class="answer-feedback good">'+conversation.feedback+'</div>' : '') +
  (conversation.waiting ? '<button class="primary-button full-button" data-action="next-conversation">'+(conversation.index===2?'Terminer la conversation':'Continuer la discussion →')+'</button>' : '<button class="primary-button full-button mic-button" data-action="record-conversation" '+(conversation.listening?'disabled':'')+'>🎙️ '+(conversation.listening?'Je t’écoute…':'À toi de répondre !')+'</button>')+
  '<p class="conversation-help">Appuie sur le micro et réponds en anglais. Si besoin, demande à un parent de vérifier l’autorisation du micro.</p></section>';
}

function startConversation(themeKey) {
  conversation={theme:themeKey,index:0,transcript:"",reply:"",listening:false,waiting:false,matched:false,feedback:"",complete:false};
  activeView="conversation"; render(); speak(CONVERSATION_THEMES[themeKey].turns[0].prompt);
}

function listenToConversation() {
  if (!conversation || conversation.listening || conversation.waiting) return;
  const Recognition=window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { showToast("La reconnaissance vocale n'est pas disponible ici. Essaie avec Chrome sur la tablette."); return; }
  try {
    speechRecognition=new Recognition();
    speechRecognition.lang="en-GB";
    speechRecognition.interimResults=false;
    speechRecognition.maxAlternatives=1;
    conversation.listening=true; render();
    speechRecognition.onresult=function(event){
      const transcript=event.results[0][0].transcript;
      const reply=conversationReply(conversation.theme,conversation.index,transcript);
      conversation.transcript=transcript;
      conversation.reply=reply;
      conversation.listening=false;
      conversation.matched=!!transcript.trim();
      conversation.feedback="Great job! Le renard t'a répondu. 💛";
      conversation.waiting=true;
      render();
      speak(reply);
    };
    speechRecognition.onerror=function(){ conversation.listening=false; render(); showToast("Je n’ai pas entendu. Réessaie en parlant près de la tablette."); };
    speechRecognition.onend=function(){ if(conversation && conversation.listening){conversation.listening=false;render();} };
    speechRecognition.start();
  } catch(error) { conversation.listening=false; render(); showToast("Impossible d’activer le micro. Vérifie l’autorisation."); }
}

function nextConversationTurn() {
  if(!conversation || !conversation.waiting) return;
  if(conversation.index===2){
    conversation.complete=true; conversation.waiting=false; state.diamonds+=3; state.sessions+=1; saveState(); render(); speak("Well done! That was a lovely conversation!"); return;
  }
  conversation.index++; conversation.transcript=""; conversation.reply=""; conversation.feedback=""; conversation.waiting=false; conversation.matched=false; render();
  speak(CONVERSATION_THEMES[conversation.theme].turns[conversation.index].prompt);
}

function renderView() {
  if (activeView === "home") return renderHome();
  if (activeView === "learn") return renderLearn();
  if (activeView === "lesson") return renderLesson();
  if (activeView === "play") return renderPlay();
  if (activeView === "listen") return renderListen();
  if (activeView === "rewards") return renderRewards();
  if (activeView === "parents") return renderParents();
  if (activeView === "game") return renderGame();
  if (activeView === "conversation-menu") return renderConversationMenu();
  if (activeView === "conversation") return renderConversation();
  return renderHome();
}

function renderNav() {
  const items = [
    ["home", "⌂", "Accueil"],
    ["learn", "📖", "Apprendre"],
    ["play", "🧩", "Jouer"],
    ["listen", "🎧", "Écouter"],
    ["rewards", "💎", "Diamants"]
  ];
  return '<nav class="bottom-nav" aria-label="Navigation principale">' + items.map(function (item) {
    return '<button class="nav-item ' + (activeView === item[0] || (activeView === "lesson" && item[0] === "learn") || (activeView === "game" && item[0] === "play") ? "active" : "") + '" data-view="' + item[0] + '"><span>' + item[1] + '</span><small>' + item[2] + '</small></button>';
  }).join("") + '<button class="nav-item parent-nav ' + (activeView === "parents" ? "active" : "") + '" data-action="open-parents"><span>🔐</span><small>Parents</small></button></nav>';
}

function render() {
  app.innerHTML = '<header class="topbar"><button class="brand" data-view="home"><span class="brand-icon">🦊</span><span>English <b>Adventure</b></span></button><span class="top-diamonds">💎 ' + state.diamonds + '</span></header>' +
    '<main class="main-content">' + renderView() + '</main>' + renderNav();
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function startGame(mode) {
  const selected = shuffle(ALL_WORDS).slice(0, 10);
  game = {
    mode: mode,
    index: 0,
    correct: 0,
    answered: false,
    complete: false,
    selected: -1,
    questions: selected.map(function (item) {
      const others = shuffle(ALL_WORDS.filter(function (candidate) { return candidate.word !== item.word; })).slice(0, 3);
      return { item: item, options: shuffle([item].concat(others)) };
    })
  };
  activeView = "game";
  render();
  readGameInstruction();
}

function selectAnswer(index) {
  if (!game || game.answered || index < 0 || index >= game.questions[game.index].options.length) return;
  game.selected = index;
  const selectedOption = game.questions[game.index].options[index];
  render();
  speak(selectedOption.word);
}

function validateAnswer() {
  if (!game || game.answered || game.selected < 0) return;
  const question = game.questions[game.index];
  game.answered = true;
  game.lastCorrect = question.options[game.selected].word === question.item.word;
  if (game.lastCorrect) game.correct += 1;
  render();
}

function nextQuestion() {
  if (!game) return;
  if (game.index >= 9) {
    game.complete = true;
    state.diamonds += game.correct;
    state.sessions += 1;
    state.bestScore = Math.max(state.bestScore, game.correct);
    saveState();
    render();
    return;
  }
  game.index += 1;
  game.answered = false;
  game.selected = -1;
  render();
  readGameInstruction();
}

function completeLesson(key) {
  const firstCompletion = !state.completedLessons.includes(key);
  if (firstCompletion) {
    state.completedLessons.push(key);
    state.diamonds += 2;
  }
  LESSONS[key].words.forEach(function (item) {
    if (!state.wordsLearned.includes(item.word)) state.wordsLearned.push(item.word);
  });
  saveState();
  showToast(firstCompletion ? "Leçon terminée ! Tu gagnes 2 diamants 💎" : "Leçon déjà terminée. Bravo pour la révision !");
  render();
}

function openParents() {
  const entered = window.prompt("Code parent :");
  if (entered === null) return;
  if (entered === state.parentPin) {
    activeView = "parents";
    render();
  } else {
    showToast("Ce n'est pas le bon code.");
  }
}

function handleAction(action, target) {
  if (action === "speak") {
    const word = target.dataset.word;
    speak(word);
    if (!state.wordsLearned.includes(word)) {
      state.wordsLearned.push(word);
      saveState();
    }
  }
  if (action === "complete-lesson") completeLesson(target.dataset.topic);
  if (action === "start-game") startGame(target.dataset.mode);
  if (action === "conversation-menu") { if(speechRecognition) speechRecognition.abort(); conversation=null; activeView="conversation-menu"; render(); }
  if (action === "start-conversation") startConversation(target.dataset.theme);
  if (action === "record-conversation") listenToConversation();
  if (action === "repeat-conversation" && conversation) speak(CONVERSATION_THEMES[conversation.theme].turns[conversation.index].prompt);
  if (action === "next-conversation") nextConversationTurn();
  if (action === "answer") selectAnswer(Number(target.dataset.answer));
  if (action === "validate-answer") validateAnswer();
  if (action === "replay-instruction" && game) speakFrench(gameInstruction(game.questions[game.index]));
  if (action === "next-question") nextQuestion();
  if (action === "replay-word" && game) speak(game.questions[game.index].item.word);
  if (action === "open-parents") openParents();
  if (action === "toggle-sound") {
    state.soundEnabled = !state.soundEnabled;
    saveState();
    render();
  }
  if (action === "change-pin") {
    const nextPin = window.prompt("Choisis un nouveau code de 4 à 8 chiffres :");
    if (nextPin === null) return;
    if (!/^\d{4,8}$/.test(nextPin)) {
      showToast("Le code doit contenir 4 à 8 chiffres.");
      return;
    }
    state.parentPin = nextPin;
    saveState();
    showToast("Nouveau code enregistré.");
  }
  if (action === "reset") {
    if (window.confirm("Effacer tous les diamants et toute la progression sur cette tablette ?")) {
      state = Object.assign({}, DEFAULT_STATE, { parentPin: state.parentPin });
      saveState();
      activeView = "home";
      render();
      showToast("La progression a été réinitialisée.");
    }
  }
  if (action === "install" && deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function () {
      deferredInstallPrompt = null;
      render();
    });
  }
}

app.addEventListener("click", function (event) {
  const target = event.target.closest("[data-action], [data-view], [data-topic]");
  if (!target) return;
  if (target.dataset.action) {
    handleAction(target.dataset.action, target);
    return;
  }
  if (target.dataset.topic) {
    activeLesson = target.dataset.topic;
    activeView = "lesson";
    render();
    return;
  }
  if (target.dataset.view) {
    activeView = target.dataset.view;
    if (activeView !== "game") game = null;
    if (activeView !== "conversation") { if(speechRecognition) speechRecognition.abort(); conversation=null; }
    render();
  }
});

window.addEventListener("beforeinstallprompt", function (event) {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (activeView === "home") render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").catch(function () {
      showToast("Le mode hors connexion n'a pas pu être activé.");
    });
  });
}

render();
