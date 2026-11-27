// Open a bookmarked chapter or disclosure on the current edition.
function followBookmark() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.classList.contains("old-route")) {
    location.replace(target.href);
  } else if (target instanceof HTMLDetailsElement) {
    target.open = true;
  }
}

window.addEventListener("hashchange", followBookmark);
followBookmark();
