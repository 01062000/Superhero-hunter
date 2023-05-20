/** @format */

const backToHomeBtn = document.querySelector(".backToHomeBtn");
const appContainer = document.querySelector(".appContainer");
import { apiKey } from "../config/config.js";

const storedFavHeros = JSON.parse(localStorage.getItem("favHeroList"));
console.log(storedFavHeros);

getFavHerosData(storedFavHeros);

function getFavHerosData(listOfIds) {
  console.log(listOfIds);
  listOfIds.forEach(async (id) => {
    let hash = CryptoJS.MD5(
      `${apiKey.ts}${apiKey.privateKey}${apiKey.publicKey}`
    );
    const response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${apiKey.ts}&apikey=${apiKey.publicKey}&hash=${hash}`
    );
    const heroData = await response.json();
    const div = document.createElement("div");
    div.classList.add("superheroCard");
    div.innerHTML = `
          <img src="${heroData.data["results"][0].thumbnail.path}.${heroData.data["results"][0].thumbnail.extension}" alt="" class="heroImg" data-id="001">
          <div class="hero-name">
              <p>${heroData.data["results"][0].name}</p>
              <button type="submit" class="removeFavBtn">Remove</button>
          </div>
`;
    appContainer.append(div);
  });

  renderApp();
}

function renderApp() {
  const removeFavBtn = document.querySelector(".removeFavBtn");
  backToHomeBtn.addEventListener("click", () => {
    console.log("clicked");
    window.location.href = `/html/index.html`;
  });

  removeFavBtn.addEventListener("click", () => {
    removeFavBtn.innerHTML = `Removed`;
    /*setTimeout(() => {
        window.location.reload();
    }, 2000)*/
  });
}
