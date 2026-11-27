(() => {
  const stages = [...document.querySelectorAll(".stage")];
  if (!stages.length) return;

  const syncStage = () => {
    const selected = stages.find((stage) => `#${stage.id}` === location.hash) || stages[0];
    stages.forEach((stage) => { stage.open = stage === selected; });
  };

  syncStage();
  window.addEventListener("hashchange", syncStage);
})();
