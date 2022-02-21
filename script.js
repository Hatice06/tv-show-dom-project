//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let oneShow = getOneShow();
  // let divEl = document.createElement("div");
  // let pEl = document.createElement("p");
  // pEl.innerText = oneShow.name;
  // divEl.appendChild(pEl);
  // rootElem.appendChild(divEl);
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.textContent = `${oneShow.name} test`;
}

window.onload = setup;
