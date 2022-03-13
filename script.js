//You can edit ALL of the code here
const rootEl = document.getElementById("root");
const showList = document.getElementById("show-list");
const episodeContainer = document.querySelector(".episode-container");

//get search div for search
const searchDiv = document.querySelector(".search-div");

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
homeButton.innerText = "BACK TO SHOWS";

searchDiv.append(
  homeButton,
  "Episodes:",
  episodeSelector,
  input,
  searchCounter
);

//render page on the window load;
function setup() {
  const allShows = getAllShows().sort((a, b) => a.name.localeCompare(b.name));
  makePageForShows(allShows);
}

let allEpisodes = [];

//build page for shows;
function makePageForShows(shows) {
  searchDiv.classList.add("hidden");

  shows.forEach((show) => {
    //create show card
    const showCard = document.createElement("div");
    showCard.className = "show-element";
    const showDetails = document.createElement("div");
    showDetails.className = "show-details";
    const moreDetails = document.createElement("div");
    moreDetails.className = "more-details";

    // create show title- image - summary
    const heading = document.createElement("h1");
    heading.className = "show-title";
    const img = document.createElement("img");
    const summary = document.createElement("p");
    summary.className = "show-summary";
    heading.innerText = show.name;
    img.src = show.image.medium;
    summary.innerHTML = show.summary;

    // create additional details
    const rated = document.createElement("p");
    rated.innerHTML = `<span>Rated:</span> ${show.rating.average}`;
    const genres = document.createElement("p");
    genres.innerHTML = `<span>Genres:</span> ${show.genres.join(" | ")}`;
    const status = document.createElement("p");
    status.innerHTML = `<span>Status:</span> ${show.status}`;
    const runtime = document.createElement("p");
    runtime.innerHTML = `<span>Runtime:</span> ${show.runtime}`;
    moreDetails.append(rated, genres, status, runtime);

    showDetails.append(img, summary, moreDetails);
    showCard.append(heading, showDetails);
    showList.appendChild(showCard);

    // click shows
    showCard.addEventListener("click", () => {
      searchDiv.classList.remove("hidden");
      const showId = show.id;
      sendRequest(showId).then((data) => {
        allEpisodes = data;
        showList.hidden = true;
        makePageForEpisodes(allEpisodes);
        episodeDropDownList();
      });
    });
  });
}

//get episode details of selected show from API
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

function makePageForEpisodes(currentEpisodes) {
  episodeContainer.innerHTML = "";
  episodeContainer.classList.remove("hidden");

  currentEpisodes.forEach((episode) => {
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
    episodeContainer.append(episodeCard);
    episodeCounter(currentEpisodes);
    searchCounter.innerText = episodeCounter(currentEpisodes);
  });
}

//episode option select dropdown menu
function episodeDropDownList() {
  episodeSelector.innerHTML = "";

  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.value = episode.id;
    option.innerText = formatSeriesAndEpisode("dropDown", episode);
    episodeSelector.appendChild(option);
  });
}

//search and filter keyword event listener - input search
input.addEventListener("keyup", searchOnKeyUp);

function searchOnKeyUp() {
  let filteredEpisodes = allEpisodes.filter((episode) => {
    let episodeName = episode.name.toLowerCase();
    let episodeSummary = episode.summary.toLowerCase();
    let searchInput = input.value.toLowerCase();
    return (
      episodeName.includes(searchInput) || episodeSummary.includes(searchInput)
    );
  });

  episodeCounter(filteredEpisodes);
  makePageForEpisodes(filteredEpisodes);
}

//episode selector (from dropdown) and show on screen
episodeSelector.addEventListener("change", onEpisodeChange);

function onEpisodeChange(event) {
  const episodeId = event.target.value;

  //find the selected episode
  const findEpisodeById = allEpisodes.filter(
    (episode) => episode.id == episodeId
  );
  makePageForEpisodes(findEpisodeById);
  episodeCounter(findEpisodeById);
}

//episode title format(card or dropdown/option)

function formatSeriesAndEpisode(type, episode) {
  let titleFormatCard = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

  let titleFormatDropDown = `S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
    episode.name
  }`;

  return type === "card" ? titleFormatCard : titleFormatDropDown;
}

homeButton.addEventListener("click", () => {
  showList.hidden = false;
  showList.innerHTML = "";
  searchDiv.classList.add("hidden");
  episodeContainer.classList.add("hidden");
  setup();
  input.value = "";
});

function episodeCounter(filteredEpisodes) {
  return (searchCounter.innerText = `Displaying ${filteredEpisodes.length} / ${allEpisodes.length} episodes`);
}

window.onload = setup;

//show selector
// showSelector.addEventListener("change", onShowChange);

// function onShowChange(event) {
//   const showId = event.target.value;
//   input.value = "";

//   sendRequest(showId)
//     .then((data) => {
//       allEpisodes = data;
//       episodeList();
//       makePageForEpisodes(allEpisodes);
//       episodeCounter(allEpisodes);
//     })
//     .catch((e) => console.log(e));
// }