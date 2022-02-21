//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let oneShow = getOneShow();
  let divEl = document.createElement("div");
  let pEl = document.createElement("p");
  pEl.innerText = oneShow.name;
  divEl.appendChild(pEl);
  const rootElem = document.getElementById("root");
  rootElem.appendChild(divEl);
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}


window.onload = setup;
