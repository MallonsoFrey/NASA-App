import { mainContent, weather } from "./vars-weather";
const API_KEY = "DEMO_KEY";

export async function getWeather() {
  await fetch(
    `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
    //"https://api.nasa.gov/insight_weather/?api_key=2zR71FbfLVWLCsK2fFTMVDJb7K74EGjO0YeGtPoG&feedtype=json&ver=1.0"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      }
    })
    .then((data) => {
      console.log(data);
      renderWeather(data);
    })
    .catch((err) => {
      const errContainer = document.createElement("div");
      errContainer.textContent = `Error: ${err.status} ${err.statusText}`;
      mainContent.appendChild(errContainer);
      console.log("Ошибка. Запрос не выполнен " + err.message);
    });
}

function renderWeather(jso) {
  mainContent.remove();
  //const { sol_keys, validity_checks } = jso;

  console.log(jso.sols_keys);

  /*for (let i = 0; i < sol_keys.length; i++) {
    const sol = document.createElement("div");
    sol.classList.add("sol");

    const solTitle = document.createElement("h2");
    solTitle.textContent = sol_keys[i];
    sol.appendChild(solTitle);

    const solDate = document.createElement("p");
    solDate.textContent = `${LOCAL_DATE_TIME[i]} / ${LOCAL_SOL[i]}`;
    sol.appendChild(solDate);

    const solTemp = document.createElement("p");
    solTemp.textContent = `${MIN_TEMPERATURE[i]} / ${MAX_TEMPERATURE[i]}`;
    sol.appendChild(solTemp);

    const solWind = document.createElement("p");
    solWind.textContent = `${WIND_SPEED[i]} / ${WIND_DIRECTION[i]}`;
    sol.appendChild(solWind);

    const solAttitude = document.createElement("p");
    solAttitude.textContent = `${ATTITUDE[i]}`;
    sol.appendChild(solAttitude);

    const solHemisphere = document.createElement("p");
    solHemisphere.textContent = `${HEMISPHERE[i]}`;
    sol.appendChild(solHemisphere);

    const solDescription = document.createElement("p");
    solDescription.textContent = `${DESCRIPTION[i]}`;
    sol.appendChild(solDescription);

    const solHorizon = document.createElement("p");
    solHorizon.textContent = `${HORIZON[i]}`;
    sol.appendChild(solHorizon);

    const solAtmosphere = document.createElement("p");
    solAtmosphere.textContent = `${ATMOSPHERE[i]}`;
    sol.appendChild(solAtmosphere);
*/
  //mainContent.append(sol);
}
