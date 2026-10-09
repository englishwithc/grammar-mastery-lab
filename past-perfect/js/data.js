// ============================================================
// ALL EXERCISE DATA
// ============================================================

// ---------- Exercise 1: Structure Spotter ----------
const SPOTTER_DATA = {
  simple: {
    easy: [
      {
        theme: "Finishing homework",
        sentences: [
          { type: "affirmative", words: ["She", "had", "finished", "her", "homework", "already."], structure: ["subj","aux","pp","obj","obj","adv"] },
          { type: "negative", words: ["She", "had", "not", "finished", "her", "homework", "yet."], structure: ["subj","aux","not","pp","obj","obj","adv"] },
          { type: "question", words: ["Had", "she", "finished", "her", "homework", "yet?"], structure: ["aux","subj","pp","obj","obj","adv"] },
        ]
      },
      {
        theme: "Arriving at a party",
        sentences: [
          { type: "affirmative", words: ["They", "had", "already", "left", "when", "we", "arrived."], structure: ["subj","aux","adv","pp","adv","subj","ps"] },
          { type: "negative", words: ["They", "had", "not", "left", "when", "we", "arrived."], structure: ["subj","aux","not","pp","adv","subj","ps"] },
          { type: "question", words: ["Had", "they", "left", "before", "we", "arrived?"], structure: ["aux","subj","pp","adv","subj","ps"] },
        ]
      },
      {
        theme: "Seeing a movie",
        sentences: [
          { type: "affirmative", words: ["I", "had", "never", "seen", "that", "film", "before."], structure: ["subj","aux","adv","pp","obj","obj","adv"] },
          { type: "negative", words: ["I", "had", "not", "seen", "that", "film", "before."], structure: ["subj","aux","not","pp","obj","obj","adv"] },
          { type: "question", words: ["Had", "you", "ever", "seen", "that", "film?"], structure: ["aux","subj","adv","pp","obj","obj"] },
        ]
      },
    ],
    medium: [
      {
        theme: "A surprise visit",
        sentences: [
          { type: "affirmative", words: ["By", "the", "time", "I", "called", "she", "had", "already", "left", "the", "office."], structure: ["adv","adv","adv","subj","ps","subj","aux","adv","pp","obj","obj"] },
          { type: "negative", words: ["She", "had", "not", "expected", "my", "call", "so", "late."], structure: ["subj","aux","not","pp","obj","obj","adv","adv"] },
          { type: "question", words: ["Had", "she", "known", "you", "were", "coming", "today?"], structure: ["aux","subj","pp","subj","ps","ps","adv"] },
        ]
      },
      {
        theme: "A lost opportunity",
        sentences: [
          { type: "affirmative", words: ["We", "had", "missed", "the", "train", "because", "we", "had", "not", "checked", "the", "schedule."], structure: ["subj","aux","pp","obj","obj","adv","subj","aux","not","pp","obj","obj"] },
          { type: "negative", words: ["They", "had", "not", "booked", "tickets", "in", "advance."], structure: ["subj","aux","not","pp","obj","obj","adv"] },
          { type: "question", words: ["Had", "you", "ever", "traveled", "by", "train", "before?"], structure: ["aux","subj","adv","pp","adv","obj","adv"] },
        ]
      },
      {
        theme: "A change of plans",
        sentences: [
          { type: "affirmative", words: ["He", "had", "changed", "his", "mind", "before", "the", "meeting", "started."], structure: ["subj","aux","pp","obj","obj","adv","obj","obj","ps"] },
          { type: "negative", words: ["He", "had", "not", "told", "anyone", "about", "the", "change."], structure: ["subj","aux","not","pp","obj","adv","obj","obj"] },
          { type: "question", words: ["Had", "anyone", "told", "you", "about", "the", "change?"], structure: ["aux","obj","pp","subj","adv","obj","obj"] },
        ]
      },
    ],
    hard: [
      {
        theme: "A difficult decision",
        sentences: [
          { type: "affirmative", words: ["She", "had", "hardly", "finished", "reading", "the", "report", "when", "the", "phone", "rang."], structure: ["subj","aux","adv","pp","ps","obj","obj","adv","obj","obj","ps"] },
          { type: "negative", words: ["She", "had", "not", "realized", "how", "late", "it", "was", "until", "she", "checked", "her", "watch."], structure: ["subj","aux","not","pp","adv","adv","obj","ps","adv","subj","ps","obj","obj"] },
          { type: "question", words: ["Had", "you", "ever", "wondered", "what", "might", "have", "happened", "if", "you", "had", "stayed?"], structure: ["aux","subj","adv","pp","obj","obj","ps","pp","adv","subj","aux","ps"] },
        ]
      },
      {
        theme: "An unexpected result",
        sentences: [
          { type: "affirmative", words: ["They", "had", "expected", "to", "win", "easily", "but", "they", "had", "underestimated", "their", "opponents."], structure: ["subj","aux","pp","adv","ps","adv","adv","subj","aux","pp","obj","obj"] },
          { type: "negative", words: ["I", "had", "not", "anticipated", "such", "a", "strong", "reaction."], structure: ["subj","aux","not","pp","adv","obj","obj","obj"] },
          { type: "question", words: ["Had", "the", "team", "practiced", "more", "before", "the", "final?"], structure: ["aux","obj","obj","pp","adv","adv","obj","obj"] },
        ]
      },
    ]
  },
  continuous: {
    easy: [
      {
        theme: "Working all day",
        sentences: [
          { type: "affirmative", words: ["She", "had", "been", "working", "all", "day", "so", "she", "was", "tired."], structure: ["subj","aux","been","ing","adv","adv","adv","subj","ps","adj"] },
          { type: "negative", words: ["She", "had", "not", "been", "working", "hard", "that", "week."], structure: ["subj","aux","not","been","ing","adv","adv","obj","obj"] },
          { type: "question", words: ["Had", "she", "been", "working", "long", "that", "day?"], structure: ["aux","subj","been","ing","adv","adv","obj"] },
        ]
      },
      {
        theme: "Waiting for a bus",
        sentences: [
          { type: "affirmative", words: ["They", "had", "been", "waiting", "for", "an", "hour", "when", "it", "finally", "came."], structure: ["subj","aux","been","ing","adv","obj","obj","adv","obj","adv","ps"] },
          { type: "negative", words: ["They", "had", "not", "been", "waiting", "very", "long."], structure: ["subj","aux","not","been","ing","adv","adv"] },
          { type: "question", words: ["How", "long", "had", "they", "been", "waiting?"], structure: ["adv","adv","aux","subj","been","ing"] },
        ]
      },
      {
        theme: "Studying for an exam",
        sentences: [
          { type: "affirmative", words: ["I", "had", "been", "studying", "since", "morning", "before", "the", "exam."], structure: ["subj","aux","been","ing","adv","adv","adv","obj","obj"] },
          { type: "negative", words: ["He", "had", "not", "been", "sleeping", "well", "all", "week."], structure: ["subj","aux","not","been","ing","adv","adv","obj","obj"] },
          { type: "question", words: ["Had", "you", "been", "studying", "all", "night?"], structure: ["aux","subj","been","ing","adv","adv"] },
        ]
      },
    ],
    medium: [
      {
        theme: "A long journey",
        sentences: [
          { type: "affirmative", words: ["We", "had", "been", "driving", "for", "six", "hours", "when", "the", "storm", "started."], structure: ["subj","aux","been","ing","adv","adj","obj","adv","obj","obj","ps"] },
          { type: "negative", words: ["We", "had", "not", "been", "driving", "long", "before", "we", "hit", "traffic."], structure: ["subj","aux","not","been","ing","adv","adv","subj","ps","obj"] },
          { type: "question", words: ["Had", "you", "been", "driving", "long", "before", "you", "took", "a", "break?"], structure: ["aux","subj","been","ing","adv","adv","subj","ps","obj","obj"] },
        ]
      },
      {
        theme: "Feeling unwell",
        sentences: [
          { type: "affirmative", words: ["She", "had", "been", "feeling", "sick", "all", "week", "before", "she", "saw", "a", "doctor."], structure: ["subj","aux","been","ing","adj","adv","obj","adv","subj","ps","obj","obj"] },
          { type: "negative", words: ["He", "had", "not", "been", "eating", "properly", "since", "the", "operation."], structure: ["subj","aux","not","been","ing","adv","adv","obj","obj","obj"] },
          { type: "question", words: ["How", "long", "had", "she", "been", "feeling", "ill?"], structure: ["adv","adv","aux","subj","been","ing","adj"] },
        ]
      },
    ],
    hard: [
      {
        theme: "A project that took months",
        sentences: [
          { type: "affirmative", words: ["They", "had", "been", "working", "on", "the", "project", "for", "months", "before", "they", "finally", "launched", "it."], structure: ["subj","aux","been","ing","adv","obj","obj","adv","obj","adv","subj","adv","ps","obj"] },
          { type: "negative", words: ["She", "had", "not", "been", "sleeping", "well", "since", "she", "had", "started", "the", "new", "job."], structure: ["subj","aux","not","been","ing","adv","adv","subj","aux","ps","obj","obj","obj"] },
          { type: "question", words: ["How", "long", "had", "they", "been", "living", "together", "before", "they", "got", "married?"], structure: ["adv","adv","aux","subj","been","ing","adv","adv","subj","ps","adj"] },
        ]
      },
    ]
  }
};

// ---------- Exercise 2: Sentence Builder ----------
// Each item: context + correct sentence for each type + word pool (with distractors).
// Difficulty now scales by SENTENCE LENGTH:
//   easy   — very short sentences (4-6 words), no distractors
//   medium — medium sentences (8-11 words), 2 distractors mixed in (unmarked)
//   hard   — long sentences (12-16 words), 3 distractors mixed in (unmarked)
const BUILDER_DATA = {
  simple: {
    easy: [
      {
        context: "Finish work → go home",
        affirmative: { words: ["She", "had", "finished", "work."], distractors: [] },
        negative: { words: ["She", "had", "not", "finished."], distractors: [] },
        question: { words: ["Had", "she", "finished?"], distractors: [] },
      },
      {
        context: "Eat → then leave",
        affirmative: { words: ["He", "had", "eaten", "already."], distractors: [] },
        negative: { words: ["He", "had", "not", "eaten", "yet."], distractors: [] },
        question: { words: ["Had", "he", "eaten?"], distractors: [] },
      },
      {
        context: "See the film",
        affirmative: { words: ["I", "had", "seen", "it."], distractors: [] },
        negative: { words: ["I", "had", "not", "seen", "it."], distractors: [] },
        question: { words: ["Had", "you", "seen", "it?"], distractors: [] },
      },
      {
        context: "Leave early",
        affirmative: { words: ["They", "had", "left", "already."], distractors: [] },
        negative: { words: ["They", "had", "not", "left."], distractors: [] },
        question: { words: ["Had", "they", "left?"], distractors: [] },
      },
      {
        context: "Forget the keys",
        affirmative: { words: ["He", "had", "forgotten", "them."], distractors: [] },
        negative: { words: ["He", "had", "not", "forgotten."], distractors: [] },
        question: { words: ["Had", "he", "forgotten?"], distractors: [] },
      },
    ],
    medium: [
      {
        context: "Finish homework → before dinner",
        affirmative: { words: ["She", "had", "finished", "her", "homework", "before", "dinner."], distractors: ["already", "yet"] },
        negative: { words: ["She", "had", "not", "finished", "her", "homework", "yet."], distractors: ["already", "just"] },
        question: { words: ["Had", "she", "finished", "her", "homework", "yet?"], distractors: ["already", "just"] },
      },
      {
        context: "See a movie → before that day",
        affirmative: { words: ["I", "had", "never", "seen", "that", "movie", "before."], distractors: ["already", "yet"] },
        negative: { words: ["I", "had", "not", "seen", "that", "movie", "before."], distractors: ["already", "yet"] },
        question: { words: ["Had", "you", "ever", "seen", "that", "movie?"], distractors: ["already", "just"] },
      },
      {
        context: "Eat dinner → when the phone rang",
        affirmative: { words: ["He", "had", "already", "eaten", "dinner", "when", "the", "phone", "rang."], distractors: ["yet", "just"] },
        negative: { words: ["He", "had", "not", "eaten", "dinner", "when", "the", "phone", "rang."], distractors: ["already", "just"] },
        question: { words: ["Had", "he", "eaten", "dinner", "before", "you", "called?"], distractors: ["already", "just"] },
      },
      {
        context: "Leave the party → by the time we arrived",
        affirmative: { words: ["They", "had", "already", "left", "by", "the", "time", "we", "arrived."], distractors: ["yet", "just"] },
        negative: { words: ["They", "had", "not", "left", "by", "the", "time", "we", "arrived."], distractors: ["already", "just"] },
        question: { words: ["Had", "they", "left", "before", "we", "arrived?"], distractors: ["already", "just"] },
      },
      {
        context: "Book tickets → before the price went up",
        affirmative: { words: ["We", "had", "already", "booked", "the", "tickets", "before", "the", "price", "went", "up."], distractors: ["yet", "still"] },
        negative: { words: ["We", "had", "not", "booked", "the", "tickets", "before", "the", "price", "went", "up."], distractors: ["already", "still"] },
        question: { words: ["Had", "you", "booked", "the", "tickets", "before", "the", "price", "went", "up?"], distractors: ["already", "still"] },
      },
      {
        context: "Meet each other → before that day",
        affirmative: { words: ["They", "had", "never", "met", "each", "other", "before", "that", "day."], distractors: ["already", "yet"] },
        negative: { words: ["They", "had", "not", "met", "each", "other", "before", "that", "day."], distractors: ["already", "yet"] },
        question: { words: ["Had", "they", "met", "before", "that", "day?"], distractors: ["already", "ever"] },
      },
    ],
    hard: [
      {
        context: "Study hard → before the exam",
        affirmative: { words: ["She", "had", "studied", "hard", "before", "the", "exam", "started", "that", "morning."], distractors: ["already", "yet", "never"] },
        negative: { words: ["She", "had", "not", "studied", "enough", "before", "the", "exam", "started", "that", "morning."], distractors: ["already", "yet", "never"] },
        question: { words: ["Had", "she", "studied", "enough", "before", "the", "exam", "started", "that", "morning?"], distractors: ["already", "ever", "yet"] },
      },
      {
        context: "Wonder about a different outcome",
        affirmative: { words: ["I", "had", "often", "wondered", "what", "might", "have", "happened", "if", "I", "had", "stayed."], distractors: ["already", "yet", "never"] },
        negative: { words: ["I", "had", "not", "realized", "how", "much", "I", "had", "missed", "until", "I", "left."], distractors: ["already", "yet", "never"] },
        question: { words: ["Had", "you", "ever", "wondered", "what", "might", "have", "happened", "if", "you", "had", "stayed?"], distractors: ["already", "yet", "never"] },
      },
      {
        context: "Underestimate the difficulty",
        affirmative: { words: ["They", "had", "underestimated", "the", "task", "until", "it", "was", "too", "late", "to", "change."], distractors: ["already", "yet", "still"] },
        negative: { words: ["She", "had", "not", "expected", "the", "project", "to", "take", "so", "long", "at", "all."], distractors: ["already", "yet", "still"] },
        question: { words: ["Had", "they", "known", "about", "the", "difficulties", "before", "they", "started", "the", "work?"], distractors: ["already", "ever", "yet"] },
      },
    ]
  },
  continuous: {
    easy: [
      {
        context: "Work → feel tired",
        affirmative: { words: ["She", "had", "been", "working."], distractors: [] },
        negative: { words: ["She", "had", "not", "been", "working."], distractors: [] },
        question: { words: ["Had", "she", "been", "working?"], distractors: [] },
      },
      {
        context: "Wait for the bus",
        affirmative: { words: ["They", "had", "been", "waiting."], distractors: [] },
        negative: { words: ["They", "had", "not", "been", "waiting."], distractors: [] },
        question: { words: ["Had", "they", "been", "waiting?"], distractors: [] },
      },
      {
        context: "Study for the exam",
        affirmative: { words: ["I", "had", "been", "studying."], distractors: [] },
        negative: { words: ["He", "had", "not", "been", "sleeping."], distractors: [] },
        question: { words: ["Had", "you", "been", "studying?"], distractors: [] },
      },
      {
        context: "Play outside",
        affirmative: { words: ["The", "children", "had", "been", "playing."], distractors: [] },
        negative: { words: ["The", "children", "had", "not", "been", "playing."], distractors: [] },
        question: { words: ["Had", "the", "children", "been", "playing?"], distractors: [] },
      },
      {
        context: "Rain all morning",
        affirmative: { words: ["It", "had", "been", "raining."], distractors: [] },
        negative: { words: ["It", "had", "not", "been", "raining."], distractors: [] },
        question: { words: ["Had", "it", "been", "raining?"], distractors: [] },
      },
    ],
    medium: [
      {
        context: "Work all day → feel tired",
        affirmative: { words: ["She", "had", "been", "working", "all", "day", "so", "she", "was", "tired."], distractors: ["for", "since"] },
        negative: { words: ["She", "had", "not", "been", "working", "hard", "that", "week."], distractors: ["for", "since"] },
        question: { words: ["Had", "she", "been", "working", "long", "that", "day?"], distractors: ["for", "since"] },
      },
      {
        context: "Wait for an hour → bus finally came",
        affirmative: { words: ["They", "had", "been", "waiting", "for", "an", "hour", "when", "the", "bus", "came."], distractors: ["since", "all"] },
        negative: { words: ["They", "had", "not", "been", "waiting", "very", "long."], distractors: ["for", "since"] },
        question: { words: ["How", "long", "had", "they", "been", "waiting?"], distractors: ["for", "since"] },
      },
      {
        context: "Study since morning → exam started",
        affirmative: { words: ["I", "had", "been", "studying", "since", "morning", "when", "the", "exam", "started."], distractors: ["for", "all"] },
        negative: { words: ["He", "had", "not", "been", "sleeping", "well", "all", "week."], distractors: ["for", "since"] },
        question: { words: ["Had", "you", "been", "studying", "long?"], distractors: ["for", "since"] },
      },
      {
        context: "Drive for six hours → storm started",
        affirmative: { words: ["We", "had", "been", "driving", "for", "six", "hours", "when", "the", "storm", "started."], distractors: ["since", "all"] },
        negative: { words: ["We", "had", "not", "been", "driving", "long", "before", "we", "hit", "traffic."], distractors: ["for", "since"] },
        question: { words: ["How", "long", "had", "you", "been", "driving", "before", "you", "stopped?"], distractors: ["for", "since"] },
      },
      {
        context: "Feel sick all week → see a doctor",
        affirmative: { words: ["She", "had", "been", "feeling", "sick", "all", "week", "before", "she", "saw", "a", "doctor."], distractors: ["for", "since"] },
        negative: { words: ["He", "had", "not", "been", "eating", "properly", "since", "the", "operation."], distractors: ["for", "since"] },
        question: { words: ["How", "long", "had", "she", "been", "feeling", "ill?"], distractors: ["for", "since"] },
      },
    ],
    hard: [
      {
        context: "Work on a project for months → finally launch",
        affirmative: { words: ["They", "had", "been", "working", "on", "the", "project", "for", "months", "before", "they", "finally", "launched", "it."], distractors: ["since", "all", "yet"] },
        negative: { words: ["She", "had", "not", "been", "sleeping", "well", "since", "she", "had", "started", "the", "new", "job."], distractors: ["for", "all", "yet"] },
        question: { words: ["How", "long", "had", "they", "been", "working", "on", "it", "before", "they", "finished?"], distractors: ["for", "since", "yet"] },
      },
      {
        context: "Live together for years → get married",
        affirmative: { words: ["They", "had", "been", "living", "together", "for", "years", "before", "they", "got", "married."], distractors: ["since", "all", "yet"] },
        negative: { words: ["I", "had", "not", "been", "feeling", "like", "myself", "since", "the", "accident", "happened."], distractors: ["for", "all", "yet"] },
        question: { words: ["How", "long", "had", "you", "been", "living", "there", "before", "you", "moved?"], distractors: ["for", "since", "yet"] },
      },
    ]
  }
};


// ---------- Exercise 4: Timeline Puzzle ----------
const PUZZLE_DATA = {
  simple: {
    easy: [
      {
        story: "Maria <span class='story-highlight'>had prepared</span> everything before her guests arrived. She <span class='story-highlight'>had cooked</span> a big dinner. Then the doorbell rang and everyone sat down to eat.",
        referenceText: "Guests arrived & dinner was served",
        events: [
          { text: "Maria cooked a big dinner", pos: 1, tense: "pp" },
          { text: "Maria prepared everything", pos: 0, tense: "pp" },
          { text: "Guests arrived & dinner was served", pos: 3, tense: "ps" },
        ]
      },
      {
        story: "When Tom got to the station, the train <span class='story-highlight'>had already left</span>. He <span class='story-highlight'>had forgotten</span> to check the schedule. He had to wait for the next train.",
        referenceText: "Tom arrived at the station",
        events: [
          { text: "The train left", pos: 0, tense: "pp" },
          { text: "Tom forgot to check the schedule", pos: 1, tense: "pp" },
          { text: "Tom arrived at the station", pos: 3, tense: "ps" },
        ]
      },
      {
        story: "By the time the meeting started, Sarah <span class='story-highlight'>had finished</span> her presentation. Everyone <span class='story-highlight'>had read</span> her report. The boss was impressed.",
        referenceText: "Meeting started",
        events: [
          { text: "Everyone read Sarah's report", pos: 0, tense: "pp" },
          { text: "Sarah finished her presentation", pos: 2, tense: "pp" },
          { text: "Meeting started", pos: 3, tense: "ps" },
        ]
      },
    ],
    medium: [
      {
        story: "When the firefighters arrived, the fire <span class='story-highlight'>had already spread</span> to the next building. The residents <span class='story-highlight'>had evacuated</span> safely. The cause <span class='story-highlight'>had not been determined</span> yet.",
        referenceText: "Firefighters arrived",
        events: [
          { text: "The fire spread to the next building", pos: 1, tense: "pp" },
          { text: "Residents evacuated safely", pos: 0, tense: "pp" },
          { text: "The cause was not determined yet", pos: 2, tense: "pp" },
          { text: "Firefighters arrived", pos: 3, tense: "ps" },
        ]
      },
      {
        story: "By 2010, the company <span class='story-highlight'>had grown</span> from 5 employees to 500. The founder <span class='story-highlight'>had never imagined</span> such success. In 2015, they <span class='story-highlight'>had opened</span> offices in three countries.",
        referenceText: "Year 2020 — looking back",
        events: [
          { text: "Founder never imagined such success", pos: 0, tense: "pp" },
          { text: "Company grew to 500 employees", pos: 2, tense: "pp" },
          { text: "Offices opened in three countries (2015)", pos: 1, tense: "pp" },
          { text: "Year 2020 — looking back", pos: 3, tense: "ps" },
        ]
      },
    ],
    hard: [
      {
        story: "When the archaeologists examined the site, they discovered that thieves <span class='story-highlight'>had already stolen</span> the most valuable artefact. The security guards <span class='story-highlight'>had not noticed</span> anything. The police <span class='story-highlight'>had been investigating</span> similar thefts for months — but that's another tense! The team <span class='story-highlight'>had spent</span> three years excavating before the theft.",
        referenceText: "Archaeologists examined the site",
        events: [
          { text: "Team spent three years excavating", pos: 0, tense: "pp" },
          { text: "Police investigated similar thefts (earlier)", pos: 1, tense: "pp" },
          { text: "Thieves stole the most valuable artefact", pos: 2, tense: "pp" },
          { text: "Security guards did not notice anything", pos: 2, tense: "pp" },
          { text: "Archaeologists examined the site", pos: 3, tense: "ps" },
        ]
      },
    ]
  },
  continuous: {
    easy: [
      {
        story: "When the doctor arrived, the patient <span class='story-highlight'>had been waiting</span> for two hours. She <span class='story-highlight'>had been feeling</span> dizzy since morning. The nurse <span class='story-highlight'>had been monitoring</span> her blood pressure all day.",
        referenceText: "Doctor arrived",
        events: [
          { text: "Patient felt dizzy since morning", pos: 0, tense: "pp" },
          { text: "Nurse monitored blood pressure all day", pos: 1, tense: "pp" },
          { text: "Patient waited for two hours", pos: 2, tense: "pp" },
          { text: "Doctor arrived", pos: 3, tense: "ps" },
        ]
      },
      {
        story: "The ground was wet when we got to the park. It <span class='story-highlight'>had been raining</span> all morning. The children <span class='story-highlight'>had been playing</span> outside before the rain started. We <span class='story-highlight'>had been planning</span> a picnic for weeks.",
        referenceText: "We arrived at the park",
        events: [
          { text: "It rained all morning", pos: 1, tense: "pp" },
          { text: "Children played outside", pos: 0, tense: "pp" },
          { text: "We planned a picnic for weeks", pos: 0, tense: "pp" },
          { text: "We arrived at the park", pos: 3, tense: "ps" },
        ]
      },
    ],
    medium: [
      {
        story: "His hands were shaking when he walked into the interview. He <span class='story-highlight'>had been working</span> on the presentation all night. He <span class='story-highlight'>had not been sleeping</span> well for days. The interviewer <span class='story-highlight'>had been waiting</span> for him for ten minutes.",
        referenceText: "He walked into the interview",
        events: [
          { text: "He did not sleep well for days", pos: 0, tense: "pp" },
          { text: "He worked on the presentation all night", pos: 2, tense: "pp" },
          { text: "Interviewer waited for ten minutes", pos: 1, tense: "pp" },
          { text: "He walked into the interview", pos: 3, tense: "ps" },
        ]
      },
    ],
    hard: [
      {
        story: "When the marathon ended, elite runners <span class='story-highlight'>had been running</span> for over two hours. The organisers <span class='story-highlight'>had been preparing</span> for the event for a year. Some amateurs <span class='story-highlight'>had been training</span> for months but <span class='story-highlight'>had not been feeling</span> well on race day. The winner <span class='story-highlight'>had been leading</span> since the 30km mark.",
        referenceText: "Marathon ended",
        events: [
          { text: "Organisers prepared for the event for a year", pos: 0, tense: "pp" },
          { text: "Some amateurs trained for months", pos: 1, tense: "pp" },
          { text: "Amateurs did not feel well on race day", pos: 2, tense: "pp" },
          { text: "Winner led since the 30km mark", pos: 1, tense: "pp" },
          { text: "Elite runners ran for over two hours", pos: 2, tense: "pp" },
          { text: "Marathon ended", pos: 3, tense: "ps" },
        ]
      },
    ]
  }
};

// Helper: get data for current tense & difficulty
function getData(dataObj, tense, diff) {
  return dataObj[tense][diff] || dataObj[tense].easy;
}
