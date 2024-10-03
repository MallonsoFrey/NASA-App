import { weather } from "./src/vars-weather";
import { getWeather } from "./src/common-weather";
import { apodLink, getData, handleApodLinkHover } from "./src/apod";
import { marsButton, mainInfo } from "./src/mars-rovers";
import { initializeEpicPage } from "./src/epic.js";
const spaceGazeButton = document.querySelector(".space-gaze");
const mainContent = document.querySelector(".main__content");
const epicLink = document.querySelector(".epic");

handleApodLinkHover(apodLink);

apodLink.addEventListener("click", getData);
weather.addEventListener("click", getWeather);
marsButton.addEventListener("click", mainInfo);
spaceGazeButton.addEventListener("click", spaceGazeRender);
epicLink.addEventListener("click", initializeEpicPage);

export function spaceGazeRender() {
  mainContent.innerHTML = `
    <div class="main__content">
      <h1 class="main__content-heading">SPACE GAZE</h1>
      <p class="main__content-paragraph">
        let's dive into the unknown
      </p>
    </div>
    `;
}

//burger-menu features
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".header__nav__list");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

document.querySelectorAll(".link").forEach((elem) =>
  elem.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
  })
);
