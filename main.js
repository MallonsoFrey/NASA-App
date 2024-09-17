import { weather } from "./src/vars-weather";
import { getWeather } from "./src/common-weather";
import { main, apodLink, getData } from "./apod";

apodLink.addEventListener("mouseover", function () {
  this.textContent = "Astronomy Picture of the Day";
});

apodLink.addEventListener("mouseout", function () {
  this.textContent = "APOD";
});

apodLink.addEventListener("click", getData);
weather.addEventListener("click", getWeather);

/*бургер меню*/
import { click } from "./src/burger";
import { burger } from "./src/vars-burger";

burger.addEventListener("click", click);
