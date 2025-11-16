// ==============================
// Juego de adivina el personaje
// ==============================

// SOLO 4 personajes: Zombi, Sirena, Bruja, Vampiro
// Ahora solo quedan: Zombi, Sirena
const niveles = [
  {
    id: 1,
    title: "Nivel 1: Persistente del Cementerio",
    intro: "Todavía se mueve, aunque su corazón ya no late. Avanza lento, con vestigios de otros tiempos.",
    revealTitle: "Revelación: Zombi",
    revealText: "Era... ¡el Zombi! Sobrevive con hambre eterna y busca incansablemente algo de vida en la noche.",
    // Imágenes progresivas indirectas
    characterImgs: [
      "zom.jpg", // Color verdoso (piel)
      "zom.jpg", // Cementerio
      "zom.jpg",   // Mano saliendo de tierra
      "zom.jpg"  // Cerebro
    ],
    pistas: [
      "Un matiz entre verde y gris cubre su exterior.",
      "Su contexto está rodeado por la quietud y piedras con nombres.",
      "Busca algo que representa la inteligencia y vida.",
      "Su paso es lento, pero nunca se detiene."
    ],
    opciones: [
      [
        { img: "casa.jpg", alt: "Casa", correct: false },
        { img: "concha.jpg", alt: "Concha", correct: false },
        { img: "arbol.jpg", alt: "Árbol", correct: false },
         { img: "cementerio.jpg", alt: "Cementerio", correct: true },
        { img: "martillo.jpg", alt: "Martillo", correct: false },
        { img: "estrella.jpg", alt: "Estrella", correct: false },
        { img: "mano.jpg", alt: "Mano Tierra", correct: false },
        { img: "agua.jpg", alt: "Agua", correct: false }
      ],
      [
        
        { img: "rojo.jpg", alt: "Color Rojo", correct: false },
        { img: "amari.jpg", alt: "Color Amarillo", correct: false },
        { img: "negro.jpg", alt: "Color Negro", correct: false },
        { img: "azul.jpg", alt: "Color Azul", correct: false },
        { img: "verde.jpg", alt: "Color Verde", correct: true },
        { img: "marron.jpg", alt: "Color Marrón", correct: false },
        { img: "mora.jpg", alt: "Ancla", correct: false },
        { img: "naranja.jpg", alt: "Flor", correct: false }
      ],
      [
        { img: "cerebro.jpg", alt: "Cerebro", correct: true },
        { img: "silla.jpg", alt: "Silla", correct: false },
        { img: "libro.jpg", alt: "Libro", correct: false },
        { img: "taza.jpg", alt: "Taza", correct: false },
        { img: "mantana.jpg", alt: "Montaña", correct: false },
        { img: "concha.jpg", alt: "Concha2", correct: false },
        { img: "casa.jpg", alt: "Casa", correct: false },
        { img: "estrella.jpg", alt: "Estrella", correct: false }
      ],
      [
        
        { img: "mariposa.jpg", alt: "Mariposa", correct: false },
        { img: "tesoro.jpg", alt: "Tesoro", correct: false },
        { img: "cueva.jpg", alt: "Cueva", correct: false },
        { img: "sangre.png", alt: "Gota Sangre", correct: false },
        { img: "rojo.jpg", alt: "Rojo", correct: false },
        { img: "alas.jpeg", alt: "Alas", correct: false },
        { img: "musica.png", alt: "Nota Musical", correct: false },
        { img: "mano.jpg", alt: "Mano Salida Tierra", correct: true },
      ]
    ]
  },

  {
    id: 2,
    title: "Nivel 2: Guardiana de las Olas",
    intro: "Presente solo donde la tierra se mezcla con el infinito salado. Su voz es irresistible, su secreto está escondido en las profundidades.",
    revealTitle: "Revelación: Sirena",
    revealText: "¡Era la Sirena! Canta melodías para hipnotizar y bajo las olas revela su auténtica forma.",
    characterImgs: [
      "sirena.jpg", // Color azul-marino
      "sirena.jpg", // Olas
      "sirena.jpg",   // Concha
      "sirena.jpg"  // Cola Pez
    ],
    pistas: [
      "Todo aquí tiene el matiz profundo y frío de la noche en el agua.",
      "Nada permanece quieto; va y viene según el ritmo de la naturaleza.",
      "A veces deja regalos brillantes en la orilla.",
      "Puede ocultar su mayor rasgo bajo la superficie."
    ],
    opciones: [
      [
        { img: "rojo.jpg", alt: "Rojo", correct: false },
        { img: "verde.jpg", alt: "Verde", correct: false },
        { img: "azul.jpg", alt: "Azul-Marine", correct: true },
        { img: "negro.jpg", alt: "Negro", correct: false },
        { img: "marron.jpg", alt: "Marrón", correct: false },
        { img: "mora.jpg", alt: "Flor", correct: false },
        { img: "amari.jpg", alt: "Cementerio", correct: false },
        { img: "naranja.jpg", alt: "Sangre", correct: false }
      ],
      [
        { img: "mariposa.jpg", alt: "Mariposa", correct: false },
        { img: "mantana.jpg", alt: "Árbol", correct: false },
        { img: "flor.jpg", alt: "Cueva", correct: false },
        { img: "sangre.png", alt: "Alas", correct: false },
        { img: "mano.jpg", alt: "Mano Tierra", correct: false },
        { img: "agua.jpg", alt: "Olas", correct: true },
        { img: "colmillos.jpeg", alt: "Colmillos", correct: false },
        { img: "musica.png", alt: "Nota Musical", correct: false }
      ],
      [
        { img: "silla.jpg", alt: "Silla", correct: false },
        { img: "mano.jpg", alt: "CPU", correct: false },
        { img: "flor.jpg", alt: "Cable", correct: false },
        { img: "posion.jpeg", alt: "Poción", correct: false },
        { img: "ataud.jpeg", alt: "Ataúd", correct: false },
        { img: "concha.jpg", alt: "Concha", correct: true },
        { img: "casa.jpg", alt: "Casa", correct: false },
        { img: "cerebro.jpg", alt: "Cerebro", correct: false }
      ],
      [
        { img: "verde.jpg", alt: "Verde", correct: false },
        { img: "azul.jpg", alt: "Azul", correct: false },
        { img: "cerebro.jpg", alt: "CPU", correct: false },
        { img: "sombrero.jpeg", alt: "Sombrero", correct: false },
        { img: "pez.jpeg", alt: "Cola Pez", correct: true },
        { img: "libro.jpg", alt: "Libro", correct: false },
        { img: "cementerio.jpg", alt: "Cementerio", correct: false },
        { img: "mano.jpg", alt: "Mano Tierra", correct: false }
      ]
    ]
  }
  // Se han eliminado los niveles 3 y 4
];

// ==========================
// CÓDIGO DE LÓGICA
// ==========================

function loadIntro(){
  const nivel = niveles[nivelIndex];
  introTitle.textContent = nivel.title;
  introText.textContent = nivel.intro;
  characterImg.src = nivel.characterImgs ? nivel.characterImgs[0] : (nivel.character || characterImg.src);
  showScreen('intro');
}

function loadSublevel(){
  const nivel = niveles[nivelIndex];
  const pistas = nivel.pistas || [];
  const opciones = nivel.opciones[subIndex];

  if (nivel.characterImgs && nivel.characterImgs.length > subIndex) {
    characterImg.src = nivel.characterImgs[subIndex];
  }

  hintBox.textContent = pistas[subIndex] || "Observa bien las opciones.";
  // El número total de niveles ahora se basa en niveles.length (2)
  levelIndicator.textContent = `Nivel ${nivelIndex+1} / ${niveles.length}`;
  sublevelIndicator.textContent = `Pista ${subIndex+1} / 4`;
  messageBox.textContent = '';

  optionsContainer.innerHTML = '';
  opciones.forEach((op, idx)=>{
    const div = document.createElement('div');
    div.className = 'option';
    const img = document.createElement('img');
    img.src = op.img;
    img.alt = op.alt || `opcion-${idx+1}`;
    div.appendChild(img);

    div.addEventListener('click', ()=>{
      if(div.classList.contains('disabled')) return;
      handleChoice(op.correct, div);
    });

    optionsContainer.appendChild(div);
  });

  showScreen('game');
}

/* ======== ESTADO ======== */
let nivelIndex = parseInt(localStorage.getItem('juego-entorno-nivel') || '0', 10); // 0..1 (ahora solo 2 niveles)
let subIndex = parseInt(localStorage.getItem('juego-entorno-sub') || '0', 10);     // 0..3
let failCount = 0; // fallos en el subnivel actual

/* ======== DOM ======== */
const $ = id => document.getElementById(id);
const screens = {
  start: $('screen-start'),
  intro: $('screen-intro'),
  game: $('screen-game'),
  reveal: $('screen-reveal'),
  final: $('screen-final')
};
const introTitle = $('intro-title');
const introText = $('intro-text');
const characterImg = $('character-img');
const hintBox = $('hint-box');
const optionsContainer = $('options');
const levelIndicator = $('level-indicator');
const sublevelIndicator = $('sublevel-indicator');
const messageBox = $('message');
const revealTitle = $('reveal-title');
const revealText = $('reveal-text');

function showScreen(name){
  Object.values(screens).forEach(s=>s.classList.remove('active'));
  screens[name].classList.add('active');
}

/* Iniciar / Reiniciar juego */
function startGame(){
  nivelIndex = 0;
  subIndex = 0;
  failCount = 0;
  saveProgress();
  loadIntro();
}

function saveProgress(){
  localStorage.setItem('juego-entorno-nivel', String(nivelIndex));
  localStorage.setItem('juego-entorno-sub', String(subIndex));
}

function handleChoice(correct, element){
  if(correct){
    element.classList.add('correct');
    messageBox.textContent = '¡Correcto!';
    Array.from(optionsContainer.children).forEach(c=>c.classList.add('disabled'));
    setTimeout(()=> {
      subIndex++;
      failCount = 0;
      saveProgress();
      if(subIndex < 4){
        loadSublevel();
      } else {
        showReveal();
      }
    }, 700);
  } else {
    element.classList.add('incorrect');
    messageBox.textContent = 'No es correcto.';
    failCount++;
    element.classList.add('disabled');
    if(failCount >= 4){
      const pistaExtra = generarPistaExtra(nivelIndex, subIndex);
      hintBox.textContent = pistaExtra;
      messageBox.textContent = 'Pista mostrada.';
    } else {
      const restantes = 4 - failCount;
      messageBox.textContent = `Pista en ${restantes} fallos.`;
    }
  }
}

function generarPistaExtra(nivelI, subI){
  const nivel = niveles[nivelI];
  const base = (nivel.pistas && nivel.pistas[subI]) ? nivel.pistas[subI] : 'Observa los detalles.';
  const extra = ' busca elementos característicos pero menos obvios.';
  return base + ' (Pista extra:' + extra + ')';
}

function showReveal(){
  const nivel = niveles[nivelIndex];
  revealTitle.textContent = nivel.revealTitle;
  revealText.textContent = nivel.revealText;
  showScreen('reveal');
}

function nextLevel(){
  nivelIndex++;
  subIndex = 0;
  failCount = 0;
  saveProgress();
  // El control de final de juego ahora usa niveles.length (que es 2)
  if(nivelIndex >= niveles.length){
    showScreen('final');
  } else {
    loadIntro();
  }
}

/* Eventos botones */
document.getElementById('btn-play').addEventListener('click', ()=>{
  loadIntroFromSaved();
});
document.getElementById('btn-reset').addEventListener('click', ()=>{
  localStorage.removeItem('juego-entorno-nivel');
  localStorage.removeItem('juego-entorno-sub');
  nivelIndex = 0; subIndex = 0; failCount = 0;
  messageBox.textContent = 'Progreso reiniciado.';
  showScreen('start');
});
document.getElementById('btn-start-level').addEventListener('click', loadSublevel);
document.getElementById('btn-next-level').addEventListener('click', nextLevel);
document.getElementById('btn-play-again').addEventListener('click', startGame);

/* Cargar intro desde progreso guardado */
function loadIntroFromSaved(){
  nivelIndex = parseInt(localStorage.getItem('juego-entorno-nivel') || '0', 10);
  subIndex = parseInt(localStorage.getItem('juego-entorno-sub') || '0', 10);
  // Se asegura que no intente cargar un nivel que ya no existe (3 o 4)
  if(nivelIndex >= niveles.length || nivelIndex < 0){ nivelIndex = 0; subIndex = 0; }
  loadIntro();
}

window.addEventListener('load', ()=>{
  const saved = localStorage.getItem('juego-entorno-nivel');
  if(saved !== null){
    const savedLevel = parseInt(saved,10);
    // Ajuste para el mensaje de progreso guardado
    if(savedLevel >= niveles.length) {
        // Si el progreso era superior al nuevo total de niveles, lo reinicia lógicamente.
        localStorage.removeItem('juego-entorno-nivel');
        localStorage.removeItem('juego-entorno-sub');
    } else {
        const resumeMsg = `Tienes progreso guardado (Nivel ${savedLevel+1}). Pulsa Jugar para continuar.`;
        const credits = document.querySelector('.credits');
        if(credits) credits.textContent = resumeMsg;
    }
  }
});