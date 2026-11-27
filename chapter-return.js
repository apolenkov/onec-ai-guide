const stageTitles = new Map([
  ["requirements", "Требования"],
  ["design", "Проектирование"],
  ["code", "Код"],
  ["review", "Ревью"],
  ["tests", "Тесты"],
  ["delivery", "Поставка"],
  ["support", "Сопровождение"],
]);

const context = new URLSearchParams(location.search);
const stage = context.get("stage");
const fromStage = stageTitles.has(stage);
const from = context.get("from");
const fromOverview = from === "overview" || from === "team";

if (fromStage || fromOverview) {
  for (const link of document.querySelectorAll("[data-return-link]")) {
    if (fromStage) {
      link.hash = stage;
      link.textContent = `← К этапу «${stageTitles.get(stage)}»`;
    } else {
      const team = from === "team";
      link.href = new URL(team ? "index.html#team" : "index.html#sources", link.href).href;
      link.textContent = team ? "← К работе команды на главной" : "← К источникам на главной";
    }
  }
  for (const link of document.querySelectorAll("[data-stage-link]")) {
    const target = new URL(link.href);
    if (fromStage) target.searchParams.set("stage", stage);
    else target.searchParams.set("from", from);
    link.href = target.href;
  }
}
