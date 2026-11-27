(() => {
  const stages = Array.from(document.querySelectorAll("details.stage"));
  if (!stages.length) return;

  const byId = new Map(stages.map(stage => [stage.id, stage]));
  const navLinks = document.querySelectorAll(".stage-nav a[href^='#']");
  const position = document.getElementById("reading-position");
  const locator = position?.closest(".reader-locator");

  function showStage(selected) {
    for (const stage of stages) {
      stage.open = stage === selected;
    }
    for (const link of navLinks) {
      if (selected && link.hash.slice(1) === selected.id) {
        link.setAttribute("aria-current", "step");
      } else {
        link.removeAttribute("aria-current");
      }
    }
    if (position && locator) {
      locator.hidden = !selected;
      if (selected) {
        const activeLink = document.querySelector(".stage-nav [aria-current='step']");
        const phase = activeLink?.closest(".phase-group")?.querySelector("h3")?.textContent;
        const step = `Этап ${stages.indexOf(selected) + 1} из ${stages.length}`;
        position.textContent = phase ? `${step} · ${phase}` : step;
      }
    }
  }

  function focusStage(stage) {
    stage.querySelector("summary").focus({ preventScroll: true });
    stage.scrollIntoView({ block: "start" });
  }

  function followAddress() {
    const id = location.hash.slice(1);
    const stage = byId.get(id);
    if (stage) {
      showStage(stage);
      stage.scrollIntoView({ block: "start" });
    } else {
      showStage(id === "stages" ? null : stages[0]);
    }
  }

  for (const stage of stages) {
    for (const link of stage.querySelectorAll(".stage-references a[href]")) {
      if (!/^(docs|templates)\//.test(link.getAttribute("href"))) continue;
      const url = new URL(link.href);
      url.searchParams.set("stage", stage.id);
      link.href = url.href;
    }
  }

  document.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;
    const summary = event.target.closest("details.stage > summary");
    const link = event.target.closest("a[href^='#']");
    const selected = summary ? summary.parentElement : byId.get(link?.hash.slice(1));
    if (!selected) return;

    event.preventDefault();
    const closing = summary && selected.open;
    const nextHash = closing ? "#stages" : "#" + selected.id;
    if (location.hash !== nextHash) history.pushState(null, "", nextHash);
    showStage(closing ? null : selected);
    if (!closing) focusStage(selected);
  });

  window.addEventListener("hashchange", followAddress);
  followAddress();
})();
