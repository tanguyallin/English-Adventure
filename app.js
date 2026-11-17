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
  },
  numbers: { title: "Les nombres", subtitle: "Compte de 1 à 10 en anglais !", icon: "🔢", words: [
    {word:"One",fr:"un",emoji:"1️⃣"},{word:"Two",fr:"deux",emoji:"2️⃣"},{word:"Three",fr:"trois",emoji:"3️⃣"},{word:"Four",fr:"quatre",emoji:"4️⃣"},{word:"Five",fr:"cinq",emoji:"5️⃣"},{word:"Six",fr:"six",emoji:"6️⃣"}
  ]},
  fruits: { title: "Les fruits", subtitle: "Découvre de délicieux fruits !", icon: "🍎", words: [
    {word:"Apple",fr:"pomme",emoji:"🍎"},{word:"Banana",fr:"banane",emoji:"🍌"},{word:"Strawberry",fr:"fraise",emoji:"🍓"},{word:"Orange",fr:"orange",emoji:"🍊"},{word:"Pear",fr:"poire",emoji:"🍐"},{word:"Grapes",fr:"raisins",emoji:"🍇"}
  ]},
  family: { title: "La famille", subtitle: "Présente les personnes de ta famille !", icon: "👨‍👩‍👧", words: [
    {word:"Mother",fr:"maman",emoji:"👩"},{word:"Father",fr:"papa",emoji:"👨"},{word:"Sister",fr:"sœur",emoji:"👧"},{word:"Brother",fr:"frère",emoji:"👦"},{word:"Baby",fr:"bébé",emoji:"👶"},{word:"Grandmother",fr:"grand-mère",emoji:"👵"}
  ]},
  body: { title: "Le corps", subtitle: "Apprends les parties du corps !", icon: "🧍", words: [
    {word:"Head",fr:"tête",emoji:"🙂"},{word:"Eyes",fr:"yeux",emoji:"👀"},{word:"Nose",fr:"nez",emoji:"👃"},{word:"Mouth",fr:"bouche",emoji:"👄"},{word:"Hands",fr:"mains",emoji:"🙌"},{word:"Feet",fr:"pieds",emoji:"🦶"}
  ]},
  food: { title: "La nourriture", subtitle: "Miam ! Voici des aliments en anglais.", icon: "🥪", words: [
    {word:"Bread",fr:"pain",emoji:"🍞"},{word:"Cheese",fr:"fromage",emoji:"🧀"},{word:"Milk",fr:"lait",emoji:"🥛"},{word:"Egg",fr:"œuf",emoji:"🥚"},{word:"Cake",fr:"gâteau",emoji:"🍰"},{word:"Water",fr:"eau",emoji:"💧"}
  ]},
  school: { title: "L'école", subtitle: "Les objets de ta classe en anglais !", icon: "🎒", words: [
    {word:"Book",fr:"livre",emoji:"📘"},{word:"Pencil",fr:"crayon",emoji:"✏️"},{word:"Schoolbag",fr:"cartable",emoji:"🎒"},{word:"Ruler",fr:"règle",emoji:"📏"},{word:"Pen",fr:"stylo",emoji:"🖊️"},{word:"Desk",fr:"bureau",emoji:"🪑"}
  ]},
  weather: { title: "La météo", subtitle: "Quel temps fait-il aujourd'hui ?", icon: "🌤️", words: [
    {word:"Sun",fr:"soleil",emoji:"☀️"},{word:"Rain",fr:"pluie",emoji:"🌧️"},{word:"Cloud",fr:"nuage",emoji:"☁️"},{word:"Wind",fr:"vent",emoji:"💨"},{word:"Snow",fr:"neige",emoji:"❄️"},{word:"Rainbow",fr:"arc-en-ciel",emoji:"🌈"}
  ]},
  clothes: { title: "Les vêtements", subtitle: "Habille-toi et apprends les mots !", icon: "👕", words: [
    {word:"T-shirt",fr:"tee-shirt",emoji:"👕"},{word:"Shoes",fr:"chaussures",emoji:"👟"},{word:"Hat",fr:"chapeau",emoji:"🧢"},{word:"Dress",fr:"robe",emoji:"👗"},{word:"Coat",fr:"manteau",emoji:"🧥"},{word:"Socks",fr:"chaussettes",emoji:"🧦"}
  ]},
  toys:{title:"Les jouets",subtitle:"Découvre les jouets en anglais !",icon:"🧸",words:[{"word":"Teddy bear","fr":"ours en peluche","emoji":"🧸"},{"word":"Doll","fr":"poupée","emoji":"🪆"},{"word":"Ball","fr":"ballon","emoji":"⚽"},{"word":"Kite","fr":"cerf-volant","emoji":"🪁"},{"word":"Puzzle","fr":"puzzle","emoji":"🧩"},{"word":"Train","fr":"train","emoji":"🚂"}]},
  transport:{title:"Les transports",subtitle:"Découvre les transports en anglais !",icon:"🚗",words:[{"word":"Car","fr":"voiture","emoji":"🚗"},{"word":"Bus","fr":"bus","emoji":"🚌"},{"word":"Bicycle","fr":"vélo","emoji":"🚲"},{"word":"Boat","fr":"bateau","emoji":"⛵"},{"word":"Airplane","fr":"avion","emoji":"✈️"},{"word":"Taxi","fr":"taxi","emoji":"🚕"}]},
  rooms:{title:"Les pièces de la maison",subtitle:"Découvre les pièces de la maison en anglais !",icon:"🏡",words:[{"word":"Bedroom","fr":"chambre","emoji":"🛏️"},{"word":"Bathroom","fr":"salle de bain","emoji":"🛁"},{"word":"Kitchen","fr":"cuisine","emoji":"🍳"},{"word":"Living room","fr":"salon","emoji":"🛋️"},{"word":"Garden","fr":"jardin","emoji":"🌳"},{"word":"Hall","fr":"entrée","emoji":"🚪"}]},
  furniture:{title:"Les meubles",subtitle:"Découvre les meubles en anglais !",icon:"🪑",words:[{"word":"Chair","fr":"chaise","emoji":"🪑"},{"word":"Table","fr":"table","emoji":"🪵"},{"word":"Bed","fr":"lit","emoji":"🛏️"},{"word":"Sofa","fr":"canapé","emoji":"🛋️"},{"word":"Lamp","fr":"lampe","emoji":"💡"},{"word":"Door","fr":"porte","emoji":"🚪"}]},
  nature:{title:"La nature",subtitle:"Découvre la nature en anglais !",icon:"🌳",words:[{"word":"Tree","fr":"arbre","emoji":"🌳"},{"word":"Flower","fr":"fleur","emoji":"🌸"},{"word":"River","fr":"rivière","emoji":"🏞️"},{"word":"Mountain","fr":"montagne","emoji":"⛰️"},{"word":"Grass","fr":"herbe","emoji":"🌱"},{"word":"Leaf","fr":"feuille","emoji":"🍃"}]},
  ocean:{title:"Les animaux de la mer",subtitle:"Découvre les animaux de la mer en anglais !",icon:"🐬",words:[{"word":"Dolphin","fr":"dauphin","emoji":"🐬"},{"word":"Shark","fr":"requin","emoji":"🦈"},{"word":"Whale","fr":"baleine","emoji":"🐳"},{"word":"Octopus","fr":"pieuvre","emoji":"🐙"},{"word":"Turtle","fr":"tortue","emoji":"🐢"},{"word":"Crab","fr":"crabe","emoji":"🦀"}]},
  farm:{title:"À la ferme",subtitle:"Découvre à la ferme en anglais !",icon:"🚜",words:[{"word":"Cow","fr":"vache","emoji":"🐮"},{"word":"Pig","fr":"cochon","emoji":"🐷"},{"word":"Sheep","fr":"mouton","emoji":"🐑"},{"word":"Horse","fr":"cheval","emoji":"🐴"},{"word":"Duck","fr":"canard","emoji":"🦆"},{"word":"Chicken","fr":"poule","emoji":"🐔"}]},
  insects:{title:"Les petites bêtes",subtitle:"Découvre les petites bêtes en anglais !",icon:"🦋",words:[{"word":"Butterfly","fr":"papillon","emoji":"🦋"},{"word":"Bee","fr":"abeille","emoji":"🐝"},{"word":"Ladybird","fr":"coccinelle","emoji":"🐞"},{"word":"Ant","fr":"fourmi","emoji":"🐜"},{"word":"Spider","fr":"araignée","emoji":"🕷️"},{"word":"Caterpillar","fr":"chenille","emoji":"🐛"}]},
  jobs:{title:"Les métiers",subtitle:"Découvre les métiers en anglais !",icon:"👩‍🚒",words:[{"word":"Teacher","fr":"professeur","emoji":"👩‍🏫"},{"word":"Doctor","fr":"médecin","emoji":"🧑‍⚕️"},{"word":"Firefighter","fr":"pompier","emoji":"👩‍🚒"},{"word":"Cook","fr":"cuisinier","emoji":"👨‍🍳"},{"word":"Farmer","fr":"agriculteur","emoji":"🧑‍🌾"},{"word":"Pilot","fr":"pilote","emoji":"👩‍✈️"}]},
  sports:{title:"Les sports",subtitle:"Découvre les sports en anglais !",icon:"🏅",words:[{"word":"Football","fr":"football","emoji":"⚽"},{"word":"Tennis","fr":"tennis","emoji":"🎾"},{"word":"Swimming","fr":"natation","emoji":"🏊"},{"word":"Running","fr":"course","emoji":"🏃"},{"word":"Cycling","fr":"vélo","emoji":"🚴"},{"word":"Dancing","fr":"danse","emoji":"💃"}]},
  actions:{title:"Les actions",subtitle:"Découvre les actions en anglais !",icon:"🤸",words:[{"word":"Run","fr":"courir","emoji":"🏃"},{"word":"Jump","fr":"sauter","emoji":"🤾"},{"word":"Eat","fr":"manger","emoji":"🍽️"},{"word":"Drink","fr":"boire","emoji":"🥤"},{"word":"Sleep","fr":"dormir","emoji":"😴"},{"word":"Read","fr":"lire","emoji":"📖"}]},
  feelings:{title:"Les émotions",subtitle:"Découvre les émotions en anglais !",icon:"😊",words:[{"word":"Happy","fr":"heureux","emoji":"😄"},{"word":"Sad","fr":"triste","emoji":"😢"},{"word":"Angry","fr":"en colère","emoji":"😠"},{"word":"Tired","fr":"fatigué","emoji":"🥱"},{"word":"Scared","fr":"effrayé","emoji":"😨"},{"word":"Excited","fr":"tout excité","emoji":"🤩"}]},
  weekdays:{title:"Les jours de la semaine",subtitle:"Découvre les jours de la semaine en anglais !",icon:"📅",words:[{"word":"Monday","fr":"lundi","emoji":"1️⃣"},{"word":"Tuesday","fr":"mardi","emoji":"2️⃣"},{"word":"Wednesday","fr":"mercredi","emoji":"3️⃣"},{"word":"Thursday","fr":"jeudi","emoji":"4️⃣"},{"word":"Friday","fr":"vendredi","emoji":"5️⃣"},{"word":"Saturday","fr":"samedi","emoji":"6️⃣"}]},
  months:{title:"Les mois",subtitle:"Découvre les mois en anglais !",icon:"🗓️",words:[{"word":"January","fr":"janvier","emoji":"❄️"},{"word":"February","fr":"février","emoji":"💗"},{"word":"March","fr":"mars","emoji":"🌱"},{"word":"April","fr":"avril","emoji":"🌦️"},{"word":"May","fr":"mai","emoji":"🌼"},{"word":"June","fr":"juin","emoji":"☀️"}]},
  seasons:{title:"Les saisons",subtitle:"Découvre les saisons en anglais !",icon:"🍂",words:[{"word":"Spring","fr":"printemps","emoji":"🌷"},{"word":"Summer","fr":"été","emoji":"🏖️"},{"word":"Autumn","fr":"automne","emoji":"🍁"},{"word":"Winter","fr":"hiver","emoji":"⛄"},{"word":"Hot","fr":"chaud","emoji":"🥵"},{"word":"Cold","fr":"froid","emoji":"🥶"}]},
  shapes:{title:"Les formes",subtitle:"Découvre les formes en anglais !",icon:"🔺",words:[{"word":"Circle","fr":"cercle","emoji":"⚪"},{"word":"Square","fr":"carré","emoji":"🟦"},{"word":"Triangle","fr":"triangle","emoji":"🔺"},{"word":"Star","fr":"étoile","emoji":"⭐"},{"word":"Heart","fr":"cœur","emoji":"❤️"},{"word":"Rectangle","fr":"rectangle","emoji":"▭"}]},
  places:{title:"Les lieux en ville",subtitle:"Découvre les lieux en ville en anglais !",icon:"🏙️",words:[{"word":"Park","fr":"parc","emoji":"🌳"},{"word":"School","fr":"école","emoji":"🏫"},{"word":"Shop","fr":"magasin","emoji":"🏪"},{"word":"Hospital","fr":"hôpital","emoji":"🏥"},{"word":"Station","fr":"gare","emoji":"🚉"},{"word":"Playground","fr":"aire de jeux","emoji":"🛝"}]},
  kitchen:{title:"Dans la cuisine",subtitle:"Découvre dans la cuisine en anglais !",icon:"🍴",words:[{"word":"Plate","fr":"assiette","emoji":"🍽️"},{"word":"Cup","fr":"tasse","emoji":"☕"},{"word":"Spoon","fr":"cuillère","emoji":"🥄"},{"word":"Fork","fr":"fourchette","emoji":"🍴"},{"word":"Knife","fr":"couteau","emoji":"🔪"},{"word":"Pan","fr":"poêle","emoji":"🍳"}]},
  breakfast:{title:"Le petit-déjeuner",subtitle:"Découvre le petit-déjeuner en anglais !",icon:"🥣",words:[{"word":"Cereal","fr":"céréales","emoji":"🥣"},{"word":"Toast","fr":"pain grillé","emoji":"🍞"},{"word":"Butter","fr":"beurre","emoji":"🧈"},{"word":"Jam","fr":"confiture","emoji":"🍓"},{"word":"Juice","fr":"jus","emoji":"🧃"},{"word":"Yogurt","fr":"yaourt","emoji":"🥛"}]},
  opposites:{title:"Les contraires",subtitle:"Découvre les contraires en anglais !",icon:"↔️",words:[{"word":"Big","fr":"grand","emoji":"🐘"},{"word":"Small","fr":"petit","emoji":"🐭"},{"word":"Fast","fr":"rapide","emoji":"🐆"},{"word":"Slow","fr":"lent","emoji":"🐢"},{"word":"Up","fr":"en haut","emoji":"⬆️"},{"word":"Down","fr":"en bas","emoji":"⬇️"}]}
};

const ALL_WORDS = Object.keys(LESSONS).flatMap(function (key) {
  return LESSONS[key].words;
});

const DEFAULT_STATE = {
  diamonds: 0,
  completedLessons: [],
  wordsLearned: [],
  reviewWords: [],
  bestScore: 0,
  sessions: 0,
  parentPin: "1612",
  soundEnabled: true
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const migrated = Object.assign({}, saved);
    if (migrated.parentPin === "2468") migrated.parentPin = "1612";
    if (typeof migrated.diamonds !== "number") migrated.diamonds = Number(migrated.stars) || 0;
    delete migrated.stars;
    return Object.assign({}, DEFAULT_STATE, migrated, {
      completedLessons: Array.isArray(saved.completedLessons) ? saved.completedLessons : [],
      wordsLearned: Array.isArray(saved.wordsLearned) ? saved.wordsLearned : [],
      reviewWords: Array.isArray(saved.reviewWords) ? saved.reviewWords : []
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

let availableSpeechVoices = [];
let preferredEnglishVoice = null;
let preferredFrenchVoice = null;

function refreshSpeechVoices() {
  if (!("speechSynthesis" in window)) return;
  availableSpeechVoices = window.speechSynthesis.getVoices() || [];
  function chooseVoice(language) {
    const prefix = language.toLowerCase().split("-")[0];
    const matches = availableSpeechVoices.filter(function (voice) {
      return voice.lang && voice.lang.toLowerCase().startsWith(prefix);
    });
    return matches.find(function (voice) {
      return /google/i.test(voice.name) && voice.lang.toLowerCase() === language.toLowerCase();
    }) || matches.find(function (voice) {
      return voice.lang.toLowerCase() === language.toLowerCase() && voice.localService;
    }) || matches.find(function (voice) {
      return /google/i.test(voice.name);
    }) || matches.find(function (voice) {
      return voice.lang.toLowerCase() === language.toLowerCase();
    }) || matches[0] || null;
  }
  preferredEnglishVoice = chooseVoice("en-GB") || chooseVoice("en-US");
  preferredFrenchVoice = chooseVoice("fr-FR") || chooseVoice("fr-CA");
}

function makeSpeechUtterance(text, language, rate) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Prefer an already-installed voice to avoid slow online voice loading.
  const voice = language.toLowerCase().startsWith("en")
    ? preferredEnglishVoice
    : preferredFrenchVoice;
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  return utterance;
}

if ("speechSynthesis" in window) {
  refreshSpeechVoices();
  window.speechSynthesis.addEventListener("voiceschanged", refreshSpeechVoices);
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
  // Voices are selected once at startup / voiceschanged; do not query Android on every tap.
  // Avoid cancel() when the speech queue is already idle: Android can add startup latency.
  if (cancelCurrent && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
    window.speechSynthesis.cancel();
  }
  const utterance = makeSpeechUtterance(text, language, rate);
  window.speechSynthesis.speak(utterance);
}


let speechEngineWarmed = false;
function warmSpeechEngine() {
  if (speechEngineWarmed || !("speechSynthesis" in window)) return;
  speechEngineWarmed = true;
  try {
    const warmup = new SpeechSynthesisUtterance(" ");
    warmup.lang = preferredEnglishVoice ? preferredEnglishVoice.lang : "en-GB";
    warmup.volume = 0;
    warmup.rate = 10;
    window.speechSynthesis.speak(warmup);
  } catch (error) {
    // The first real utterance will initialize speech synthesis if warm-up is unsupported.
  }
}

document.addEventListener("pointerdown", warmSpeechEngine, { once: true, passive: true });

function speak(word) {
  speakWithLanguage(word, "en-GB", 0.9, true);
}

function speakFrench(text) {
  speakWithLanguage(text, "fr-FR", 0.9, true);
}

function speakEnglishAfterCurrent(word) {
  speakWithLanguage(word, "en-GB", 0.9, false);
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

function completedLessonCount() {
  const lessonKeys = Object.keys(LESSONS);
  return new Set(state.completedLessons.filter(function (key) {
    return lessonKeys.includes(key);
  })).size;
}

function progressPercent() {
  return Math.round((completedLessonCount() / Object.keys(LESSONS).length) * 100);
}

function renderHome() {
  return '<section class="welcome-card">' +
    '<div class="welcome-copy"><span class="eyebrow">TA PETITE AVENTURE ANGLAISE</span>' +
    '<h1>Hello ! <span class="wave">👋</span></h1>' +
    '<p>Prête à apprendre de nouveaux mots avec moi ?</p>' +
    '<div class="session-note">⏱️ Une petite aventure de 10 à 15 minutes</div></div>' +
    '<div class="fox-mascot" aria-label="Petit renard">🦊<span>✨</span></div>' +
    '<div class="activity-grid">' +
    '<button class="activity-card peach" data-view="learn"><span>📖</span><strong>Apprendre</strong><small>Découvre les mots</small></button>' +
    '<button class="activity-card lavender" data-view="play"><span>🧩</span><strong>Jouer</strong><small>Teste tes connaissances</small></button>' +
    '<button class="activity-card mint" data-action="conversation-menu"><span>💬</span><strong>Conversation</strong><small>Parle avec le renard</small></button>' +
    '<button class="activity-card butter" data-view="rewards"><span>🏆</span><strong>Mes diamants</strong><small>Regarde tes progrès</small></button>' +
    '</div>' +
    '</section>' +
    '<section class="quick-stats">' +
    '<div class="stat-card"><span class="stat-icon">💎</span><strong>' + state.diamonds + '</strong><small>diamants</small></div>' +
    '<div class="stat-card"><span class="stat-icon">📚</span><strong>' + completedLessonCount() + '/' + Object.keys(LESSONS).length + '</strong><small>leçons terminées</small></div>' +
    '<div class="stat-card"><span class="stat-icon">🗣️</span><strong>' + state.wordsLearned.length + '</strong><small>mots découverts</small></div>' +
    '</section>' +
    '<section class="progress-panel"><div class="progress-title"><strong>Mes leçons</strong><span>' + progressPercent() + '%</span></div>' +
    '<div class="progress-track"><span style="width:' + progressPercent() + '%"></span></div>' +
    '<p>' + completedLessonCount() + ' leçons terminées sur ' + Object.keys(LESSONS).length + '. Continue comme ça ! 💛</p></section>' +
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
  const games = [
    ["colors","🌈","Le défi des couleurs","quiz"],["animals","🐾","Le safari des animaux","listen"],
    ["numbers","🔢","Les chiffres malins","quiz"],["fruits","🍓","Le panier de fruits","listen"],
    ["family","👨‍👩‍👧","La famille en anglais","quiz"],["body","🧍","Le corps en action","listen"],
    ["food","🥪","Le menu gourmand","quiz"],["school","🎒","Le cartable magique","listen"],
    ["weather","🌦️","La météo rigolote","quiz"],["clothes","👕","Le dressing anglais","listen"],
    ["toys","🧸","Le coffre à jouets","quiz"],
    ["transport","🚗","Le voyage des mots","listen"],
    ["rooms","🏡","La maison mystère","reverse"],
    ["furniture","🪑","Qui suis-je ? Les meubles","listen"],
    ["nature","🌳","L’exploratrice de la nature","quiz"],
    ["ocean","🐬","Plongée sous-marine","listen"],
    ["farm","🚜","La ferme en folie","reverse"],
    ["insects","🦋","Les petites bêtes","listen"],
    ["jobs","👩‍🚒","Qui fait ce métier ?","reverse"],
    ["sports","🏅","Le défi des sportifs","listen"],
    ["actions","🤸","Mime et devine","quiz"],
    ["feelings","😊","Le miroir des émotions","listen"],
    ["weekdays","📅","Le calendrier magique","reverse"],
    ["months","🗓️","Les mois de l’année","listen"],
    ["seasons","🍂","Les quatre saisons","quiz"],
    ["shapes","🔺","La chasse aux formes","listen"],
    ["places","🏙️","La balade en ville","reverse"],
    ["kitchen","🍴","À la bonne place","listen"],
    ["breakfast","🥣","Le petit-déjeuner parfait","reverse"],
    ["opposites","↔️","Le jeu des contraires","listen"]
  ];
  return '<section class="page-intro"><span class="eyebrow">À TOI DE JOUER</span><h1>30 petits jeux 🧩</h1><p>Choisis ton défi : chaque jeu te fait réviser un thème différent !</p></section>' +
    games.map(function(item){return '<button class="game-mode-card '+(item[3]==="listen"?"listen-mode":"quiz-mode")+'" data-action="start-game" data-mode="'+item[3]+'" data-topic="'+item[0]+'"><span class="mode-icon">'+item[1]+'</span><span><strong>'+item[2]+'</strong><small>'+(item[3]==="listen"?"Écoute le mot et trouve la bonne réponse.":"Trouve le mot anglais correspondant.")+'</small></span><span class="mode-arrow">→</span></button>';}).join("") +
    '<button class="game-mode-card conversation-mode" data-action="conversation-menu"><span class="mode-icon">💬</span><span><strong>Les conversations</strong><small>Parle avec le renard dans 30 situations différentes.</small></span><span class="mode-arrow">→</span></button>' +
    '<div class="tip-card">💎 <span>Chaque bonne réponse te rapporte un diamant. Amuse-toi bien !</span></div>' +
    '<div class="best-score">🏅 Ton meilleur score : <strong>' + state.bestScore + '/6</strong></div>';
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
    {"count":1,"icon":"💎","title":"Premier diamant","note":"Tu as commencé ton aventure !"},
    {"count":5,"icon":"🦋","title":"Petite exploratrice","note":"5 diamants gagnés"},
    {"count":10,"icon":"🦄","title":"Super championne","note":"10 diamants gagnés"},
    {"count":20,"icon":"👑","title":"Reine de l'anglais","note":"20 diamants gagnés"},
    {"count":15,"icon":"🦊","title":"Amie du renard","note":"15 diamants gagnés"},
    {"count":25,"icon":"🌟","title":"Petite étoile","note":"25 diamants gagnés"},
    {"count":35,"icon":"🐝","title":"Abeille travailleuse","note":"35 diamants gagnés"},
    {"count":45,"icon":"🐬","title":"Championne des océans","note":"45 diamants gagnés"},
    {"count":55,"icon":"🦋","title":"Papillon des mots","note":"55 diamants gagnés"},
    {"count":65,"icon":"🦄","title":"Licorne magique","note":"65 diamants gagnés"},
    {"count":75,"icon":"🌈","title":"Arc-en-ciel anglais","note":"75 diamants gagnés"},
    {"count":85,"icon":"🐼","title":"Panda curieux","note":"85 diamants gagnés"},
    {"count":95,"icon":"🧁","title":"Gourmande de mots","note":"95 diamants gagnés"},
    {"count":105,"icon":"🚀","title":"Exploratrice de l'espace","note":"105 diamants gagnés"},
    {"count":115,"icon":"🐢","title":"Persévérante","note":"115 diamants gagnés"},
    {"count":125,"icon":"🎨","title":"Artiste des mots","note":"125 diamants gagnés"},
    {"count":135,"icon":"🦉","title":"Hibou malin","note":"135 diamants gagnés"},
    {"count":145,"icon":"🐠","title":"Poisson bilingue","note":"145 diamants gagnés"},
    {"count":155,"icon":"🌺","title":"Fleur des langues","note":"155 diamants gagnés"},
    {"count":165,"icon":"🏰","title":"Gardienne des mots","note":"165 diamants gagnés"},
    {"count":175,"icon":"🧚","title":"Fée de l'anglais","note":"175 diamants gagnés"},
    {"count":185,"icon":"🐧","title":"Pingouin courageux","note":"185 diamants gagnés"},
    {"count":195,"icon":"🎈","title":"Étoile montante","note":"195 diamants gagnés"},
    {"count":205,"icon":"🦁","title":"Lionne du vocabulaire","note":"205 diamants gagnés"},
    {"count":215,"icon":"🍀","title":"Chanceuse des mots","note":"215 diamants gagnés"},
    {"count":225,"icon":"🛼","title":"Reine de la glisse","note":"225 diamants gagnés"},
    {"count":235,"icon":"🐙","title":"Pieuvre futée","note":"235 diamants gagnés"},
    {"count":245,"icon":"🎀","title":"Super bavarde","note":"245 diamants gagnés"},
    {"count":255,"icon":"🌻","title":"Soleil de l'anglais","note":"255 diamants gagnés"},
    {"count":265,"icon":"🦜","title":"Perroquet champion","note":"265 diamants gagnés"},
    {"count":275,"icon":"🏅","title":"Grande championne","note":"275 diamants gagnés"},
    {"count":285,"icon":"💫","title":"Super exploratrice","note":"285 diamants gagnés"},
    {"count":295,"icon":"👸","title":"Princesse bilingue","note":"295 diamants gagnés"},
    {"count":300,"icon":"🏆","title":"Légende de l'anglais","note":"300 diamants gagnés"}
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
  if (game.mode === "quiz") return 'Comment dit-on « ' + question.item.fr + ' » en anglais ?';
  if (game.mode === "reverse") return 'Que signifie « ' + question.item.word + ' » en français ?';
  return "Écoute le mot en anglais, puis choisis la bonne image.";
}

function readGameInstruction() {
  if (!game || game.complete) return;
  const question = game.questions[game.index];
  speakFrench(game.mode === "reverse" ? "Que signifie ce mot en français ?" : gameInstruction(question));
  if (game.mode === "listen" || game.mode === "reverse") speakEnglishAfterCurrent(question.item.word);
}

function renderGame() {
  if (!game) return renderPlay();
  if (game.complete) {
    const message = game.correct === game.questions.length ? "Incroyable ! Un sans-faute ! 🎉" : game.correct >= Math.ceil(game.questions.length * 0.7) ? "Super travail ! Tu progresses très bien ! 💎" : "Bravo d'avoir essayé ! On recommence quand tu veux. 💛";
    return '<section class="result-card"><div class="result-confetti">🎉 💎 🎈</div><span class="eyebrow">JEU TERMINÉ</span><h1>' + message + '</h1><div class="score-circle"><strong>' + game.correct + '</strong><small>/ ' + game.questions.length + '</small></div><p>Tu gagnes <strong>' + game.correct + ' diamants</strong> !</p><button class="primary-button full-button" data-action="start-game" data-mode="' + game.mode + '" data-topic="' + (game.topic || '') + '">Rejouer 🔁</button><button class="secondary-button full-button" data-view="play">Retour aux jeux</button></section>';
  }
  const question = game.questions[game.index];
  const progress = Math.round((game.index / game.questions.length) * 100);
  const prompt = gameInstruction(question);
  return '<button class="back-button" data-view="play">← Quitter le jeu</button>' +
    '<section class="game-panel"><div class="game-progress-row"><span>Question ' + (game.index + 1) + ' sur ' + game.questions.length + '</span><span>💎 ' + game.correct + '</span></div>' +
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
      ? '<div class="answer-feedback ' + (game.lastCorrect ? "good" : "try-again") + '">' + (game.lastCorrect ? "Bravo, bonne réponse ! 💎" : "Bien essayé ! La bonne réponse était " + question.item.word + ".") + '</div><button class="primary-button full-button" data-action="next-question">' + (game.index === game.questions.length - 1 ? "Voir mon résultat" : "Question suivante →") + '</button>'
      : '<button class="primary-button full-button validate-button" data-action="validate-answer"' + (game.selected < 0 ? " disabled" : "") + '>Valider ma réponse ✓</button>') +
    '</section>';
}


const CONVERSATION_THEMES = {
  introduce:{title:"Je me présente",icon:"👋",turns:[{prompt:"How old are you?",french:"Quel âge as-tu ?"},{prompt:"What's your name?",french:"Comment tu t'appelles ?"},{prompt:"What do you like?",french:"Qu'est-ce que tu aimes ?"}]},
  meeting:{title:"Faire connaissance",icon:"🐻",turns:[{prompt:"Hello! How are you today?",french:"Bonjour ! Comment vas-tu aujourd'hui ?"},{prompt:"What's your favourite animal?",french:"Quel est ton animal préféré ?"},{prompt:"What colour do you like?",french:"Quelle couleur aimes-tu ?"}]},
  family:{title:"Ma famille",icon:"👨‍👩‍👧",turns:[{prompt:"Have you got a brother or a sister?",french:"As-tu un frère ou une sœur ?"},{prompt:"What's your mum's name?",french:"Comment s'appelle ta maman ?"},{prompt:"Do you love your family?",french:"Aimes-tu ta famille ?"}]},
  pets:{title:"Mes animaux",icon:"🐶",turns:[{prompt:"Do you have a pet?",french:"As-tu un animal ?"},{prompt:"What's its name?",french:"Comment s'appelle-t-il ?"},{prompt:"Is it big or small?",french:"Est-il grand ou petit ?"}]},
  food:{title:"À table !",icon:"🍎",turns:[{prompt:"Are you hungry?",french:"As-tu faim ?"},{prompt:"What's your favourite food?",french:"Quel est ton plat préféré ?"},{prompt:"Do you like apples?",french:"Aimes-tu les pommes ?"}]},
  school:{title:"À l'école",icon:"🎒",turns:[{prompt:"Do you like school?",french:"Aimes-tu l'école ?"},{prompt:"What's your favourite subject?",french:"Quelle est ta matière préférée ?"},{prompt:"Do you like drawing?",french:"Aimes-tu dessiner ?"}]},
  hobbies:{title:"Mes loisirs",icon:"⚽",turns:[{prompt:"What do you do for fun?",french:"Qu'aimes-tu faire pour t'amuser ?"},{prompt:"Do you like sports?",french:"Aimes-tu le sport ?"},{prompt:"Can you dance?",french:"Sais-tu danser ?"}]},
  home:{title:"À la maison",icon:"🏠",turns:[{prompt:"Where do you live?",french:"Où habites-tu ?"},{prompt:"What's your favourite room?",french:"Quelle est ta pièce préférée ?"},{prompt:"Do you have a garden?",french:"As-tu un jardin ?"}]},
  weather:{title:"La météo",icon:"🌤️",turns:[{prompt:"What's the weather like today?",french:"Quel temps fait-il aujourd'hui ?"},{prompt:"Do you like the sun?",french:"Aimes-tu le soleil ?"},{prompt:"Do you like playing in the rain?",french:"Aimes-tu jouer sous la pluie ?"}]},
  colours:{title:"Mes couleurs",icon:"🎨",turns:[{prompt:"What's your favourite colour?",french:"Quelle est ta couleur préférée ?"},{prompt:"Can you see something red?",french:"Vois-tu quelque chose de rouge ?"},{prompt:"Do you like blue?",french:"Aimes-tu le bleu ?"}]},
  day:{title:"Ma journée",icon:"🌞",turns:[{prompt:"When do you wake up?",french:"À quelle heure te réveilles-tu ?"},{prompt:"What do you eat for breakfast?",french:"Que manges-tu au petit-déjeuner ?"},{prompt:"Are you happy today?",french:"Es-tu contente aujourd'hui ?"}]},
  park:{title:"Au parc",icon:"🌳",turns:[{"prompt":"Do you like the park?","french":"Aimes-tu le parc ?","reply":"Me too! I love playing outside."},{"prompt":"Can you see a tree?","french":"Vois-tu un arbre ?","reply":"Yes! Trees are beautiful."},{"prompt":"Do you want to play?","french":"Veux-tu jouer ?","reply":"Let's play together!"}]},
  birthday:{title:"Mon anniversaire",icon:"🎂",turns:[{"prompt":"When is your birthday?","french":"Quand est ton anniversaire ?","reply":"Birthdays are so much fun!"},{"prompt":"How old are you?","french":"Quel âge as-tu ?","reply":"You are growing up!"},{"prompt":"Do you like birthday cake?","french":"Aimes-tu le gâteau d'anniversaire ?","reply":"Yummy! I love birthday cake!"}]},
  restaurant:{title:"Au restaurant",icon:"🍽️",turns:[{"prompt":"Are you hungry?","french":"As-tu faim ?","reply":"Me too! Let's look at the menu."},{"prompt":"Would you like some water?","french":"Veux-tu de l'eau ?","reply":"Here you are. Enjoy!"},{"prompt":"Do you like pizza?","french":"Aimes-tu la pizza ?","reply":"Pizza is delicious!"}]},
  shop:{title:"Dans un magasin",icon:"🛍️",turns:[{"prompt":"What would you like?","french":"Qu'aimerais-tu ?","reply":"Great choice! Let's find it."},{"prompt":"What colour do you want?","french":"Quelle couleur veux-tu ?","reply":"Lovely colour!"},{"prompt":"Are you happy with it?","french":"Cela te plaît-il ?","reply":"Wonderful! Have a nice day!"}]},
  playground:{title:"À l'aire de jeux",icon:"🛝",turns:[{"prompt":"Do you like slides?","french":"Aimes-tu les toboggans ?","reply":"Slides are so much fun!"},{"prompt":"Can you climb?","french":"Sais-tu grimper ?","reply":"Wow! You are strong."},{"prompt":"Shall we play together?","french":"On joue ensemble ?","reply":"Yes! Let's have fun!"}]},
  zoo:{title:"Au zoo",icon:"🦁",turns:[{"prompt":"What animal can you see?","french":"Quel animal vois-tu ?","reply":"Amazing! I love animals."},{"prompt":"Is the elephant big?","french":"L'éléphant est-il grand ?","reply":"Yes, elephants are huge!"},{"prompt":"What's your favourite animal?","french":"Quel est ton animal préféré ?","reply":"That's a lovely animal!"}]},
  beach:{title:"À la plage",icon:"🏖️",turns:[{"prompt":"Do you like the beach?","french":"Aimes-tu la plage ?","reply":"Me too! I love the sea."},{"prompt":"Can you swim?","french":"Sais-tu nager ?","reply":"That's great! Splash, splash!"},{"prompt":"Do you want to build a sandcastle?","french":"Veux-tu faire un château de sable ?","reply":"Let's build a big one!"}]},
  doctor:{title:"Chez le médecin",icon:"🩺",turns:[{"prompt":"How do you feel?","french":"Comment te sens-tu ?","reply":"Thank you for telling me."},{"prompt":"Does your tummy hurt?","french":"As-tu mal au ventre ?","reply":"I hope you feel better soon."},{"prompt":"Are you feeling better now?","french":"Te sens-tu mieux maintenant ?","reply":"Take care and get some rest!"}]},
  bedtime:{title:"C'est l'heure de dormir",icon:"🌙",turns:[{"prompt":"Are you sleepy?","french":"As-tu sommeil ?","reply":"It's nearly bedtime!"},{"prompt":"Did you brush your teeth?","french":"T'es-tu brossé les dents ?","reply":"Well done! Clean teeth are important."},{"prompt":"Would you like a bedtime story?","french":"Veux-tu une histoire ?","reply":"Sweet dreams, little star!"}]},
  morning:{title:"Le matin",icon:"🌞",turns:[{"prompt":"Did you sleep well?","french":"As-tu bien dormi ?","reply":"That's lovely to hear!"},{"prompt":"Are you ready for breakfast?","french":"Es-tu prête pour le petit-déjeuner ?","reply":"Let's have a yummy breakfast!"},{"prompt":"Are you ready for the day?","french":"Es-tu prête pour cette journée ?","reply":"Have a wonderful day!"}]},
  holiday:{title:"En vacances",icon:"🧳",turns:[{"prompt":"Where do you want to go?","french":"Où veux-tu aller ?","reply":"That sounds like a wonderful trip!"},{"prompt":"Do you like travelling?","french":"Aimes-tu voyager ?","reply":"Travelling is an adventure!"},{"prompt":"What do you pack in your bag?","french":"Que mets-tu dans ton sac ?","reply":"Good thinking! Let's get ready."}]},
  library:{title:"À la bibliothèque",icon:"📚",turns:[{"prompt":"Do you like books?","french":"Aimes-tu les livres ?","reply":"Books take us on adventures!"},{"prompt":"What story do you like?","french":"Quelle histoire aimes-tu ?","reply":"That sounds like a great story."},{"prompt":"Shall we read together?","french":"Veux-tu lire avec moi ?","reply":"Wonderful! Let's read."}]},
  clothes:{title:"Choisir ses vêtements",icon:"👗",turns:[{"prompt":"What are you wearing today?","french":"Que portes-tu aujourd'hui ?","reply":"You look lovely!"},{"prompt":"Do you like your shoes?","french":"Aimes-tu tes chaussures ?","reply":"They sound great!"},{"prompt":"Is it cold outside?","french":"Fait-il froid dehors ?","reply":"Let's dress for the weather!"}]},
  toys:{title:"Mes jouets préférés",icon:"🧸",turns:[{"prompt":"What's your favourite toy?","french":"Quel est ton jouet préféré ?","reply":"That sounds like a lovely toy!"},{"prompt":"Do you like playing with dolls?","french":"Aimes-tu jouer à la poupée ?","reply":"Playing is so much fun!"},{"prompt":"Can I play too?","french":"Je peux jouer aussi ?","reply":"Yay! Let's play together!"}]},
  sports:{title:"Parlons de sport",icon:"⚽",turns:[{"prompt":"Do you like sports?","french":"Aimes-tu le sport ?","reply":"Being active is great!"},{"prompt":"Can you swim?","french":"Sais-tu nager ?","reply":"Fantastic! Keep practising."},{"prompt":"What's your favourite sport?","french":"Quel est ton sport préféré ?","reply":"That's a brilliant sport!"}]},
  cooking:{title:"En cuisine",icon:"🥣",turns:[{"prompt":"Do you like cooking?","french":"Aimes-tu cuisiner ?","reply":"Cooking together is fun!"},{"prompt":"Can you help me stir?","french":"Peux-tu m'aider à mélanger ?","reply":"Great job, little chef!"},{"prompt":"Is it yummy?","french":"Est-ce délicieux ?","reply":"Bon appétit!"}]},
  directions:{title:"Trouver son chemin",icon:"🧭",turns:[{"prompt":"Where is the park?","french":"Où est le parc ?","reply":"Let's look for it together."},{"prompt":"Is it near or far?","french":"Est-ce près ou loin ?","reply":"Good! We are getting closer."},{"prompt":"Can you show me the way?","french":"Peux-tu me montrer le chemin ?","reply":"Thank you, great guide!"}]},
  picnic:{title:"Le pique-nique",icon:"🧺",turns:[{"prompt":"Would you like a picnic?","french":"Veux-tu faire un pique-nique ?","reply":"A picnic sounds lovely!"},{"prompt":"What would you like to eat?","french":"Que voudrais-tu manger ?","reply":"Yummy! I'll bring some too."},{"prompt":"Shall we sit under the tree?","french":"On s'assoit sous l'arbre ?","reply":"What a lovely place!"}]},
  feelings:{title:"Comment je me sens",icon:"😊",turns:[{"prompt":"Are you happy today?","french":"Es-tu heureuse aujourd'hui ?","reply":"I'm glad to hear that!"},{"prompt":"What makes you happy?","french":"Qu'est-ce qui te rend heureuse ?","reply":"That is a lovely thing!"},{"prompt":"What do you do when you feel sad?","french":"Que fais-tu quand tu es triste ?","reply":"A hug can make things better."}]},
  transport:{title:"Les moyens de transport",icon:"🚆",turns:[{"prompt":"How do you go to school?","french":"Comment vas-tu à l'école ?","reply":"That's a good way to travel!"},{"prompt":"Do you like travelling by train?","french":"Aimes-tu voyager en train ?","reply":"Trains are exciting!"},{"prompt":"Would you like to fly in an airplane?","french":"Aimerais-tu prendre l'avion ?","reply":"What a big adventure!"}]}
};

function conversationReply(themeKey, index, transcript) {
  const text = transcript.toLowerCase().replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
  const ageWords = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10 };
  const ageMatch = text.match(/\b(\d{1,2})\b/);
  let age = ageMatch ? Number(ageMatch[1]) : null;
  if (!age) Object.keys(ageWords).some(function(word){ if (new RegExp("\\b"+word+"\\b").test(text)) { age=ageWords[word]; return true; } return false; });

  if (themeKey === "introduce") {
    if (index === 0) return age === 6 ? "I'm 6 too!" : age ? "I'm 6! You're " + age + "!" : "I'm 6 too!";
    if (index === 1) {
      const nameMatch = transcript.match(/(?:my name is|i am|i'm|this is|it's)\s+([a-z][a-z'-]*)/i);
      let name = nameMatch ? nameMatch[1] : transcript.trim().split(/\s+/)[0];
      name = (name || "").replace(/[^a-z'-]/gi, "");
      if (/^(my|name|is|i|am|hello|hi|it's|this)$/i.test(name)) name = "";
      return name ? "Nice to meet you, " + name + "!" : "Nice to meet you!";
    }
    const likes = [{match:"cat",reply:"cats"},{match:"dog",reply:"dogs"},{match:"panda",reply:"pandas"},{match:"dinosaur",reply:"dinosaurs"},{match:"music",reply:"music"},{match:"dance",reply:"dancing"},{match:"draw",reply:"drawing"},{match:"football",reply:"football"},{match:"chocolate",reply:"chocolate"},{match:"ice cream",reply:"ice cream"},{match:"read",reply:"reading"}];
    const like = likes.find(function(item){ return text.includes(item.match); });
    return like ? "I like " + like.reply + " too! That's great!" : "That sounds fun! I like having fun too!";
  }

  const currentTheme = CONVERSATION_THEMES[themeKey];
  if (currentTheme && currentTheme.turns[index] && currentTheme.turns[index].reply) {
    if (/yes|yeah|yep|i do|i can|i am|i'm/.test(text)) return "Yes, that's lovely! " + currentTheme.turns[index].reply;
    if (/no|not|don't|do not|can't|cannot/.test(text)) return "That's okay! " + currentTheme.turns[index].reply;
    return currentTheme.turns[index].reply;
  }
  if (index === 0) return "I'm great, thank you!";
  if (index === 1) {
    const animals = ["cats","dogs","lions","rabbits","pandas","horses","bears","tigers","elephants","dolphins"];
    const animal = animals.find(function(item){ return text.includes(item) || text.includes(item.replace(/s$/, "")); });
    return animal ? "I love " + animal + " too!" : "That's a lovely choice!";
  }
  const colors = ["blue","red","green","pink","purple","yellow","orange","black","white"];
  const color = colors.find(function(item){ return new RegExp("\\b"+item+"\\b").test(text); });
  return color ? "I like " + color + " too! It was lovely talking to you!" : "That's a lovely colour! It was lovely talking to you!";
}

function renderConversationMenu() {
  return '<button class="back-button" data-view="play">← Retour aux jeux</button><section class="page-intro"><span class="eyebrow">JE PARLE EN ANGLAIS</span><h1>À toi de discuter ! 💬</h1><p>Le renard te parle en anglais et te répond comme un vrai petit compagnon. Tu vas découvrir 30 situations et faire 3 échanges à chaque fois.</p></section>' +
    Object.keys(CONVERSATION_THEMES).map(function(key){ const theme=CONVERSATION_THEMES[key]; return '<button class="game-mode-card conversation-mode" data-action="start-conversation" data-theme="'+key+'"><span class="mode-icon">'+theme.icon+'</span><span><strong>'+theme.title+'</strong><small>3 petites questions à l’oral</small></span><span class="mode-arrow">→</span></button>'; }).join('');
}

function renderConversation() {
  if (!conversation) return renderConversationMenu();
  if (conversation.complete) return '<section class="result-card"><div class="result-confetti">🦊 💎 🎉</div><span class="eyebrow">CONVERSATION TERMINÉE</span><h1>Well done !</h1><p>Tu as discuté en anglais avec le renard. Bravo d’avoir parlé !</p><div class="score-circle"><strong>3</strong><small>/ 3</small></div><p>Tu gagnes <strong>3 diamants 💎</strong> !</p><button class="primary-button full-button" data-action="conversation-menu">Choisir une autre conversation</button><button class="secondary-button full-button" data-view="play">Retour aux jeux</button></section>';
  const theme=CONVERSATION_THEMES[conversation.theme], turn=theme.turns[conversation.index];
  const history=(conversation.history||[]).map(function(item){return '<div class="conversation-exchange"><div class="conversation-prompt"><strong>🦊 Le renard :</strong> “'+escapeHtml(item.prompt)+'”</div><div class="conversation-transcript"><strong>Toi :</strong> “'+escapeHtml(item.transcript)+'”</div><div class="conversation-reply"><strong>🦊 Le renard :</strong> “'+escapeHtml(item.reply)+'”</div></div>';}).join('');
  return '<button class="back-button" data-action="conversation-menu">← Choisir un thème</button><section class="game-panel conversation-panel"><div class="game-progress-row"><span>'+theme.icon+' '+theme.title+'</span><span>Interaction '+(conversation.index+1)+' / 3</span></div><div class="progress-track"><span style="width:'+((conversation.index)/3*100)+'%"></span></div><div class="conversation-fox">🦊</div><div class="conversation-history">'+history+'</div><div class="conversation-prompt"><span class="eyebrow">À TON TOUR !</span><h2>'+turn.prompt+'</h2><p>'+turn.french+'</p><button class="instruction-replay" data-action="repeat-conversation">🔊 Réécouter</button></div>' +
  (conversation.listening ? '<p class="listening-status">🎙️ Je t’écoute… Parle en anglais !</p>' : '<button class="primary-button full-button mic-button" data-action="record-conversation">🎙️ À toi de répondre !</button>')+
  '<p class="conversation-help">Appuie sur le bouton et réponds en anglais. Le renard te répondra puis te posera directement la question suivante.</p></section>';
}

function startConversation(themeKey) {
  conversation={theme:themeKey,index:0,transcript:"",reply:"",history:[],listening:false,waiting:false,matched:false,feedback:"",complete:false};
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
      conversation.history.push({prompt:CONVERSATION_THEMES[conversation.theme].turns[conversation.index].prompt,transcript:transcript,reply:reply});
      render();
      refreshSpeechVoices();
      const utterance=makeSpeechUtterance(reply,"en-GB",0.9);
      utterance.onend=function(){
        if(!conversation) return;
        if(conversation.index===2){
          conversation.complete=true; state.diamonds+=3; state.sessions+=1; saveState(); render();
          speak("Well done! That was a lovely conversation!");
        } else {
          conversation.index++;
          conversation.transcript=""; conversation.reply="";
          render();
          requestAnimationFrame(function(){
            const replyButton=document.querySelector(".conversation-panel .mic-button");
            if(replyButton) replyButton.scrollIntoView({behavior:"smooth",block:"center"});
          });
          speak(CONVERSATION_THEMES[conversation.theme].turns[conversation.index].prompt);
        }
      };
      if(state.soundEnabled && "speechSynthesis" in window) window.speechSynthesis.speak(utterance);
      else utterance.onend();
    };
    speechRecognition.onerror=function(){ conversation.listening=false; render(); showToast("Je n’ai pas entendu. Réessaie en parlant près de la tablette."); };
    speechRecognition.onend=function(){ if(conversation && conversation.listening){conversation.listening=false;render();} };
    speechRecognition.start();
  } catch(error) { conversation.listening=false; render(); showToast("Impossible d’activer le micro. Vérifie l’autorisation."); }
}

function nextConversationTurn() { /* Les échanges avancent automatiquement après la réponse du renard. */ }

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
    ["conversation", "💬", "Conversation"],
    ["rewards", "💎", "Diamants"]
  ];
  return '<nav class="bottom-nav" aria-label="Navigation principale">' + items.map(function (item) {
    const active = item[0] === "conversation"
      ? (activeView === "conversation" || activeView === "conversation-menu")
      : (activeView === item[0] || (activeView === "lesson" && item[0] === "learn") || (activeView === "game" && item[0] === "play"));
    const target = item[0] === "conversation" ? 'data-action="conversation-menu"' : 'data-view="' + item[0] + '"';
    return '<button class="nav-item ' + (active ? "active" : "") + '" ' + target + '><span>' + item[1] + '</span><small>' + item[2] + '</small></button>';
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

function startGame(mode, topic) {
  const pool = topic && LESSONS[topic] ? LESSONS[topic].words : ALL_WORDS;
  const priority = pool.filter(function (item) { return state.reviewWords.includes(item.word); });
  const remaining = shuffle(pool.filter(function (item) { return !state.reviewWords.includes(item.word); }));
  const selected = priority.concat(remaining).slice(0, Math.min(6, pool.length));
  game = {
    mode: mode,
    topic: topic || null,
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
  if (game.lastCorrect) {
    game.correct += 1;
    state.reviewWords = state.reviewWords.filter(function (word) { return word !== question.item.word; });
  } else if (!state.reviewWords.includes(question.item.word)) {
    state.reviewWords.push(question.item.word);
  }
  saveState();
  render();
}

function nextQuestion() {
  if (!game) return;
  if (game.index >= game.questions.length - 1) {
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
  if (action === "start-game") startGame(target.dataset.mode, target.dataset.topic);
  if (action === "conversation-menu") { if(speechRecognition) speechRecognition.abort(); conversation=null; activeView="conversation-menu"; render(); }
  if (action === "start-conversation") startConversation(target.dataset.theme);
  if (action === "record-conversation") listenToConversation();
  if (action === "repeat-conversation" && conversation) speak(CONVERSATION_THEMES[conversation.theme].turns[conversation.index].prompt);
  if (action === "next-conversation") nextConversationTurn();
  if (action === "answer") selectAnswer(Number(target.dataset.answer));
  if (action === "validate-answer") validateAnswer();
  if (action === "replay-instruction" && game) readGameInstruction();
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
