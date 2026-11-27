(() => {
  const steps = Array.from(document.querySelectorAll("[data-step]"));
  const navigation = document.querySelector(".guide-steps");
  if (!steps.length || !navigation) return;

  const links = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const downloads = document.getElementById("downloads");
  let visibleStep = steps[0];

  function hashTarget(hash) {
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return null;
    }
  }

  function showStep(target) {
    const inDownloads = target && downloads.contains(target);
    const keepCurrentStep = inDownloads || target === navigation;
    const selected = target?.closest("[data-step]") ?? (keepCurrentStep ? visibleStep : steps[0]);
    for (const step of steps) step.hidden = step !== selected;
    for (const link of links) {
      if (link.hash === "#" + selected.id) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    }
    visibleStep = selected;
    if (inDownloads) document.getElementById("files").open = true;
    for (let parent = target; parent; parent = parent.parentElement) {
      if (parent.tagName === "DETAILS") parent.open = true;
    }
  }

  function followLocation() {
    const target = hashTarget(location.hash);
    showStep(target);
    if (!target) return;
    if (target.closest("[data-step]") && target.matches("[data-step], h2, .legacy-anchor")) {
      const heading = visibleStep.querySelector("h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      navigation.scrollIntoView({ block: "start", behavior: "instant" });
    } else {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (anchor) showStep(hashTarget(anchor.hash));
  });
  window.addEventListener("hashchange", followLocation);
  window.addEventListener("pageshow", () => showStep(hashTarget(location.hash)));
  followLocation();
})();
