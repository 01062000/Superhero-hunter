/** @format */

const backToHomeBtn = document.querySelector("#backToHomeBtn");
const appContainer = document.querySelector(".appContainer");
import { apiKey } from "../config/config.js";

console.log(window.location.search);
//getting the seached hero id from url
const urlParams = new URLSearchParams(location.search);

for (const [key, value] of urlParams) {
  console.log(`${key}:${value}`);
  getSearchedHeroData(value);
}

async function getSearchedHeroData(characterId) {
  console.log(characterId);
  let hash = CryptoJS.MD5(
    `${apiKey.ts}${apiKey.privateKey}${apiKey.publicKey}`
  );
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${apiKey.ts}&apikey=${apiKey.publicKey}&hash=${hash}`
  );
  const heroData = await response.json();
  console.log(heroData);
  appContainer.innerHTML = `<div class="heroImgContainer">
    <img src="${heroData.data["results"][0].thumbnail.path}.${heroData.data["results"][0].thumbnail.extension}" alt="hero-image" class="heroImg" >
    </div>
    <div class="superheroDetailsContainer">
    <h2 class="heroName">${heroData.data["results"][0].name}</h2>
    <p class="heroDesc">${heroData.data["results"][0].description} </p>
    </div>`;
}

backToHomeBtn.addEventListener("click", () => {
  console.log("button clicked" + window.location.href);
  window.location.href = "/index.html";
});
