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

// Ortografia diatônica ideal para escalas maiores e menores (evita notas repetidas como Dó e Dó# na mesma escala)
const KEY_SPELLINGS = {
  // Para escalas Maiores:
  major: {
    0:  ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si", "Dó"],             // C
    1:  ["Ré♭", "Mi♭", "Fá", "Sol♭", "Lá♭", "Si♭", "Dó", "Ré♭"],        // Db
    2:  ["Ré", "Mi", "Fá♯", "Sol", "Lá", "Si", "Dó♯", "Ré"],            // D
    3:  ["Mi♭", "Fá", "Sol", "Lá♭", "Si♭", "Dó", "Ré", "Mi♭"],          // Eb
    4:  ["Mi", "Fá♯", "Sol♯", "Lá", "Si", "Dó♯", "Ré♯", "Mi"],          // E
    5:  ["Fá", "Sol", "Lá", "Si♭", "Dó", "Ré", "Mi", "Fá"],             // F
    6:  ["Fá♯", "Sol♯", "Lá♯", "Si", "Dó♯", "Ré♯", "Mi♯", "Fá♯"],       // F#
    7:  ["Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá♯", "Sol"],            // G
    8:  ["Lá♭", "Si♭", "Dó", "Ré♭", "Mi♭", "Fá", "Sol", "Lá♭"],         // Ab
    9:  ["Lá", "Si", "Dó♯", "Ré", "Mi", "Fá♯", "Sol♯", "Lá"],           // A
    10: ["Si♭", "Dó", "Ré", "Mi♭", "Fá", "Sol", "Lá", "Si♭"],           // Bb
    11: ["Si", "Dó♯", "Ré♯", "Mi", "Fá♯", "Sol♯", "Lá♯", "Si"]          // B
  }
};

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
  currentRootPitch: 0, // 0 = Dó, 2 = Ré, 4 = Mi, etc.
  tonicLetter: 0,      // 0 = Dó, 1 = Ré, 2 = Mi, etc.
  notation: "sharp",   // 'sharp', 'flat', 'both'
  naming: "latim",     // 'latim', 'cifra'
  
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
  btnPlayScale: document.getElementById("btnPlayScale")
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
  });
}

function updateCellDimensions() {
  const rootStyle = getComputedStyle(document.documentElement);
  state.cellWidth = parseInt(rootStyle.getPropertyValue("--cell-width")) || 80;
  
  // Calcula o ponto de ancoragem (onde a primeira nota da escala deve ficar)
  // No desktop/tablet, posicionamos a âncora de modo que a escala de 12 semitons fique visível e centralizada
  const viewportWidth = dom.tapeViewport.clientWidth || 900;
  const scaleSpan = 13 * state.cellWidth;
  
  if (viewportWidth > scaleSpan + 60) {
    state.anchorX = Math.round((viewportWidth - scaleSpan) / 2);
  } else {
    // Em telas menores, alinha próximo à margem esquerda para permitir rolagem
    state.anchorX = 40;
  }
  
  // Posiciona o container de arcos SVG exatamente em anchorX
  if (dom.intervalsContainer) {
    dom.intervalsContainer.style.transform = `translateX(${state.anchorX}px)`;
  }

  // Ajusta a posição do indicador da tônica (ponteiro) alinhado ao centro da célula
  const pointerLabel = document.querySelector(".tonic-pointer-label");
  if (pointerLabel) {
    const centerTonicX = state.anchorX + (state.cellWidth / 2);
    pointerLabel.style.transform = `translateX(${centerTonicX}px) translateX(-50%)`;
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
      <span class="cell-note-name">${getChromaticNoteName(pitchClass)}</span>
      <span class="cell-enharmonic">${getChromaticEnharmonic(pitchClass)}</span>
      <span class="cell-degree-tag"></span>
    `;

    // Clique na célula alinha-a como tônica
    cell.addEventListener("click", () => {
      if (!state.isDragging) {
        alignToPitch(pitchClass, true);
        playTone(pitchClass + 60);
      }
    });

    dom.tapeTrack.appendChild(cell);
  }
}

// ==========================================
// 6. Teoria e Ortografia Diatônica Rigorosa
// ==========================================

const DIATONIC_BASE = {
  latim: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
  cifra: ["C", "D", "E", "F", "G", "A", "B"]
};

// Pitches naturais dos 7 nomes básicos (Dó=0, Ré=2, Mi=4, Fá=5, Sol=7, Lá=9, Si=11)
const NATURAL_LETTER_PITCHES = [0, 2, 4, 5, 7, 9, 11];

function getBaseLetter(noteName) {
  if (!noteName) return "";
  const matchLatim = noteName.match(/^(Dó|Ré|Mi|Fá|Sol|Lá|Si)/i);
  if (matchLatim) return matchLatim[1];
  const matchCifra = noteName.match(/^([A-G])/i);
  if (matchCifra) return matchCifra[1].toUpperCase();
  return noteName;
}

function getChromaticNoteName(pitchClass) {
  const namingTable = NOTE_NAMES[state.naming] || NOTE_NAMES.latim;
  if (state.notation === "flat") {
    return namingTable.flat[pitchClass % 12];
  } else {
    return namingTable.sharp[pitchClass % 12];
  }
}

function getChromaticEnharmonic(pitchClass) {
  const isAccidental = [1, 3, 6, 8, 10].includes(pitchClass % 12);
  if (!isAccidental) return "";
  const namingTable = NOTE_NAMES[state.naming] || NOTE_NAMES.latim;
  if (state.notation === "flat") {
    return namingTable.sharp[pitchClass % 12];
  } else {
    return namingTable.flat[pitchClass % 12];
  }
}

function getScaleAnalysis() {
  const scale = SCALES[state.currentScaleKey];
  const steps = scale.steps;
  const relativeOffsets = getScaleRelativeOffsets();
  const rootPitch = state.currentRootPitch;
  const notation = state.notation; // 'sharp', 'flat', 'both'
  const naming = state.naming;     // 'latim', 'cifra'
  const isHeptatonic = steps.length === 7;

  // Determina a letra base da tônica
  let rootLetter = state.tonicLetter;
  if (rootLetter === null || rootLetter === undefined) {
    if (notation === "flat") {
      rootLetter = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6][rootPitch];
    } else {
      // sharp ou both (por padrão, pitch 1 = Dó# com rootLetter 0)
      rootLetter = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6][rootPitch];
    }
  }

  const degrees = [];

  for (let i = 0; i < relativeOffsets.length; i++) {
    const semitonesFromRoot = relativeOffsets[i];
    const pitch = (rootPitch + semitonesFromRoot) % 12;
    const isOctave = (i === relativeOffsets.length - 1) && (semitonesFromRoot === 12);

    let noteName = "";
    let enharmonicSubtitle = "";
    let baseLetter = "";

    if (notation === "both" && isHeptatonic) {
      // Modo Ambos: Ortografia Diatônica Rigorosa (Uma letra exclusiva por grau)
      const letterIdx = isOctave ? rootLetter : (rootLetter + i) % 7;
      baseLetter = DIATONIC_BASE[naming][letterIdx];
      const natPitch = NATURAL_LETTER_PITCHES[letterIdx];

      let diff = (pitch - natPitch) % 12;
      if (diff > 6) diff -= 12;
      if (diff < -6) diff += 12;

      let accidental = "";
      if (diff === 1) accidental = "♯";
      else if (diff === 2) accidental = "𝄪";
      else if (diff === -1) accidental = "♭";
      else if (diff === -2) accidental = "𝄫";

      noteName = baseLetter + accidental;

      // Subtítulo didático para enarmonias incomuns (ex: Mi# -> Fá, Si# -> Dó, Dób -> Si, Fáb -> Mi)
      if (["Mi♯", "Si♯", "Dó♭", "Fá♭", "E♯", "B♯", "C♭", "F♭"].includes(noteName)) {
        enharmonicSubtitle = `(${NOTE_NAMES[naming].sharp[pitch]})`;
      } else if ([1, 3, 6, 8, 10].includes(pitch)) {
        enharmonicSubtitle = diff > 0 ? NOTE_NAMES[naming].flat[pitch] : NOTE_NAMES[naming].sharp[pitch];
      }
    } else if (notation === "sharp") {
      noteName = NOTE_NAMES[naming].sharp[pitch];
      baseLetter = getBaseLetter(noteName);
      if ([1, 3, 6, 8, 10].includes(pitch)) {
        enharmonicSubtitle = NOTE_NAMES[naming].flat[pitch];
      }
    } else if (notation === "flat") {
      noteName = NOTE_NAMES[naming].flat[pitch];
      baseLetter = getBaseLetter(noteName);
      if ([1, 3, 6, 8, 10].includes(pitch)) {
        enharmonicSubtitle = NOTE_NAMES[naming].sharp[pitch];
      }
    } else {
      noteName = NOTE_NAMES[naming].sharp[pitch];
      baseLetter = getBaseLetter(noteName);
    }

    degrees.push({
      degreeIndex: i,
      pitch,
      semitonesFromRoot,
      noteName,
      baseLetter,
      enharmonicSubtitle,
      hasConflict: false
    });
  }

  // Detecção de repetição de raiz (conflito ortográfico) nos graus únicos
  const uniqueCount = isHeptatonic ? 7 : degrees.length;
  const letterCounts = {};
  for (let k = 0; k < uniqueCount; k++) {
    const letter = degrees[k].baseLetter;
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  const conflictLetters = Object.keys(letterCounts).filter(letter => letterCounts[letter] > 1);
  const hasConflict = conflictLetters.length > 0;

  degrees.forEach((d, idx) => {
    if (conflictLetters.includes(d.baseLetter)) {
      d.hasConflict = true;
    }
    // A oitava espelha a tônica
    if (idx === degrees.length - 1 && degrees[0].hasConflict) {
      d.hasConflict = true;
    }
  });

  return {
    degrees,
    conflictLetters,
    hasConflict,
    isHeptatonic,
    rootLetter,
    rootName: degrees[0].noteName
  };
}

// ==========================================
// 6. Régua Superior Fixa: Setas SVG (Estilo Apresentação)
// ==========================================

function renderIntervalsSvg() {
  const scale = SCALES[state.currentScaleKey];
  const steps = scale.steps;
  const totalSemitones = steps.reduce((sum, s) => sum + s, 0); // Geralmente 12
  const svgWidth = (totalSemitones + 1) * state.cellWidth;
  const svgHeight = 95;

  dom.intervalsContainer.style.width = `${svgWidth}px`;
  dom.intervalsContainer.style.transform = `translateX(${state.anchorX}px)`;

  dom.intervalsSvg.setAttribute("width", svgWidth);
  dom.intervalsSvg.setAttribute("height", svgHeight);
  dom.intervalsSvg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  dom.intervalsSvg.innerHTML = "";

  // Definição de marcadores de ponta de seta (arrowhead markers)
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
    const distanceX = xEnd - xStart;
    const isFirst = idx === 0;
    const isLast = idx === steps.length - 1;
    const strokeColor = "#38bdf8";

    // Grupo para o arco e texto
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    let pathD = "";
    let label = "";

    if (step === 1) {
      // SEMITOM: Arco com ápice pontiagudo / zig-zag exatamente como no slide!
      label = "SEMITOM";
      const yBase = 84;
      const yPeak = 30;
      const xMid = (xStart + xEnd) / 2;
      pathD = `M ${xStart} ${yBase} L ${xMid} ${yPeak} L ${xEnd} ${yBase - 8}`;
    } else if (step === 2) {
      // TOM: Arco curvo de topo plano com cantos arredondados, idêntico à apresentação
      label = "TOM";
      const yBase = 84;
      const yTop = 24;
      const r = 14;
      pathD = `
        M ${xStart} ${yBase}
        L ${xStart} ${yTop + r}
        Q ${xStart} ${yTop} ${xStart + r} ${yTop}
        L ${xEnd - r} ${yTop}
        Q ${xEnd} ${yTop} ${xEnd} ${yTop + r}
        L ${xEnd} ${yBase - 8}
      `;
    } else {
      // 1.5 TOM (3 semitons) ou outro salto
      label = step === 3 ? "1½ TOM" : `${step} SEMITONS`;
      const yBase = 84;
      const yTop = 18;
      const r = 18;
      pathD = `
        M ${xStart} ${yBase}
        L ${xStart} ${yTop + r}
        Q ${xStart} ${yTop} ${xStart + r} ${yTop}
        L ${xEnd - r} ${yTop}
        Q ${xEnd} ${yTop} ${xEnd} ${yTop + r}
        L ${xEnd} ${yBase - 8}
      `;
    }

    // Cria o caminho SVG da seta
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD.trim());
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("marker-end", "url(#arrowhead)");
    g.appendChild(path);

    // Texto de indicação do salto (TOM / SEMITOM)
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (xStart + xEnd) / 2);
    text.setAttribute("y", step === 1 ? 22 : (step >= 3 ? 14 : 17));
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
// 7. Cálculo das Notas e Graus da Escala
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
  // Retorna os semitons a partir da tônica: [0, 2, 4, 5, 7, 9, 11, 12]
  const scale = SCALES[state.currentScaleKey];
  const offsets = [0];
  let acc = 0;
  for (let step of scale.steps) {
    acc += step;
    offsets.push(acc);
  }
  return offsets;
}

// ==========================================
// 8. Atualização Visual da Fita (Highlights)
// ==========================================

function renderTapeHighlights() {
  const relativeOffsets = getScaleRelativeOffsets();
  const analysis = getScaleAnalysis();
  
  const activeTonicCellIndex = Math.round((state.anchorX - state.trackOffset) / state.cellWidth);
  const cells = dom.tapeTrack.querySelectorAll(".chromatic-cell");
  
  cells.forEach((cell, idx) => {
    const pitch = parseInt(cell.dataset.pitch);
    const noteNameEl = cell.querySelector(".cell-note-name");
    const enharmonicEl = cell.querySelector(".cell-enharmonic");
    const degreeTagEl = cell.querySelector(".cell-degree-tag");
    
    // Verifica se esta célula coincide com algum grau da escala
    const diffFromTonicCell = idx - activeTonicCellIndex;
    const degreeIndex = relativeOffsets.indexOf(diffFromTonicCell);

    if (degreeIndex !== -1 && degreeIndex < analysis.degrees.length) {
      const degreeData = analysis.degrees[degreeIndex];
      cell.classList.add("in-scale");
      const isRoot = degreeIndex === 0 || degreeIndex === analysis.degrees.length - 1;
      
      if (isRoot) {
        cell.classList.add("is-tonic");
      } else {
        cell.classList.remove("is-tonic");
      }

      // Define os nomes da nota (ex: Dó#, Ré#, Mi#, Si# etc.)
      noteNameEl.textContent = degreeData.noteName;
      enharmonicEl.textContent = degreeData.enharmonicSubtitle;

      // Conflito de ortografia diatônica (Destaque em Vermelho!)
      if (degreeData.hasConflict) {
        cell.classList.add("has-conflict");
      } else {
        cell.classList.remove("has-conflict");
      }

      // Grau exibido na tag
      const degRoman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][degreeIndex] || (degreeIndex + 1);
      degreeTagEl.textContent = degRoman;
    } else {
      cell.classList.remove("in-scale", "is-tonic", "has-conflict");
      degreeTagEl.textContent = "";
      noteNameEl.textContent = getChromaticNoteName(pitch);
      enharmonicEl.textContent = getChromaticEnharmonic(pitch);
    }
  });

  updateQuickRootsActive();
}

// ==========================================
// 9. Atualização do Dashboard e Resultados
// ==========================================

function renderDashboard() {
  const scale = SCALES[state.currentScaleKey];
  const analysis = getScaleAnalysis();
  
  let cleanScaleType = scale.name.replace(/^Escala\s+/i, "");
  dom.currentScaleTitle.textContent = `${analysis.rootName} ${cleanScaleType}`;
  dom.scaleFormulaBadge.textContent = scale.formulaText;

  // Banner de Alerta / Sucesso de Ortografia Diatônica
  const bannerContainer = document.getElementById("orthographyBannerContainer");
  if (bannerContainer) {
    if (analysis.hasConflict) {
      const listConflicts = analysis.conflictLetters.map(letter => {
        const conflictingNotes = analysis.degrees
          .filter(d => d.baseLetter === letter)
          .map(d => d.noteName);
        const uniqueNames = [...new Set(conflictingNotes)];
        return `<span class="conflict-tag">${uniqueNames.join(" e ")}</span>`;
      }).join(", ");

      bannerContainer.innerHTML = `
        <div class="orthography-banner conflict-banner">
          <div class="banner-icon">⚠️</div>
          <div class="banner-text">
            <div class="banner-title">Alerta de Ortografia Diatônica (Notas Duplicadas)</div>
            <div class="banner-desc">
              Nesta visualização, há notas repetindo a mesma raiz: ${listConflicts}. 
              Pela regra da harmonia tradicional, cada grau da escala deve possuir uma letra exclusiva.
              Alterne para a aba <strong>Ambos (♯/♭)</strong> para visualizar a grafia correta (ex.: com <strong>Mi♯</strong> e <strong>Si♯</strong>).
            </div>
          </div>
        </div>
      `;
    } else if (state.notation === "both" && analysis.isHeptatonic) {
      const specialNotes = analysis.degrees
        .filter(d => ["Mi♯", "Si♯", "Dó♭", "Fá♭", "E♯", "B♯", "C♭", "F♭"].includes(d.noteName))
        .map(d => `<strong>${d.noteName}</strong>`);
      const uniqueSpecials = [...new Set(specialNotes)];

      let detailsMsg = "Todas as 7 notas possuem letras exclusivas (uma letra por grau).";
      if (uniqueSpecials.length > 0) {
        detailsMsg += ` Grafia diatônica rigorosa aplicada: ${uniqueSpecials.join(" e ")} (evitando a duplicação de notas).`;
      }

      bannerContainer.innerHTML = `
        <div class="orthography-banner success-banner">
          <div class="banner-icon">✅</div>
          <div class="banner-text">
            <div class="banner-title">Ortografia Diatônica Rigorosa Ativa</div>
            <div class="banner-desc">${detailsMsg}</div>
          </div>
        </div>
      `;
    } else {
      bannerContainer.innerHTML = "";
    }
  }

  // Grid de Graus
  dom.scaleDegreesGrid.innerHTML = "";

  analysis.degrees.forEach((degreeData, i) => {
    const isRoot = i === 0 || i === analysis.degrees.length - 1;
    const card = document.createElement("div");
    card.className = `degree-card ${isRoot ? "is-root" : ""} ${degreeData.hasConflict ? "has-conflict" : ""}`;

    const degreeNum = scale.degrees[i] ? scale.degrees[i].split(" ")[0] : `Grau ${i+1}`;
    const intervalName = scale.intervalsDesc[i] || "";

    card.innerHTML = `
      <span class="degree-num">${degreeNum}</span>
      <span class="degree-note">${degreeData.noteName}</span>
      <span class="degree-name">${intervalName}</span>
    `;

    card.addEventListener("click", () => {
      playTone(degreeData.pitch + 60);
    });

    dom.scaleDegreesGrid.appendChild(card);
  });
}

// ==========================================
// 10. Alinhamento e Navegação da Fita
// ==========================================

function alignToPitch(pitchClass, animate = true, letterIndex = null) {
  state.currentRootPitch = (pitchClass + 12) % 12;

  if (letterIndex !== null && letterIndex !== undefined) {
    state.tonicLetter = letterIndex;
  } else {
    if (state.notation === "flat") {
      state.tonicLetter = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6][state.currentRootPitch];
    } else {
      // sharp ou both (por padrão, pitch 1 = Dó#)
      state.tonicLetter = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6][state.currentRootPitch];
    }
  }

  // Encontra uma célula com essa pitchClass no centro da fita virtual (por exemplo, ciclo 3)
  const targetCycle = 3;
  const targetCellIndex = targetCycle * 12 + state.currentRootPitch;
  
  // A posição desejada para que a célula fique na anchorX:
  const targetOffset = state.anchorX - (targetCellIndex * state.cellWidth);

  if (animate) {
    dom.tapeTrack.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
  } else {
    dom.tapeTrack.style.transition = "none";
  }

  state.trackOffset = targetOffset;
  dom.tapeTrack.style.transform = `translateX(${state.trackOffset}px)`;

  setTimeout(() => {
    dom.tapeTrack.style.transition = "none";
    renderTapeHighlights();
    renderDashboard();
  }, animate ? 360 : 0);

  if (!animate) {
    renderTapeHighlights();
    renderDashboard();
  }
}

function stepSemitone(direction) {
  const newPitch = (state.currentRootPitch + direction + 12) % 12;
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

    // Reposicionamento infinito contínuo se o usuário arrastar muito longe
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

    // Detecta em tempo real a nova tônica sob a âncora
    const currentCellUnderAnchor = Math.round((state.anchorX - state.trackOffset) / state.cellWidth);
    const newPitch = ((currentCellUnderAnchor % 12) + 12) % 12;
    if (newPitch !== state.currentRootPitch) {
      state.currentRootPitch = newPitch;
      renderTapeHighlights();
      renderDashboard();
    }
  };

  const onPointerUp = (e) => {
    if (!state.isDragging) return;
    state.isDragging = false;
    viewport.releasePointerCapture(e.pointerId);

    // Efeito magnético de encaixe (Snap to nearest semitone cell)
    const nearestCell = Math.round((state.anchorX - state.trackOffset) / state.cellWidth);
    state.currentRootPitch = ((nearestCell % 12) + 12) % 12;
    
    // Anima suavemente para o centro exato da célula
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

  // Suporte a scroll com a roda do mouse (horizontal wheel ou shift+wheel)
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

  let roots = [];
  if (state.notation === "both") {
    roots = [
      { pitch: 0, letter: 0, name: state.naming === "cifra" ? "C" : "Dó" },
      { pitch: 1, letter: 0, name: state.naming === "cifra" ? "C♯" : "Dó♯" },
      { pitch: 1, letter: 1, name: state.naming === "cifra" ? "D♭" : "Ré♭" },
      { pitch: 2, letter: 1, name: state.naming === "cifra" ? "D" : "Ré" },
      { pitch: 3, letter: 2, name: state.naming === "cifra" ? "E♭" : "Mi♭" },
      { pitch: 4, letter: 2, name: state.naming === "cifra" ? "E" : "Mi" },
      { pitch: 5, letter: 3, name: state.naming === "cifra" ? "F" : "Fá" },
      { pitch: 6, letter: 3, name: state.naming === "cifra" ? "F♯" : "Fá♯" },
      { pitch: 6, letter: 4, name: state.naming === "cifra" ? "G♭" : "Sol♭" },
      { pitch: 7, letter: 4, name: state.naming === "cifra" ? "G" : "Sol" },
      { pitch: 8, letter: 5, name: state.naming === "cifra" ? "A♭" : "Lá♭" },
      { pitch: 9, letter: 5, name: state.naming === "cifra" ? "A" : "Lá" },
      { pitch: 10, letter: 6, name: state.naming === "cifra" ? "B♭" : "Si♭" },
      { pitch: 11, letter: 6, name: state.naming === "cifra" ? "B" : "Si" }
    ];
  } else if (state.notation === "flat") {
    const list = NOTE_NAMES[state.naming].flat;
    roots = list.map((name, pitch) => ({
      pitch,
      letter: [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6][pitch],
      name
    }));
  } else {
    const list = NOTE_NAMES[state.naming].sharp;
    roots = list.map((name, pitch) => ({
      pitch,
      letter: [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6][pitch],
      name
    }));
  }

  roots.forEach(root => {
    const btn = document.createElement("button");
    btn.className = "quick-root-btn";
    btn.dataset.pitch = root.pitch;
    btn.dataset.letter = root.letter;
    btn.textContent = root.name;

    btn.addEventListener("click", () => {
      state.tonicLetter = root.letter;
      alignToPitch(root.pitch, true, root.letter);
      playTone(root.pitch + 60);
    });

    dom.quickRootsList.appendChild(btn);
  });
}

function updateQuickRootsActive() {
  const btns = dom.quickRootsList.querySelectorAll(".quick-root-btn");
  btns.forEach(btn => {
    const pitch = parseInt(btn.dataset.pitch);
    const letter = parseInt(btn.dataset.letter);
    if (pitch === state.currentRootPitch && (state.tonicLetter === null || state.tonicLetter === undefined || letter === state.tonicLetter)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
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
  // A4 = 69 = 440 Hz
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

    // Envelope ADSR suave
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
  const scalePitches = getScalePitchIndices();
  const baseMidi = 60 + state.currentRootPitch; // C4 base
  let currentMidi = baseMidi;
  const relativeOffsets = getScaleRelativeOffsets();

  dom.btnPlayScale.disabled = true;
  dom.btnPlayScale.style.opacity = "0.7";

  relativeOffsets.forEach((offset, idx) => {
    const midi = baseMidi + offset;
    const delay = idx * 0.32;
    playTone(midi, 0.45, delay);

    // Destaque visual temporário no card do grau
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
  // Mudança do padrão da escala
  dom.scaleSelect.addEventListener("change", (e) => {
    state.currentScaleKey = e.target.value;
    renderAll();
  });

  // Alternância de Notação (# / b / ambos)
  dom.accidentalToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    dom.accidentalToggle.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.notation = btn.dataset.notation;

    // Se alternou para both e estiver em pitch 1, garante Dó# (letter 0)
    if (state.notation === "both" && state.currentRootPitch === 1) {
      state.tonicLetter = 0;
    } else if (state.notation === "sharp") {
      state.tonicLetter = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6][state.currentRootPitch];
    } else if (state.notation === "flat") {
      state.tonicLetter = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6][state.currentRootPitch];
    }

    buildQuickRoots();
    renderAll();
  });

  // Alternância de Nomenclatura (Dó, Ré / C, D)
  dom.namingToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle-btn");
    if (!btn) return;
    dom.namingToggle.querySelectorAll(".toggle-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.naming = btn.dataset.naming;
    buildQuickRoots();
    renderAll();
  });

  // Botões de avanço e recuo por semitom
  dom.btnPrevSemitone.addEventListener("click", () => stepSemitone(-1));
  dom.btnNextSemitone.addEventListener("click", () => stepSemitone(1));

  // Botão de tocar escala
  dom.btnPlayScale.addEventListener("click", () => {
    playScaleSequence();
  });

  // Navegação por Teclado (Setas Esquerda/Direita para semitom, Espaço para tocar)
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

  // Inicializa o arrasto por toque e mouse
  setupDragEvents();
}

function renderAll() {
  renderIntervalsSvg();
  renderTapeHighlights();
  renderDashboard();
  updateQuickRootsActive();
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", init);
