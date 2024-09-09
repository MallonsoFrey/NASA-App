import { weather } from "./src/vars-weather";

import { getWeather } from "./src/common-weather";

weather.addEventListener("click", getWeather);
