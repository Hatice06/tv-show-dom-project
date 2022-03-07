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
  "Shows:",
  showSelector,
  "Episodes:",
  episodeSelector,
  input,
  searchCounter
);
rootEl.append(searchDiv, episodeContainer);

let allEpisodes = [];

//render page on the window load;
function setup() {
  sendRequest(167)
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      showsList();
      episodeList();
      searchCounter.innerText = episodeCounter(allEpisodes);
    })
    .catch((e) => console.log(e));
}

function showsList (){
  //show option select dropdown menu
  let allShows = getAllShows().sort((a, b) => a.name.localeCompare(b.name));

  showSelector.innerHTML = "";
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
    showSelector.appendChild(option);
  });
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

//build page for episodes;
function makePageForEpisodes(array) {
  episodes.innerHTML = "";

  array.forEach((episode) => {
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
}


function episodeList () {
  //episode option select dropdown menu
    episodeSelector.innerHTML = "";
  
    allEpisodes.forEach((episode) => {
      let option = document.createElement("option");
      option.value = episode.id;
      option.innerText = formatSeriesAndEpisode("option", episode);
      episodeSelector.appendChild(option);
    });
}

//search keyword event listener - input search
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

  searchCounter.innerText = episodeCounter(filteredEpisodes);
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
  searchCounter.innerText = episodeCounter(episodeFindById);
}

//show selector
showSelector.addEventListener("change", onShowChange);

function onShowChange(event) {
  const showId = event.target.value;
  input.value = "";
  
 
  sendRequest(showId)
    .then((data) => {
      allEpisodes = data;
      episodeList();
      makePageForEpisodes(allEpisodes);
      searchCounter.innerText = episodeCounter(allEpisodes);
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

function episodeCounter (filteredEpisodes) {
  return `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`;
}

window.onload = setup;
