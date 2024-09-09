import { main, weather } from "./vars-weather";

export async function getWeather() {
  const data = await fetch(
    "https://api.nasa.gov/insight_weather/?api_key=2zR71FbfLVWLCsK2fFTMVDJb7K74EGjO0YeGtPoG&feedtype=json&ver=1.0"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен " + err.message);
    });

  main.innerHTML = `
  
  `;
}
