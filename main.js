import { weather } from "./src/vars-weather";
import { getWeather } from "./src/common-weather";
import { apodLink, setCreateApod } from "./src/apod";
import { marsButton, mainInfo} from "./src/mars-rovers";
const spaceGazeButton = document.querySelector('.space-gaze')
const mainContent = document.querySelector('.main__content')

apodLink.addEventListener("mouseover", function () {
  this.textContent = "Astronomy Picture of the Day";
});
apodLink.addEventListener("mouseout", function () {
  this.textContent = "APOD";
});
apodLink.addEventListener("click", setCreateApod);

weather.addEventListener("click", getWeather);
marsButton.addEventListener("click", mainInfo);
spaceGazeButton.addEventListener("click", spaceGazeRender);

const epicLink = document.querySelector('a[data-route="epic"]');
epicLink.addEventListener('click', async () => {
  try {
    const { initializeEpicPage } = await import('./src/epic.js');
    initializeEpicPage();
  } catch (error) {
    console.error('Ошибка при загрузке модуля epic:', error);
  }
});

function spaceGazeRender() {
  mainContent.innerHTML = `
    <div class="main__content">
      <h1 class="main__content-heading">SPACE GAZE</h1>
      <p class="main__content-paragraph">
        some info about how great your website is
      </p>
    </div>
    `;
}

/*бургер меню*/
import { click } from "./src/burger";
import { burger } from "./src/vars-burger";

burger.addEventListener("click", click);
