// Test Misterio — MBTI (4 rondas: E/I, S/N, T/F, J/P)
// Lógica de preguntas REPARADA para mapear correctamente las 16 personalidades.

// -----------------------------
// DATA: escenas (4) y sus opciones
// -----------------------------
const rondasData = [
  // RONDA 1: E vs I (Extrovertido / Introvertido) - Fuente de Energía
  {
    sceneTitle: "El Misterio del Juguete Desaparecido",
    narrative: `Llegas a la oficina y el juguete favorito de Maxi ha desaparecido. El ambiente está tenso; no hay nadie. <span class="em">¿Cómo abordas este enigma silencioso?</span>`,
    hint: "Elige si te recargas buscando interacción (E) o mediante la reflexión interna (I).",
    options: [
      { text: "Buscas a los compañeros de inmediato para preguntar qué ha pasado y reunir ideas.", mapsTo: "E", note: "Búsqueda activa de interacción social para procesar." },
      { text: "Recorres la oficina en silencio, buscando pistas por tu cuenta y formulando teorías.", mapsTo: "I", note: "Observación y procesamiento interno antes de actuar." },
      { text: "Gritas el nombre de Maxi, intentando provocar una reacción inmediata en el entorno.", mapsTo: "E", note: "Impulso social, acción directa y vocal para estimular la escena." },
      { text: "Vas a tu escritorio para sentarte, esperar y analizar el origen y la causa del misterio.", mapsTo: "I", note: "Procesamiento en privado, buscando la profundidad del problema." }
    ]
  },

  // RONDA 2: S vs N (Sensación / Intuición) - Recolección de Información
  {
    sceneTitle: "Las Huellas en la Alfombra",
    narrative: `Encuentras unas huellas inusuales en la alfombra, que no parecen ser de nadie. La puerta de la sala de reuniones está entreabierta. <span class="em">¿En qué te centras?</span>`,
    hint: "Selecciona si buscas hechos concretos (S) o patrones/posibilidades (N).",
    options: [
      { text: "Examinas las huellas de cerca, notando su forma, tamaño exacto y el tipo de suciedad.", mapsTo: "S", note: "Foco en datos concretos, tangibles y el presente inmediato." },
      { text: "Imaginas el 'cómo' y 'por qué' de esas huellas, creando escenarios complejos en tu mente.", mapsTo: "N", note: "Búsqueda de significado, teorías y patrones detrás de la evidencia." },
      { text: "Miras si el patrón de las huellas coincide con un evento pasado o una experiencia similar.", mapsTo: "S", note: "Uso de la experiencia pasada y el detalle para resolver el problema." },
      { text: "Sientes que las huellas son una metáfora de un problema mayor que nadie ha visto.", mapsTo: "N", note: "Trabajas con intuiciones y posibilidades abstractas sobre el futuro o el subyacente." }
    ]
  },

  // RONDA 3: T vs F (Pensamiento / Sentimiento) - Toma de Decisiones
  {
    sceneTitle: "El Mensaje Cifrado de Maxi",
    narrative: `Sobre la mesa, hay una nota garabateada con un dibujo de Maxi y lo que parece ser un código. Debes decidir cómo interpretarlo. <span class="em">¿Qué valoras más al descifrar el mensaje?</span>`,
    hint: "Tu respuesta muestra si prima la lógica objetiva (T) o los valores/empatía (F).",
    options: [
      { text: "Buscas patrones lógicos, referencias técnicas o sistemas de cifrado para descifrar el código.", mapsTo: "T", note: "Prioriza la eficacia, la razón objetiva y la consistencia." },
      { text: "Intentas pensar como Maxi, en sus emociones y qué querría comunicarte para mantener la paz.", mapsTo: "F", note: "Considera la intención emocional y la armonía interpersonal." },
      { text: "Analizas las posibles consecuencias prácticas y objetivas de cada interpretación del código.", mapsTo: "T", note: "Pensamiento desapegado y análisis de las consecuencias funcionales." },
      { text: "Le preguntas a un amigo o compañero cercano a Maxi qué cree que necesita o siente.", mapsTo: "F", note: "Empatía delegada, buscando la necesidad emocional subyacente." }
    ]
  },

  // RONDA 4: J vs P (Juicio / Percepción) - Estilo de Vida
  {
    sceneTitle: "La Preparación para el Día Siguiente",
    narrative: `Ya es tarde y la oficina está en silencio. Parece que el misterio no se ha resuelto. Debes decidir cómo dejar las cosas para mañana. <span class="em">¿Cierras el caso o dejas margen para lo inesperado?</span>`,
    hint: "Esto muestra tu preferencia por estructura/cierre (J) o flexibilidad/apertura (P).",
    options: [
      { text: "Dejas todo ordenado, haces un plan detallado y pones un horario para la investigación mañana.", mapsTo: "J", note: "Planificación, control, cierre y estructura." },
      { text: "Dejas algunas 'trampas' o escenarios abiertos para ver qué ocurre de noche.", mapsTo: "P", note: "Flexibilidad, adaptabilidad y manteniendo opciones abiertas." },
      { text: "Aseguras todas las puertas y ventanas, y dejas una nota de 'caso cerrado' para la gerencia.", mapsTo: "J", note: "Organización y la necesidad de una rápida finalización." },
      { text: "Dejas un juguete de Maxi a la vista y esperas a ver dónde aparece mañana, improvisando.", mapsTo: "P", note: "Espontaneidad y la apertura a nuevas pistas o desarrollos no planificados." }
    ]
  }
];

// -----------------------------
// Estado del test
// -----------------------------
let respuestas = [];
let currentRound = 0;

// DOM
const narrativeEl = document.getElementById('narrative');
const choicesEl = document.getElementById('choices');
const progressStep = document.getElementById('step');
const nextBtn = document.getElementById('next');
const skipBtn = document.getElementById('skip');
const resultSection = document.getElementById('result');
const sceneSection = document.getElementById('scene');
const summaryEl = document.getElementById('summary');
const mbtiCodeEl = document.getElementById('mbtiCode');
const mbtiDescEl = document.getElementById('mbtiDesc');
const decisionsEl = document.getElementById('decisions');
const detailsBtn = document.getElementById('details');
const restartBtn = document.getElementById('restart');

// -----------------------------
// Renderizado de una ronda
// -----------------------------
function renderRound() {
  const r = rondasData[currentRound];
  narrativeEl.innerHTML = `
    <strong style="opacity:.9">${r.sceneTitle}</strong>
    <p style="margin:10px 0 0">${r.narrative}</p>
    <p style="margin:8px 0 0;color:var(--muted);font-size:.95rem">${r.hint}</p>
  `;

  choicesEl.innerHTML = '';
  r.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'choice';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.innerHTML = `<span class="choice-text">${opt.text}</span>`;
    div.dataset.mapsTo = opt.mapsTo;
    div.dataset.note = opt.note || '';
    div.addEventListener('click', () => selectOption(i));
    div.addEventListener('keydown', e => { if (e.key === 'Enter') selectOption(i); });
    choicesEl.appendChild(div);
    div.style.transitionDelay = `${i * 60}ms`;
  });

  progressStep.textContent = currentRound + 1;
  nextBtn.classList.add('hidden');
}

// -----------------------------
// Selección de opción
// -----------------------------
function selectOption(optionIndex) {
  const r = rondasData[currentRound];
  Array.from(choicesEl.children).forEach((c, idx) => {
    c.classList.add('disabled');
    if (idx === optionIndex) c.classList.add('selected');
  });

  const chosen = r.options[optionIndex];
  respuestas.push({
    round: currentRound,
    mapsTo: chosen.mapsTo,
    text: chosen.text,
    note: chosen.note
  });

  const feedback = `<p style="margin-top:10px;color:var(--muted)">Has elegido: <span class="em">${chosen.text}</span></p>`;
  narrativeEl.insertAdjacentHTML('beforeend', feedback);

  setTimeout(() => nextBtn.classList.remove('hidden'), 350);
}

// -----------------------------
// Botón Siguiente
// -----------------------------
nextBtn.addEventListener('click', () => {
  currentRound++;
  if (currentRound >= rondasData.length) {
    showResult();
  } else {
    renderRound();
  }
});

// Saltar (testing)
skipBtn.addEventListener('click', () => {
  const r = rondasData[currentRound];
  const choiceIndex = Math.floor(Math.random() * r.options.length);
  selectOption(choiceIndex);
  setTimeout(() => nextBtn.click(), 300);
});

// -----------------------------
// Resultado y cálculo MBTI
// -----------------------------
function showResult() {
  const letters = respuestas.map(r => r.mapsTo);
  while (letters.length < 4) letters.push('X');

  // El MBTI se forma concatenando la letra elegida de cada una de las 4 rondas
  const code = `${letters[0] || 'X'}${letters[1] || 'X'}${letters[2] || 'X'}${letters[3] || 'X'}`;
  const humanSummary = respuestas.map(r => `• "${r.text}" → ${r.mapsTo} (${r.note})`).join("\n");

  summaryEl.textContent = `Tus decisiones forman: ${code}. ¡El gran misterio tenía un protagonista inesperado!`;

  const descriptions = mbtiDescriptions();
  let desc = descriptions[code] || "Tu patrón es singular; combina elementos únicos de pensamiento y sensación. Este resultado es una lectura interpretativa.";

  // Añadimos la resolución de la historia al final
  desc += `\n\nResulta que... ¡todo fue una travesura de Maxi! El juguete estaba escondido debajo de su cama, las huellas eran de su paseo nocturno y el mensaje era solo su forma creativa de pedir más galletas. ¡Maxi, el maestro del drama!`;

  mbtiCodeEl.textContent = code;
  mbtiDescEl.textContent = desc;
  decisionsEl.textContent = humanSummary || "Sin decisiones (skip).";

  sceneSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
}

// -----------------------------
// Botones extra
// -----------------------------
detailsBtn?.addEventListener('click', () => {
  decisionsEl.classList.toggle('hidden');
  detailsBtn.textContent = decisionsEl.classList.contains('hidden') ? 'Ver decisiones' : 'Ocultar decisiones';
});

restartBtn?.addEventListener('click', () => location.reload());

// -----------------------------
// Descripciones MBTI (para las 16 personalidades)
// -----------------------------
function mbtiDescriptions() {
  return {
    "ESTJ":"El Ejecutivo: Práctico, decisivo y orientado a la estructura. Prioriza resultados y responsabilidad. Se enfoca en la eficiencia.",
    "ESTP":"El Emprendedor: Dinámico, atento al presente y tolerante al riesgo. Aprende actuando. Vive el momento con energía.",
    "ESFJ":"El Cónsul: Cálido, orientado a la comunidad y a las necesidades de los demás. Busca la armonía social y el apoyo mutuo.",
    "ESFP":"El Animador: Vibrante y sensorial; vive la experiencia con entusiasmo y espontaneidad. Disfruta siendo el centro de atención.",
    "ENTJ":"El Comandante: Líder estratégico, enfocado en objetivos y organización a gran escala. Ve los problemas como desafíos a conquistar.",
    "ENTP":"El Innovador: Ingenioso, argumentativo y creativo; disfruta explorar posibilidades y debatir. Valora la novedad y el desafío intelectual.",
    "ENFJ":"El Protagonista: Inspirador y motivador; busca conectar valores y personas. Se siente llamado a guiar a otros hacia un propósito.",
    "ENFP":"El Activista: Idealista, curioso y entusiasta; valora autenticidad y significado. Siempre encuentra una nueva pasión.",
    "ISTJ":"El Logista: Responsable, cauteloso y respetuoso de las reglas y el deber. Su fiabilidad es su mayor virtud.",
    "ISTP":"El Virtuoso: Práctico, analítico y orientado a la acción con manos y mente. Disfruta entendiendo cómo funcionan las cosas.",
    "ISFJ":"El Defensor: Reservado, protector y fiel; cuida detalles y tradiciones. Dedicado a ayudar a quienes valora.",
    "ISFP":"El Aventurero: Sutil, estético y centrado en valores personales y experiencia sensorial. Busca la belleza y la libertad.",
    "INTJ":"El Arquitecto: Visionario y analítico; planea cambios basados en modelos profundos. Mente maestra que valora el conocimiento.",
    "INTP":"El Lógico: Explorador conceptual, curioso por teorías y modelos abstractos. Disfruta la búsqueda de la verdad y la precisión.",
    "INFJ":"El Abogado: Profundo, orientado a significados y a la guía de personas hacia posibilidades. Busca un propósito de vida.",
    "INFP":"El Mediador: Idealista y reflexivo; prioriza integridad personal y valores internos. Sueña con un mundo mejor."
  };
}

// -----------------------------
// Inicialización
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderRound();
});