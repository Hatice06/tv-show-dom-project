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

searchDiv.append(homeButton, episodeSelector, inputEl, searchCounter);
rootEl.append(searchDiv, episodeContainer);

const allEpisodes = getAllEpisodes();

//render page on the window load;
function setup() {
  makePageForEpisodes(allEpisodes);
  searchCounter.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
}

//build page for all episodes;
function makePageForEpisodes(episodeList) {
  episodes.innerHTML = "";

  episodeList.forEach((episode) => {
    let episodeCard = document.createElement("div");
    let episodeTitle = document.createElement("h3");
    let episodeSummary = document.createElement("p");
    let episodeImg = document.createElement("img");

    episodeCard.className = "episode-card";
    episodeTitle.className = "episode-title";
    episodeImg.src = episode.image.medium;

    episodeTitle.innerText = formatSeriesAndEpisode("card", episode);

    episodeSummary.innerHTML = episode.summary;
    episodeCard.append(episodeTitle, episodeImg, episodeSummary);
    episodes.append(episodeCard);
  });

  //episode option select dropdown menu
  episodeList.forEach((episode) => {
    let optionEl = document.createElement("option");
    optionEl.value = episode.id;
    optionEl.innerText = formatSeriesAndEpisode("option", episode);

    episodeSelector.appendChild(optionEl);
  });
}

//search episodes event listener
inputEl.addEventListener("keyup", () => {
  let filteredEpisodes = allEpisodes.filter(
    (episode) =>
      episode.summary.toLowerCase().includes(inputEl.value.toLowerCase()) ||
      episode.name.toLowerCase().includes(inputEl.value.toLowerCase())
  );

  searchCounter.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
  makePageForEpisodes(filteredEpisodes);
});

//episode selector
episodeSelector.addEventListener("change", (event) => {
  const episodeId = event.target.value;

  const episodeFindById = allEpisodes.filter(
    (episode) => episode.id == episodeId
  );
  makePageForEpisodes(episodeFindById);
  searchCounter.innerText = `Displaying ${1} / ${allEpisodes.length} episodes`;
});

//episode title format(card or option)
function formatSeriesAndEpisode(type, episode) {
  let titleFormatCard = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

  let titleFormatOption = `S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
    episode.name
  }`;

  return type === "card" ? titleFormatCard : titleFormatOption;
}

homeButton.addEventListener("click", () => {
  setup();
  inputEl.value = "";
});

window.onload = setup;
