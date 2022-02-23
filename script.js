//You can edit ALL of the code here
const rootEl = document.getElementById("root");

const inputField = document.createElement("div");
inputField.classList.add("input-div");

const episodeContainer = document.createElement("div");
episodeContainer.classList.add("episode-container");

let inputEl = document.createElement("input");
inputEl.type = "search";
inputEl.classList.add("search-episodes");
inputEl.placeholder = "Search keyword ";
inputEl.value = "";

let counter = document.createElement("p");
counter.classList.add("counter");
inputField.append(inputEl, counter);

rootEl.append(inputField, episodeContainer);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  counter.innerText = "Displaying" +  "/" + allEpisodes.length + "episodes";
}

function makePageForEpisodes(episodeList) {

   let episodes = document.querySelector(".episode-container");
  
  episodeList.map((episode) => {
    let cardDivEl = document.createElement("div");
    cardDivEl.classList.add("episode-card");
    let episodeTitle = document.createElement("h3");
    episodeTitle.classList.add("episode-title");
    episodeTitle.innerText =
      episode.name +
      " - " +
      `S${episode.season.toString().padStart(2, "0")}E${episode.number
        .toString()
        .padStart(2, "0")}`;
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", episode.image.medium);
    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    cardDivEl.append(episodeTitle, imgEl, episodeSummary);
    episodes.append(cardDivEl);
  });

  let input = document.querySelector(".search-episodes");

  input.addEventListener("keyup", () => {

 
    episodes.innerHTML = "";
    console.log(input.value);
       filteredEpisodes = episodeList.filter((episode) =>
            episode.summary
              .toLowerCase()
              .includes(
                input.value.toLowerCase()) ||
                  episode.name.toLowerCase().includes(input.value.toLowerCase())
              
      );


    filteredEpisodes.map((episode) => {
      let cardDivEl = document.createElement("div");
      cardDivEl.classList.add("episode-card");
      let episodeTitle = document.createElement("h3");
      episodeTitle.classList.add("episode-title");
      episodeTitle.innerText =
        episode.name +
        " - " +
        `S${episode.season.toString().padStart(2, "0")}E${episode.number
          .toString()
          .padStart(2, "0")}`;
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", episode.image.medium);
      let episodeSummary = document.createElement("p");
      episodeSummary.innerHTML = episode.summary;
      cardDivEl.append(episodeTitle, imgEl, episodeSummary);
      episodes.append(cardDivEl);
    });
  });
}

window.onload = setup;
