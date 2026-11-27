// Preserve inbound links to the guide that previously occupied the home page.
function followPracticeBookmark() {
  const bookmark = document.getElementById(location.hash.slice(1));
  if (bookmark?.classList.contains("old-route")) location.replace(bookmark.href);
}

window.addEventListener("hashchange", followPracticeBookmark);
followPracticeBookmark();
