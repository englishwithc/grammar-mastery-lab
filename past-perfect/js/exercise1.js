// ============================================================
// EXERCISE 1: STRUCTURE SPOTTER
// Task: 3 sentences shown. Student must LABEL each as
// Affirmative, Negative, or Question BEFORE revealing.
// Then the structure is shown and they see if they were right.
// ============================================================

const Ex1 = {
  state: {
    set: null,
    guesses: {},
    revealed: false,
    correctCount: 0,
  },

  init() {
    document.getElementById("ex1Check").onclick = () => Ex1.check();
    document.getElementById("ex1Next").onclick = () => Ex1.load();
    Ex1.load();
  },

  load() {
    const diff = App.getDifficulty("ex1");
    const pool = getData(SPOTTER_DATA, App.currentTense, diff);
    let set;
    do {
      set = pool[Math.floor(Math.random() * pool.length)];
    } while (Ex1.state.set === set && pool.length > 1);

    Ex1.state.set = set;
    Ex1.state.guesses = {};
    Ex1.state.revealed = false;
    Ex1.state.correctCount = 0;

    // Shuffle display order but keep track of original types
    const order = [0, 1, 2].sort(() => Math.random() - 0.5);
    const grid = document.getElementById("spotterGrid");
    grid.innerHTML = "";

    order.forEach((origIdx, displayIdx) => {
      const s = set.sentences[origIdx];
      const card = document.createElement("div");
      card.className = "spotter-card";
      card.dataset.origIdx = origIdx;
      card.dataset.displayIdx = displayIdx;
      card.dataset.correctType = s.type;

      card.innerHTML = `
        <div class="card-label unlabeled" id="label-${displayIdx}">❓ Not labeled yet</div>
        <div class="card-sentence">${s.words.join(" ")}</div>
        <div class="label-btns" id="labelBtns-${displayIdx}">
          <button class="label-btn aff-btn" data-type="affirmative" data-card="${displayIdx}">+ Affirmative</button>
          <button class="label-btn neg-btn" data-type="negative" data-card="${displayIdx}">− Negative</button>
          <button class="label-btn quest-btn" data-type="question" data-card="${displayIdx}">? Question</button>
        </div>
        <div class="card-structure hidden" id="structure-${displayIdx}"></div>
        <div class="card-result hidden" id="result-${displayIdx}"></div>
      `;

      grid.appendChild(card);

      // Wire label buttons
      card.querySelectorAll(".label-btn").forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          if (Ex1.state.revealed) return;
          const cardIdx = btn.dataset.card;
          const type = btn.dataset.type;
          Ex1.state.guesses[cardIdx] = type;

          // Update button states
          card.querySelectorAll(".label-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");

          // Update label
          const labels = { affirmative: ["+ Affirmative", "aff"], negative: ["− Negative", "neg"], question: ["? Question", "quest"] };
          const labelEl = document.getElementById(`label-${cardIdx}`);
          labelEl.textContent = labels[type][0];
          labelEl.className = `card-label ${labels[type][1]}`;
        };
      });
    });

    document.getElementById("spotterSummary").classList.add("hidden");
    document.getElementById("ex1Feedback").textContent = "";
    document.getElementById("ex1Check").disabled = false;
    document.getElementById("ex1Check").textContent = "Check My Answers";
    document.getElementById("ex1Check").style.display = "inline-flex";
    document.getElementById("ex1Next").style.display = "none";
  },

  check() {
    // All 3 must be guessed
    const guesses = Object.keys(Ex1.state.guesses);
    if (guesses.length < 3) {
      document.getElementById("ex1Feedback").textContent = "Label all three sentences first!";
      document.getElementById("ex1Feedback").style.color = "var(--error-light)";
      return;
    }

    Ex1.state.revealed = true;
    let correct = 0;

    document.querySelectorAll(".spotter-card").forEach(card => {
      const displayIdx = card.dataset.displayIdx;
      const correctType = card.dataset.correctType;
      const guess = Ex1.state.guesses[displayIdx];
      const isCorrect = guess === correctType;
      if (isCorrect) correct++;

      // Disable label buttons
      card.querySelectorAll(".label-btn").forEach(b => b.disabled = true);

      // Show result
      const resultEl = document.getElementById(`result-${displayIdx}`);
      resultEl.classList.remove("hidden");
      if (isCorrect) {
        resultEl.innerHTML = '<span style="color:var(--success-light);">✓ Correct!</span>';
        card.classList.add("correct-reveal");
      } else {
        const labels = { affirmative: "+ Affirmative", negative: "− Negative", question: "? Question" };
        resultEl.innerHTML = `<span style="color:var(--error-light);">✗ It's ${labels[correctType]}</span>`;
        card.classList.add("wrong-reveal");
      }

      // Reveal structure
      const s = Ex1.state.set.sentences[card.dataset.origIdx];
      const structEl = document.getElementById(`structure-${displayIdx}`);
      structEl.classList.remove("hidden");
      structEl.innerHTML = Ex1.buildStructure(s);
    });

    Ex1.state.correctCount = correct;
    Ex1.showDiff();

    document.getElementById("spotterSummary").classList.remove("hidden");

    if (correct === 3) {
      document.getElementById("ex1Feedback").textContent = "🎉 Perfect! You identified all three structures.";
      document.getElementById("ex1Feedback").style.color = "var(--success-light)";
      App.maybeIncreaseDifficulty("ex1", true);
    } else {
      document.getElementById("ex1Feedback").textContent = `You got ${correct} out of 3. Study the structures below, then try a new set.`;
      document.getElementById("ex1Feedback").style.color = "var(--continuous-light)";
      App.maybeIncreaseDifficulty("ex1", false);
    }
    App.updateBadge("ex1");

    document.getElementById("ex1Check").style.display = "none";
    document.getElementById("ex1Next").style.display = "inline-flex";
  },

  buildStructure(sentence) {
    const labels = {
      subj: ["Subject", "sp-subj"],
      aux: ["had", "sp-aux"],
      been: ["been", "sp-aux"],
      pp: ["past participle", "sp-pp"],
      ing: ["-ing form", "sp-ing"],
      not: ["not", "sp-not"],
      adv: ["adverb/time", "sp-adv"],
      obj: ["", ""],
      ps: ["past simple", "sp-pp"],
      adj: ["", ""],
    };

    let html = '<div style="font-size:12px; line-height:2; margin-top:8px;">';
    sentence.words.forEach((word, i) => {
      const type = sentence.structure[i] || "plain";
      const lbl = labels[type];
      if (lbl && lbl[0]) {
        html += `<span class="structure-part ${lbl[1]}">${word}</span> <small style="color:var(--text-dim);">(${lbl[0]})</small> `;
      } else {
        html += `<span class="sp-plain">${word}</span> `;
      }
    });
    html += "</div>";

    // Key differences
    const hasNot = sentence.structure.includes("not");
    const startsWithHad = sentence.words[0].toLowerCase() === "had";
    html += '<div style="margin-top:8px; font-size:12px; color:var(--text-dim);">';
    if (startsWithHad) html += '🔹 "Had" at the front = <strong>Question</strong><br>';
    if (hasNot) html += '🔹 "not" after "had" = <strong>Negative</strong><br>';
    if (!hasNot && !startsWithHad) html += '🔹 No "not", "had" in place = <strong>Affirmative</strong><br>';
    html += "</div>";

    return html;
  },

  showDiff() {
    const diffEl = document.getElementById("spotterDiff");
    const isSimple = App.currentTense === "simple";
    const aux = isSimple ? "had + past participle" : "had + been + verb-ing";

    diffEl.innerHTML = `
      <div class="diff-row aff">
        <span class="diff-icon">+</span>
        <div><strong>Affirmative</strong><br><span class="diff-desc">Subject + ${aux}. States a fact about the past-before-past.</span></div>
      </div>
      <div class="diff-row neg">
        <span class="diff-icon">−</span>
        <div><strong>Negative</strong><br><span class="diff-desc">Subject + had + not + ... The word "not" goes right after "had" (or "hadn't").</span></div>
      </div>
      <div class="diff-row quest">
        <span class="diff-icon">?</span>
        <div><strong>Question</strong><br><span class="diff-desc">Had + subject + ...? "Had" moves to the very front of the sentence.</span></div>
      </div>
    `;
  },
};
