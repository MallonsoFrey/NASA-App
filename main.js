import { weather } from "./src/vars-weather";
import { getWeather } from "./src/common-weather";
import { apodLink, getData, createApod } from "./apod";

apodLink.addEventListener("mouseover", function () {
  this.textContent = "Astronomy Picture of the Day";
});

apodLink.addEventListener("mouseout", function () {
  this.textContent = "APOD";
});

apodLink.addEventListener("click", function() {
  if (!createApod) {
      getData();
      createApod = true;
  }
});

weather.addEventListener("click", getWeather);

