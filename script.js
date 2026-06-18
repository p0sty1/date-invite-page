const screens = [...document.querySelectorAll(".screen")];
const heartField = document.getElementById("heartField");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const askSubtitle = document.getElementById("askSubtitle");
const jellySticker = document.getElementById("jellySticker");
const nextToDate = document.getElementById("nextToDate");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const selectDate = document.getElementById("selectDate");
const foodGrid = document.getElementById("foodGrid");
const pickFood = document.getElementById("pickFood");
const activityGrid = document.getElementById("activityGrid");
const pickActivity = document.getElementById("pickActivity");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
const summaryFood = document.getElementById("summaryFood");
const summaryActivity = document.getElementById("summaryActivity");
const restartButton = document.getElementById("restartButton");
const copyButton = document.getElementById("copyButton");
const calendarButton = document.getElementById("calendarButton");
const calendarPrompt = document.getElementById("calendarPrompt");
const skipCalendar = document.getElementById("skipCalendar");
const addCalendarPrompt = document.getElementById("addCalendarPrompt");

const state = {
  noCount: 0,
  date: "",
  time: "",
  food: "",
  vibe: "",
  activity: "",
  activityVibe: "",
};

const noLines = [
  "Bold choice. Incorrect, but bold.",
  "Are you absolutely sure?",
  "The no button is getting nervous.",
  "Look at this face and try again.",
  "That button has left the group chat.",
  "Okay but the pink button is right there.",
  "I admire the commitment. Still no.",
];

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });
}

function makeHearts() {
  const colors = ["#ef4f8d", "#ff7eb0", "#ffb4cc", "#d94280", "#8bded2"];
  for (let index = 0; index < 42; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty("--size", `${8 + Math.random() * 18}px`);
    heart.style.setProperty("--color", colors[index % colors.length]);
    heart.style.setProperty("--alpha", `${0.28 + Math.random() * 0.44}`);
    heart.style.setProperty("--duration", `${7 + Math.random() * 8}s`);
    heart.style.setProperty("--sway", `${-70 + Math.random() * 140}px`);
    heart.style.animationDelay = `${-Math.random() * 10}s`;
    heartField.appendChild(heart);
  }
}

function runAway() {
  state.noCount += 1;
  const stage = document.getElementById("choiceStage");
  const stageWidth = stage.clientWidth;
  const stageHeight = stage.clientHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const x = Math.max(0, Math.random() * (stageWidth - buttonWidth));
  const y = Math.max(0, Math.random() * (stageHeight - buttonHeight));
  const scale = Math.max(0.58, 1 - state.noCount * 0.06);
  const rotate = state.noCount % 2 === 0 ? -5 : 5;

  noButton.classList.add("fleeing");
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
  askSubtitle.textContent = noLines[Math.min(state.noCount - 1, noLines.length - 1)];

  if (state.noCount >= 3) {
    jellySticker.classList.remove("hidden");
  }

  if (state.noCount >= 6) {
    noButton.style.opacity = "0.38";
    noButton.textContent = "No?";
  }
}

function setDefaultDateTime() {
  const now = new Date();
  const target = new Date(now);
  target.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7 || 7));
  const yyyy = target.getFullYear();
  const mm = String(target.getMonth() + 1).padStart(2, "0");
  const dd = String(target.getDate()).padStart(2, "0");
  dateInput.value = `${yyyy}-${mm}-${dd}`;
  timeInput.value = "18:00";
  updateDateButton();
}

function updateDateButton() {
  state.date = dateInput.value;
  state.time = timeInput.value;
  selectDate.disabled = !(state.date && state.time);
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(timeString) {
  if (!timeString) return "-";
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function updateFinal() {
  summaryDate.textContent = formatDate(state.date);
  summaryTime.textContent = formatTime(state.time);
  summaryFood.textContent = state.food ? `${state.food} (${state.vibe})` : "-";
  summaryActivity.textContent = state.activity
    ? `${state.activity} (${state.activityVibe})`
    : "-";
}

function buildPlanText() {
  return [
    "Date plan confirmed",
    `Date: ${formatDate(state.date)}`,
    `Time: ${formatTime(state.time)}`,
    `Food: ${state.food}`,
    `Activity: ${state.activity}`,
  ].join("\n");
}

function resetInvite() {
  state.noCount = 0;
  state.food = "";
  state.vibe = "";
  state.activity = "";
  state.activityVibe = "";
  askSubtitle.textContent = "I made buttons, so this is legally serious.";
  jellySticker.classList.add("hidden");
  noButton.className = "btn ghost no-button";
  noButton.removeAttribute("style");
  noButton.textContent = "No";
  document.querySelectorAll(".option-card").forEach((option) => {
    option.classList.remove("selected");
  });
  pickFood.disabled = true;
  pickFood.textContent = "Pick one";
  pickActivity.disabled = true;
  pickActivity.textContent = "Pick one";
  calendarPrompt.classList.add("hidden");
  setDefaultDateTime();
  showScreen("ask");
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function toIcsDate(date) {
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z",
  ].join("");
}

function escapeIcs(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function downloadCalendarEvent() {
  if (!state.date || !state.time) return;
  const start = new Date(`${state.date}T${state.time}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const description = [
    "She said yes.",
    `Food: ${state.food || "TBD"}`,
    `Activity: ${state.activity || "TBD"}`,
  ].join("\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Date Invite//Date Plan//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@date-invite`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    "SUMMARY:Date plan",
    `DESCRIPTION:${escapeIcs(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "date-plan.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  calendarButton.textContent = "Calendar ready";
  calendarPrompt.classList.add("hidden");
  setTimeout(() => {
    calendarButton.textContent = "Add calendar";
  }, 1400);
}

yesButton.addEventListener("click", () => showScreen("surprise"));
noButton.addEventListener("click", runAway);
noButton.addEventListener("mouseenter", () => {
  if (state.noCount > 0) runAway();
});
nextToDate.addEventListener("click", () => showScreen("date"));
dateInput.addEventListener("input", updateDateButton);
timeInput.addEventListener("input", updateDateButton);
selectDate.addEventListener("click", () => showScreen("food"));

foodGrid.addEventListener("click", (event) => {
  const option = event.target.closest(".food-option");
  if (!option) return;
  document.querySelectorAll(".food-option").forEach((item) => {
    item.classList.toggle("selected", item === option);
  });
  state.food = option.dataset.food;
  state.vibe = option.dataset.vibe;
  pickFood.disabled = false;
  pickFood.textContent = "mmm... sounds yummy!";
});

pickFood.addEventListener("click", () => {
  if (!state.food) return;
  showScreen("activity");
});

activityGrid.addEventListener("click", (event) => {
  const option = event.target.closest(".activity-option");
  if (!option) return;
  document.querySelectorAll(".activity-option").forEach((item) => {
    item.classList.toggle("selected", item === option);
  });
  state.activity = option.dataset.activity;
  state.activityVibe = option.dataset.vibe;
  pickActivity.disabled = false;
  pickActivity.textContent = "solid plan";
});

pickActivity.addEventListener("click", () => {
  if (!state.activity) return;
  updateFinal();
  showScreen("final");
  window.setTimeout(() => {
    calendarPrompt.classList.remove("hidden");
  }, 650);
});

restartButton.addEventListener("click", resetInvite);
calendarButton.addEventListener("click", downloadCalendarEvent);
skipCalendar.addEventListener("click", () => calendarPrompt.classList.add("hidden"));
addCalendarPrompt.addEventListener("click", downloadCalendarEvent);

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildPlanText());
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy plan";
    }, 1200);
  } catch {
    copyButton.textContent = "Saved";
    setTimeout(() => {
      copyButton.textContent = "Copy plan";
    }, 1200);
  }
});

makeHearts();
setDefaultDateTime();
