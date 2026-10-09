// ============================================================
// CORE APP: State, tense switching, difficulty management
// Difficulty & streaks are stored per-tense and (for Ex2)
// per sentence type, so progress never carries over when the
// user switches tense or sentence type.
// ============================================================

const App = {
  currentTense: "simple",

  // difficulty[tense][exercise] — for ex2, value is an object keyed by type
  difficulty: {
    simple: {
      ex1: "easy",
      ex2: { affirmative: "easy", negative: "easy", question: "easy" },
      ex3: "easy",
      ex4: "easy",
    },
    continuous: {
      ex1: "easy",
      ex2: { affirmative: "easy", negative: "easy", question: "easy" },
      ex3: "easy",
      ex4: "easy",
    },
  },

  // streaks[tense][exercise] — same shape as difficulty
  streaks: {
    simple: {
      ex1: 0,
      ex2: { affirmative: 0, negative: 0, question: 0 },
      ex3: 0,
      ex4: 0,
    },
    continuous: {
      ex1: 0,
      ex2: { affirmative: 0, negative: 0, question: 0 },
      ex3: 0,
      ex4: 0,
    },
  },

  DIFF_ORDER: ["easy", "medium", "hard"],
  DIFF_LABELS: { easy: "Easy", medium: "Medium", hard: "Hard" },

  init() {
    // Tense toggle
    document.getElementById("btnSimple").onclick = () => App.switchTense("simple");
    document.getElementById("btnContinuous").onclick = () => App.switchTense("continuous");

    // Step number colors
    App.updateStepColors();

    // Initialize exercises
    Ex1.init();
    Ex2.init();
    Ex3.init();
    Ex4.init();

    // Initialize explorer controls
    initExplorerControls();

    // Auto-open first explorer
    toggleExplorer("cause");
  },

  switchTense(tense) {
    App.currentTense = tense;

    // Toggle buttons
    document.getElementById("btnSimple").className =
      "toggle-btn" + (tense === "simple" ? " active-simple" : "");
    document.getElementById("btnContinuous").className =
      "toggle-btn" + (tense === "continuous" ? " active-continuous" : "");

    // Body class for CSS
    document.body.classList.toggle("continuous-mode", tense === "continuous");

    // Show/hide explorer groups
    document.getElementById("simpleExplorers").classList.toggle("hidden", tense !== "simple");
    document.getElementById("continuousExplorers").classList.toggle("hidden", tense !== "continuous");

    // Formula in Ex1
    document.querySelector("#ex1Formula .simple-f").classList.toggle("hidden", tense !== "simple");
    document.querySelector("#ex1Formula .continuous-f").classList.toggle("hidden", tense !== "continuous");

    // Step number colors
    App.updateStepColors();

    // Reload all exercises with new tense (progress is independent per tense)
    Ex1.load();
    Ex2.load();
    Ex3.start();
    Ex4.load();

    // Refresh open explorers
    refreshExplorers();
  },

  updateStepColors() {
    const color = App.currentTense === "simple" ? "var(--simple-primary)" : "var(--continuous-primary)";
    ["ex1Num", "ex2Num", "ex3Num", "ex4Num"].forEach(id => {
      document.getElementById(id).style.background = color;
    });
  },

  // Get difficulty level for an exercise in the current tense.
  // For ex2, also keyed by the current sentence type.
  getDifficulty(exercise) {
    const d = App.difficulty[App.currentTense][exercise];
    if (exercise === "ex2") {
      return d[Ex2.state.type];
    }
    return d;
  },

  // Set difficulty for an exercise (used by Ex3 which manages its own rounds,
  // and internally for ex2 type changes).
  setDifficulty(exercise, level) {
    if (exercise === "ex2") {
      App.difficulty[App.currentTense].ex2[Ex2.state.type] = level;
    } else {
      App.difficulty[App.currentTense][exercise] = level;
    }
    App.updateBadge(exercise);
  },

  updateBadge(exercise) {
    const badge = document.getElementById(exercise + "Badge");
    if (!badge) return;
    const level = App.getDifficulty(exercise);
    badge.textContent = App.DIFF_LABELS[level];
    badge.className = "difficulty-badge " + level;
  },

  // Generic streak/difficulty progression for ex1, ex3, ex4.
  // Ex2 manages its own progression (per-type) in exercise2.js.
  maybeIncreaseDifficulty(exercise, wasCorrect) {
    const tense = App.currentTense;
    if (wasCorrect) {
      App.streaks[tense][exercise]++;
      if (App.streaks[tense][exercise] >= 3) {
        App.streaks[tense][exercise] = 0;
        const cur = App.difficulty[tense][exercise];
        const idx = App.DIFF_ORDER.indexOf(cur);
        if (idx < App.DIFF_ORDER.length - 1) {
          App.difficulty[tense][exercise] = App.DIFF_ORDER[idx + 1];
          App.updateBadge(exercise);
        }
      }
    } else {
      App.streaks[tense][exercise] = 0;
    }
  },
};

// Initialize on DOM ready
window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
