//You can edit ALL of the code here
const rootEl = document.getElementById("root");
const episodeContainer = document.querySelector(".episode-container");

//get search div for search
const searchDiv = document.querySelector(".search-div");
const episodes = document.querySelector(".episode-container");

//create episode selector 
const episodeSelector = document.createElement("select");
episodeSelector.id = "episode-select";

//create input
let inputEl = document.createElement("input");
inputEl.type = "search";
inputEl.className = "search-episodes";
inputEl.placeholder = "Search keyword ";

//episode search-counter
let searchCounter = document.createElement("p");
searchCounter.className = "search-counter";

//home button
let homeButton = document.createElement("button");
homeButton.className = "home-btn";
homeButton.innerText = "HOME";
 
searchDiv.append(homeButton ,episodeSelector, inputEl, searchCounter);
rootEl.append(searchDiv, episodeContainer);


//render page on the window load;
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchCounter.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`
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

  //episode select dropdown menu
  episodeList.map((episode) => {
    let optionEl = document.createElement("option");
    optionEl.value = episode.id;
    optionEl.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} -${
      episode.name
    }`;

    episodeSelector.appendChild(optionEl);
  });

  //search episodes event listener
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

  let episodeDropDown = document.getElementById("episode-select")
  episodeDropDown.addEventListener("change", (event) => {
    const episodeId = event.target.value;
    
    const episodeFindById = episodeList.filter(
      (episode) => episode.id == episodeId
    );
    showFilteredEpisodes(episodeFindById);
  });
}


//episode title format
function formatSeriesAndEpisode(episodeTitle, episode) {
  episodeTitle.innerText = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
}

//render page after filtered
function showFilteredEpisodes(filteredEpisodes) {
  episodes.innerHTML = "";

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

homeButton.addEventListener("click", () => {
  location.reload(true);
})

window.onload = setup;
