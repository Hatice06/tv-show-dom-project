//You can edit ALL of the code here
const rootEl = document.getElementById("root");
const episodeContainer = document.querySelector(".episode-container");

//create input div for search
const searchDiv = document.querySelector(".search-div");
const episodes = document.querySelector(".episode-container");

//create input
let inputEl = document.createElement("input");
inputEl.type = "search";
inputEl.className = "search-episodes";
inputEl.placeholder = "Search keyword ";

//episode search-counter
let searchCounter = document.createElement("p");
searchCounter.className = "search-counter";
 
searchDiv.append(inputEl, searchCounter);
rootEl.append(searchDiv, episodeContainer);

//render page on the window load;
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchCounter.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
}

//build page for all episodes;
function makePageForEpisodes(episodeList) {
  episodeList.map((episode) => {
      let episodeCard = document.createElement("div");
      let episodeTitle = document.createElement("h3");
      let episodeSummary = document.createElement("p");
      let episodeImg = document.createElement("img");

      episodeCard.className = "episode-card";
      episodeTitle.className = "episode-title";
      episodeImg.src = episode.image.medium;

      formatSeriesAndEpisode(episodeTitle, episode);

      episodeSummary.innerHTML = episode.summary;
      episodeCard.append(episodeTitle, episodeImg, episodeSummary);
      episodes.append(episodeCard);
  });

  inputEl.addEventListener("keyup", () => {
    episodes.innerHTML = "";
    
    let filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.summary.toLowerCase().includes(inputEl.value.toLowerCase()) ||
        episode.name.toLowerCase().includes(inputEl.value.toLowerCase())
    );

    searchCounter.innerText = `Displaying ${filteredEpisodes.length} / ${episodeList.length} episodes`;
    showFilteredEpisodes(filteredEpisodes);
  });
}

//episode title format
function formatSeriesAndEpisode(episodeTitle, episode) {
  episodeTitle.innerText = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
}

function showFilteredEpisodes(filteredEpisodes) {

  filteredEpisodes.map((episode) => {
    let episodeCard = document.createElement("div");
    let episodeTitle = document.createElement("h3");
    let episodeSummary = document.createElement("p");
    let episodeImg = document.createElement("img");

    episodeCard.className = "episode-card";
    episodeTitle.className = "episode-title";
    episodeImg.src = episode.image.medium;

    formatSeriesAndEpisode(episodeTitle, episode);

    episodeSummary.innerHTML = episode.summary;
    episodeCard.append(episodeTitle, episodeImg, episodeSummary);
    episodes.append(episodeCard);
  });
}

window.onload = setup;
