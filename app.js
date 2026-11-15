/**
 * Régua Musical Interativa - Padrões de Escalas
 * Sistema educacional para visualização e audição de escalas musicais
 */

// ==========================================
// 1. Dados Fundamentais da Teoria Musical
// ==========================================

const NOTE_NAMES = {
  // Nomes em Latim (Dó, Ré, Mi...)
  latim: {
    sharp: ["Dó", "Dó♯", "Ré", "Ré♯", "Mi", "Fá", "Fá♯", "Sol", "Sol♯", "Lá", "Lá♯", "Si"],
    flat:  ["Dó", "Ré♭", "Ré", "Mi♭", "Mi", "Fá", "Sol♭", "Sol", "Lá♭", "Lá", "Si♭", "Si"],
    both:  ["Dó", "Dó♯/Ré♭", "Ré", "Ré♯/Mi♭", "Mi", "Fá", "Fá♯/Sol♭", "Sol", "Sol♯/Lá♭", "Lá", "Lá♯/Si♭", "Si"]
  },
  // Nomes em Cifras Americanas (C, D, E...)
  cifra: {
    sharp: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
    flat:  ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
    both:  ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"]
  }
};

// Letras diatônicas ordenadas e seus pitches naturais (C=0, D=2, E=4, F=5, G=7, A=9, B=11)
const DIATONIC_LETTERS = ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"];
const DIATONIC_PITCHES = [0, 2, 4, 5, 7, 9, 11];

function getBaseLetter(noteName) {
  if (!noteName) return "";
  const match = noteName.match(/^(Dó|Ré|Mi|Fá|Sol|Lá|Si|[A-G])/i);
  return match ? match[1] : noteName;
}

function translateToCifra(noteName) {
  if (!noteName) return "";
  const map = {
    "Dó": "C", "Ré": "D", "Mi": "E", "Fá": "F",
    "Sol": "G", "Lá": "A", "Si": "B"
  };
  return noteName.replace(/(Dó|Ré|Mi|Fá|Sol|Lá|Si)/g, m => map[m] || m);
}

function translateToLatim(noteName) {
  if (!noteName) return "";
  const map = {
    "C": "Dó", "D": "Ré", "E": "Mi", "F": "Fá",
    "G": "Sol", "A": "Lá", "B": "Si"
  };
  return noteName.replace(/([A-G])/g, m => map[m] || m);
}

/**
 * Algoritmo Universal de Ortografia Diatônica (Diatonic Spelling)
 * Garante que em uma escala de 7 notas, cada letra fundamental (Dó..Si) seja usada exatamente uma vez.
 * Transforma, por exemplo, o 3º grau de Dó# Maior em Mi# (em vez de Fá) e o 7º em Si# (em vez de Dó).
 */
function computeDiatonicSpelling(rootName, steps) {
  const baseMatch = rootName.match(/^(Dó|Ré|Mi|Fá|Sol|Lá|Si)/);
  if (!baseMatch) return null;
  const rootBase = baseMatch[1];
  const rootLetterIdx = DIATONIC_LETTERS.indexOf(rootBase);
  if (rootLetterIdx === -1) return null;

  let rootPitch = DIATONIC_PITCHES[rootLetterIdx];
  if (rootName.includes("♯♯") || rootName.includes("𝄪")) rootPitch += 2;
  else if (rootName.includes("♯") || rootName.includes("#")) rootPitch += 1;
  else if (rootName.includes("♭♭") || rootName.includes("bb")) rootPitch -= 2;
  else if (rootName.includes("♭") || rootName.includes("b")) rootPitch -= 1;
  rootPitch = (rootPitch + 12) % 12;

  const notes = [];
  let currentOffset = 0;

  for (let i = 0; i < steps.length; i++) {
    const targetLetterIdx = (rootLetterIdx + i) % 7;
    const targetLetterName = DIATONIC_LETTERS[targetLetterIdx];
    const naturalPitch = DIATONIC_PITCHES[targetLetterIdx];
    const targetPitch = (rootPitch + currentOffset) % 12;

    const diff = (targetPitch - naturalPitch + 12) % 12;
    let accidental = "";
    if (diff === 0) accidental = "";
    else if (diff === 1) accidental = "♯";
    else if (diff === 2) accidental = "𝄪";
    else if (diff === 11) accidental = "♭";
    else if (diff === 10) accidental = "♭♭";
    else {
      accidental = diff > 6 ? "♭" : "♯";
    }

    notes.push(targetLetterName + accidental);
    currentOffset += steps[i];
  }

  // Grau VIII (Oitava)
  notes.push(rootName);
  return notes;
}

const SCALES = {
  major: {
    name: "Escala Maior Natural",
    formulaText: "T - T - ST - T - T - T - ST",
    steps: [2, 2, 1, 2, 2, 2, 1],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sobredominante)", "VII (Sensível)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Maior", "4ª Justa", "5ª Justa", "6ª Maior", "7ª Maior", "Oitava Justa"]
  },
  minor_natural: {
    name: "Escala Menor Natural (Modo Eólio)",
    formulaText: "T - ST - T - T - ST - T - T",
    steps: [2, 1, 2, 2, 1, 2, 2],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sobredominante)", "VII (Subtônica)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Menor", "4ª Justa", "5ª Justa", "6ª Menor", "7ª Menor", "Oitava Justa"]
  },
  minor_harmonic: {
    name: "Escala Menor Harmônica",
    formulaText: "T - ST - T - T - ST - 1½T - ST",
    steps: [2, 1, 2, 2, 1, 3, 1],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sobredominante)", "VII (Sensível)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Menor", "4ª Justa", "5ª Justa", "6ª Menor", "7ª Maior", "Oitava Justa"]
  },
  minor_melodic: {
    name: "Escala Menor Melódica",
    formulaText: "T - ST - T - T - T - T - ST",
    steps: [2, 1, 2, 2, 2, 2, 1],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sobredominante)", "VII (Sensível)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Menor", "4ª Justa", "5ª Justa", "6ª Maior", "7ª Maior", "Oitava Justa"]
  },
  penta_major: {
    name: "Pentatônica Maior",
    formulaText: "T - T - 1½T - T - 1½T",
    steps: [2, 2, 3, 2, 3],
    degrees: ["I (Tônica)", "II (Segunda)", "III (Terça)", "V (Quinta)", "VI (Sexta)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Maior", "5ª Justa", "6ª Maior", "Oitava Justa"]
  },
  penta_minor: {
    name: "Pentatônica Menor",
    formulaText: "1½T - T - T - 1½T - T",
    steps: [3, 2, 2, 3, 2],
    degrees: ["I (Tônica)", "III (Terça menor)", "IV (Quarta)", "V (Quinta)", "VII (Sétima menor)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "3ª Menor", "4ª Justa", "5ª Justa", "7ª Menor", "Oitava Justa"]
  },
  blues: {
    name: "Escala Blues (com Blue Note)",
    formulaText: "1½T - T - ST - ST - 1½T - T",
    steps: [3, 2, 1, 1, 3, 2],
    degrees: ["I (Tônica)", "III (Terça menor)", "IV (Quarta)", "IV♯ (Blue Note)", "V (Quinta)", "VII (Sétima menor)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "3ª Menor", "4ª Justa", "4ª Aumentada", "5ª Justa", "7ª Menor", "Oitava Justa"]
  },
  dorian: {
    name: "Modo Dórico (2º Grau)",
    formulaText: "T - ST - T - T - T - ST - T",
    steps: [2, 1, 2, 2, 2, 1, 2],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sexta Maior)", "VII (Subtônica)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Menor", "4ª Justa", "5ª Justa", "6ª Maior", "7ª Menor", "Oitava Justa"]
  },
  phrygian: {
    name: "Modo Frígio (3º Grau)",
    formulaText: "ST - T - T - T - ST - T - T",
    steps: [1, 2, 2, 2, 1, 2, 2],
    degrees: ["I (Tônica)", "II (Segunda Menor)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sobredominante)", "VII (Subtônica)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Menor", "3ª Menor", "4ª Justa", "5ª Justa", "6ª Menor", "7ª Menor", "Oitava Justa"]
  },
  lydian: {
    name: "Modo Lídio (4º Grau)",
    formulaText: "T - T - T - ST - T - T - ST",
    steps: [2, 2, 2, 1, 2, 2, 1],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Quarta Aumentada)", "V (Dominante)", "VI (Sobredominante)", "VII (Sensível)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Maior", "4ª Aumentada", "5ª Justa", "6ª Maior", "7ª Maior", "Oitava Justa"]
  },
  mixolydian: {
    name: "Modo Mixolídio (5º Grau)",
    formulaText: "T - T - ST - T - T - ST - T",
    steps: [2, 2, 1, 2, 2, 1, 2],
    degrees: ["I (Tônica)", "II (Supertônica)", "III (Mediante)", "IV (Subdominante)", "V (Dominante)", "VI (Sobredominante)", "VII (Sétima Menor)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Maior", "3ª Maior", "4ª Justa", "5ª Justa", "6ª Maior", "7ª Menor", "Oitava Justa"]
  },
  locrian: {
    name: "Modo Lócrio (7º Grau)",
    formulaText: "ST - T - T - ST - T - T - T",
    steps: [1, 2, 2, 1, 2, 2, 2],
    degrees: ["I (Tônica)", "II (Segunda Menor)", "III (Mediante)", "IV (Subdominante)", "V (Quinta Diminuta)", "VI (Sobredominante)", "VII (Subtônica)", "VIII (Oitava)"],
    intervalsDesc: ["Tônica", "2ª Menor", "3ª Menor", "4ª Justa", "5ª Diminuta", "6ª Menor", "7ª Menor", "Oitava Justa"]
  }
};

// ==========================================
// 2. Estado da Aplicação
// ==========================================

const state = {
  currentScaleKey: "major",
  currentRootPitch: 0, // 0 = Dó, 1 = Dó#/Réb, etc.
  preferredRootSpelling: null, // "Dó♯", "Ré♭", "Fá♯", "Sol♭"
  notation: "sharp",   // 'sharp', 'flat', 'both'
  naming: "latim",     // 'latim', 'cifra'
  currentClef: "treble", // 'treble', 'alto', 'bass'
  showKeySignature: true, // true = Ligado, false = Desligado (acidentes nas notas)
  
  // Controle da Fita Infinita
  cellWidth: 80,
  totalCycles: 7,      // 7 repetições de 12 semitons = 84 células
  trackOffset: 0,      // Deslocamento X atual em pixels
  isDragging: false,
  dragStartX: 0,
  dragStartOffset: 0,
  
  // Âncora fixa onde a escala começa
  anchorX: 0
};

// ==========================================
// 3. Elementos do DOM
// ==========================================

const dom = {
  scaleSelect: document.getElementById("scaleSelect"),
  accidentalToggle: document.getElementById("accidentalToggle"),
  namingToggle: document.getElementById("namingToggle"),
  keySigToggle: document.getElementById("keySigToggle"),
  clefToggle: document.getElementById("clefToggle"),
  
  intervalsContainer: document.getElementById("intervalsContainer"),
  intervalsSvg: document.getElementById("intervalsSvg"),
  
  tapeViewport: document.getElementById("tapeViewport"),
  tapeTrack: document.getElementById("tapeTrack"),
  
  btnPrevSemitone: document.getElementById("btnPrevSemitone"),
  btnNextSemitone: document.getElementById("btnNextSemitone"),
  quickRootsList: document.getElementById("quickRootsList"),
  
  currentScaleTitle: document.getElementById("currentScaleTitle"),
  scaleFormulaBadge: document.getElementById("scaleFormulaBadge"),
  scaleDegreesGrid: document.getElementById("scaleDegreesGrid"),
  theoryBannerContainer: document.getElementById("theoryBannerContainer"),
  btnPlayScale: document.getElementById("btnPlayScale"),

  // Pentagrama / Notação Musical na Pauta
  staffViewport: document.getElementById("staffViewport"),
  staffOutput: document.getElementById("staffOutput"),
  staffInfoBar: document.getElementById("staffInfoBar")
};

// ==========================================
// 4. Inicialização
// ==========================================

function init() {
  updateCellDimensions();
  buildTapeCells();
  buildQuickRoots();
  setupEventListeners();
  
  // Alinha inicialmente em Dó (root = 0)
  alignToPitch(0, false);
  
  renderAll();
  
  window.addEventListener("resize", () => {
    updateCellDimensions();
    renderIntervalsSvg();
    alignToPitch(state.currentRootPitch, false);
    renderTapeHighlights();
    renderMusicalStaff();
  });
}

function updateCellDimensions() {
  const rootStyle = getComputedStyle(document.documentElement);
  state.cellWidth = parseInt(rootStyle.getPropertyValue("--cell-width")) || 80;
  
  // Calcula o ponto de ancoragem (onde a primeira nota da escala deve ficar)
  const viewportWidth = dom.tapeViewport.clientWidth || 900;
  const scaleSpan = 13 * state.cellWidth;
  
  if (viewportWidth > scaleSpan + 60) {
    state.anchorX = Math.round((viewportWidth - scaleSpan) / 2);
  } else {
    state.anchorX = 40;
  }
  
  // Posiciona o container de arcos SVG exatamente em anchorX
  if (dom.intervalsContainer) {
    dom.intervalsContainer.style.transform = `translateX(${state.anchorX}px)`;
  }

  // Renderiza e posiciona os indicadores de graus (Tônica em âmbar, demais graus em azul)
  renderDegreePointers();
}

/**
 * Renderiza os badges superiores com setas apontando para cada grau da escala:
 * - Grau I (Tônica): Badge dourado/âmbar "TÔNICA (Grau I)"
 * - Demais Graus (II, III, IV, V, VI, VII, VIII): Badges em azul elétrico
 */
function renderDegreePointers() {
  const container = document.getElementById("stageGuideContainer");
  if (!container) return;
  container.innerHTML = "";

  const scale = SCALES[state.currentScaleKey];
  const relativeOffsets = getScaleRelativeOffsets();
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

  const defaultDegreeNames = [
    "Tônica",
    "Supertônica",
    "Mediante",
    "Subdominante",
    "Dominante",
    "Sobredominante",
    "Sensível"
  ];

  // Renderiza apenas os graus I a VII (omite o Grau VIII conforme solicitado)
  const count = Math.min(relativeOffsets.length - 1, 7);

  for (let idx = 0; idx < count; idx++) {
    const offset = relativeOffsets[idx];
    const isTonic = idx === 0;
    const roman = romanNumerals[idx] || (idx + 1);

    // Obtém o nome específico do grau (Supertônica, Mediante, Subdominante, Dominante, Sobredominante, Sensível...)
    let degreeName = defaultDegreeNames[idx] || `Grau ${roman}`;
    if (scale.degrees && scale.degrees[idx]) {
      const match = scale.degrees[idx].match(/\((.*?)\)/);
      if (match) {
        degreeName = match[1];
      }
    }

    const pointerEl = document.createElement("div");
    pointerEl.className = `degree-pointer-label ${isTonic ? "is-tonic" : "is-degree"}`;

    const fullLabel = isTonic ? "TÔNICA" : degreeName;
    const shortLabel = isTonic ? "I" : roman;

    pointerEl.innerHTML = `
      <span class="pointer-badge" title="Grau ${roman}: ${degreeName}">
        <span class="label-full">${fullLabel}</span>
        <span class="label-short">${shortLabel}</span>
      </span>
      <div class="pointer-arrow">▼</div>
    `;

    const targetX = state.anchorX + (offset * state.cellWidth) + (state.cellWidth / 2);
    pointerEl.style.transform = `translateX(${targetX}px) translateX(-50%)`;

    container.appendChild(pointerEl);
  }
}

// ==========================================
// 5. Construção da Fita Cromática Infinita
// ==========================================

function buildTapeCells() {
  dom.tapeTrack.innerHTML = "";
  const totalCells = state.totalCycles * 12;

  for (let i = 0; i < totalCells; i++) {
    const pitchClass = i % 12;
    const cell = document.createElement("div");
    cell.className = "chromatic-cell";
    cell.dataset.index = i;
    cell.dataset.pitch = pitchClass;
    
    cell.innerHTML = `
      <span class="cell-note-name">${getNoteName(pitchClass)}</span>
      <span class="cell-enharmonic">${getEnharmonicSubtitle(pitchClass)}</span>
      <span class="cell-degree-tag"></span>
    `;

    cell.addEventListener("click", () => {
      if (!state.isDragging) {
        alignToPitch(pitchClass, true);
        playTone(pitchClass + 60);
      }
    });

    dom.tapeTrack.appendChild(cell);
  }
}

function getNoteName(pitchClass) {
  const namingTable = NOTE_NAMES[state.naming] || NOTE_NAMES.latim;
  const list = namingTable[state.notation] || namingTable.sharp;
  return list[pitchClass % 12];
}

function getEnharmonicSubtitle(pitchClass) {
  if (state.notation === "both") return "";
  const isAccidental = [1, 3, 6, 8, 10].includes(pitchClass % 12);
  if (!isAccidental) return "";
  
  if (state.notation === "sharp") {
    return NOTE_NAMES[state.naming].flat[pitchClass % 12];
  } else {
    return NOTE_NAMES[state.naming].sharp[pitchClass % 12];
  }
}

// ==========================================
// 6. Régua Superior Fixa: Setas SVG (Estilo Apresentação)
// ==========================================

function renderIntervalsSvg() {
  const scale = SCALES[state.currentScaleKey];
  const steps = scale.steps;
  const totalSemitones = steps.reduce((sum, s) => sum + s, 0); // Geralmente 12
  const svgWidth = (totalSemitones + 1) * state.cellWidth;
  const svgHeight = 64;

  dom.intervalsContainer.style.width = `${svgWidth}px`;
  dom.intervalsContainer.style.transform = `translateX(${state.anchorX}px)`;

  dom.intervalsSvg.setAttribute("width", svgWidth);
  dom.intervalsSvg.setAttribute("height", svgHeight);
  dom.intervalsSvg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  dom.intervalsSvg.innerHTML = "";

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <marker id="arrowhead" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
      <polygon points="0 1, 7 4.5, 0 8" fill="#38bdf8" />
    </marker>
    <marker id="arrowhead-tonic" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
      <polygon points="0 1, 7 4.5, 0 8" fill="#f59e0b" />
    </marker>
  `;
  dom.intervalsSvg.appendChild(defs);

  let currentSemitone = 0;

  steps.forEach((step, idx) => {
    const xStart = currentSemitone * state.cellWidth + (state.cellWidth / 2);
    const xEnd = (currentSemitone + step) * state.cellWidth + (state.cellWidth / 2);
    const strokeColor = "#38bdf8";

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    let pathD = "";
    let label = "";

    if (step === 1) {
      // SEMITOM: Pico angular pontiagudo com ângulo fechado, saindo e chegando ao topo da célula
      label = "SEMITOM";
      const yBase = 63;
      const yPeak = 24;
      const xMid = (xStart + xEnd) / 2;
      pathD = `M ${xStart} ${yBase} L ${xMid} ${yPeak} L ${xEnd} ${yBase - 6}`;
    } else if (step === 2) {
      // TOM: Arco curvo de topo plano (altura reduzida em 60%, saindo e chegando ao topo da célula)
      label = "TOM";
      const yBase = 63;
      const yTop = 39;
      const r = 10;
      pathD = `
        M ${xStart} ${yBase}
        L ${xStart} ${yTop + r}
        Q ${xStart} ${yTop} ${xStart + r} ${yTop}
        L ${xEnd - r} ${yTop}
        Q ${xEnd} ${yTop} ${xEnd} ${yTop + r}
        L ${xEnd} ${yBase - 6}
      `;
    } else {
      // 1.5 TOM ou outro salto (altura reduzida em 60%, saindo e chegando ao topo da célula)
      label = step === 3 ? "1½ TOM" : `${step} SEMITONS`;
      const yBase = 63;
      const yTop = 37;
      const r = 11;
      pathD = `
        M ${xStart} ${yBase}
        L ${xStart} ${yTop + r}
        Q ${xStart} ${yTop} ${xStart + r} ${yTop}
        L ${xEnd - r} ${yTop}
        Q ${xEnd} ${yTop} ${xEnd} ${yTop + r}
        L ${xEnd} ${yBase - 6}
      `;
    }

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD.trim());
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("marker-end", "url(#arrowhead)");
    g.appendChild(path);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (xStart + xEnd) / 2);
    text.setAttribute("y", step === 1 ? 15 : (step >= 3 ? 28 : 30));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#e2e8f0");
    text.setAttribute("font-size", step === 1 ? "11" : "12");
    text.setAttribute("font-weight", "800");
    text.setAttribute("font-family", "Outfit, sans-serif");
    text.setAttribute("letter-spacing", "0.8");
    text.textContent = label;
    g.appendChild(text);

    dom.intervalsSvg.appendChild(g);

    currentSemitone += step;
  });
}

// ==========================================
// 7. Cálculo das Notas, Ortografia e Conflitos Diatônicos
// ==========================================

function getScalePitchIndices() {
  const scale = SCALES[state.currentScaleKey];
  const pitches = [state.currentRootPitch];
  let curr = state.currentRootPitch;
  
  for (let i = 0; i < scale.steps.length; i++) {
    curr = (curr + scale.steps[i]) % 12;
    pitches.push(curr);
  }
  return pitches;
}

function getScaleRelativeOffsets() {
  const scale = SCALES[state.currentScaleKey];
  const offsets = [0];
  let acc = 0;
  for (let step of scale.steps) {
    acc += step;
    offsets.push(acc);
  }
  return offsets;
}

/**
 * Análise completa da escala ativa:
 * - Em "sharp" e "flat": gera nomes padrão e detecta violações da regra diatônica (letras repetidas em vermelho).
 * - Em "both": aplica a ortografia diatônica rigorosa (Dó# vira Dó#-Ré#-Mi#-Fá#-Sol#-Lá#-Si#-Dó#, sem repetições).
 */
function getActiveScaleAnalysis() {
  const scale = SCALES[state.currentScaleKey];
  const steps = scale.steps;
  const isHeptatonic = steps.length === 7;
  const pitchIndices = getScalePitchIndices();

  // Determina o nome da raiz (Tônica) em Latim
  let rootName = "";
  if (state.notation === "sharp") {
    rootName = NOTE_NAMES.latim.sharp[state.currentRootPitch];
  } else if (state.notation === "flat") {
    rootName = NOTE_NAMES.latim.flat[state.currentRootPitch];
  } else {
    // Modo "both":
    if (state.preferredRootSpelling) {
      rootName = state.preferredRootSpelling;
    } else {
      // Padrões enarmônicos comuns
      if (state.currentRootPitch === 1) rootName = "Dó♯";
      else if (state.currentRootPitch === 6) rootName = "Fá♯";
      else if ([3, 8, 10].includes(state.currentRootPitch)) rootName = NOTE_NAMES.latim.flat[state.currentRootPitch];
      else rootName = NOTE_NAMES.latim.sharp[state.currentRootPitch];
    }
  }

  let degreeNotes = [];
  const conflictDegreeIndices = new Set();
  const conflictPairs = [];

  if (state.notation === "both" && isHeptatonic) {
    // MODO AMBOS: Aplica ortografia diatônica estrita
    // Em Dó# Maior: Fá vira Mi# e Dó vira Si#!
    degreeNotes = computeDiatonicSpelling(rootName, steps);
  } else {
    // MODO SUSTENIDOS OU BEMÓIS:
    const table = state.notation === "flat" ? NOTE_NAMES.latim.flat : NOTE_NAMES.latim.sharp;
    degreeNotes = pitchIndices.map(p => table[p]);

    // Verificação da Regra Diatônica (não repetir letras base de grau 0 a 6)
    if (isHeptatonic) {
      const baseCounts = {};
      for (let i = 0; i < 7; i++) {
        const base = getBaseLetter(degreeNotes[i]);
        baseCounts[base] = (baseCounts[base] || 0) + 1;
      }

      for (let i = 0; i < 7; i++) {
        const base = getBaseLetter(degreeNotes[i]);
        if (baseCounts[base] > 1) {
          conflictDegreeIndices.add(i);
        }
      }

      // Se grau 0 (Tônica) está em conflito, grau 7 (oitava) também reflete o conflito
      if (conflictDegreeIndices.has(0)) {
        conflictDegreeIndices.add(7);
      }

      // Coleta pares para didática
      for (let base in baseCounts) {
        if (baseCounts[base] > 1) {
          const matching = [];
          for (let i = 0; i < 7; i++) {
            if (getBaseLetter(degreeNotes[i]) === base && !matching.includes(degreeNotes[i])) {
              matching.push(degreeNotes[i]);
            }
          }
          conflictPairs.push(matching.join(" e "));
        }
      }
    }
  }

  return {
    rootName,
    degreeNotes,
    conflictDegreeIndices,
    conflictPairs,
    isHeptatonic
  };
}

// ==========================================
// 8. Atualização Visual da Fita (Highlights)
// ==========================================

function renderTapeHighlights() {
  const scale = SCALES[state.currentScaleKey];
  const relativeOffsets = getScaleRelativeOffsets();
  const scaleAnalysis = getActiveScaleAnalysis();
  
  const activeTonicCellIndex = Math.round((state.anchorX - state.trackOffset) / state.cellWidth);
  const cells = dom.tapeTrack.querySelectorAll(".chromatic-cell");
  
  cells.forEach((cell, idx) => {
    const pitch = parseInt(cell.dataset.pitch);
    const noteNameEl = cell.querySelector(".cell-note-name");
    const enharmonicEl = cell.querySelector(".cell-enharmonic");
    const degreeTagEl = cell.querySelector(".cell-degree-tag");
    
    const diffFromTonicCell = idx - activeTonicCellIndex;
    const degreeIndex = relativeOffsets.indexOf(diffFromTonicCell);

    if (degreeIndex !== -1) {
      cell.classList.add("in-scale");
      const isRoot = degreeIndex === 0 || degreeIndex === relativeOffsets.length - 1;
      
      if (isRoot) {
        cell.classList.add("is-tonic");
      } else {
        cell.classList.remove("is-tonic");
      }

      // Nome da nota no contexto desta escala
      let activeNoteName = scaleAnalysis.degreeNotes[degreeIndex] || getNoteName(pitch);
      if (state.naming === "cifra") {
        activeNoteName = translateToCifra(activeNoteName);
      }
      noteNameEl.textContent = activeNoteName;

      // Subtítulo enarmônico no contexto
      if (state.notation === "both") {
        // Se a nota é especial (ex: Mi#, Si#, Dó♭, Fá♭, Fá𝄪), exibe o som equivalente abaixo
        if (activeNoteName.includes("Mi♯") || activeNoteName.includes("E♯")) {
          enharmonicEl.textContent = state.naming === "cifra" ? "F" : "Fá";
        } else if (activeNoteName.includes("Si♯") || activeNoteName.includes("B♯")) {
          enharmonicEl.textContent = state.naming === "cifra" ? "C" : "Dó";
        } else if (activeNoteName.includes("Dó♭") || activeNoteName.includes("C♭")) {
          enharmonicEl.textContent = state.naming === "cifra" ? "B" : "Si";
        } else if (activeNoteName.includes("Fá♭") || activeNoteName.includes("F♭")) {
          enharmonicEl.textContent = state.naming === "cifra" ? "E" : "Mi";
        } else if (activeNoteName.includes("𝄪")) {
          enharmonicEl.textContent = getNoteName(pitch);
        } else {
          enharmonicEl.textContent = "";
        }
      } else {
        enharmonicEl.textContent = getEnharmonicSubtitle(pitch);
      }

      // Grau exibido na tag
      const degRoman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][degreeIndex] || (degreeIndex + 1);
      degreeTagEl.textContent = degRoman;

      // DESTAQUE EM VERMELHO PARA CONFLITOS DE REPETIÇÃO
      if (scaleAnalysis.conflictDegreeIndices.has(degreeIndex)) {
        cell.classList.add("has-conflict");
      } else {
        cell.classList.remove("has-conflict");
      }
    } else {
      cell.classList.remove("in-scale", "is-tonic", "has-conflict");
      noteNameEl.textContent = getNoteName(pitch);
      enharmonicEl.textContent = getEnharmonicSubtitle(pitch);
      degreeTagEl.textContent = "";
    }
  });

  updateQuickRootsActive();
}

// ==========================================
// 9. Atualização do Dashboard e Resultados
// ==========================================

function renderDashboard() {
  const scale = SCALES[state.currentScaleKey];
  const scaleAnalysis = getActiveScaleAnalysis();
  
  let displayRootName = scaleAnalysis.rootName;
  if (state.naming === "cifra") {
    displayRootName = translateToCifra(displayRootName);
  }
  
  let cleanScaleType = scale.name.replace(/^Escala\s+/i, "");
  dom.currentScaleTitle.textContent = `${displayRootName} ${cleanScaleType}`;
  dom.scaleFormulaBadge.textContent = scale.formulaText;

  // Renderiza o Banner Didático Teórico
  renderTheoryBanner(scaleAnalysis);

  // Grid de Graus
  dom.scaleDegreesGrid.innerHTML = "";
  const relativeOffsets = getScaleRelativeOffsets();

  scaleAnalysis.degreeNotes.forEach((noteNameRaw, i) => {
    const isRoot = i === 0 || i === scaleAnalysis.degreeNotes.length - 1;
    const hasConflict = scaleAnalysis.conflictDegreeIndices.has(i);
    const card = document.createElement("div");
    card.className = `degree-card ${isRoot ? "is-root" : ""} ${hasConflict ? "has-conflict" : ""}`;

    const degreeNum = scale.degrees[i] ? scale.degrees[i].split(" ")[0] : `Grau ${i+1}`;
    const intervalName = scale.intervalsDesc[i] || "";
    
    let noteName = noteNameRaw;
    if (state.naming === "cifra") {
      noteName = translateToCifra(noteName);
    }

    card.innerHTML = `
      <span class="degree-num">${degreeNum}</span>
      <span class="degree-note">${noteName}</span>
      <span class="degree-name">${intervalName}</span>
      ${hasConflict ? '<span class="conflict-badge">⚠️ Repetição</span>' : ''}
    `;

    const offset = relativeOffsets[i] !== undefined ? relativeOffsets[i] : 0;
    const midiNote = 60 + state.currentRootPitch + offset;
    card.addEventListener("click", () => {
      playTone(midiNote);
    });

    dom.scaleDegreesGrid.appendChild(card);
  });

  // Atualiza a Notação Musical na Pauta (Pentagrama)
  renderMusicalStaff();
}

function renderTheoryBanner(scaleAnalysis) {
  const bannerContainer = dom.theoryBannerContainer;
  if (!bannerContainer) return;

  if (scaleAnalysis.conflictDegreeIndices.size > 0) {
    const pairsText = scaleAnalysis.conflictPairs.map(p => {
      let text = p;
      if (state.naming === "cifra") text = translateToCifra(text);
      return `<span class="conflict-names">${text}</span>`;
    }).join(" e ");

    bannerContainer.innerHTML = `
      <div class="theory-alert-banner alert-warning">
        <span class="alert-icon">⚠️</span>
        <div class="alert-body">
          <strong>Regra Musical de Nomenclatura Violada:</strong>
          Em escalas diatônicas, cada grau precisa ter uma letra fundamental exclusiva (sem repetir notas). 
          Aqui os nomes base ${pairsText} se repetem na mesma escala.
          <span class="alert-hint">💡 Clique na aba <strong>Ambos (♯/♭)</strong> para aplicar a ortografia harmônica correta (<span class="fixed-names">Mi♯</span> e <span class="fixed-names">Si♯</span>).</span>
        </div>
      </div>
    `;
  } else if (state.notation === "both" && scaleAnalysis.isHeptatonic) {
    const specialNotes = scaleAnalysis.degreeNotes.filter(n => n.includes("Mi♯") || n.includes("Si♯") || n.includes("Dó♭") || n.includes("Fá♭") || n.includes("𝄪"));
    
    if (specialNotes.length > 0) {
      const specialText = specialNotes.map(n => {
        let t = n;
        if (state.naming === "cifra") t = translateToCifra(t);
        return `<span class="fixed-names">${t}</span>`;
      }).join(", ");

      bannerContainer.innerHTML = `
        <div class="theory-alert-banner alert-success">
          <span class="alert-icon">✨</span>
          <div class="alert-body">
            <strong>Ortografia Diatônica Perfeita:</strong>
            Regra musical aplicada com sucesso: nenhuma nota base se repete. As notas ${specialText} foram grafadas corretamente para preservar a sequência dos 7 graus da escala.
          </div>
        </div>
      `;
    } else {
      bannerContainer.innerHTML = "";
    }
  } else {
    bannerContainer.innerHTML = "";
  }
}

// ==========================================
// 10. Alinhamento e Navegação da Fita
// ==========================================

function alignToPitch(pitchClass, animate = true) {
  state.currentRootPitch = (pitchClass + 12) % 12;

  const targetCycle = 3;
  const targetCellIndex = targetCycle * 12 + state.currentRootPitch;
  const targetOffset = state.anchorX - (targetCellIndex * state.cellWidth);

  if (animate) {
    dom.tapeTrack.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
  } else {
    dom.tapeTrack.style.transition = "none";
  }

  state.trackOffset = targetOffset;
  dom.tapeTrack.style.transform = `translateX(${state.trackOffset}px)`;

  renderTapeHighlights();
  renderDashboard();

  if (animate) {
    setTimeout(() => {
      dom.tapeTrack.style.transition = "none";
    }, 360);
  }
}

function stepSemitone(direction) {
  const newPitch = (state.currentRootPitch + direction + 12) % 12;
  // Reseta preferência explícita ao avançar passo a passo
  state.preferredRootSpelling = null;
  alignToPitch(newPitch, true);
  playTone(newPitch + 60);
}

// ==========================================
// 11. Mecanismo de Rolagem e Arraste (Touch & Mouse Drag)
// ==========================================

function setupDragEvents() {
  const viewport = dom.tapeViewport;

  const onPointerDown = (e) => {
    state.isDragging = true;
    state.dragStartX = e.clientX;
    state.dragStartOffset = state.trackOffset;
    dom.tapeTrack.style.transition = "none";
    viewport.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!state.isDragging) return;
    const deltaX = e.clientX - state.dragStartX;
    state.trackOffset = state.dragStartOffset + deltaX;

    const singleCycleWidth = 12 * state.cellWidth;
    const minBound = state.anchorX - (5 * singleCycleWidth);
    const maxBound = state.anchorX - (1 * singleCycleWidth);

    if (state.trackOffset < minBound) {
      state.trackOffset += singleCycleWidth;
      state.dragStartOffset += singleCycleWidth;
    } else if (state.trackOffset > maxBound) {
      state.trackOffset -= singleCycleWidth;
      state.dragStartOffset -= singleCycleWidth;
    }

    dom.tapeTrack.style.transform = `translateX(${state.trackOffset}px)`;

    const currentCellUnderAnchor = Math.round((state.anchorX - state.trackOffset) / state.cellWidth);
    const newPitch = ((currentCellUnderAnchor % 12) + 12) % 12;
    if (newPitch !== state.currentRootPitch) {
      state.currentRootPitch = newPitch;
      state.preferredRootSpelling = null;
      renderTapeHighlights();
      renderDashboard();
    }
  };

  const onPointerUp = (e) => {
    if (!state.isDragging) return;
    state.isDragging = false;
    viewport.releasePointerCapture(e.pointerId);

    const nearestCell = Math.round((state.anchorX - state.trackOffset) / state.cellWidth);
    state.currentRootPitch = ((nearestCell % 12) + 12) % 12;
    state.preferredRootSpelling = null;
    
    const finalOffset = state.anchorX - (nearestCell * state.cellWidth);
    dom.tapeTrack.style.transition = "transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)";
    state.trackOffset = finalOffset;
    dom.tapeTrack.style.transform = `translateX(${state.trackOffset}px)`;

    setTimeout(() => {
      dom.tapeTrack.style.transition = "none";
      renderTapeHighlights();
      renderDashboard();
    }, 230);
  };

  const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 5) {
      const step = delta > 0 ? 1 : -1;
      stepSemitone(step);
    }
  };

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerUp);
  viewport.addEventListener("wheel", onWheel, { passive: false });
}

// ==========================================
// 12. Botões Rápidos de Tônica
// ==========================================

function buildQuickRoots() {
  dom.quickRootsList.innerHTML = "";

  if (state.notation === "both") {
    // Na aba "Ambos", oferece opções claras para as enarmonias comuns (Dó# vs Réb, Fá# vs Solb)
    const roots = [
      { name: "Dó", pitch: 0, spelling: "Dó" },
      { name: "Dó♯", pitch: 1, spelling: "Dó♯" },
      { name: "Ré♭", pitch: 1, spelling: "Ré♭" },
      { name: "Ré", pitch: 2, spelling: "Ré" },
      { name: "Mi♭", pitch: 3, spelling: "Mi♭" },
      { name: "Mi", pitch: 4, spelling: "Mi" },
      { name: "Fá", pitch: 5, spelling: "Fá" },
      { name: "Fá♯", pitch: 6, spelling: "Fá♯" },
      { name: "Sol♭", pitch: 6, spelling: "Sol♭" },
      { name: "Sol", pitch: 7, spelling: "Sol" },
      { name: "Lá♭", pitch: 8, spelling: "Lá♭" },
      { name: "Lá", pitch: 9, spelling: "Lá" },
      { name: "Si♭", pitch: 10, spelling: "Si♭" },
      { name: "Si", pitch: 11, spelling: "Si" }
    ];

    roots.forEach(r => {
      const btn = document.createElement("button");
      btn.className = "quick-root-btn";
      btn.dataset.pitch = r.pitch;
      btn.dataset.spelling = r.spelling;
      btn.textContent = state.naming === "cifra" ? translateToCifra(r.name) : r.name;

      btn.addEventListener("click", () => {
        state.preferredRootSpelling = r.spelling;
        alignToPitch(r.pitch, true);
        playTone(r.pitch + 60);
      });

      dom.quickRootsList.appendChild(btn);
    });
  } else {
    // Abas "sharp" ou "flat"
    for (let pitch = 0; pitch < 12; pitch++) {
      const btn = document.createElement("button");
      btn.className = "quick-root-btn";
      btn.dataset.pitch = pitch;
      const noteName = getNoteName(pitch);
      btn.dataset.spelling = noteName;
      btn.textContent = noteName;
      
      btn.addEventListener("click", () => {
        state.preferredRootSpelling = noteName;
        alignToPitch(pitch, true);
        playTone(pitch + 60);
      });

      dom.quickRootsList.appendChild(btn);
    }
  }

  updateQuickRootsActive();
}

function updateQuickRootsActive() {
  const btns = dom.quickRootsList.querySelectorAll(".quick-root-btn");
  const scaleAnalysis = getActiveScaleAnalysis();
  const currentSpelling = scaleAnalysis.rootName;

  btns.forEach(btn => {
    const pitch = parseInt(btn.dataset.pitch);
    const spelling = btn.dataset.spelling;

    if (state.notation === "both") {
      if (pitch === state.currentRootPitch && (!spelling || spelling === currentSpelling)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    } else {
      if (pitch === state.currentRootPitch) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });
}

// ==========================================
// 13. Áudio Sintetizado (Web Audio API)
// ==========================================

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function midiToFrequency(midiNote) {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function playTone(midiNote, duration = 0.5, startTime = 0) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime + startTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(midiToFrequency(midiNote), now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  } catch (err) {
    console.warn("Audio Context:", err);
  }
}

function playScaleSequence() {
  const scaleAnalysis = getActiveScaleAnalysis();
  const baseMidi = 60 + state.currentRootPitch;
  const relativeOffsets = getScaleRelativeOffsets();

  dom.btnPlayScale.disabled = true;
  dom.btnPlayScale.style.opacity = "0.7";

  relativeOffsets.forEach((offset, idx) => {
    const midi = baseMidi + offset;
    const delay = idx * 0.32;
    playTone(midi, 0.45, delay);

    setTimeout(() => {
      const cards = dom.scaleDegreesGrid.querySelectorAll(".degree-card");
      if (cards[idx]) {
        cards[idx].style.transform = "scale(1.08)";
        cards[idx].style.borderColor = "#f59e0b";
        setTimeout(() => {
          cards[idx].style.transform = "";
          cards[idx].style.borderColor = "";
        }, 280);
      }
    }, delay * 1000);
  });

  setTimeout(() => {
    dom.btnPlayScale.disabled = false;
    dom.btnPlayScale.style.opacity = "1";
  }, relativeOffsets.length * 320 + 200);
}

// ==========================================
// 14. Event Listeners Globais
// ==========================================

function setupEventListeners() {
  dom.scaleSelect.addEventListener("change", (e) => {
    state.currentScaleKey = e.target.value;
    renderAll();
  });

  dom.accidentalToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    dom.accidentalToggle.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.notation = btn.dataset.notation;
    
    // Configura preferência de tônica adequada
    if (state.notation === "both") {
      if (state.currentRootPitch === 1 && (!state.preferredRootSpelling || state.preferredRootSpelling === "Dó♯")) {
        state.preferredRootSpelling = "Dó♯";
      } else if (state.currentRootPitch === 6 && (!state.preferredRootSpelling || state.preferredRootSpelling === "Fá♯")) {
        state.preferredRootSpelling = "Fá♯";
      }
    } else if (state.notation === "sharp") {
      state.preferredRootSpelling = "Dó♯";
    } else if (state.notation === "flat") {
      state.preferredRootSpelling = "Ré♭";
    }

    buildQuickRoots();
    buildTapeCells();
    renderAll();
  });

  dom.namingToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    dom.namingToggle.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.naming = btn.dataset.naming;
    buildQuickRoots();
    buildTapeCells();
    renderAll();
  });

  dom.btnPrevSemitone.addEventListener("click", () => stepSemitone(-1));
  dom.btnNextSemitone.addEventListener("click", () => stepSemitone(1));

  dom.btnPlayScale.addEventListener("click", () => {
    playScaleSequence();
  });

  if (dom.keySigToggle) {
    dom.keySigToggle.addEventListener("click", (e) => {
      const btn = e.target.closest(".toggle-btn");
      if (!btn) return;
      dom.keySigToggle.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.showKeySignature = btn.dataset.keysig === "on";
      renderMusicalStaff();
    });
  }

  if (dom.clefToggle) {
    dom.clefToggle.addEventListener("click", (e) => {
      const btn = e.target.closest(".toggle-btn");
      if (!btn) return;
      dom.clefToggle.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentClef = btn.dataset.clef;
      renderMusicalStaff();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;
    
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepSemitone(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepSemitone(1);
    } else if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      playScaleSequence();
    }
  });

  setupDragEvents();
}

// ==========================================
// 15. Notação Musical na Pauta (VexFlow)
// ==========================================

const KEY_SIGNATURE_DATA = {
  // Tonalidades Maiores com Sustenidos
  "C":   { keySig: "C",   count: 0, type: "natural", name: "Dó Maior", desc: "Nenhum acidente (Tonalidade natural)" },
  "G":   { keySig: "G",   count: 1, type: "sharp",   name: "Sol Maior", desc: "1 sustenido (Fá♯)" },
  "D":   { keySig: "D",   count: 2, type: "sharp",   name: "Ré Maior", desc: "2 sustenidos (Fá♯, Dó♯)" },
  "A":   { keySig: "A",   count: 3, type: "sharp",   name: "Lá Maior", desc: "3 sustenidos (Fá♯, Dó♯, Sol♯)" },
  "E":   { keySig: "E",   count: 4, type: "sharp",   name: "Mi Maior", desc: "4 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯)" },
  "B":   { keySig: "B",   count: 5, type: "sharp",   name: "Si Maior", desc: "5 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯, Lá♯)" },
  "F#":  { keySig: "F#",  count: 6, type: "sharp",   name: "Fá♯ Maior", desc: "6 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯, Lá♯, Mi♯)" },
  "C#":  { keySig: "C#",  count: 7, type: "sharp",   name: "Dó♯ Maior", desc: "7 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯, Lá♯, Mi♯, Si♯)" },

  // Tonalidades Maiores com Bemóis
  "F":   { keySig: "F",   count: 1, type: "flat",    name: "Fá Maior", desc: "1 bemol (Si♭)" },
  "Bb":  { keySig: "Bb",  count: 2, type: "flat",    name: "Si♭ Maior", desc: "2 bemóis (Si♭, Mi♭)" },
  "Eb":  { keySig: "Eb",  count: 3, type: "flat",    name: "Mi♭ Maior", desc: "3 bemóis (Si♭, Mi♭, Lá♭)" },
  "Ab":  { keySig: "Ab",  count: 4, type: "flat",    name: "Lá♭ Maior", desc: "4 bemóis (Si♭, Mi♭, Lá♭, Ré♭)" },
  "Db":  { keySig: "Db",  count: 5, type: "flat",    name: "Ré♭ Maior", desc: "5 bemóis (Si♭, Mi♭, Lá♭, Ré♭, Sol♭)" },
  "Gb":  { keySig: "Gb",  count: 6, type: "flat",    name: "Sol♭ Maior", desc: "6 bemóis (Si♭, Mi♭, Lá♭, Ré♭, Sol♭, Dó♭)" },
  "Cb":  { keySig: "Cb",  count: 7, type: "flat",    name: "Dó♭ Maior", desc: "7 bemóis (Si♭, Mi♭, Lá♭, Ré♭, Sol♭, Dó♭, Fá♭)" },

  // Tonalidades Menores com Sustenidos
  "Am":  { keySig: "Am",  count: 0, type: "natural", name: "Lá Menor", desc: "Nenhum acidente (Relativa de Dó Maior)" },
  "Em":  { keySig: "Em",  count: 1, type: "sharp",   name: "Mi Menor", desc: "1 sustenido (Fá♯ - Relativa de Sol Maior)" },
  "Bm":  { keySig: "Bm",  count: 2, type: "sharp",   name: "Si Menor", desc: "2 sustenidos (Fá♯, Dó♯ - Relativa de Ré Maior)" },
  "F#m": { keySig: "F#m", count: 3, type: "sharp",   name: "Fá♯ Menor", desc: "3 sustenidos (Fá♯, Dó♯, Sol♯ - Relativa de Lá Maior)" },
  "C#m": { keySig: "C#m", count: 4, type: "sharp",   name: "Dó♯ Menor", desc: "4 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯ - Relativa de Mi Maior)" },
  "G#m": { keySig: "G#m", count: 5, type: "sharp",   name: "Sol♯ Menor", desc: "5 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯, Lá♯ - Relativa de Si Maior)" },
  "D#m": { keySig: "D#m", count: 6, type: "sharp",   name: "Ré♯ Menor", desc: "6 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯, Lá♯, Mi♯ - Relativa de Fá♯ Maior)" },
  "A#m": { keySig: "A#m", count: 7, type: "sharp",   name: "Lá♯ Menor", desc: "7 sustenidos (Fá♯, Dó♯, Sol♯, Ré♯, Lá♯, Mi♯, Si♯ - Relativa de Dó♯ Maior)" },

  // Tonalidades Menores com Bemóis
  "Dm":  { keySig: "Dm",  count: 1, type: "flat",    name: "Ré Menor", desc: "1 bemol (Si♭ - Relativa de Fá Maior)" },
  "Gm":  { keySig: "Gm",  count: 2, type: "flat",    name: "Sol Menor", desc: "2 bemóis (Si♭, Mi♭ - Relativa de Si♭ Maior)" },
  "Cm":  { keySig: "Cm",  count: 3, type: "flat",    name: "Dó Menor", desc: "3 bemóis (Si♭, Mi♭, Lá♭ - Relativa de Mi♭ Maior)" },
  "Fm":  { keySig: "Fm",  count: 4, type: "flat",    name: "Fá Menor", desc: "4 bemóis (Si♭, Mi♭, Lá♭, Ré♭ - Relativa de Lá♭ Maior)" },
  "Bbm": { keySig: "Bbm", count: 5, type: "flat",    name: "Si♭ Menor", desc: "5 bemóis (Si♭, Mi♭, Lá♭, Ré♭, Sol♭ - Relativa de Ré♭ Maior)" },
  "Ebm": { keySig: "Ebm", count: 6, type: "flat",    name: "Mi♭ Menor", desc: "6 bemóis (Si♭, Mi♭, Lá♭, Ré♭, Sol♭, Dó♭ - Relativa de Sol♭ Maior)" },
  "Abm": { keySig: "Abm", count: 7, type: "flat",    name: "Lá♭ Menor", desc: "7 bemóis (Si♭, Mi♭, Lá♭, Ré♭, Sol♭, Dó♭, Fá♭ - Relativa de Dó♭ Maior)" }
};

function resolveScaleKeySignature(scaleKey, rootName, degreeNotes, perspective = "auto") {
  const cRoot = translateToCifra(rootName).replace(/♯/g, "#").replace(/♭/g, "b");

  const modalDegreeMap = {
    major: 0,
    dorian: 1,
    phrygian: 2,
    lydian: 3,
    mixolydian: 4,
    minor_natural: 5,
    locrian: 6
  };

  const isMinorFamily = ["minor_natural", "minor_harmonic", "minor_melodic", "penta_minor", "blues"].includes(scaleKey);

  if (isMinorFamily) {
    const targetMinor = `${cRoot}m`;
    if (KEY_SIGNATURE_DATA[targetMinor]) {
      return KEY_SIGNATURE_DATA[targetMinor];
    }
    if (perspective === "flat") {
      return {
        keySig: null,
        count: 0,
        type: "theoretical_flat",
        name: `${rootName} Menor`,
        desc: `Tonalidade teórica em bemóis (acidentes na pauta)`
      };
    }
    if (perspective === "sharp") {
      return {
        keySig: null,
        count: 0,
        type: "theoretical_sharp",
        name: `${rootName} Menor`,
        desc: `Tonalidade teórica em sustenidos (acidentes na pauta)`
      };
    }
    return { keySig: "Am", count: 0, type: "natural", name: `${rootName} Menor`, desc: "Sem armadura padrão" };
  }

  if (scaleKey === "major" || scaleKey === "penta_major") {
    if (KEY_SIGNATURE_DATA[cRoot]) {
      return KEY_SIGNATURE_DATA[cRoot];
    }
    if (perspective === "sharp") {
      return {
        keySig: null,
        count: 0,
        type: "theoretical_sharp",
        name: `${rootName} Maior`,
        desc: `Tonalidade teórica em sustenidos (acidentes na pauta)`
      };
    }
    if (perspective === "flat") {
      return {
        keySig: null,
        count: 0,
        type: "theoretical_flat",
        name: `${rootName} Maior`,
        desc: `Tonalidade teórica em bemóis (acidentes na pauta)`
      };
    }
    return { keySig: "C", count: 0, type: "natural", name: `${rootName} Maior`, desc: "Tonalidade natural" };
  }

  if (modalDegreeMap[scaleKey] !== undefined && degreeNotes && degreeNotes.length >= 7) {
    const modeIdx = modalDegreeMap[scaleKey];
    const parentTonicRaw = degreeNotes[(7 - modeIdx) % 7];
    const parentTonic = translateToCifra(parentTonicRaw).replace(/♯/g, "#").replace(/♭/g, "b");
    if (KEY_SIGNATURE_DATA[parentTonic]) {
      const parentData = KEY_SIGNATURE_DATA[parentTonic];
      return {
        keySig: parentData.keySig,
        count: parentData.count,
        type: parentData.type,
        name: `${rootName} (${scaleKey.charAt(0).toUpperCase() + scaleKey.slice(1)})`,
        desc: `${parentData.desc} [Armadura de ${parentData.name}]`
      };
    }
    return {
      keySig: null,
      count: 0,
      type: perspective === "flat" ? "theoretical_flat" : "theoretical_sharp",
      name: `${rootName}`,
      desc: "Acidentes aplicados diretamente nas notas"
    };
  }

  return KEY_SIGNATURE_DATA["C"];
}

function getClefBaseOctave(firstLetter, clef) {
  if (clef === "treble") {
    if (firstLetter === "B") return 3;
    return 4;
  } else if (clef === "alto") {
    if (["F", "G", "A", "B"].includes(firstLetter)) return 3;
    return 4;
  } else if (clef === "bass") {
    if (["G", "A", "B"].includes(firstLetter)) return 2;
    return 3;
  }
  return 4;
}

function parseNoteToVex(noteName) {
  const match = (noteName || "").match(/^(Dó|Ré|Mi|Fá|Sol|Lá|Si|[A-G])(𝄪|♯♯|##|♯|#|♭♭|bb|♭|b)?/i);
  if (!match) return { letter: "C", acc: "" };
  const letterMap = { "Dó": "C", "Ré": "D", "Mi": "E", "Fá": "F", "Sol": "G", "Lá": "A", "Si": "B" };
  const rawLetter = match[1];
  const letter = (letterMap[rawLetter] || rawLetter).toUpperCase();
  const rawAcc = match[2] || "";
  let acc = "";
  if (rawAcc === "𝄪" || rawAcc === "♯♯" || rawAcc === "##") acc = "##";
  else if (rawAcc === "♯" || rawAcc === "#") acc = "#";
  else if (rawAcc === "♭♭" || rawAcc === "bb") acc = "bb";
  else if (rawAcc === "♭" || rawAcc === "b") acc = "b";
  return { letter, acc };
}

function convertScaleNotesToVexKeys(degreeNotes, clef) {
  if (!degreeNotes || !degreeNotes.length) return [];
  const diatonicOrder = ["C", "D", "E", "F", "G", "A", "B"];
  const firstParsed = parseNoteToVex(degreeNotes[0]);
  let currentOctave = getClefBaseOctave(firstParsed.letter, clef);
  let prevIdx = diatonicOrder.indexOf(firstParsed.letter);

  return degreeNotes.map((noteName, idx) => {
    const parsed = parseNoteToVex(noteName);
    const letterIdx = diatonicOrder.indexOf(parsed.letter);
    if (idx > 0 && letterIdx <= prevIdx) {
      currentOctave++;
    }
    prevIdx = letterIdx;
    return {
      noteName,
      key: `${parsed.letter.toLowerCase()}${parsed.acc}/${currentOctave}`,
      letter: parsed.letter,
      acc: parsed.acc,
      octave: currentOctave
    };
  });
}

function renderMusicalStaff() {
  if (!dom.staffOutput || typeof Vex === "undefined" || !Vex.Flow) return;

  dom.staffOutput.innerHTML = "";
  const scale = SCALES[state.currentScaleKey];
  const scaleAnalysis = getActiveScaleAnalysis();
  const clef = state.currentClef || "treble";
  const isHeptatonic = scale.steps.length === 7;
  const pitchIndices = getScalePitchIndices();

  if (state.notation === "both") {
    // MODO AMBOS: Exibe DUAS pautas (1. Armadura/Notação em Sustenidos | 2. Armadura/Notação em Bemóis)
    const sharpRoot = NOTE_NAMES.latim.sharp[state.currentRootPitch];
    const sharpNotes = isHeptatonic
      ? computeDiatonicSpelling(sharpRoot, scale.steps)
      : pitchIndices.map(p => NOTE_NAMES.latim.sharp[p]);
    const sharpKeySig = resolveScaleKeySignature(state.currentScaleKey, sharpRoot, sharpNotes, "sharp");

    const flatRoot = (state.currentRootPitch === 11 && state.currentScaleKey === "major")
      ? "Dó♭"
      : NOTE_NAMES.latim.flat[state.currentRootPitch];
    const flatNotes = isHeptatonic
      ? computeDiatonicSpelling(flatRoot, scale.steps)
      : pitchIndices.map(p => NOTE_NAMES.latim.flat[p]);
    const flatKeySig = resolveScaleKeySignature(state.currentScaleKey, flatRoot, flatNotes, "flat");

    const displaySharpRoot = state.naming === "cifra" ? translateToCifra(sharpRoot) : sharpRoot;
    const displayFlatRoot = state.naming === "cifra" ? translateToCifra(flatRoot) : flatRoot;

    const sharpDesc = state.showKeySignature
      ? sharpKeySig.desc
      : "Armadura desligada (acidentes nas notas)";
    const flatDesc = state.showKeySignature
      ? flatKeySig.desc
      : "Armadura desligada (acidentes nas notas)";

    renderSingleStaffInstance(dom.staffOutput, {
      tag: "♯ Sustenidos",
      badgeClass: "is-sharp",
      titleDesc: `${displaySharpRoot} • ${sharpDesc}`,
      degreeNotes: sharpNotes,
      keySigInfo: sharpKeySig,
      clef,
      pitchIndices
    });

    renderSingleStaffInstance(dom.staffOutput, {
      tag: "♭ Bemóis",
      badgeClass: "is-flat",
      titleDesc: `${displayFlatRoot} • ${flatDesc}`,
      degreeNotes: flatNotes,
      keySigInfo: flatKeySig,
      clef,
      pitchIndices
    });

    updateStaffInfoBar(
      {
        desc: state.showKeySignature
          ? "Dupla: Sustenidos (♯) e Bemóis (♭)"
          : "Desligada (acidentes nas notas)"
      },
      clef,
      { rootName: `${sharpRoot} / ${flatRoot}` }
    );
  } else {
    // MODO SUSTENIDOS ('sharp') OU BEMÓIS ('flat'): Exibe uma única pauta
    const perspective = state.notation === "flat" ? "flat" : "sharp";
    const rootName = scaleAnalysis.rootName;
    const staffNotes = isHeptatonic
      ? computeDiatonicSpelling(rootName, scale.steps)
      : scaleAnalysis.degreeNotes;
    const keySigInfo = resolveScaleKeySignature(state.currentScaleKey, rootName, staffNotes, perspective);

    renderSingleStaffInstance(dom.staffOutput, {
      tag: null,
      badgeClass: "",
      titleDesc: "",
      degreeNotes: staffNotes,
      keySigInfo,
      clef,
      pitchIndices
    });

    const infoBarKeySig = state.showKeySignature
      ? keySigInfo
      : { desc: "Desligada (acidentes aplicados nas notas)" };
    updateStaffInfoBar(infoBarKeySig, clef, scaleAnalysis);
  }
}

function renderSingleStaffInstance(parentContainer, config) {
  const { tag, badgeClass, titleDesc, degreeNotes, keySigInfo, clef, pitchIndices } = config;

  const block = document.createElement("div");
  block.className = "staff-stave-block";

  if (tag) {
    const header = document.createElement("div");
    header.className = "staff-block-header";
    header.innerHTML = `
      <span class="staff-block-tag ${badgeClass}">${tag}</span>
      <span class="staff-block-desc">${titleDesc}</span>
    `;
    block.appendChild(header);
  }

  const canvasDiv = document.createElement("div");
  canvasDiv.className = "staff-canvas";
  block.appendChild(canvasDiv);
  parentContainer.appendChild(block);

  // Dimensões responsivas do Pentagrama
  const containerWidth = dom.staffViewport ? dom.staffViewport.clientWidth : 800;
  const staffWidth = Math.min(Math.max(containerWidth - 36, 560), 920);
  const staffHeight = 165;

  const renderer = new Vex.Flow.Renderer(canvasDiv, Vex.Flow.Renderer.Backends.SVG);
  renderer.resize(staffWidth, staffHeight);
  const context = renderer.getContext();
  context.setFont("Arial", 11, "").setBackgroundFillStyle("#ffffff");

  // Cria a Pauta (Stave)
  const staveStartX = 15;
  const staveWidth = staffWidth - 30;
  const stave = new Vex.Flow.Stave(staveStartX, 18, staveWidth);

  // Adiciona Clave
  stave.addClef(clef);

  // Adiciona Armadura de Clave (apenas se estiver ligada e houver armadura padrão)
  if (state.showKeySignature && keySigInfo && keySigInfo.keySig) {
    try {
      stave.addKeySignature(keySigInfo.keySig);
    } catch (e) {
      console.warn("Armadura de clave não pôde ser aplicada:", keySigInfo.keySig, e);
    }
  }

  // Barra final dupla
  stave.setEndBarType(Vex.Flow.Barline.type.END);
  stave.setContext(context).draw();

  // Converte as notas da escala para o formato VexFlow
  const notesVexInfo = convertScaleNotesToVexKeys(degreeNotes, clef);
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const relativeOffsets = getScaleRelativeOffsets();

  // Cria os StaveNotes com durações de semínima ('q')
  const staveNotes = notesVexInfo.map((noteInfo, idx) => {
    const isTonic = idx === 0 || idx === notesVexInfo.length - 1;
    const roman = romanNumerals[idx] || (idx + 1);

    const staveNote = new Vex.Flow.StaveNote({
      clef: clef,
      keys: [noteInfo.key],
      duration: "q"
    });

    // Anotação do Grau abaixo da nota
    const annotation = new Vex.Flow.Annotation(roman)
      .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.BOTTOM)
      .setFont("sans-serif", 11, isTonic ? "bold" : "normal");

    staveNote.addModifier(annotation, 0);

    // Salva referências para áudio e interação (respeitando a oitava ascendente)
    const offset = relativeOffsets[idx] !== undefined ? relativeOffsets[idx] : 0;
    staveNote._midi = 60 + state.currentRootPitch + offset;
    staveNote._idx = idx;
    staveNote._noteName = noteInfo.noteName;

    return staveNote;
  });

  // Cria a voz com as notas da escala
  const voice = new Vex.Flow.Voice({
    num_beats: staveNotes.length,
    beat_value: 4
  }).setMode(Vex.Flow.Voice.Mode.SOFT);

  voice.addTickables(staveNotes);

  // Aplica acidentes automáticos levando em consideração a armadura de clave (ou 'C' se armadura estiver desligada)
  const effectiveKeySig = (state.showKeySignature && keySigInfo && keySigInfo.keySig) ? keySigInfo.keySig : "C";
  try {
    Vex.Flow.Accidental.applyAccidentals([voice], effectiveKeySig);
  } catch (err) {
    console.warn("Erro ao aplicar acidentes automáticos:", err);
  }

  // Formata as notas na pauta
  new Vex.Flow.Formatter()
    .joinVoices([voice])
    .formatToStave([voice], stave);

  voice.draw(context, stave);

  // Interatividade: Adiciona eventos de clique e hover às notas no SVG gerado
  attachStaffNotesAudio(canvasDiv, staveNotes);
}

function attachStaffNotesAudio(containerEl, staveNotes) {
  if (!containerEl) return;
  const noteElements = containerEl.querySelectorAll(".vf-stavenote");
  noteElements.forEach((el, index) => {
    const noteObj = staveNotes[index];
    if (!noteObj) return;

    el.setAttribute("title", `Tocar nota: ${noteObj._noteName || ''}`);
    el.style.cursor = "pointer";

    el.addEventListener("click", () => {
      if (noteObj._midi !== undefined) {
        playTone(noteObj._midi, 0.45);
      }
      el.style.transform = "scale(1.15)";
      el.style.transformOrigin = "center";
      setTimeout(() => {
        el.style.transform = "";
      }, 200);
    });
  });
}

function updateStaffInfoBar(keySigInfo, clef, scaleAnalysis) {
  if (!dom.staffInfoBar) return;

  const clefLabels = {
    treble: { name: "Clave de Sol", line: "2ª Linha (Agudo/Soprano)" },
    alto:   { name: "Clave de Dó", line: "3ª Linha (Médio/Contralto)" },
    bass:   { name: "Clave de Fá", line: "4ª Linha (Grave/Baixo)" }
  };
  const activeClefInfo = clefLabels[clef] || clefLabels.treble;

  let displayRoot = scaleAnalysis.rootName;
  if (state.naming === "cifra") {
    displayRoot = translateToCifra(displayRoot);
  }
  const scale = SCALES[state.currentScaleKey];
  const cleanScaleType = scale.name.replace(/^Escala\s+/i, "");

  dom.staffInfoBar.innerHTML = `
    <div class="staff-info-badges">
      <div class="staff-badge staff-badge-key" title="Tonalidade ativa">
        <span>Tonalidade:</span>
        <span class="badge-val">${displayRoot} ${cleanScaleType}</span>
      </div>
      <div class="staff-badge staff-badge-signature" title="Armadura de clave na pauta">
        <span>Armadura:</span>
        <span class="badge-val">${keySigInfo ? keySigInfo.desc : 'Padrão'}</span>
      </div>
      <div class="staff-badge staff-badge-clef" title="Clave musical ativa">
        <span>Clave:</span>
        <span class="badge-val">${activeClefInfo.name} • ${activeClefInfo.line}</span>
      </div>
    </div>
    <div class="staff-interactive-hint">
      <span>💡 Clique nas notas da pauta para ouvi-las</span>
    </div>
  `;
}

function renderAll() {
  renderIntervalsSvg();
  renderDegreePointers();
  renderTapeHighlights();
  renderDashboard();
  renderMusicalStaff();
  updateQuickRootsActive();
}

document.addEventListener("DOMContentLoaded", init);
