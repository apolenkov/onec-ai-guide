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
const fromOverview = context.get("from") === "overview";

if (fromStage || fromOverview) {
  for (const link of document.querySelectorAll("[data-return-link]")) {
    if (fromStage) {
      link.hash = stage;
      link.textContent = `← К этапу «${stageTitles.get(stage)}»`;
    } else {
      link.href = new URL("index.html#sources", link.href).href;
      link.textContent = "← К источникам на главной";
    }
  }
  for (const link of document.querySelectorAll("[data-stage-link]")) {
    const target = new URL(link.href);
    if (fromStage) target.searchParams.set("stage", stage);
    else target.searchParams.set("from", "overview");
    link.href = target.href;
  }
}
