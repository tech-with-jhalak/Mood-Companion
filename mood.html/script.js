const state = {
  name: "",
  mood: "",
  choice: "",
  feedback: { good: 0, better: 0, worst: 0 },
  log: [],
  chartInst: null,
};

const JOKES = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  "Why do cows wear bells? Because their horns don't work!",
  "What do you call a fake noodle? An impasta.",
  "I used to hate facial hair, but then it grew on me.",
  "Why can't you give Elsa a balloon? Because she'll let it go.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "I'm on a seafood diet. I see food, and I eat it.",
  "Why did the bicycle fall over? Because it was two-tired.",
];

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "You are enough, exactly as you are.", author: "Meghan Markle" },
  { text: "Stars can't shine without darkness.", author: "Unknown" },
  { text: "Your feelings are valid. All of them.", author: "Unknown" },
  { text: "Every storm runs out of rain.", author: "Maya Angelou" },
  { text: "You don't have to be positive all the time.", author: "Lori Deschene" },
  { text: "Difficult roads often lead to beautiful destinations.", author: "Zig Ziglar" },
  { text: "Be the energy you want to attract.", author: "Unknown" },
  { text: "Small steps still move you forward.", author: "Unknown" },
];

const MOODS = ["😊 Happy", "😢 Sad", "😤 Stressed", "😌 Calm", "😰 Anxious", "🥳 Excited", "😑 Meh", "😡 Angry"];

let usedJokeIdx = [];
let usedQuoteIdx = [];

window.addEventListener("load", () => {
  loadState();
  renderChart();
  renderLog();
  updateInsights();

  if ("Notification" in window && Notification.permission === "granted") {
    document.getElementById("notificationPrompt").style.display = "none";
  }
});

function loadState() {
  const saved = localStorage.getItem("moodCompanionData");
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    state.name = parsed.name || "";
    state.mood = parsed.mood || "";
    state.choice = parsed.choice || "";
    state.feedback = {
      good: parsed.feedback?.good || 0,
      better: parsed.feedback?.better || 0,
      worst: parsed.feedback?.worst || 0,
    };
    state.log = (parsed.log || []).map((entry) => ({
      ...entry,
      time: new Date(entry.time),
    }));
  } catch (error) {
    localStorage.removeItem("moodCompanionData");
  }
}

function saveState() {
  localStorage.setItem(
    "moodCompanionData",
    JSON.stringify({
      name: state.name,
      mood: state.mood,
      choice: state.choice,
      feedback: state.feedback,
      log: state.log,
    })
  );
}

function rand(arr, usedArr) {
  let avail = arr.map((_, i) => i).filter((i) => !usedArr.includes(i));
  if (!avail.length) {
    usedArr.length = 0;
    avail = arr.map((_, i) => i);
  }
  const pick = avail[Math.floor(Math.random() * avail.length)];
  usedArr.push(pick);
  return arr[pick];
}

function goTo(n) {
  document.querySelectorAll(".screen").forEach((screen, i) => {
    screen.classList.toggle("hidden", i !== n);
  });
}

function goName() {
  const value = document.getElementById("nameInput").value.trim();
  if (!value) {
    shake("nameInput");
    return;
  }

  state.name = value;
  document.getElementById("moodGreet").textContent = `Hey ${value}! 👋`;
  const chips = document.getElementById("moodChips");
  chips.innerHTML = MOODS.map(
    (mood) => `<button class="mood-chip" onclick="selectMoodChip(this, '${mood}')">${mood}</button>`
  ).join("");
  goTo(1);
}

function selectMoodChip(el, mood) {
  document.querySelectorAll(".mood-chip").forEach((chip) => chip.classList.remove("selected"));
  el.classList.add("selected");
  document.getElementById("moodInput").value = mood;
}

function goMood() {
  const value = document.getElementById("moodInput").value.trim();
  if (!value) {
    shake("moodInput");
    return;
  }

  state.mood = value;
  document.getElementById("choiceGreet").textContent = `Feeling "${value}" - got it 💜`;
  goTo(2);
}

function goChoice(choice) {
  state.choice = choice;
  if (choice === "music") {
    window.open("https://open.spotify.com", "_blank");
    document.getElementById("outputType").textContent = "MUSIC";
    document.getElementById("outputText").innerHTML =
      "🎵 Spotify is opening in a new tab. Come back whenever you need a boost!";
    document.getElementById("outputTag").textContent = "Opening Spotify for you ✨";
  } else {
    showContent(choice);
  }
  goTo(3);
}

function showContent(type) {
  const textEl = document.getElementById("outputText");
  const typeEl = document.getElementById("outputType");
  const tagEl = document.getElementById("outputTag");

  if (type === "joke") {
    const joke = rand(JOKES, usedJokeIdx);
    typeEl.textContent = "😂 JOKE";
    textEl.textContent = joke;
    tagEl.textContent = "Here's a laugh for you ✨";
    return;
  }

  const quote = rand(QUOTES, usedQuoteIdx);
  typeEl.textContent = "💬 QUOTE";
  textEl.innerHTML = `"${quote.text}"<br><span style="color:#a78bfa;font-size:13px;display:block;margin-top:8px">- ${quote.author}</span>`;
  tagEl.textContent = "Some wisdom for you ✨";
}

function regenerate() {
  if (state.choice !== "music") {
    showContent(state.choice);
  }
}

function logFeedback(type) {
  state.feedback[type] += 1;
  state.log.push({ time: new Date(), mood: state.mood, feeling: type });
  saveState();
  explodeBurst(type);
  renderChart();
  renderLog();
  updateInsights();
}

function renderChart() {
  const ctx = document.getElementById("pieChart");
  if (state.chartInst) {
    state.chartInst.destroy();
  }

  if (!state.log.length) {
    document.getElementById("emptyMessage").style.display = "block";
    return;
  }

  const data = state.feedback;
  state.chartInst = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Good", "Better", "Worst"],
      datasets: [
        {
          data: [data.good, data.better, data.worst],
          backgroundColor: [
            "rgba(56,189,248,0.8)",
            "rgba(16,185,129,0.8)",
            "rgba(239,68,68,0.7)",
          ],
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#e2e8f0",
            font: { family: "Poppins", size: 13 },
          },
        },
      },
      cutout: "55%",
    },
  });

  document.getElementById("emptyMessage").style.display = "none";
}

function renderLog() {
  const tbody = document.getElementById("logBody");
  const container = document.getElementById("logTableContainer");

  if (!state.log.length) {
    tbody.innerHTML = "";
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  tbody.innerHTML = state.log
    .slice()
    .reverse()
    .map((entry) => {
      const time = entry.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const date = entry.time.toLocaleDateString([], { month: "short", day: "numeric" });
      const badge = `<span class="mood-badge badge-${entry.feeling}">${entry.feeling}</span>`;
      return `<tr><td>${date}, ${time}</td><td style="color:#c4b5fd">${entry.mood}</td><td>${badge}</td></tr>`;
    })
    .join("");
}

function updateInsights() {
  const insightsCard = document.getElementById("insightsCard");

  if (!state.log.length) {
    insightsCard.style.display = "none";
    return;
  }

  insightsCard.style.display = "flex";
  document.getElementById("totalCheckins").textContent = String(state.log.length);

  const moodCounts = state.log.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("commonMood").textContent = topMood ? topMood[0] : "N/A";

  const positiveCount = state.feedback.good + state.feedback.better;
  const rate = Math.round((positiveCount / state.log.length) * 100);
  document.getElementById("positiveRate").textContent = `${rate}%`;
}

function explodeBurst(type) {
  const emojis = { good: "🌈", better: "🎉", worst: "💜" };
  const app = document.getElementById("app");

  for (let i = 0; i < 18; i += 1) {
    const el = document.createElement("div");
    el.textContent = emojis[type];
    el.className = "emoji-burst";
    el.style.left = "50%";
    el.style.top = "50%";
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 180;
    el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
    app.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
}

function requestNotifications() {
  if (!("Notification" in window)) return;

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      document.getElementById("notificationPrompt").style.display = "none";
      new Notification("Mood Companion 🌸", {
        body: "Daily mood reminders are enabled.",
      });
    }
  });
}

function shake(id) {
  const el = document.getElementById(id);
  el.style.animation = "none";
  el.style.borderColor = "#ec4899";
  el.style.boxShadow = "0 0 16px rgba(236,72,153,0.5)";
  setTimeout(() => {
    el.style.borderColor = "";
    el.style.boxShadow = "";
  }, 1000);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const screens = ["s0", "s1"];
    screens.forEach((screenId, i) => {
      if (!document.getElementById(screenId).classList.contains("hidden")) {
        if (i === 0) goName();
        else goMood();
      }
    });
  }
});
