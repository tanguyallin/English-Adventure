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
  stars: 0,
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
    return Object.assign({}, DEFAULT_STATE, saved, {
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

function speak(word) {
  if (!state.soundEnabled) {
    showToast("Le son est désactivé dans l'espace parents.");
    return;
  }
  if (!("speechSynthesis" in window)) {
    showToast("La lecture audio n'est pas disponible sur cet appareil.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-GB";
  utterance.rate = 0.78;
  utterance.pitch = 1.08;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
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
  return Math.min(100, Math.round((state.completedLessons.length / 2) * 100));
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
    '<div class="stat-card"><span class="stat-icon">⭐</span><strong>' + state.stars + '</strong><small>étoiles</small></div>' +
    '<div class="stat-card"><span class="stat-icon">📚</span><strong>' + state.completedLessons.length + '/2</strong><small>leçons terminées</small></div>' +
    '<div class="stat-card"><span class="stat-icon">🗣️</span><strong>' + state.wordsLearned.length + '</strong><small>mots découverts</small></div>' +
    '</section>' +
    '<section class="section-block"><div class="section-heading"><div><span class="eyebrow">ON CONTINUE ?</span><h2>Choisis ton activité</h2></div><span class="heading-emoji">🎈</span></div>' +
    '<div class="activity-grid">' +
    '<button class="activity-card peach" data-view="learn"><span>📖</span><strong>Apprendre</strong><small>Découvre les mots</small></button>' +
    '<button class="activity-card lavender" data-view="play"><span>🧩</span><strong>Jouer</strong><small>Teste tes connaissances</small></button>' +
    '<button class="activity-card mint" data-view="listen"><span>🎧</span><strong>Écouter</strong><small>Reconnais les sons</small></button>' +
    '<button class="activity-card butter" data-view="rewards"><span>🏆</span><strong>Mes étoiles</strong><small>Regarde tes progrès</small></button>' +
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
    '<div class="coming-soon"><span>🍎</span><div><strong>Bientôt : les fruits et les nombres !</strong><small>De nouvelles aventures arrivent.</small></div><span class="lock">🔒</span></div>';
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
    '<button class="primary-button full-button" data-action="complete-lesson" data-topic="' + activeLesson + '">' + (done ? "Leçon déjà terminée ✓" : "J'ai terminé cette leçon ! ⭐") + '</button>';
}

function renderPlay() {
  return '<section class="page-intro"><span class="eyebrow">À TOI DE JOUER</span><h1>Les petits jeux 🧩</h1><p>10 questions pour gagner des étoiles. Tu peux recommencer autant de fois que tu veux !</p></section>' +
    '<button class="game-mode-card quiz-mode" data-action="start-game" data-mode="quiz"><span class="mode-icon">🧠</span><span><strong>Le quiz des mots</strong><small>Lis le mot français et trouve son nom anglais.</small></span><span class="mode-arrow">→</span></button>' +
    '<button class="game-mode-card listen-mode" data-action="start-game" data-mode="listen"><span class="mode-icon">🎧</span><span><strong>L\'oreille magique</strong><small>Écoute le mot anglais et choisis la bonne image.</small></span><span class="mode-arrow">→</span></button>' +
    '<div class="tip-card">⭐ <span>Une bonne réponse = une étoile à la fin du jeu. Il y a 10 questions !</span></div>' +
    '<div class="best-score">🏅 Ton meilleur score : <strong>' + state.bestScore + '/10</strong></div>';
}

function renderListen() {
  return '<section class="page-intro"><span class="eyebrow">J'ÉCOUTE ET JE RÉPÈTE</span><h1>Les mots à l\'oreille 🎧</h1><p>Touche une carte pour écouter le mot en anglais. À toi de le répéter !</p></section>' +
    '<div class="listen-group"><h2>🌈 Les couleurs</h2><div class="listen-grid">' + LESSONS.colors.words.map(wordCard).join("") + '</div></div>' +
    '<div class="listen-group"><h2>🐾 Les animaux</h2><div class="listen-grid">' + LESSONS.animals.words.map(wordCard).join("") + '</div></div>';
}

function wordCard(item) {
  return '<button class="listen-card" data-action="speak" data-word="' + item.word + '"><span>' + item.emoji + '</span><strong>' + item.word + '</strong><small>' + item.fr + '</small><em>🔊</em></button>';
}

function renderRewards() {
  const milestones = [
    { count: 1, icon: "🌟", title: "Première étoile", note: "Tu as commencé ton aventure !" },
    { count: 5, icon: "🦋", title: "Petite exploratrice", note: "5 étoiles gagnées" },
    { count: 10, icon: "🦄", title: "Super championne", note: "10 étoiles gagnées" },
    { count: 20, icon: "👑", title: "Reine de l'anglais", note: "20 étoiles gagnées" }
  ];
  return '<section class="page-intro"><span class="eyebrow">BRAVO À TOI !</span><h1>Mes récompenses 🏆</h1><p>Chaque bonne réponse te rapproche d'une nouvelle récompense.</p></section>' +
    '<div class="star-total"><span>⭐</span><strong>' + state.stars + '</strong><small>étoiles gagnées</small></div>' +
    '<div class="reward-list">' + milestones.map(function (item) {
      const unlocked = state.stars >= item.count;
      return '<div class="reward-card ' + (unlocked ? "unlocked" : "locked") + '"><span>' + item.icon + '</span><div><strong>' + item.title + '</strong><small>' + item.note + '</small></div><b>' + (unlocked ? "✓" : "🔒") + '</b></div>';
    }).join("") + '</div>' +
    '<div class="tip-card">💛 <span>Tu progresses à ton rythme. Le plus important, c'est d'essayer et de s'amuser !</span></div>';
}

function renderParents() {
  return '<section class="page-intro"><span class="eyebrow">ESPACE FAMILLE</span><h1>Espace parents 🔐</h1><p>Un petit aperçu des progrès et quelques réglages.</p></section>' +
    '<div class="parent-stats"><div><strong>' + state.sessions + '</strong><small>jeux terminés</small></div><div><strong>' + state.wordsLearned.length + '</strong><small>mots écoutés / appris</small></div><div><strong>' + state.bestScore + '/10</strong><small>meilleur score</small></div></div>' +
    '<div class="parent-card"><h2>🔊 Son et prononciation</h2><p>Les mots sont prononcés avec une voix anglaise lorsque l'appareil le permet.</p><button class="setting-button" data-action="toggle-sound">' + (state.soundEnabled ? "🔊 Son activé" : "🔇 Son désactivé") + '</button></div>' +
    '<div class="parent-card"><h2>🔑 Code parent</h2><p>Change le code utilisé pour ouvrir cet espace.</p><button class="setting-button" data-action="change-pin">Modifier le code</button></div>' +
    '<div class="parent-card danger-zone"><h2>♻️ Recommencer</h2><p>Efface les étoiles et la progression enregistrées sur cette tablette.</p><button class="setting-button danger-button" data-action="reset">Réinitialiser la progression</button></div>' +
    '<p class="parent-disclaimer">Le code parent évite les ouvertures accidentelles, mais il ne remplace pas un véritable verrouillage de sécurité.</p>';
}

function renderGame() {
  if (!game) return renderPlay();
  if (game.complete) {
    const message = game.correct === 10 ? "Incroyable ! Un sans-faute ! 🎉" : game.correct >= 7 ? "Super travail ! Tu progresses très bien ! 🌟" : "Bravo d'avoir essayé ! On recommence quand tu veux. 💛";
    return '<section class="result-card"><div class="result-confetti">🎉 ⭐ 🎈</div><span class="eyebrow">JEU TERMINÉ</span><h1>' + message + '</h1><div class="score-circle"><strong>' + game.correct + '</strong><small>/ 10</small></div><p>Tu gagnes <strong>' + game.correct + ' étoiles</strong> !</p><button class="primary-button full-button" data-action="start-game" data-mode="' + game.mode + '">Rejouer 🔁</button><button class="secondary-button full-button" data-view="play">Retour aux jeux</button></section>';
  }
  const question = game.questions[game.index];
  const progress = Math.round((game.index / game.questions.length) * 100);
  const prompt = game.mode === "quiz" ? 'Comment dit-on « ' + question.item.fr + ' » en anglais ?' : 'Écoute le mot, puis choisis la bonne image.';
  return '<button class="back-button" data-view="play">← Quitter le jeu</button>' +
    '<section class="game-panel"><div class="game-progress-row"><span>Question ' + (game.index + 1) + ' sur 10</span><span>⭐ ' + game.correct + '</span></div>' +
    '<div class="progress-track"><span style="width:' + progress + '%"></span></div>' +
    '<h1>' + prompt + '</h1>' +
    (game.mode === "listen" ? '<button class="listen-prompt" data-action="replay-word">🔊 Écouter encore</button>' : '<div class="question-emoji">' + question.item.emoji + '</div>') +
    '<div class="answer-grid">' + question.options.map(function (option, index) {
      let cls = "answer-option";
      if (game.answered && option.word === question.item.word) cls += " answer-correct";
      else if (game.answered && game.selected === index) cls += " answer-wrong";
      return '<button class="' + cls + '" data-action="answer" data-answer="' + index + '"' + (game.answered ? " disabled" : "") + '>' +
        (game.mode === "quiz" ? '<strong>' + option.word + '</strong>' : '<span class="answer-emoji">' + option.emoji + '</span><strong>' + option.fr + '</strong>') + '</button>';
    }).join("") + '</div>' +
    (game.answered ? '<div class="answer-feedback ' + (game.lastCorrect ? "good" : "try-again") + '">' + (game.lastCorrect ? "Bravo, bonne réponse ! ⭐" : "Bien essayé ! La bonne réponse était " + question.item.word + ".") + '</div><button class="primary-button full-button" data-action="next-question">' + (game.index === 9 ? "Voir mon résultat" : "Question suivante →") + '</button>' : '') +
    '</section>';
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
  return renderHome();
}

function renderNav() {
  const items = [
    ["home", "⌂", "Accueil"],
    ["learn", "📖", "Apprendre"],
    ["play", "🧩", "Jouer"],
    ["listen", "🎧", "Écouter"],
    ["rewards", "⭐", "Étoiles"]
  ];
  return '<nav class="bottom-nav" aria-label="Navigation principale">' + items.map(function (item) {
    return '<button class="nav-item ' + (activeView === item[0] || (activeView === "lesson" && item[0] === "learn") || (activeView === "game" && item[0] === "play") ? "active" : "") + '" data-view="' + item[0] + '"><span>' + item[1] + '</span><small>' + item[2] + '</small></button>';
  }).join("") + '<button class="nav-item parent-nav ' + (activeView === "parents" ? "active" : "") + '" data-action="open-parents"><span>🔐</span><small>Parents</small></button></nav>';
}

function render() {
  app.innerHTML = '<header class="topbar"><button class="brand" data-view="home"><span class="brand-icon">🦊</span><span>English <b>Adventure</b></span></button><span class="top-stars">⭐ ' + state.stars + '</span></header>' +
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
  if (mode === "listen") speak(game.questions[0].item.word);
}

function answerQuestion(index) {
  if (!game || game.answered) return;
  const question = game.questions[game.index];
  game.selected = index;
  game.answered = true;
  game.lastCorrect = question.options[index].word === question.item.word;
  if (game.lastCorrect) game.correct += 1;
  render();
}

function nextQuestion() {
  if (!game) return;
  if (game.index >= 9) {
    game.complete = true;
    state.stars += game.correct;
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
  if (game.mode === "listen") speak(game.questions[game.index].item.word);
}

function completeLesson(key) {
  if (!state.completedLessons.includes(key)) {
    state.completedLessons.push(key);
    state.stars += 2;
  }
  LESSONS[key].words.forEach(function (item) {
    if (!state.wordsLearned.includes(item.word)) state.wordsLearned.push(item.word);
  });
  saveState();
  showToast("Leçon terminée ! Tu gagnes 2 étoiles ⭐");
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
  if (action === "answer") answerQuestion(Number(target.dataset.answer));
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
    if (window.confirm("Effacer toutes les étoiles et toute la progression sur cette tablette ?")) {
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
