import { weather } from "./src/vars-weather";
import { getWeather } from "./src/common-weather";
import { apodLink, getData } from "./src/apod";
import { marsButton, marsCam} from "./src/mars-rovers";

apodLink.addEventListener("mouseover", function () {
  this.textContent = "Astronomy Picture of the Day";
});

apodLink.addEventListener("mouseout", function () {
  this.textContent = "APOD";
});

apodLink.addEventListener("click", getData);
weather.addEventListener("click", getWeather);
marsButton.addEventListener('click', marsCam)
