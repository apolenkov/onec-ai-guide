const stageTitles = new Map([
  ["requirements", "Требования"],
  ["design", "Проектирование"],
  ["code", "Код"],
  ["review", "Ревью"],
  ["tests", "Тесты"],
  ["delivery", "Поставка"],
  ["support", "Сопровождение"],
]);

const sourceStage = new URLSearchParams(location.search).get("stage");
if (stageTitles.has(sourceStage)) {
  for (const link of document.querySelectorAll("[data-return-link]")) {
    link.hash = sourceStage;
    link.textContent = `← К этапу «${stageTitles.get(sourceStage)}»`;
  }
  for (const link of document.querySelectorAll("[data-stage-link]")) {
    const target = new URL(link.href);
    target.searchParams.set("stage", sourceStage);
    link.href = target.href;
  }
}
