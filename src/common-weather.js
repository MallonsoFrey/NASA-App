import { main, weather } from "./vars-weather";

export async function getWeather() {
  const data = await fetch(
    "https://api.nasa.gov/insight_weather/?api_key=2zR71FbfLVWLCsK2fFTMVDJb7K74EGjO0YeGtPoG&feedtype=json&ver=1.0"
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
    })
    .catch((err) => {
      const errContainer = document.createElement("div");
      errContainer.textContent = `Error: ${err.status} ${err.statusText}`;
      main.appendChild(errContainer);
      console.log("Ошибка. Запрос не выполнен " + err.message);
    });

  main.innerHTML = `
  
  `;
}
