// ============================================================
// EXERCISE 2: SENTENCE BUILDER (reworked)
// Difficulty scales by SENTENCE LENGTH:
//   easy   — very short sentences, NO distractors
//   medium — medium sentences, 2 distractors mixed in (unmarked)
//   hard   — long sentences, 3 distractors mixed in (unmarked)
// Distractors are never visually marked — the student must
// judge by grammar and meaning.
// Progress (difficulty + streak) is tracked PER SENTENCE TYPE
// (affirmative / negative / question), so switching type
// starts fresh.
// ============================================================

const Ex2 = {
  state: {
    item: null,
    type: "affirmative",
    built: [],
    mistakes: 0,
    usedWords: new Set(),
    lastSet: [],
  },

  init() {
    document.querySelectorAll("#ex2TypeBtns .type-btn").forEach(btn => {
      btn.onclick = () => Ex2.selectType(btn.dataset.type);
    });
    document.getElementById("ex2Check").onclick = () => Ex2.check();
    document.getElementById("ex2Reset").onclick = () => Ex2.clear();
    document.getElementById("ex2Next").onclick = () => Ex2.load();
    Ex2.load();
  },

  selectType(type) {
    Ex2.state.type = type;
    document.querySelectorAll("#ex2TypeBtns .type-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(`#ex2TypeBtns .type-btn[data-type="${type}"]`).classList.add("active");
    // Badge reflects the new type's independent difficulty
    App.updateBadge("ex2");
    Ex2.load();
  },

  load() {
    const diff = App.getDifficulty("ex2");
    const pool = getData(BUILDER_DATA, App.currentTense, diff);

    let item;
    let attempts = 0;
    do {
      item = pool[Math.floor(Math.random() * pool.length)];
      attempts++;
    } while (Ex2.state.lastSet.includes(item.context) && attempts < 10);

    Ex2.state.lastSet.push(item.context);
    if (Ex2.state.lastSet.length > 3) Ex2.state.lastSet.shift();

    Ex2.state.item = item;
    Ex2.state.built = [];
    Ex2.state.mistakes = 0;
    Ex2.state.usedWords = new Set();

    document.getElementById("ex2Context").textContent = "💭 " + item.context;

    // Target words
    const target = item[Ex2.state.type].words;

    // Distractors by difficulty:
    //   easy   → none (short sentences only, every word is needed)
    //   medium → 2
    //   hard   → 3
    // All distractors are mixed in with target words — NO visual marking.
    let distractors = [];
    if (diff === "medium") {
      distractors = (item[Ex2.state.type].distractors || []).slice(0, 2);
    } else if (diff === "hard") {
      distractors = (item[Ex2.state.type].distractors || []).slice(0, 3);
    }

    // Build a single shuffled word pool — targets and distractors look identical
    const allWords = [
      ...target.map((w, i) => ({ word: w, uid: `t${i}`, isTarget: true })),
      ...distractors.map((w, i) => ({ word: w, uid: `d${i}`, isTarget: false })),
    ].sort(() => Math.random() - 0.5);

    const wordsEl = document.getElementById("ex2Words");
    wordsEl.innerHTML = "";
    const row = document.createElement("div");
    row.className = "build-words-row";
    allWords.forEach(w => row.appendChild(Ex2.makeWordBtn(w)));
    wordsEl.appendChild(row);

    Ex2.clear();
    document.getElementById("ex2Hint").classList.add("hidden");
    document.getElementById("ex2Feedback").textContent = "";
    document.getElementById("ex2Mistakes").textContent = "";
  },

  makeWordBtn(w) {
    const div = document.createElement("div");
    div.className = "build-word";
    div.textContent = w.word;
    div.dataset.uid = w.uid;
    div.dataset.word = w.word;
    div.dataset.isTarget = w.isTarget;
    div.onclick = () => Ex2.pickWord(div, w);
    return div;
  },

  pickWord(div, wordObj) {
    if (div.classList.contains("used")) return;

    const display = document.getElementById("ex2Display");
    const placeholder = display.querySelector(".build-placeholder");
    if (placeholder) placeholder.remove();

    const chip = document.createElement("div");
    chip.className = "build-chip";
    chip.textContent = wordObj.word;
    const uid = wordObj.uid + "_" + Date.now();
    chip.dataset.uid = uid;
    chip.onclick = () => Ex2.removeWord(chip, div);
    display.appendChild(chip);

    div.classList.add("used");
    Ex2.state.built.push({ word: wordObj.word, uid, el: div, origUid: wordObj.uid, isTarget: wordObj.isTarget });
  },

  removeWord(chip, originalDiv) {
    chip.remove();
    originalDiv.classList.remove("used");
    Ex2.state.built = Ex2.state.built.filter(b => b.uid !== chip.dataset.uid);
  },

  clear() {
    const display = document.getElementById("ex2Display");
    display.innerHTML = '<span class="build-placeholder">Click words below to build your sentence...</span>';
    display.classList.remove("correct", "wrong");
    Ex2.state.built = [];
    document.querySelectorAll("#ex2Words .build-word").forEach(w => w.classList.remove("used"));
    document.getElementById("ex2Hint").classList.add("hidden");
  },

  check() {
    const target = Ex2.state.item[Ex2.state.type].words;
    const builtWords = Ex2.state.built.map(b => b.word);
    const display = document.getElementById("ex2Display");

    if (builtWords.length === 0) {
      document.getElementById("ex2Feedback").textContent = "Build a sentence first!";
      document.getElementById("ex2Feedback").style.color = "var(--error-light)";
      return;
    }

    const isCorrect = JSON.stringify(builtWords) === JSON.stringify(target);

    if (isCorrect) {
      display.classList.add("correct");
      display.classList.remove("wrong");
      document.getElementById("ex2Feedback").textContent = "✓ Perfect!";
      document.getElementById("ex2Feedback").style.color = "var(--success-light)";
      Ex2.handleResult(true);
      setTimeout(() => Ex2.load(), 1800);
    } else {
      display.classList.add("wrong");
      display.classList.remove("correct");
      Ex2.state.mistakes++;

      const usedDistractor = Ex2.state.built.some(b => !b.isTarget);

      if (Ex2.state.mistakes === 1) {
        let msg = "✗ Not quite.";
        if (usedDistractor) msg += " One of those words doesn't belong in this sentence.";
        if (builtWords.length > target.length) msg += " Your sentence is too long.";
        if (builtWords.length < target.length) msg += " Your sentence is too short.";
        document.getElementById("ex2Feedback").textContent = msg;
        document.getElementById("ex2Feedback").style.color = "var(--error-light)";
      } else if (Ex2.state.mistakes === 2) {
        document.getElementById("ex2Feedback").textContent = "✗ Still wrong. Here's a hint:";
        document.getElementById("ex2Feedback").style.color = "var(--error-light)";
        Ex2.showHint(1);
      } else {
        document.getElementById("ex2Feedback").textContent = "✗ Let me give you a stronger hint:";
        document.getElementById("ex2Feedback").style.color = "var(--error-light)";
        Ex2.showHint(2);
      }

      Ex2.handleResult(false);
      document.getElementById("ex2Mistakes").textContent =
        `Mistake${Ex2.state.mistakes > 1 ? "s" : ""}: ${Ex2.state.mistakes}`;

      setTimeout(() => {
        display.classList.remove("wrong");
      }, 1200);
    }
  },

  // Per-type streak/difficulty progression (independent of other types)
  handleResult(wasCorrect) {
    const tense = App.currentTense;
    const typeKey = Ex2.state.type;
    if (wasCorrect) {
      App.streaks[tense].ex2[typeKey]++;
      if (App.streaks[tense].ex2[typeKey] >= 3) {
        App.streaks[tense].ex2[typeKey] = 0;
        const cur = App.difficulty[tense].ex2[typeKey];
        const idx = App.DIFF_ORDER.indexOf(cur);
        if (idx < App.DIFF_ORDER.length - 1) {
          App.difficulty[tense].ex2[typeKey] = App.DIFF_ORDER[idx + 1];
          App.updateBadge("ex2");
        }
      }
    } else {
      App.streaks[tense].ex2[typeKey] = 0;
    }
  },

  showHint(level) {
    const hintEl = document.getElementById("ex2Hint");
    const target = Ex2.state.item[Ex2.state.type].words;
    const isSimple = App.currentTense === "simple";

    let hintText = "";
    if (level === 1) {
      if (Ex2.state.type === "affirmative") {
        hintText = `Start with the subject, then "had"${isSimple ? "" : " + been"}. Time markers (already/just/never) go between "had" and the main verb.`;
      } else if (Ex2.state.type === "negative") {
        hintText = `"not" goes right after "had". The main verb needs its ${isSimple ? "past participle" : "-ing form"}.`;
      } else {
        hintText = `In questions, "Had" comes first, before the subject.`;
      }
    } else {
      const preview = target.slice(0, Math.min(3, target.length)).join(" ") + " ...";
      hintText = `The sentence starts with: <strong>${preview}</strong>`;
    }

    hintEl.textContent = "💡 " + hintText;
    hintEl.classList.remove("hidden");
  },
};

function toggleHint() {
  const hintEl = document.getElementById("ex2Hint");
  hintEl.classList.toggle("hidden");
  if (!hintEl.classList.contains("hidden") && Ex2.state.item) {
    Ex2.showHint(1);
  }
}
