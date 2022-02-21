//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

let oneShow = getOneShow();
let divEl = document.createElement("div");
divEl.innerText = oneShow.name;
const rootElem = document.getElementById("root");
rootElem.appendChild(divEl);

window.onload = setup;
