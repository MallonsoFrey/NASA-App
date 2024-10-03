import { mainContent } from "./vars-weather";
import { main } from "./apod";

export async function getWeather() {
  await fetch(`http://localhost:3001/sol_keys`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      renderWeather(data);
    })
    .catch((err) => {
      const errContainer = document.createElement("div");
      errContainer.textContent = `Error: ${err.status} ${err.statusText}`;
      mainContent.appendChild(errContainer);
    });
}

function renderWeather(data) {
  mainContent.innerHTML = 
    `<div class='weather__container'>
      <h2>Current Weather on Mars</h2>
      <p>NASA’s InSight Mars lander takes continuous weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.</p>
      <p class='weather__container__paragraph-api'>InSight Mars Weather Service API is used to gather this information. View the API
          <a href="https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf" target="_blank">documentation</a> to see how I gathered the information!
      </p>
      <h2>Previous 7 Days</h2>
    </div>
    `;

  const weatherContainer = document.querySelector('.weather__container')
  const sol_keys = data;
  const countObj = sol_keys[0];
  const keys = Object.keys(countObj);
  let firstKey = keys[0];

  sol_keys.forEach((key) => {
    const sol = document.createElement("div");
    sol.classList.add("sol");

    const solTitle = document.createElement("h3");
    solTitle.textContent = `Day ${key[firstKey].name}`;
    sol.appendChild(solTitle);

    const solDate = document.createElement("p");
    solDate.textContent = `Sunrise: ${key[firstKey].First_UTC}; 
    Sunset: ${key[firstKey].Last_UTC}`;
    sol.appendChild(solDate);

    const solTemp = document.createElement("p");
    solTemp.textContent = `Temperature: Low: ${key[firstKey].AT.mn} / High: ${key[firstKey].AT.mx}`;
    sol.appendChild(solTemp);

    const solSeason = document.createElement("p");
    solSeason.textContent = `Season: ${key[firstKey].Season}`;
    sol.appendChild(solSeason);

    weatherContainer.append(sol);
    firstKey = +firstKey + 1;
  });
}
