// Old root fragments have static named links as a fallback.
function followBookmark() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.dataset.bookmark) location.replace(target.dataset.bookmark);
}

window.addEventListener("hashchange", followBookmark);
followBookmark();
