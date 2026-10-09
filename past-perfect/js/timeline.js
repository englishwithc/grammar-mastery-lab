// ============================================================
// INTERACTIVE TIMELINE EXPLORERS
// ============================================================

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function svgText(x, y, text, attrs = {}) {
  const t = svgEl("text", { x, y, ...attrs });
  t.textContent = text;
  return t;
}

const C = {
  simple: "#6366f1",
  simpleLight: "#a5b4fc",
  simpleBg: "rgba(99,102,241,0.15)",
  continuous: "#f59e0b",
  continuousLight: "#fde68a",
  continuousBg: "rgba(245,158,11,0.15)",
  text: "#f8fafc",
  dim: "#94a3b8",
  track: "#334155",
  now: "#f8fafc",
  ps: "#64748b",
};

// ============================================================
// EXPLORER 1 (Simple): Cause — before another past action
// ============================================================
const causeScenarios = [
  {
    insight: 'Two actions in the past: <strong>she ate</strong> (earlier) and <strong>I arrived</strong> (later). To show eating came <em>first</em>, we use Past Perfect: <em>"She <strong>had eaten</strong> when I arrived."</em> The Past Simple "arrived" is the reference point.',
    events: [
      { x: 180, label: "She had eaten", color: C.simple, y: 80, type: "pp" },
      { x: 480, label: "I arrived", color: C.ps, y: 80, type: "ps" },
    ],
    ppText: "PAST PERFECT (earlier)",
    psText: "PAST SIMPLE (reference)",
  },
  {
    insight: 'Now the order flips! <strong>I arrived</strong> first, <strong>she ate</strong> second. Past Perfect is no longer needed: <em>"When I arrived, she ate."</em> Both are Past Simple. Past Perfect only works when the earlier action needs to be pushed <em>further back</em>.',
    events: [
      { x: 180, label: "I arrived", color: C.ps, y: 80, type: "ps" },
      { x: 480, label: "She ate", color: C.ps, y: 80, type: "ps" },
    ],
    ppText: "PAST SIMPLE",
    psText: "PAST SIMPLE",
  },
  {
    insight: 'If both actions happen in sequence with clear time words (first, then, after), we can just use Past Simple: <em>"She ate, then I arrived."</em> Past Perfect is for when the <em>earlier</em> action needs emphasis or the sequence is not obvious.',
    events: [
      { x: 180, label: "She ate (first)", color: C.ps, y: 80, type: "ps" },
      { x: 480, label: "I arrived (then)", color: C.ps, y: 80, type: "ps" },
    ],
    ppText: "PAST SIMPLE + sequence word",
    psText: "PAST SIMPLE + sequence word",
  },
];

function renderCauseSvg(scenarioIdx) {
  const svg = document.getElementById("causeSvg");
  if (!svg) return;
  svg.innerHTML = "";
  const sc = causeScenarios[scenarioIdx];

  svg.appendChild(svgEl("line", { x1: 60, y1: 200, x2: 700, y2: 200, stroke: C.track, "stroke-width": 2 }));
  svg.appendChild(svgText(40, 215, "Past", { fill: C.dim, "font-size": 12, "font-weight": 600 }));
  svg.appendChild(svgText(690, 185, "NOW", { fill: C.now, "font-size": 11, "font-weight": 700 }));
  svg.appendChild(svgEl("circle", { cx: 680, cy: 200, r: 5, fill: C.now }));

  const midX = (sc.events[0].x + sc.events[1].x) / 2;
  svg.appendChild(svgEl("line", {
    x1: sc.events[0].x + 20, y1: 200, x2: sc.events[1].x - 20, y2: 200,
    stroke: C.dim, "stroke-width": 1, "stroke-dasharray": "4 4"
  }));
  svg.appendChild(svgText(midX, 190, "earlier → later", { fill: C.dim, "font-size": 10, "text-anchor": "middle" }));

  sc.events.forEach(ev => {
    const isPP = ev.type === "pp";
    const color = isPP ? C.simple : C.ps;
    const bg = isPP ? C.simpleBg : "rgba(100,116,139,0.15)";

    svg.appendChild(svgEl("line", { x1: ev.x, y1: ev.y + 30, x2: ev.x, y2: 195, stroke: color, "stroke-width": 1, "stroke-dasharray": "3 3" }));

    const box = svgEl("rect", { x: ev.x - 80, y: ev.y - 10, width: 160, height: 50, rx: 10, fill: bg, stroke: color, "stroke-width": 1.5 });
    box.classList.add("svg-anim");
    svg.appendChild(box);

    svg.appendChild(svgText(ev.x, ev.y + 10, ev.label, { fill: isPP ? C.simpleLight : "#cbd5e1", "font-size": 13, "font-weight": 700, "text-anchor": "middle" }));
    svg.appendChild(svgText(ev.x, ev.y + 28, isPP ? "PAST PERFECT" : "PAST SIMPLE", { fill: color, "font-size": 9, "font-weight": 700, "text-anchor": "middle", "letter-spacing": 1 }));

    const dot = svgEl("circle", { cx: ev.x, cy: 200, r: 6, fill: color });
    dot.classList.add("svg-anim");
    svg.appendChild(dot);
  });

  svg.appendChild(svgText(sc.events[0].x, 240, sc.ppText, { fill: sc.events[0].type === "pp" ? C.simpleLight : C.dim, "font-size": 10, "font-weight": 700, "text-anchor": "middle" }));
  svg.appendChild(svgText(sc.events[1].x, 240, sc.psText, { fill: C.dim, "font-size": 10, "font-weight": 700, "text-anchor": "middle" }));

  const insight = document.getElementById("causeInsight");
  if (insight) insight.innerHTML = sc.insight;
}

// ============================================================
// EXPLORER 2 (Simple): State with duration slider
// ============================================================
function renderStateSvg(years) {
  const svg = document.getElementById("stateSvg");
  if (!svg) return;
  svg.innerHTML = "";

  svg.appendChild(svgEl("line", { x1: 60, y1: 180, x2: 700, y2: 180, stroke: C.track, "stroke-width": 2 }));
  svg.appendChild(svgText(40, 195, "Past", { fill: C.dim, "font-size": 12, "font-weight": 600 }));
  svg.appendChild(svgText(690, 165, "NOW", { fill: C.now, "font-size": 11, "font-weight": 700 }));
  svg.appendChild(svgEl("circle", { cx: 680, cy: 180, r: 5, fill: C.now }));

  const moveX = 480;
  svg.appendChild(svgEl("circle", { cx: moveX, cy: 180, r: 6, fill: C.ps }));
  svg.appendChild(svgEl("line", { x1: moveX, y1: 180, x2: moveX, y2: 110, stroke: C.ps, "stroke-width": 1, "stroke-dasharray": "3 3" }));
  svg.appendChild(svgEl("rect", { x: moveX - 80, y: 60, width: 160, height: 50, rx: 10, fill: "rgba(100,116,139,0.15)", stroke: C.ps, "stroke-width": 1.5 }));
  svg.appendChild(svgText(moveX, 80, "Moved to London", { fill: "#cbd5e1", "font-size": 13, "font-weight": 700, "text-anchor": "middle" }));
  svg.appendChild(svgText(moveX, 98, "PAST SIMPLE (reference)", { fill: C.ps, "font-size": 9, "font-weight": 700, "text-anchor": "middle", "letter-spacing": 1 }));

  const startX = Math.max(80, moveX - years * 18);
  const barY = 230;
  const bar = svgEl("rect", { x: startX, y: barY, width: moveX - startX, height: 24, rx: 6, fill: C.simpleBg, stroke: C.simple, "stroke-width": 1.5, "stroke-dasharray": "6 3" });
  bar.classList.add("svg-anim");
  svg.appendChild(bar);
  svg.appendChild(svgText((startX + moveX) / 2, barY + 16, `Lived in Paris: ${years} year${years > 1 ? "s" : ""}`, { fill: C.simpleLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));

  svg.appendChild(svgEl("line", { x1: startX, y1: barY, x2: startX, y2: 185, stroke: C.simple, "stroke-width": 1, "stroke-dasharray": "2 2" }));
  svg.appendChild(svgEl("line", { x1: moveX, y1: barY, x2: moveX, y2: 185, stroke: C.simple, "stroke-width": 1, "stroke-dasharray": "2 2" }));

  const sentence = `They had lived in Paris for ${years} year${years > 1 ? "s" : ""} before they moved to London.`;
  svg.appendChild(svgText(380, 275, sentence, { fill: C.simpleLight, "font-size": 13, "font-weight": 600, "text-anchor": "middle", "font-style": "italic" }));

  const insight = document.getElementById("stateInsight");
  if (insight) insight.innerHTML =
    `The state (living in Paris) started ${years} year${years > 1 ? "s" : ""} before the reference point. ` +
    `Past Perfect shows a state that <strong>lasted up to</strong> a moment in the past. ` +
    `With <em>"for + duration"</em>, the focus is on how long the state continued.`;
}

// ============================================================
// EXPLORER 3 (Simple): Time markers — REWORKED
// just / never → timeline
// already / yet / before → sentence-position diagram (HTML)
// ============================================================
const markerData = {
  just: {
    type: "timeline",
    sentence: "He had just left when the phone rang.",
    insight: "<strong>Just</strong> means 'a very short time before' the reference point. On the timeline, the Past Perfect event sits <em>immediately to the left</em> of the Past Simple reference — the two moments are very close together.",
    offsetFromRef: 40,
  },
  never: {
    type: "timeline-never",
    sentence: "I had never seen snow before that trip.",
    insight: "<strong>Never</strong> means 'not one time' across the <em>entire</em> period from the distant past up to the reference point. The ✕ above the line means: throughout that whole span, the event <strong>did not happen at all</strong>.",
  },
  already: {
    type: "position",
    sentence: "She had already finished when I called.",
    insight: "<strong>Already</strong> means the action was complete <em>sooner than expected</em>. It goes <strong>between 'had' and the past participle</strong> — it modifies the verb phrase, not a point in time.",
    slots: ["She", "had", "already", "finished", "when", "I", "called."],
    highlightIdx: 2,
    highlightLabel: "already — completion before expectation (between had + past participle)",
  },
  yet: {
    type: "position",
    sentence: "She had not finished yet.",
    insight: "<strong>Yet</strong> (in negatives and questions) means 'up to that point in the past' — the action was <em>still pending</em>. It goes at the <strong>end of the sentence</strong>.",
    slots: ["She", "had", "not", "finished", "yet."],
    highlightIdx: 4,
    highlightLabel: "yet — still pending at that past moment (end of sentence)",
  },
  before: {
    type: "position",
    sentence: "They had lived there before moving to London.",
    insight: "<strong>Before</strong> marks the Past Perfect action as <em>earlier</em> than another past event. It typically comes near the <strong>end</strong> of the sentence, often introducing a Past Simple clause that names the later event.",
    slots: ["They", "had", "lived", "there", "before", "moving", "to", "London."],
    highlightIdx: 4,
    highlightLabel: "before — anchors this action as earlier than another past event",
  },
};

function renderMarkerSvg(marker) {
  const svg = document.getElementById("markerSvg");
  const timelineWrap = document.getElementById("markerTimelineWrap");
  const posDiagram = document.getElementById("markerPositionDiagram");
  const insight = document.getElementById("markerInsight");
  if (!svg || !timelineWrap || !posDiagram) return;

  const m = markerData[marker];
  if (!m) return;

  // Show/hide the right visual
  if (m.type === "position") {
    timelineWrap.classList.add("hidden");
    posDiagram.classList.remove("hidden");
    renderMarkerPositionDiagram(m);
  } else {
    timelineWrap.classList.remove("hidden");
    posDiagram.classList.add("hidden");
    posDiagram.innerHTML = "";
    svg.innerHTML = "";

    // Common timeline base
    svg.appendChild(svgEl("line", { x1: 60, y1: 180, x2: 700, y2: 180, stroke: C.track, "stroke-width": 2 }));
    svg.appendChild(svgText(40, 195, "Distant past", { fill: C.dim, "font-size": 11, "font-weight": 600 }));
    svg.appendChild(svgText(690, 165, "NOW", { fill: C.now, "font-size": 11, "font-weight": 700 }));
    svg.appendChild(svgEl("circle", { cx: 680, cy: 180, r: 5, fill: C.now }));

    const refX = 520;
    svg.appendChild(svgEl("circle", { cx: refX, cy: 180, r: 6, fill: C.ps }));
    svg.appendChild(svgText(refX, 165, "Reference point", { fill: C.ps, "font-size": 10, "font-weight": 700, "text-anchor": "middle" }));
    svg.appendChild(svgText(refX, 205, "(Past Simple event)", { fill: C.dim, "font-size": 9, "text-anchor": "middle" }));

    if (m.type === "timeline") {
      // --- JUST: dot immediately to the left of reference ---
      const justX = refX - m.offsetFromRef;
      svg.appendChild(svgEl("line", { x1: justX, y1: 110, x2: justX, y2: 175, stroke: C.simple, "stroke-width": 1.5, "stroke-dasharray": "3 3" }));
      const dot = svgEl("circle", { cx: justX, cy: 180, r: 6, fill: C.simple });
      dot.classList.add("svg-anim");
      svg.appendChild(dot);
      svg.appendChild(svgEl("rect", { x: justX - 50, y: 70, width: 100, height: 36, rx: 8, fill: C.simpleBg, stroke: C.simple, "stroke-width": 1 }));
      svg.appendChild(svgText(justX, 92, "just", { fill: C.simpleLight, "font-size": 14, "font-weight": 800, "text-anchor": "middle" }));
      // Bracket showing the tiny gap
      svg.appendChild(svgEl("line", { x1: justX, y1: 215, x2: refX, y2: 215, stroke: C.simple, "stroke-width": 1.5 }));
      svg.appendChild(svgEl("line", { x1: justX, y1: 210, x2: justX, y2: 220, stroke: C.simple, "stroke-width": 1.5 }));
      svg.appendChild(svgEl("line", { x1: refX, y1: 210, x2: refX, y2: 220, stroke: C.simple, "stroke-width": 1.5 }));
      svg.appendChild(svgText((justX + refX) / 2, 232, "a moment before", { fill: C.simpleLight, "font-size": 10, "font-weight": 700, "text-anchor": "middle" }));
    } else if (m.type === "timeline-never") {
      // --- NEVER: X above the entire span from distant past to reference ---
      const spanStart = 80;
      const spanEnd = refX;
      // Dashed line spanning the whole period
      svg.appendChild(svgEl("line", { x1: spanStart, y1: 180, x2: spanEnd, y2: 180, stroke: C.simple, "stroke-width": 2, "stroke-dasharray": "6 4" }));
      // Big X centered above the span
      const cx = (spanStart + spanEnd) / 2;
      const cy = 110;
      const arm = 22;
      const x1 = svgEl("line", { x1: cx - arm, y1: cy - arm, x2: cx + arm, y2: cy + arm, stroke: C.simple, "stroke-width": 4, "stroke-linecap": "round" });
      const x2 = svgEl("line", { x1: cx + arm, y1: cy - arm, x2: cx - arm, y2: cy + arm, stroke: C.simple, "stroke-width": 4, "stroke-linecap": "round" });
      x1.classList.add("svg-anim");
      x2.classList.add("svg-anim");
      svg.appendChild(x1);
      svg.appendChild(x2);
      svg.appendChild(svgText(cx, cy + arm + 18, "never — zero times in this whole period", { fill: C.simpleLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));
      // Start/end markers
      svg.appendChild(svgEl("circle", { cx: spanStart, cy: 180, r: 4, fill: C.simple }));
      svg.appendChild(svgText(spanStart, 165, "Distant past", { fill: C.dim, "font-size": 9, "font-weight": 600, "text-anchor": "middle" }));
    }

    svg.appendChild(svgText(380, 265, m.sentence, { fill: C.simpleLight, "font-size": 13, "font-weight": 600, "text-anchor": "middle", "font-style": "italic" }));
  }

  if (insight) insight.innerHTML = m.insight;
}

function renderMarkerPositionDiagram(m) {
  const container = document.getElementById("markerPositionDiagram");
  if (!container) return;
  container.innerHTML = "";

  const row = document.createElement("div");
  row.className = "marker-chip-row";

  m.slots.forEach((word, i) => {
    const chip = document.createElement("div");
    chip.className = "marker-chip" + (i === m.highlightIdx ? " highlighted" : "");
    chip.textContent = word;
    row.appendChild(chip);
  });

  const caption = document.createElement("div");
  caption.className = "marker-chip-caption";
  caption.textContent = m.highlightLabel;

  const sentenceLabel = document.createElement("div");
  sentenceLabel.className = "marker-sentence-label";
  sentenceLabel.textContent = m.sentence;

  container.appendChild(row);
  container.appendChild(caption);
  container.appendChild(sentenceLabel);
}

// ============================================================
// EXPLORER 1 (Continuous): Duration before interruption
// ============================================================
function renderDurationSvg(hours) {
  const svg = document.getElementById("durationSvg");
  if (!svg) return;
  svg.innerHTML = "";

  svg.appendChild(svgEl("line", { x1: 60, y1: 180, x2: 700, y2: 180, stroke: C.track, "stroke-width": 2 }));
  svg.appendChild(svgText(40, 195, "Morning", { fill: C.dim, "font-size": 11, "font-weight": 600 }));
  svg.appendChild(svgText(690, 165, "NOW", { fill: C.now, "font-size": 11, "font-weight": 700 }));
  svg.appendChild(svgEl("circle", { cx: 680, cy: 180, r: 5, fill: C.now }));

  const startX = 100;
  const endX = 100 + hours * 45;
  const interruptX = Math.min(endX + 30, 600);

  let pathD = `M ${startX},140 `;
  for (let x = startX; x < endX; x += 30) {
    pathD += `Q ${x + 15},125 ${x + 30},140 `;
  }
  const wave = svgEl("path", { d: pathD, stroke: C.continuous, "stroke-width": 3, fill: "none", "stroke-linecap": "round" });
  wave.classList.add("svg-anim");
  svg.appendChild(wave);

  svg.appendChild(svgText((startX + endX) / 2, 110, `Studying: ${hours} hour${hours > 1 ? "s" : ""}`, { fill: C.continuousLight, "font-size": 12, "font-weight": 700, "text-anchor": "middle" }));

  svg.appendChild(svgEl("circle", { cx: interruptX, cy: 180, r: 7, fill: "#ef4444" }));
  svg.appendChild(svgText(interruptX, 165, "Power went out", { fill: "#fca5a5", "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));
  svg.appendChild(svgEl("line", { x1: interruptX, y1: 145, x2: interruptX, y2: 173, stroke: "#ef4444", "stroke-width": 1, "stroke-dasharray": "2 2" }));

  const bracketY = 210;
  svg.appendChild(svgEl("line", { x1: startX, y1: bracketY, x2: endX, y2: bracketY, stroke: C.continuous, "stroke-width": 1.5 }));
  svg.appendChild(svgEl("line", { x1: startX, y1: bracketY - 5, x2: startX, y2: bracketY + 5, stroke: C.continuous, "stroke-width": 1.5 }));
  svg.appendChild(svgEl("line", { x1: endX, y1: bracketY - 5, x2: endX, y2: bracketY + 5, stroke: C.continuous, "stroke-width": 1.5 }));
  svg.appendChild(svgText((startX + endX) / 2, bracketY + 18, `for ${hours} hours`, { fill: C.continuousLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));

  const sentence = `She had been studying for ${hours} hour${hours > 1 ? "s" : ""} when the power went out.`;
  svg.appendChild(svgText(380, 265, sentence, { fill: C.continuousLight, "font-size": 13, "font-weight": 600, "text-anchor": "middle", "font-style": "italic" }));

  const insight = document.getElementById("durationInsight");
  if (insight) insight.innerHTML =
    `The studying was <strong>in progress</strong> for ${hours} hour${hours > 1 ? "s" : ""} and was <em>still happening</em> when the power went out. ` +
    `Past Perfect Continuous emphasizes the <strong>duration</strong> of the activity up to the interruption. ` +
    `Notice: "She <em>had studied</em>" would mean she <em>finished</em> — but she didn't!`;
}

// ============================================================
// EXPLORER 2 (Continuous): Explanation (cause)
// ============================================================
const explanationData = {
  tired: {
    effect: "He was exhausted at work.",
    cause: "He had been working 14-hour days for weeks.",
    insight: "The Past Perfect Continuous explains <em>why</em> he felt exhausted. The cause (working too much) happened <strong>over a long period</strong> before the effect.",
  },
  wet: {
    effect: "She was completely soaked.",
    cause: "She had been walking in the rain for an hour.",
    insight: "The rain (cause) was <em>ongoing</em> and explains the result (being soaked). The duration matters — she got wet <strong>because of</strong> the prolonged rain.",
  },
  angry: {
    effect: "He was furious at the meeting.",
    cause: "He had been arguing with his colleague all morning.",
    insight: "The argument was <em>in progress</em> over a period, and its effects were still visible when he walked into the meeting.",
  },
};

function renderExplanationSvg(explKey) {
  const svg = document.getElementById("explanationSvg");
  if (!svg) return;
  svg.innerHTML = "";
  const d = explanationData[explKey];
  if (!d) return;

  svg.appendChild(svgEl("line", { x1: 60, y1: 200, x2: 700, y2: 200, stroke: C.track, "stroke-width": 2 }));
  svg.appendChild(svgText(40, 215, "Earlier", { fill: C.dim, "font-size": 11, "font-weight": 600 }));
  svg.appendChild(svgText(690, 185, "NOW", { fill: C.now, "font-size": 11, "font-weight": 700 }));
  svg.appendChild(svgEl("circle", { cx: 680, cy: 200, r: 5, fill: C.now }));

  const startX = 100, endX = 380;
  let pathD = `M ${startX},130 `;
  for (let x = startX; x < endX; x += 30) {
    pathD += `Q ${x + 15},115 ${x + 30},130 `;
  }
  const wave = svgEl("path", { d: pathD, stroke: C.continuous, "stroke-width": 3, fill: "none", "stroke-linecap": "round" });
  wave.classList.add("svg-anim");
  svg.appendChild(wave);
  svg.appendChild(svgText((startX + endX) / 2, 100, "CAUSE (ongoing)", { fill: C.continuousLight, "font-size": 10, "font-weight": 700, "text-anchor": "middle", "letter-spacing": 1 }));
  svg.appendChild(svgEl("line", { x1: endX, y1: 135, x2: endX, y2: 195, stroke: C.continuous, "stroke-width": 1, "stroke-dasharray": "2 2" }));
  svg.appendChild(svgEl("circle", { cx: endX, cy: 200, r: 4, fill: C.continuous }));

  const refX = 520;
  svg.appendChild(svgEl("circle", { cx: refX, cy: 200, r: 7, fill: C.ps }));
  svg.appendChild(svgText(refX, 225, "EFFECT (past state)", { fill: C.dim, "font-size": 10, "font-weight": 700, "text-anchor": "middle", "letter-spacing": 1 }));

  const defs = svgEl("defs");
  const marker = svgEl("marker", { id: "explArrow", viewBox: "0 0 10 10", refX: 10, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto" });
  marker.appendChild(svgEl("path", { d: "M0,0 L10,5 L0,10 Z", fill: C.dim }));
  defs.appendChild(marker);
  svg.appendChild(defs);
  svg.appendChild(svgEl("line", { x1: endX + 10, y1: 160, x2: refX - 15, y2: 185, stroke: C.dim, "stroke-width": 1.5, "marker-end": "url(#explArrow)" }));

  svg.appendChild(svgText(380, 265, d.cause, { fill: C.continuousLight, "font-size": 13, "font-weight": 600, "text-anchor": "middle", "font-style": "italic" }));
  svg.appendChild(svgText(380, 288, d.effect, { fill: "#cbd5e1", "font-size": 13, "font-weight": 600, "text-anchor": "middle", "font-style": "italic" }));

  const insight = document.getElementById("explanationInsight");
  if (insight) insight.innerHTML = d.insight;
}

// ============================================================
// EXPLORER 3 (Continuous): Time markers
// ============================================================
const cmarkerData = {
  for: {
    sentence: "She had been working there for five years before she was promoted.",
    insight: "<strong>For + duration</strong> emphasizes <em>how long</em> the action continued. The total time is the focus.",
    type: "duration",
    label: "for + duration",
  },
  since: {
    sentence: "They had been living in the city since 2010.",
    insight: "<strong>Since + point in time</strong> marks the <em>starting point</em> of the ongoing action.",
    type: "point",
    label: "since + point in time",
  },
  allday: {
    sentence: "He had been waiting all day when she finally called.",
    insight: "<strong>All day</strong> emphasizes an <em>uninterrupted, ongoing</em> period.",
    type: "duration",
    label: "all day",
  },
  howlong: {
    sentence: "How long had you been waiting before the bus arrived?",
    insight: "<strong>How long</strong> asks about the <em>duration</em> of the ongoing action.",
    type: "question",
    label: "how long?",
  },
};

function renderCMarkerSvg(marker) {
  const svg = document.getElementById("cmarkerSvg");
  if (!svg) return;
  svg.innerHTML = "";
  const m = cmarkerData[marker];
  if (!m) return;

  svg.appendChild(svgEl("line", { x1: 60, y1: 180, x2: 700, y2: 180, stroke: C.track, "stroke-width": 2 }));
  svg.appendChild(svgText(40, 195, "Start", { fill: C.dim, "font-size": 11, "font-weight": 600 }));
  svg.appendChild(svgText(690, 165, "NOW", { fill: C.now, "font-size": 11, "font-weight": 700 }));
  svg.appendChild(svgEl("circle", { cx: 680, cy: 180, r: 5, fill: C.now }));

  if (m.type === "duration" || m.type === "point") {
    const startX = m.type === "point" ? 180 : 120;
    const endX = 480;
    let pathD = `M ${startX},140 `;
    for (let x = startX; x < endX; x += 30) {
      pathD += `Q ${x + 15},125 ${x + 30},140 `;
    }
    const wave = svgEl("path", { d: pathD, stroke: C.continuous, "stroke-width": 3, fill: "none", "stroke-linecap": "round" });
    wave.classList.add("svg-anim");
    svg.appendChild(wave);

    const bracketY = 210;
    svg.appendChild(svgEl("line", { x1: startX, y1: bracketY, x2: endX, y2: bracketY, stroke: C.continuous, "stroke-width": 1.5 }));
    svg.appendChild(svgEl("line", { x1: startX, y1: bracketY - 5, x2: startX, y2: bracketY + 5, stroke: C.continuous, "stroke-width": 1.5 }));
    svg.appendChild(svgEl("line", { x1: endX, y1: bracketY - 5, x2: endX, y2: bracketY + 5, stroke: C.continuous, "stroke-width": 1.5 }));

    if (m.type === "point") {
      svg.appendChild(svgEl("circle", { cx: startX, cy: 180, r: 5, fill: C.continuous }));
      svg.appendChild(svgText(startX, 165, "since 2010", { fill: C.continuousLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));
      svg.appendChild(svgText((startX + endX) / 2, bracketY + 18, "ongoing action →", { fill: C.continuousLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));
    } else {
      svg.appendChild(svgText((startX + endX) / 2, 115, "ongoing action", { fill: C.continuousLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));
      svg.appendChild(svgText((startX + endX) / 2, bracketY + 18, m.label, { fill: C.continuousLight, "font-size": 11, "font-weight": 700, "text-anchor": "middle" }));
    }

    svg.appendChild(svgEl("circle", { cx: endX + 30, cy: 180, r: 6, fill: C.ps }));
    svg.appendChild(svgText(endX + 30, 165, "Reference", { fill: C.ps, "font-size": 9, "font-weight": 700, "text-anchor": "middle" }));
  } else {
    const midX = 380;
    svg.appendChild(svgEl("circle", { cx: midX, cy: 180, r: 8, fill: C.continuousBg, stroke: C.continuous, "stroke-width": 2 }));
    svg.appendChild(svgText(midX, 186, "?", { fill: C.continuousLight, "font-size": 20, "font-weight": 800, "text-anchor": "middle" }));
    svg.appendChild(svgText(midX, 215, "How long had you been waiting?", { fill: C.continuousLight, "font-size": 12, "font-weight": 700, "text-anchor": "middle" }));
  }

  svg.appendChild(svgText(380, 275, m.sentence, { fill: C.continuousLight, "font-size": 13, "font-weight": 600, "text-anchor": "middle", "font-style": "italic" }));

  const insight = document.getElementById("cmarkerInsight");
  if (insight) insight.innerHTML = m.insight;
}

// ============================================================
// EXPLORER TOGGLE & EVENT WIRING
// ============================================================
const explorerRenderers = {
  cause: () => renderCauseSvg(Ex._causeIdx || 0),
  state: () => renderStateSvg(parseInt(document.getElementById("stateSlider")?.value || 5)),
  markers: () => renderMarkerSvg(Ex._marker || "just"),
  duration: () => renderDurationSvg(parseInt(document.getElementById("durSlider")?.value || 3)),
  explanation: () => renderExplanationSvg(Ex._expl || "tired"),
  cmarkers: () => renderCMarkerSvg(Ex._cmarker || "for"),
};

const Ex = {};

function toggleExplorer(key) {
  const el = document.querySelector(`[data-explorer="${key}"]`);
  if (!el) return;
  const wasOpen = el.classList.contains("open");
  // Close all
  document.querySelectorAll(".explorer").forEach(e => e.classList.remove("open"));
  if (!wasOpen) {
    el.classList.add("open");
    if (explorerRenderers[key]) explorerRenderers[key]();
  }
}

function renderExplorer(key) {
  if (explorerRenderers[key]) explorerRenderers[key]();
}

function initExplorerControls() {
  // Cause scenario buttons
  document.querySelectorAll("#explorer-cause .scenario-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll("#explorer-cause .scenario-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      Ex._causeIdx = parseInt(btn.dataset.scenario);
      renderCauseSvg(Ex._causeIdx);
    };
  });

  // State slider
  const stateSlider = document.getElementById("stateSlider");
  if (stateSlider) {
    stateSlider.oninput = () => {
      const v = stateSlider.value;
      const valEl = document.getElementById("stateYearsVal");
      if (valEl) valEl.textContent = v;
      renderStateSvg(parseInt(v));
    };
  }

  // Marker buttons
  document.querySelectorAll("#markerBtns .scenario-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll("#markerBtns .scenario-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      Ex._marker = btn.dataset.marker;
      renderMarkerSvg(Ex._marker);
    };
  });

  // Duration slider
  const durSlider = document.getElementById("durSlider");
  if (durSlider) {
    durSlider.oninput = () => {
      const v = durSlider.value;
      const valEl = document.getElementById("durHoursVal");
      if (valEl) valEl.textContent = v;
      renderDurationSvg(parseInt(v));
    };
  }

  // Explanation buttons
  document.querySelectorAll("#explBtns .scenario-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll("#explBtns .scenario-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      Ex._expl = btn.dataset.expl;
      renderExplanationSvg(Ex._expl);
    };
  });

  // Continuous marker buttons
  document.querySelectorAll("#cmarkerBtns .scenario-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll("#cmarkerBtns .scenario-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      Ex._cmarker = btn.dataset.cmarker;
      renderCMarkerSvg(Ex._cmarker);
    };
  });
}

function refreshExplorers() {
  document.querySelectorAll(".explorer.open").forEach(el => {
    const key = el.dataset.explorer;
    if (explorerRenderers[key]) explorerRenderers[key]();
  });
}
