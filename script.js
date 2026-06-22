const screens = [...document.querySelectorAll(".screen")];
const langButtons = [...document.querySelectorAll(".lang-btn")];
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

const copyResetDelay = 1200;
const calendarResetDelay = 1400;

const translations = {
  zh: {
    meta: { title: "约会邀请" },
    common: {
      next: "下一步",
      restart: "重新开始",
      empty: "-",
      tbd: "待定",
    },
    ask: {
      eyebrow: "",
      title: "要不要跟我出去玩？",
      subtitle: "",
      yes: "好呀",
      no: "不要",
      noMaybe: "不要？",
      noLines: [
        "不许选这个。",
        "再想想？",
        "这个按钮要跑路了。",
        "认真点选。",
        "它已经跑远了。",
        "左边那个比较可爱。",
        "好了，不给点了。",
      ],
    },
    surprise: {
      eyebrow: "等下，真的假的",
      title: "你真的答应了？",
      subtitle: "我都准备好被拒绝了。",
    },
    date: {
      eyebrow: "",
      title: "哪天有空？",
      pickDate: "选个日期",
      pickTime: "选个时间",
      select: "就这天",
    },
    food: {
      eyebrow: "重要决定",
      title: "想吃点什么？",
      pick: "选一个",
      selected: "就吃这个",
    },
    activity: {
      eyebrow: "吃完继续安排",
      title: "吃完去哪儿？",
      pick: "选一个",
      selected: "就这个",
    },
    final: {
      eyebrow: "",
      title: "那就这么定啦",
      subtitle: "到时候见。",
    },
    summary: {
      date: "日期",
      time: "时间",
      food: "吃什么",
      activity: "玩什么",
    },
    calendar: {
      eyebrow: "",
      title: "加到日历？",
      later: "晚点",
      set: "加上",
      add: "加到日历",
      ready: "日历已准备",
    },
    copy: {
      action: "复制计划",
      copied: "已复制",
      fallback: "已保存",
    },
    foods: {
      burgers: { label: "汉堡", vibe: "汉堡外交" },
      sushi: { label: "寿司", vibe: "一口一个小精致" },
      tacos: { label: "塔可", vibe: "咔嚓一下很快乐" },
      pizza: { label: "披萨", vibe: "三角形快乐" },
      pasta: { label: "意面", vibe: "浪漫碳水学" },
      dessert: { label: "甜点", vibe: "有计划地摄入糖分" },
    },
    activities: {
      movie: { label: "电影", vibe: "爆米花战术" },
      arcade: { label: "电玩城", vibe: "认真但幼稚地比赛" },
      bowling: { label: "保龄球", vibe: "穿奇怪鞋也要赢" },
      karaoke: { label: "K歌", vibe: "主角嗓音登场" },
      walk: { label: "散步", vibe: "可爱地乱逛" },
      photos: { label: "拍照", vibe: "留下证据" },
    },
    plan: {
      title: "约会计划已确认",
      date: "日期",
      time: "时间",
      food: "吃什么",
      activity: "玩什么",
    },
    ics: {
      summary: "约会计划",
      saidYes: "她答应啦。",
    },
  },
  en: {
    meta: { title: "Date Invite" },
    common: {
      next: "Next",
      restart: "Start over",
      empty: "-",
      tbd: "TBD",
    },
    ask: {
      eyebrow: "just one tiny question",
      title: "Will you go on a date with me?",
      subtitle: "I made buttons, so this is legally serious.",
      yes: "Yes",
      no: "No",
      noMaybe: "No?",
      noLines: [
        "Bold choice. Incorrect, but bold.",
        "Are you absolutely sure?",
        "The no button is getting nervous.",
        "Look at this face and try again.",
        "That button has left the group chat.",
        "Okay but the pink button is right there.",
        "I admire the commitment. Still no.",
      ],
    },
    surprise: {
      eyebrow: "wait. hold on.",
      title: "You actually said yes?",
      subtitle: "I was so ready for you to say no.",
    },
    date: {
      eyebrow: "calendar negotiations",
      title: "When are you free?",
      pickDate: "Pick a date",
      pickTime: "Pick a time",
      select: "Select the date",
    },
    food: {
      eyebrow: "important business",
      title: "What are we feelin'?",
      pick: "Pick one",
      selected: "mmm... sounds yummy!",
    },
    activity: {
      eyebrow: "after dinner chaos",
      title: "What are we doing?",
      pick: "Pick one",
      selected: "solid plan",
    },
    final: {
      eyebrow: "date secured",
      title: "I got you.",
      subtitle: "Be ready for it. I'm coming to get you.",
    },
    summary: {
      date: "Date",
      time: "Time",
      food: "Food",
      activity: "Activity",
    },
    calendar: {
      eyebrow: "official paperwork",
      title: "Set this in your calendar?",
      later: "Later",
      set: "Set it",
      add: "Add calendar",
      ready: "Calendar ready",
    },
    copy: {
      action: "Copy plan",
      copied: "Copied",
      fallback: "Saved",
    },
    foods: {
      burgers: { label: "Burgers", vibe: "burger diplomacy" },
      sushi: { label: "Sushi", vibe: "tiny rice masterpieces" },
      tacos: { label: "Tacos", vibe: "crunchy excellence" },
      pizza: { label: "Pizza", vibe: "triangle happiness" },
      pasta: { label: "Pasta", vibe: "romantic noodle science" },
      dessert: { label: "Dessert", vibe: "sugar with a plan" },
    },
    activities: {
      movie: { label: "Movie", vibe: "popcorn strategy" },
      arcade: { label: "Arcade", vibe: "competitive nonsense" },
      bowling: { label: "Bowling", vibe: "very serious shoes" },
      karaoke: { label: "Karaoke", vibe: "main character vocals" },
      walk: { label: "Walk", vibe: "cute wandering" },
      photos: { label: "Photos", vibe: "evidence collection" },
    },
    plan: {
      title: "Date plan confirmed",
      date: "Date",
      time: "Time",
      food: "Food",
      activity: "Activity",
    },
    ics: {
      summary: "Date plan",
      saidYes: "She said yes.",
    },
  },
};

const state = {
  noCount: 0,
  date: "",
  time: "",
  foodKey: "",
  activityKey: "",
};

let currentLang = getSavedLanguage();
let copyTimer = 0;
let calendarTimer = 0;

function getSavedLanguage() {
  try {
    return localStorage.getItem("dateInviteLang") === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem("dateInviteLang", lang);
  } catch {
    // Local storage is optional; the page still works without it.
  }
}

function t(key) {
  return key.split(".").reduce((value, part) => value?.[part], translations[currentLang]) ?? key;
}

function optionText(group, key) {
  if (!key) return { label: t("common.tbd"), vibe: "" };
  return translations[currentLang][group][key];
}

function describeOption(group, key) {
  if (!key) return t("common.empty");
  const option = optionText(group, key);
  return currentLang === "zh"
    ? `${option.label}（${option.vibe}）`
    : `${option.label} (${option.vibe})`;
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = t("meta.title");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });

  langButtons.forEach((button) => {
    const active = button.dataset.lang === currentLang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (state.noCount > 0) {
    askSubtitle.textContent = getNoLine();
  }

  if (state.noCount >= 6) {
    noButton.textContent = t("ask.noMaybe");
  }

  pickFood.textContent = state.foodKey ? t("food.selected") : t("food.pick");
  pickActivity.textContent = state.activityKey ? t("activity.selected") : t("activity.pick");
  copyButton.textContent = t("copy.action");
  calendarButton.textContent = t("calendar.add");
  updateFinal();
}

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

function getNoLine() {
  const lines = translations[currentLang].ask.noLines;
  return lines[Math.min(state.noCount - 1, lines.length - 1)];
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
  askSubtitle.textContent = getNoLine();

  if (state.noCount >= 3) {
    jellySticker.classList.remove("hidden");
  }

  if (state.noCount >= 6) {
    noButton.style.opacity = "0.38";
    noButton.textContent = t("ask.noMaybe");
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
  if (!dateString) return t("common.empty");
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat(currentLang === "zh" ? "zh-CN" : "en", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(timeString) {
  if (!timeString) return t("common.empty");
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(currentLang === "zh" ? "zh-CN" : "en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function updateFinal() {
  summaryDate.textContent = formatDate(state.date);
  summaryTime.textContent = formatTime(state.time);
  summaryFood.textContent = describeOption("foods", state.foodKey);
  summaryActivity.textContent = describeOption("activities", state.activityKey);
}

function buildPlanText() {
  return [
    t("plan.title"),
    `${t("plan.date")}: ${formatDate(state.date)}`,
    `${t("plan.time")}: ${formatTime(state.time)}`,
    `${t("plan.food")}: ${optionText("foods", state.foodKey).label}`,
    `${t("plan.activity")}: ${optionText("activities", state.activityKey).label}`,
  ].join("\n");
}

function resetInvite() {
  clearTimeout(copyTimer);
  clearTimeout(calendarTimer);
  state.noCount = 0;
  state.foodKey = "";
  state.activityKey = "";
  jellySticker.classList.add("hidden");
  noButton.className = "btn ghost no-button";
  noButton.removeAttribute("style");
  document.querySelectorAll(".option-card").forEach((option) => {
    option.classList.remove("selected");
  });
  pickFood.disabled = true;
  pickActivity.disabled = true;
  calendarPrompt.classList.add("hidden");
  setDefaultDateTime();
  applyLanguage();
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
  clearTimeout(calendarTimer);
  const start = new Date(`${state.date}T${state.time}:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const food = optionText("foods", state.foodKey).label;
  const activity = optionText("activities", state.activityKey).label;
  const description = [
    t("ics.saidYes"),
    `${t("plan.food")}: ${food || t("common.tbd")}`,
    `${t("plan.activity")}: ${activity || t("common.tbd")}`,
  ].join("\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//Date Invite//Date Plan//${currentLang.toUpperCase()}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@date-invite`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs(t("ics.summary"))}`,
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
  calendarButton.textContent = t("calendar.ready");
  calendarPrompt.classList.add("hidden");
  calendarTimer = setTimeout(() => {
    calendarButton.textContent = t("calendar.add");
  }, calendarResetDelay);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang === "en" ? "en" : "zh";
    saveLanguage(currentLang);
    applyLanguage();
  });
});

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
  state.foodKey = option.dataset.foodKey;
  pickFood.disabled = false;
  pickFood.textContent = t("food.selected");
});

pickFood.addEventListener("click", () => {
  if (!state.foodKey) return;
  showScreen("activity");
});

activityGrid.addEventListener("click", (event) => {
  const option = event.target.closest(".activity-option");
  if (!option) return;
  document.querySelectorAll(".activity-option").forEach((item) => {
    item.classList.toggle("selected", item === option);
  });
  state.activityKey = option.dataset.activityKey;
  pickActivity.disabled = false;
  pickActivity.textContent = t("activity.selected");
});

pickActivity.addEventListener("click", () => {
  if (!state.activityKey) return;
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
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(buildPlanText());
    copyButton.textContent = t("copy.copied");
  } catch {
    copyButton.textContent = t("copy.fallback");
  }
  copyTimer = setTimeout(() => {
    copyButton.textContent = t("copy.action");
  }, copyResetDelay);
});

makeHearts();
setDefaultDateTime();
applyLanguage();
