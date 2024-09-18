import { weather } from "./src/vars-weather";
import { getWeather } from "./src/common-weather";
import { apodLink, getData } from "./src/apod";
import { marsButton, mainInfo} from "./src/mars-rovers";
const spaceGazeButton = document.querySelector('.space-gaze')
const mainContent = document.querySelector('.main__content')
import { initializeEpicPage } from './src/epic';

apodLink.addEventListener("mouseover", function () {
  this.textContent = "Astronomy Picture of the Day";
});

apodLink.addEventListener("mouseout", function () {
  this.textContent = "APOD";
});

apodLink.addEventListener("click", getData);
weather.addEventListener("click", getWeather);
marsButton.addEventListener('click', mainInfo)
spaceGazeButton.addEventListener('click', spaceGazeRender)


initializeEpicPage();

function spaceGazeRender() {
  mainContent.innerHTML =`
    <div class="main__content">
      <h1 class="main__content-heading">SPACE GAZE</h1>
      <p class="main__content-paragraph">
        some info about how great your website is
      </p>
    </div>
    `
}
