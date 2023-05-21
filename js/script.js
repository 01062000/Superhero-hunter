/** @format */

import { apiKey } from "../config/config.js";

const appContainer = document.querySelector(".appContainer");

async function getSuperherosData() {
  let hash = CryptoJS.MD5(
    `${apiKey.ts}${apiKey.privateKey}${apiKey.publicKey}`
  );
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?ts=${apiKey.ts}&apikey=${apiKey.publicKey}&hash=${hash}`
  );
  const jsonData = await response.json();
  jsonData.data["results"].forEach((element) => {
    console.log(element.name);
    const div = document.createElement("div");
    div.classList.add("superheroCard");
    div.innerHTML = `<img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="hero-image" class="heroImg" data-id=${element.id}>
        <div class="hero-name">
            <p>${element.name}</p>
            <button type="submit" class="addFavBtn" data-id = ${element.id} title="Add To Favourites">Add</button>
            <button type="submit" class="removeFavBtn" data-id = ${element.id} title="Remove From Favourites">Added</button>
        </div>`;

    appContainer.append(div);
    renderApp();
  });
}
getSuperherosData();

function renderApp() {
  const searchedToken = document.querySelector("#search");
  const searchBtn = document.querySelector("#searchBtn");
  const superheroCard = document.querySelectorAll(".heroImg");
  const addFavBtn = document.querySelectorAll(".addFavBtn");
  const removeFavBtn = document.querySelectorAll(".removeFavBtn");

  console.log(addFavBtn);

  const storedFavHeros = JSON.parse(localStorage.getItem("favHeroList"));
  console.log(storedFavHeros);

  if (!storedFavHeros === null) {
    storedFavHeros.forEach((id) => {
      addFavBtn.forEach((btn) => {
        if (btn.dataset.id === id) {
          btn.style.display = `none`;
          removeFavBtn.forEach((rembtn) => {
            if (id === rembtn.dataset.id) {
              rembtn.style.display = `block`;
            }
          });
        }
      });
    });
  }

  searchBtn.addEventListener("click", () => {
    console.log(searchedToken.value);
  });
  superheroCard.forEach((superherocard) => {
    superherocard.addEventListener("click", (e) => {
      console.log(e.target);
      const heroId = e.target.dataset.id;
      window.location.href = `/html/details.html?superheroId=${heroId}`;
    });
  });

  let myFavHeros = []; //JSON.parse(localStorage.getItem("favHeroList"));

  localStorage.setItem('favHeroList', JSON.stringify(myFavHeros));

  addFavBtn.forEach((addfavbtn) => {
    addfavbtn.addEventListener("click", (e) => {
      addfavbtn.style.display = `none`;
      //console.log(e);
      //console.log(removeFavBtn);
      removeFavBtn.forEach((removefavbtn) => {
        if (e.target.dataset.id === removefavbtn.dataset.id) {
          console.log(true);
          removefavbtn.style.display = `block`;
          myFavHeros = [...myFavHeros, e.target.dataset.id];
          localStorage.setItem("favHeroList", JSON.stringify(myFavHeros));
        }
      });
    });
  });

  //funtion to remove a particular id from favherolist
  function remove(arr, item) {
    var index = arr.indexOf(item);
    return [
      // part of the array before the given item
      ...arr.slice(0, index),

      // part of the array after the given item
      ...arr.slice(index + 1),
    ];
  }

  removeFavBtn.forEach((removefavbtn) => {
    removefavbtn.addEventListener("click", (e) => {
      removefavbtn.style.display = `none`;
      myFavHeros = remove(myFavHeros, e.target.dataset.id);
      localStorage.setItem("favHeroList", JSON.stringify(myFavHeros));
      addFavBtn.forEach((addfavbtn) => {
        if (e.target.dataset.id === addfavbtn.dataset.id) {
          addfavbtn.style.display = `block`;
        }
      });
    });
  });
}
