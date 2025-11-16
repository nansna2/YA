// juego-colores — final con música y formas CSS
const niveles = [
  // Nivel 1
  {
    pares: [
      { palabra: "Ira", valor: "rojo" },
      { palabra: "Tristeza", valor: "azul" },
      { palabra: "Alegría", valor: "amarillo" },
      { palabra: "Calma", valor: "verde" },
      { palabra: "Aburrimiento", valor: "gris" },
      { palabra: "Misterio", valor: "morado" },
    ],
  },
  // Nivel 2
  {
    pares: [
      { palabra: "Persona seria", valor: "cuadrado" },
      { palabra: "Persona sociable", valor: "círculo" },
      { palabra: "Persona ambiciosa", valor: "triángulo" },
      // Estrella/Corazón eliminados
      { palabra: "Persona estructurada", valor: "rectángulo" },
      { palabra: "Persona segura", valor: "rombo" },
      { palabra: "Persona flexible", valor: "óvalo" },
    ],
  },
  // Nivel 3 (combinado)
  {
    pares: [
      { palabra: "Ira", valor: "rojo" },
      { palabra: "Tristeza", valor: "azul" },
      { palabra: "Alegría", valor: "amarillo" },
      // Estrella/Corazón eliminados
      { palabra: "Persona estructurada", valor: "rectángulo" },
      { palabra: "Persona seria", valor: "cuadrado" },
      { palabra: "Persona sociable", valor: "círculo" },
      { palabra: "Persona ambiciosa", valor: "triángulo" },
      { palabra: "Persona segura", valor: "rombo" },
    ],
  },
];

// colores hex
const colores = {
  rojo: "#ff4b4b",
  azul: "#4b6eff",
  amarillo: "#ffd84b",
  verde: "#4bff8b",
  gris: "#a0a0a0",
  morado: "#b14bff",
};

// DOM
const inicio = document.getElementById("inicio");
const btnComenzar = document.getElementById("btnComenzar");
const juego = document.getElementById("juego");
const contenedor = document.getElementById("contenedor");
const nivelTexto = document.getElementById("nivelTexto");
const puntosTexto = document.getElementById("puntos");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnReiniciar = document.getElementById("btnReiniciar");
const finalPantalla = document.getElementById("final");
const btnReiniciarFinal = document.getElementById("btnReiniciarFinal");
const puntajeFinal = document.getElementById("puntajeFinal");
const musicaFondo = document.getElementById("musicaFondo");
const btnMusica = document.getElementById("btnMusica");
const sonidoAcierto = document.getElementById("sonidoAcierto");
const sonidoError = document.getElementById("sonidoError");

let nivelActual = 0;
let puntos = 0;
let aciertos = 0;
let totalPares = 0;

/**
 * MÚSICA Y SONIDOS
 */
function tryPlayMusic() {
  try {
    if (musicaFondo.paused) {
      musicaFondo.play().catch(()=>{/* Evita errores de promesa si el autoplay falla */});
      btnMusica.textContent = '♫'; // Símbolo de reproducción
    }
  } catch(e){}
}

// Toggle música
btnMusica.addEventListener('click', () => {
  if (musicaFondo.paused) {
    musicaFondo.play();
    btnMusica.textContent = '♫';
  } else {
    musicaFondo.pause();
    btnMusica.textContent = '♪';
  }
});

function playSuccess() {
  try {
    sonidoAcierto.currentTime = 0;
    sonidoAcierto.play();
  } catch (e) {}
}
function playError() {
  try {
    sonidoError.currentTime = 0;
    sonidoError.play();
  } catch (e) {}
}

// Util: generar posición aleatoria interna
function posAleatoria(width = 100, height = 48) {
  const pad = 30; // Más padding de seguridad
  const rect = contenedor.getBoundingClientRect();
  
  const maxX = Math.max(pad, rect.width - width - pad); 
  const maxY = Math.max(pad, rect.height - height - pad); 
  
  const x = pad + Math.random() * (maxX - pad);
  const y = pad + Math.random() * (maxY - pad);
  return { x, y };
}

// Evitar solapamiento inicial
function placeWithoutOverlap(el, placedEls) {
  const maxAttempts = 150; 
  let w = el.offsetWidth;
  let h = el.offsetHeight;

  if (w === 0 || h === 0) {
      if (el.classList.contains('palabra')) {
          w = 150; 
          h = 50;  
      } else { 
          w = 80; 
          h = 80; 
      }
  }

  for (let i = 0; i < maxAttempts; i++) {
    const { x, y } = posAleatoria(w, h);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const rect1 = { left: x, right: x + w, top: y, bottom: y + h };

    const overlap = placedEls.some(other => {
        let otherW = other.offsetWidth;
        let otherH = other.offsetHeight;

        if (otherW === 0 || otherH === 0) {
            if (other.classList.contains('palabra')) {
                otherW = 150;
                otherH = 50;
            } else { 
                otherW = 80;
                otherH = 80;
            }
        }

        const otherX = parseFloat(other.style.left);
        const otherY = parseFloat(other.style.top);
        
        const rect2 = { left: otherX, right: otherX + otherW, top: otherY, bottom: otherY + otherH };
        
        const pad = 40; 

        return !(
            rect1.right + pad < rect2.left ||
            rect1.left - pad > rect2.right ||
            rect1.bottom + pad < rect2.top ||
            rect1.top - pad > rect2.bottom
        );
    });

    if (!overlap) {
      placedEls.push(el);
      return;
    }
  }
  placedEls.push(el);
}

// Crear elemento visual (color o figura CSS)
function createVisualForValor(valor) {
  const wrapper = document.createElement('div');
  wrapper.className = 'item visual';

  // color
  if (colores[valor]) {
    wrapper.classList.add('color-visual');
    wrapper.style.background = colores[valor];
    wrapper.dataset.valor = valor;
    return wrapper;
  }

  // figure: crear contenedor shape
  const shape = document.createElement('div');
  const normalizedValue = valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  shape.className = 'shape';

  // Lógica de asignación de clases de figura
  let shapeClass = 'square'; 

  if (normalizedValue.includes('cuadrado')) shapeClass = 'square';
  else if (normalizedValue.includes('circulo') || normalizedValue.includes('cíngulo')) shapeClass = 'circle';
  else if (normalizedValue.includes('triangulo')) shapeClass = 'triangle';
  else if (normalizedValue.includes('estrella')) shapeClass = 'star';
  else if (normalizedValue.includes('rectangulo')) shapeClass = 'rectangle';
  else if (normalizedValue.includes('corazon') || normalizedValue.includes('coraz')) shapeClass = 'heart';
  else if (normalizedValue.includes('rombo')) shapeClass = 'diamond';
  else if (normalizedValue.includes('ovalo')) shapeClass = 'oval';

  shape.classList.add(shapeClass);

  wrapper.dataset.valor = valor;
  wrapper.appendChild(shape);
  return wrapper;
}

// iniciar nivel
function iniciarNivel(n) {
  nivelActual = n;
  if(n === 0) puntos = 0; 
  aciertos = 0;
  puntosTexto.textContent = `Puntos: ${puntos}`;
  contenedor.innerHTML = '';
  btnSiguiente.classList.add('oculto');
  inicio.classList.add('oculto');
  finalPantalla.classList.add('oculto');
  juego.classList.remove('oculto');

  if (n === 0) tryPlayMusic();

  const nivel = niveles[nivelActual];
  nivelTexto.textContent = `Nivel ${nivelActual + 1}`;
  totalPares = nivel.pares.length;

  const placed = [];
  nivel.pares.forEach(par => {
    // 1. palabra
    const palabraEl = document.createElement('div');
    palabraEl.className = 'item palabra';
    palabraEl.textContent = par.palabra;
    palabraEl.dataset.valor = par.valor;
    contenedor.appendChild(palabraEl);

    // 2. visual
    const visualEl = createVisualForValor(par.valor);
    if (!visualEl) return; 
    visualEl.classList.add('item'); 
    contenedor.appendChild(visualEl);

    // Forzar renderizado
    void palabraEl.offsetWidth; 
    void visualEl.offsetWidth;
    
    placeWithoutOverlap(palabraEl, placed);
    placeWithoutOverlap(visualEl, placed);

    // Make draggable
    makeDraggable(palabraEl);
    makeDraggable(visualEl);
  });
}

// Dragging con Pointer Events
function makeDraggable(el) {
  let dragging = false;
  let startX = 0, startY = 0;
  let origLeft = 0, origTop = 0;
  let pointerId = null;
  let zIndexCounter = 1000;

  function onPointerDown(e) {
    if (e.button && e.button !== 0) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    pointerId = e.pointerId;
    dragging = true;

    const rect = el.getBoundingClientRect();
    const parentRect = contenedor.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    
    origLeft = parseFloat(el.style.left) || (rect.left - parentRect.left);
    origTop = parseFloat(el.style.top) || (rect.top - parentRect.top);

    el.dataset.origLeft = origLeft;
    el.dataset.origTop = origTop;

    el.style.zIndex = ++zIndexCounter;
    el.style.transition = 'none';
    el.classList.add('dragging');
    el.style.animation = 'none';

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragging || e.pointerId !== pointerId) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.left = `${origLeft + dx}px`;
    el.style.top = `${origTop + dy}px`;
  }

  function onPointerUp(e) {
    if (!dragging || e.pointerId !== pointerId) return;
    dragging = false;
    el.releasePointerCapture(pointerId);
    el.classList.remove('dragging');
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);

    const matched = checkCollisionAndMatch(el);
    if (!matched) {
      revertToOrigin(el);
      playError();
      updatePoints(-5);
    } 

    setTimeout(() => {
      document.querySelectorAll('.item').forEach(it => {
        if (!it.classList.contains('correcto')) it.style.animation = '';
      });
    }, 220);
  }

  el.addEventListener('pointerdown', onPointerDown);
}

// Revert visual
function revertToOrigin(el) {
  const left = el.dataset.origLeft ? parseFloat(el.dataset.origLeft) : 0;
  const top = el.dataset.origTop ? parseFloat(el.dataset.origTop) : 0;
  el.style.transition = 'transform 0.18s ease, left 0.25s ease, top 0.25s ease';
  el.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    el.style.transform = 'translateY(0)';
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }, 80);
  setTimeout(() => {
    el.style.transition = '';
  }, 380);
}

// check collision and matching
function checkCollisionAndMatch(movedEl) {
  const movedRect = movedEl.getBoundingClientRect();
  const items = Array.from(contenedor.querySelectorAll('.item'));
  for (let other of items) {
    if (other === movedEl) continue;
    if (other.classList.contains('correcto') || movedEl.classList.contains('correcto')) continue;
    const rect = other.getBoundingClientRect();
    const overlap = !(movedRect.right < rect.left || movedRect.left > rect.right || movedRect.bottom < rect.top || movedRect.top > rect.bottom);
    if (overlap && normalizeValor(movedEl.dataset.valor) === normalizeValor(other.dataset.valor)) {
      handleMatch(movedEl, other);
      return true;
    }
  }
  return false;
}

// Normalize values for matching
function normalizeValor(v) {
  if (!v) return '';
  return v.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function handleMatch(a, b) {
  playSuccess();
  a.classList.add('correcto');
  b.classList.add('correcto');

  setTimeout(() => {
    if (a.parentNode) a.parentNode.removeChild(a);
    if (b.parentNode) b.parentNode.removeChild(b);
  }, 340);

  updatePoints(10);
  aciertos += 1;

  if (aciertos >= totalPares) {
    if (nivelActual < niveles.length - 1) {
      btnSiguiente.classList.remove('oculto');
    } else {
      setTimeout(() => finalizarJuego(), 700);
    }
  }
}

// puntos
function updatePoints(delta) {
  puntos += delta;
  puntosTexto.textContent = `Puntos: ${puntos}`;
}

// finalizar
function finalizarJuego() {
  juego.classList.add('oculto');
  finalPantalla.classList.remove('oculto');
  puntajeFinal.textContent = `Tu puntaje total: ${puntos}`;
}

// botones UI
btnComenzar.addEventListener('click', () => {
  iniciarNivel(0);
});
btnSiguiente.addEventListener('click', () => {
  if (nivelActual < niveles.length - 1) iniciarNivel(nivelActual + 1);
});
btnReiniciar.addEventListener('click', () => {
  juego.classList.add('oculto');
  inicio.classList.remove('oculto');
  musicaFondo.pause();
});
btnReiniciarFinal.addEventListener('click', () => {
  finalPantalla.classList.add('oculto');
  inicio.classList.remove('oculto');
  musicaFondo.pause();
});

// start minimal
inicio.classList.remove('oculto');
juego.classList.add('oculto');
finalPantalla.classList.add('oculto');