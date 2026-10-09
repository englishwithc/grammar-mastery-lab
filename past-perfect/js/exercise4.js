// ============================================================
// EXERCISE 4: TIMELINE PUZZLE
// ============================================================

const Ex4 = {
  state: {
    puzzle: null,
    placements: {},
    selectedEvent: null,
  },

  init() {
    document.getElementById("ex4Check").onclick = () => Ex4.check();
    document.getElementById("ex4Next").onclick = () => Ex4.load();
    Ex4.load();
  },

  load() {
    const diff = App.getDifficulty("ex4");
    const pool = getData(PUZZLE_DATA, App.currentTense, diff);

    let puzzle;
    let attempts = 0;
    do {
      puzzle = pool[Math.floor(Math.random() * pool.length)];
      attempts++;
    } while (Ex4.state.puzzle === puzzle && pool.length > 1 && attempts < 10);

    Ex4.state.puzzle = puzzle;
    Ex4.state.placements = {};
    Ex4.state.selectedEvent = null;

    // Story
    document.getElementById("ex4Story").innerHTML = puzzle.story;

    // Build timeline slots dynamically based on number of events
    const numPP = puzzle.events.filter(e => e.tense === "pp").length;
    const timelineEl = document.getElementById("ex4Timeline");
    const track = timelineEl.querySelector(".tl-track");
    track.innerHTML = "";

    // Label: Earlier past
    const label1 = document.createElement("div");
    label1.className = "tl-label";
    label1.textContent = "Earlier past →";
    track.appendChild(label1);

    // PP slots (numbered)
    for (let i = 0; i < numPP; i++) {
      const slot = document.createElement("div");
      slot.className = "tl-slot";
      slot.dataset.pos = i;
      slot.innerHTML = `<span class="slot-hint">Slot ${i + 1}</span>`;
      Ex4.wireSlot(slot);
      track.appendChild(slot);
    }

    // Label: Reference point
    const label2 = document.createElement("div");
    label2.className = "tl-label ref-label";
    label2.textContent = "Reference point";
    track.appendChild(label2);

    // Reference slot (fixed, Past Simple)
    const refSlot = document.createElement("div");
    refSlot.className = "tl-slot reference";
    refSlot.dataset.pos = numPP;
    refSlot.innerHTML = `<span class="ref-text">${puzzle.referenceText}</span>`;
    track.appendChild(refSlot);

    // Label: Now
    const label3 = document.createElement("div");
    label3.className = "tl-label";
    label3.textContent = "→ Now";
    track.appendChild(label3);

    // Events pool
    const eventsEl = document.getElementById("ex4Events");
    eventsEl.innerHTML = "";
    const shuffled = [...puzzle.events].map((ev, idx) => ({ ...ev, origIdx: idx })).sort(() => Math.random() - 0.5);

    shuffled.forEach(ev => {
      const div = document.createElement("div");
      div.className = "puzzle-event " + (ev.tense === "pp" ? "pp-event" : "ps-event");
      div.textContent = ev.text;
      div.draggable = true;
      div.dataset.eventIdx = ev.origIdx;
      div.dataset.tense = ev.tense;

      div.ondragstart = (e) => {
        Ex4.state.draggedEl = div;
        div.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      };
      div.ondragend = () => {
        div.classList.remove("dragging");
        Ex4.state.draggedEl = null;
      };

      div.onclick = () => Ex4.clickEvent(div);

      eventsEl.appendChild(div);
    });

    document.getElementById("ex4Feedback").textContent = "";
  },

  wireSlot(slot) {
    slot.ondragover = (e) => {
      e.preventDefault();
      slot.classList.add("drag-over");
    };
    slot.ondragleave = () => slot.classList.remove("drag-over");
    slot.ondrop = (e) => {
      e.preventDefault();
      slot.classList.remove("drag-over");
      if (Ex4.state.draggedEl) {
        Ex4.placeEvent(Ex4.state.draggedEl, slot, true);
      }
    };
    // Click to place selected event
    slot.onclick = () => {
      if (Ex4.state.selectedEvent) {
        Ex4.placeEvent(Ex4.state.selectedEvent, slot, false);
      }
    };
  },

  clickEvent(div) {
    // If already placed, return to pool
    if (div.classList.contains("placed")) {
      const slot = div.closest(".tl-slot");
      if (slot) {
        delete Ex4.state.placements[slot.dataset.pos];
        slot.innerHTML = `<span class="slot-hint">Slot ${parseInt(slot.dataset.pos) + 1}</span>`;
        slot.classList.remove("filled", "correct-slot", "wrong-slot");
      }
      div.classList.remove("placed");
      Ex4.state.selectedEvent = null;
      return;
    }

    // Toggle selection
    document.querySelectorAll(".puzzle-event").forEach(e => e.classList.remove("selected-event"));
    if (Ex4.state.selectedEvent === div) {
      Ex4.state.selectedEvent = null;
    } else {
      div.classList.add("selected-event");
      Ex4.state.selectedEvent = div;
    }
  },

  placeEvent(div, slot, isDrag) {
    const eventIdx = parseInt(div.dataset.eventIdx);
    const pos = parseInt(slot.dataset.pos);

    // If slot is occupied, swap: return existing event to pool
    if (slot.classList.contains("filled")) {
      const existing = slot.querySelector(".puzzle-event");
      if (existing && existing !== div) {
        const existingIdx = parseInt(existing.dataset.eventIdx);
        // Return existing to pool visually
        existing.classList.remove("placed");
        const eventsEl = document.getElementById("ex4Events");
        eventsEl.appendChild(existing);
        delete Ex4.state.placements[pos];
      }
    }

    // If event was placed elsewhere, clear old slot
    if (div.classList.contains("placed")) {
      const oldSlot = div.closest(".tl-slot");
      if (oldSlot && oldSlot !== slot) {
        delete Ex4.state.placements[oldSlot.dataset.pos];
        oldSlot.innerHTML = `<span class="slot-hint">Slot ${parseInt(oldSlot.dataset.pos) + 1}</span>`;
        oldSlot.classList.remove("filled");
      }
    }

    // Place in new slot
    slot.innerHTML = "";
    slot.appendChild(div);
    slot.classList.add("filled");
    slot.classList.remove("correct-slot", "wrong-slot");
    div.classList.add("placed");
    div.classList.remove("selected-event");
    Ex4.state.placements[pos] = eventIdx;
    Ex4.state.selectedEvent = null;

    document.querySelectorAll(".puzzle-event").forEach(e => e.classList.remove("selected-event"));
  },

  check() {
    const puzzle = Ex4.state.puzzle;
    const numPP = puzzle.events.filter(e => e.tense === "pp").length;

    // Check all PP slots filled
    let allFilled = true;
    for (let i = 0; i < numPP; i++) {
      if (Ex4.state.placements[i] === undefined) allFilled = false;
    }

    if (!allFilled) {
      document.getElementById("ex4Feedback").textContent = `Place all ${numPP} Past Perfect events on the timeline first! (${Object.keys(Ex4.state.placements).length}/${numPP} placed)`;
      document.getElementById("ex4Feedback").style.color = "var(--error-light)";
      return;
    }

    // Check each placement
    let allCorrect = true;
    const slots = document.querySelectorAll(".tl-slot:not(.reference)");

    slots.forEach(slot => {
      const pos = parseInt(slot.dataset.pos);
      const eventIdx = Ex4.state.placements[pos];
      const placedEvent = puzzle.events[eventIdx];

      // Find which event SHOULD be at this position
      const correctEvents = puzzle.events
        .map((e, i) => ({ ...e, i }))
        .filter(e => e.tense === "pp")
        .sort((a, b) => a.pos - b.pos);

      const shouldBe = correctEvents[pos];

      if (shouldBe && shouldBe.text === placedEvent.text) {
        slot.classList.add("correct-slot");
      } else {
        slot.classList.add("wrong-slot");
        allCorrect = false;
      }
    });

    if (allCorrect) {
      document.getElementById("ex4Feedback").textContent =
        "✓ Perfect! Past Perfect events come before the reference point, in the correct order.";
      document.getElementById("ex4Feedback").style.color = "var(--success-light)";
      App.maybeIncreaseDifficulty("ex4", true);
      App.updateBadge("ex4");
      setTimeout(() => Ex4.load(), 2500);
    } else {
      document.getElementById("ex4Feedback").textContent =
        "✗ Not quite. Remember: events with Past Perfect happened BEFORE the reference point. Check the order — which happened first?";
      document.getElementById("ex4Feedback").style.color = "var(--error-light)";
      App.maybeIncreaseDifficulty("ex4", false);
      setTimeout(() => {
        document.querySelectorAll(".tl-slot").forEach(s => {
          s.classList.remove("correct-slot", "wrong-slot");
        });
      }, 2500);
    }
  },
};
