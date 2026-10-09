// ============================================================
// EXERCISE 3: ERROR DETECTIVE
// ============================================================

// ---------- DATA ----------
const DETECTIVE_DATA = {
  simple: {
    easy: [
      { words: ["She", "had", "finish", "her", "homework", "already."], errorIdx: 2, correction: "finished", hint: "After 'had', we always need the past participle (finished), not the base form (finish)." },
      { words: ["He", "had", "go", "to", "Paris", "last", "year."], errorIdx: 2, correction: "gone", hint: "The past participle of 'go' is 'gone', not 'go'." },
      { words: ["He", "had", "already", "left", "when", "I", "arrived."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["They", "had", "seen", "that", "movie", "before."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["She", "had", "finished", "the", "report", "but", "he", "have", "not", "read", "it", "yet."], errorIdx: 7, correction: "had", hint: "Both verbs are in the same past narrative — 'have' breaks the sequence. It should be 'had'." },
      { words: ["They", "had", "not", "eat", "dinner", "yet."], errorIdx: 3, correction: "eaten", hint: "After 'had (not)', we need the past participle: 'eaten', not 'eat'." },
    ],
    medium: [
      { words: ["By", "the", "time", "we", "arrived", "they", "had", "already", "left", "the", "party."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["He", "had", "went", "home", "when", "I", "called."], errorIdx: 2, correction: "gone", hint: "'Went' is Past Simple. With 'had' we need the past participle: 'gone'." },
      { words: ["They", "had", "not", "saw", "the", "sign", "before", "entering."], errorIdx: 3, correction: "seen", hint: "Past participle of 'see' is 'seen', not 'saw'. 'Saw' is Past Simple." },
      { words: ["We", "had", "already", "left", "before", "they", "arrived."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["She", "had", "cooked", "dinner", "when", "the", "guests", "has", "arrived."], errorIdx: 7, correction: "had", hint: "The whole sentence is set in the past — 'has arrived' should be 'had arrived' to stay consistent." },
      { words: ["I", "had", "forgot", "to", "bring", "my", "keys."], errorIdx: 2, correction: "forgotten", hint: "Past participle of 'forget' is 'forgotten', not 'forgot'." },
    ],
    hard: [
      { words: ["She", "had", "hardly", "finished", "reading", "when", "he", "called."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["They", "had", "left", "before", "I", "realized", "they", "had", "forgotten", "the", "keys."], errorIdx: -1, hint: "This sentence is correct! They left first, then I realized they had forgotten the keys." },
      { words: ["I", "had", "had", "already", "told", "her", "everything."], errorIdx: 1, correction: "(remove)", hint: "You don't need two 'had's here. 'I had already told her' is correct." },
      { words: ["She", "had", "not", "finish", "the", "project", "by", "the", "deadline."], errorIdx: 3, correction: "finished", hint: "After 'had not', we need the past participle: 'finished'." },
      { words: ["They", "had", "seen", "the", "warning", "sign", "before", "they", "entered", "the", "building."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["He", "was", "tired", "because", "he", "had", "work", "all", "day."], errorIdx: 7, correction: "worked", hint: "After 'had', we need the past participle: 'worked', not 'work'." },
    ]
  },
  continuous: {
    easy: [
      { words: ["She", "had", "working", "all", "day", "so", "she", "was", "tired."], errorIdx: 2, correction: "been working", hint: "The structure is had + been + verb-ing. 'Been' is missing!" },
      { words: ["He", "had", "been", "running", "for", "hours", "when", "he", "stopped."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["They", "had", "been", "wait", "since", "noon."], errorIdx: 3, correction: "waiting", hint: "After 'had been', we need the -ing form: 'waiting', not 'wait'." },
      { words: ["I", "had", "been", "studying", "all", "night", "before", "the", "exam."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["She", "had", "crying", "because", "she", "was", "upset."], errorIdx: 2, correction: "been crying", hint: "Past Perfect Continuous needs 'had + been + -ing'. 'Been' is missing." },
      { words: ["He", "had", "been", "study", "for", "the", "exam."], errorIdx: 3, correction: "studying", hint: "After 'had been', we need the -ing form: 'studying'." },
    ],
    medium: [
      { words: ["We", "had", "been", "driving", "for", "hours", "when", "the", "storm", "starts."], errorIdx: 9, correction: "started", hint: "The main narrative is in the past — 'starts' should be 'started'." },
      { words: ["She", "had", "not", "been", "feeling", "well", "since", "Monday."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["They", "had", "be", "arguing", "for", "hours", "before", "they", "stopped."], errorIdx: 2, correction: "been", hint: "The structure is had + been + -ing. 'Be' should be 'been'." },
      { words: ["I", "had", "been", "waiting", "for", "the", "bus", "since", "morning."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["He", "had", "working", "on", "the", "project", "for", "weeks."], errorIdx: 2, correction: "been working", hint: "'Been' is missing. Past Perfect Continuous = had + been + -ing." },
      { words: ["The", "children", "had", "been", "played", "outside", "all", "morning."], errorIdx: 3, correction: "playing", hint: "After 'had been', we need the -ing form: 'playing', not 'played' (past participle)." },
    ],
    hard: [
      { words: ["By", "the", "time", "I", "arrived", "they", "had", "been", "waiting", "for", "over", "an", "hour."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["She", "had", "been", "working", "on", "the", "project", "for", "months", "before", "it", "was", "cancelled."], errorIdx: -1, hint: "This sentence is correct!" },
      { words: ["They", "had", "be", "living", "there", "for", "years", "before", "they", "moved."], errorIdx: 2, correction: "been", hint: "had + been + living — 'be' should be 'been'." },
      { words: ["He", "had", "not", "been", "eat", "properly", "since", "his", "surgery."], errorIdx: 4, correction: "eating", hint: "After 'had (not) been', we need the -ing form: 'eating'." },
      { words: ["How", "long", "had", "you", "been", "work", "there", "before", "you", "moved?"], errorIdx: 5, correction: "working", hint: "After 'had been', we need the -ing form: 'working'." },
      { words: ["She", "had", "been", "teaching", "at", "that", "school", "for", "ten", "years", "before", "she", "retired."], errorIdx: -1, hint: "This sentence is correct!" },
    ]
  }
};

// ---------- GAME LOGIC ----------
const Ex3 = {
  state: {
    items: [],
    currentIdx: 0,
    lives: 3,
    answered: false,
    results: [],
    round: 1,
  },

  init() {
    document.getElementById("ex3NoError").onclick = () => Ex3.pickNoError();
    document.getElementById("ex3Next").onclick = () => Ex3.next();
    Ex3.start();
  },

  start() {
    Ex3.state.lives = 3;
    Ex3.state.results = [];
    Ex3.state.currentIdx = 0;
    Ex3.state.round = 1;
    Ex3.loadRound();
    Ex3.renderLives();
    Ex3.renderScore();
  },

  loadRound() {
    let diff;
    if (Ex3.state.round <= 3) diff = "easy";
    else if (Ex3.state.round <= 7) diff = "medium";
    else diff = "hard";

    // Write difficulty into per-tense state
    App.setDifficulty("ex3", diff);

    const pool = getData(DETECTIVE_DATA, App.currentTense, diff);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const roundSize = diff === "easy" ? 3 : diff === "medium" ? 4 : 3;
    Ex3.state.items = shuffled.slice(0, roundSize);
    Ex3.state.currentIdx = 0;
    Ex3.state.answered = false;

    const roundEl = document.getElementById("ex3Round");
    if (roundEl) {
      roundEl.textContent = `Round ${Ex3.state.round} / 10 — ${diff.charAt(0).toUpperCase() + diff.slice(1)}`;
    }
    Ex3.render();
    Ex3.renderScore();
  },

  render() {
    const sentenceEl = document.getElementById("ex3Sentence");
    if (!sentenceEl) return;

    if (Ex3.state.currentIdx >= Ex3.state.items.length) {
      Ex3.state.round++;
      if (Ex3.state.round > 10) {
        sentenceEl.innerHTML = '<span style="color:var(--success);font-size:20px;">🎉 Detective Master! You survived all 10 rounds!</span>';
        const fb = document.getElementById("ex3Feedback");
        if (fb) fb.textContent = "";
        const noErr = document.getElementById("ex3NoError");
        const nextBtn = document.getElementById("ex3Next");
        if (noErr) noErr.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
      }
      if (Ex3.state.lives <= 0) {
        sentenceEl.innerHTML = '<span style="color:var(--error);font-size:18px;">💀 Game Over! You ran out of lives.</span>';
        const fb = document.getElementById("ex3Feedback");
        if (fb) {
          fb.textContent = `You survived ${Ex3.state.round - 1} rounds.`;
          fb.style.color = "var(--error-light)";
        }
        const noErr = document.getElementById("ex3NoError");
        const nextBtn = document.getElementById("ex3Next");
        if (noErr) noErr.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
      }
      Ex3.loadRound();
      return;
    }

    const item = Ex3.state.items[Ex3.state.currentIdx];
    Ex3.state.answered = false;

    sentenceEl.innerHTML = "";
    sentenceEl.classList.remove("correct-bg", "wrong-bg");

    item.words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "detective-word";
      span.textContent = word;
      span.onclick = () => Ex3.pickWord(i, span, item);
      sentenceEl.appendChild(span);
    });

    const fb = document.getElementById("ex3Feedback");
    if (fb) { fb.textContent = ""; fb.style.color = ""; }
    const noErr = document.getElementById("ex3NoError");
    const nextBtn = document.getElementById("ex3Next");
    if (noErr) { noErr.style.display = "inline-flex"; noErr.disabled = false; }
    if (nextBtn) nextBtn.classList.add("hidden");
  },

  pickWord(idx, span, item) {
    if (Ex3.state.answered) return;

    if (item.errorIdx === -1) {
      span.classList.add("wrong-pick");
      setTimeout(() => span.classList.remove("wrong-pick"), 600);
      const fb = document.getElementById("ex3Feedback");
      if (fb) {
        fb.textContent = "This sentence is actually correct! Click 'No Error'.";
        fb.style.color = "var(--error-light)";
      }
      return;
    }

    if (idx === item.errorIdx) {
      span.classList.add("correct-pick");
      const sentEl = document.getElementById("ex3Sentence");
      if (sentEl) sentEl.classList.add("correct-bg");
      const fb = document.getElementById("ex3Feedback");
      if (fb) {
        fb.innerHTML = `✓ Correct! "<strong>${item.words[idx]}</strong>" should be "<strong>${item.correction}</strong>". ${item.hint}`;
        fb.style.color = "var(--success-light)";
      }
      Ex3.state.answered = true;
      Ex3.state.results.push(true);
      Ex3.state.currentIdx++;
      Ex3.renderScore();
      const noErr = document.getElementById("ex3NoError");
      const nextBtn = document.getElementById("ex3Next");
      if (noErr) noErr.style.display = "none";
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      span.classList.add("wrong-pick");
      setTimeout(() => span.classList.remove("wrong-pick"), 600);
      Ex3.state.lives--;
      Ex3.renderLives();

      const fb = document.getElementById("ex3Feedback");
      if (Ex3.state.lives <= 0) {
        const words = document.querySelectorAll(".detective-word");
        const errorSpan = words[item.errorIdx];
        if (errorSpan) errorSpan.classList.add("revealed-error");
        if (fb) {
          fb.innerHTML = `✗ Wrong! The error was "<strong>${item.words[item.errorIdx]}</strong>" → should be "<strong>${item.correction}</strong>".<br>${item.hint}`;
          fb.style.color = "var(--error-light)";
        }
        Ex3.state.answered = true;
        Ex3.state.results.push(false);
        Ex3.renderScore();
        const noErr = document.getElementById("ex3NoError");
        if (noErr) noErr.style.display = "none";
        setTimeout(() => Ex3.render(), 2500);
      } else {
        if (fb) {
          fb.textContent = `✗ Not that word. Lives remaining: ${Ex3.state.lives}`;
          fb.style.color = "var(--error-light)";
        }
      }
    }
  },

  pickNoError() {
    if (Ex3.state.answered) return;
    const item = Ex3.state.items[Ex3.state.currentIdx];

    if (item.errorIdx === -1) {
      const sentEl = document.getElementById("ex3Sentence");
      if (sentEl) sentEl.classList.add("correct-bg");
      const fb = document.getElementById("ex3Feedback");
      if (fb) {
        fb.textContent = "✓ Correct! This sentence has no errors.";
        fb.style.color = "var(--success-light)";
      }
      Ex3.state.answered = true;
      Ex3.state.results.push(true);
      Ex3.state.currentIdx++;
      Ex3.renderScore();
      const noErr = document.getElementById("ex3NoError");
      const nextBtn = document.getElementById("ex3Next");
      if (noErr) noErr.style.display = "none";
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      Ex3.state.lives--;
      Ex3.renderLives();
      const words = document.querySelectorAll(".detective-word");
      const errorSpan = words[item.errorIdx];
      if (errorSpan) errorSpan.classList.add("revealed-error");
      const fb = document.getElementById("ex3Feedback");
      if (fb) {
        fb.innerHTML = `✗ This sentence DOES have an error: "<strong>${item.words[item.errorIdx]}</strong>" → "<strong>${item.correction}</strong>".<br>${item.hint}`;
        fb.style.color = "var(--error-light)";
      }
      Ex3.state.answered = true;
      Ex3.state.results.push(false);
      Ex3.renderScore();
      const noErr = document.getElementById("ex3NoError");
      if (noErr) noErr.style.display = "none";

      if (Ex3.state.lives <= 0) {
        setTimeout(() => Ex3.render(), 2500);
      } else {
        const nextBtn = document.getElementById("ex3Next");
        if (nextBtn) nextBtn.classList.remove("hidden");
      }
    }
  },

  next() {
    Ex3.render();
  },

  renderLives() {
    const bar = document.getElementById("ex3Lives");
    if (!bar) return;
    bar.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const life = document.createElement("div");
      life.className = "life" + (i >= Ex3.state.lives ? " lost" : "");
      life.textContent = "❤️";
      bar.appendChild(life);
    }
  },

  renderScore() {
    const bar = document.getElementById("ex3Score");
    if (!bar) return;
    bar.innerHTML = "";
    Ex3.state.results.forEach(r => {
      const dot = document.createElement("div");
      dot.className = "score-dot " + (r ? "correct" : "wrong");
      bar.appendChild(dot);
    });
  },
};
