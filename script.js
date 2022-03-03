//You can edit ALL of the code here
const rootEl = document.getElementById("root");
const episodeContainer = document.querySelector(".episode-container");

//get search div for search
const searchDiv = document.querySelector(".search-div");
const episodes = document.querySelector(".episode-container");

//create episode selector
const episodeSelector = document.createElement("select");
episodeSelector.id = "episode-select";

//create show selector
const showSelector = document.createElement("select");
showSelector.id = "show-select";

//create input
let input = document.createElement("input");
input.type = "search";
input.className = "search-episodes";
input.placeholder = "Search keyword ";

//episode search-counter
let searchCounter = document.createElement("p");
searchCounter.className = "search-counter";

//home button
let homeButton = document.createElement("button");
homeButton.className = "home-btn";
homeButton.innerText = "HOME";

searchDiv.append(
  homeButton,
  showSelector,
  episodeSelector,
  input,
  searchCounter
);
rootEl.append(searchDiv, episodeContainer);

let allEpisodes = [];

//show option select dropdown menu
let allShows = getAllShows().sort((a, b) => a.name.localeCompare(b.name));

allShows.forEach((show) => {
    let option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
    showSelector.appendChild(option);   
  });

//render page on the window load;
function setup() {
  sendRequest(167)
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      searchCounter.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
    })
    .catch((e) => console.log(e));
}

function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(urlForTheRequest)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
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
  episodeSelector.innerHTML = "";
  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.value = episode.id;
    option.innerText = formatSeriesAndEpisode("option", episode);
    episodeSelector.appendChild(option);
  });
}

//search episodes event listener - input search
input.addEventListener("keyup", onKeyUp);

function onKeyUp() {
  let filteredEpisodes = allEpisodes.filter((episode) => {
    let episodeName = episode.name.toLowerCase();
    let episodeSummary = episode.summary.toLowerCase();
    let searchInput = input.value.toLowerCase();
    return (
      episodeName.includes(searchInput) || episodeSummary.includes(searchInput)
    );
  });

  searchCounter.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
  makePageForEpisodes(filteredEpisodes);
}

//episode selector
episodeSelector.addEventListener("change", onEpisodeChange);

function onEpisodeChange(event) {
  const episodeId = event.target.value;

  const episodeFindById = allEpisodes.filter(
    (episode) => episode.id == episodeId
  );
  makePageForEpisodes(episodeFindById);
  searchCounter.innerText = `Displaying ${1} / ${allEpisodes.length} episodes`;
}

//show selector
showSelector.addEventListener("change", onShowChange);

function onShowChange(event) {
  const showId = event.target.value;

  sendRequest(showId)
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      searchCounter.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} episodes`;
    })
    .catch((e) => console.log(e));
}

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
  input.value = "";
});

window.onload = setup;
