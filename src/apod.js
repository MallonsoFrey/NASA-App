import { spaceGazeRender } from "../main";

export const main = document.querySelector(".main");
export const apodLink = document.getElementById("apod");
const mainContent = document.querySelector(".main__content");
const key = "TVrvR0LgwIjSOHwBsUFSkXqF1jizNTL1Ob6IG2gB";

export function handleApodLinkHover(apodLink) {
  apodLink.addEventListener("mouseover", function () {
    this.textContent = "Astronomy Picture of the Day";
  });
  apodLink.addEventListener("mouseout", function () {
    this.textContent = "APOD";
  });
}

export function getData() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      renderData(data);
    })
    .catch((err) => {
      mainContent.innerHTML = `<div class="apod__error-message">Something went wrong! Trying turning off your VPN</div> <button class="returnButton buttonStyle">Go back</button>`;
      console.log(err);
      const btn = document.querySelector(".returnButton");
      if (btn) {
        btn.addEventListener("click", spaceGazeRender);
      }
    });
}

function renderData(obj) {
  let fromDate = obj.date.split("-");
  const date = new Date(fromDate[0], fromDate[1] - 1, fromDate[2]);
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
  });
  const month = formatter.format(date);
  mainContent.innerHTML = `
        <div class="apod_content">
            <h2>Astronomy Picture of the Day</h2>
            <p>${date.getDate()} ${month} ${date.getFullYear()}</p>
            <h3>${obj.title}</h3>
            <div><img style="max-width: 100%; height: auto;" src="${
              obj.url
            }" alt="Astronomy Picture of the Day"/></div>
            <a class="imagehd" href="${
              obj.hdurl
            }" target="_blank">Press on me for high-resolution image</a>
            <p class="apod_content-info">${obj.explanation}</p>
            <div class = "new-date">
                <h3>Select another date</h3>
                <input type="date" id="date-picker" class="calendar">
                <button id="newApod">Show picture</button>
            </div>
        </div>`;
  const newApod = document.getElementById("newApod");
  newApod.addEventListener("click", setCreateNewApod);
}

function setCreateNewApod() {
  const dateInput = document.getElementById("date-picker").value;
  const container = document.querySelector(".new-date");
  let error = container.querySelector(".apod__error-message");

  if (!dateInput) {
    if (!error) {
      // Создаем новое сообщение об ошибке, если его еще нет
      error = document.createElement("p");
      error.classList.add("apod__error-message");
      error.innerText = "Please, select a date";
      container.appendChild(error);
    }
    return; // Выходим из функции, чтобы не продолжать выполнение
  } else {
    // Если дата выбрана, удаляем сообщение об ошибке, если оно существует
    if (error) {
      error.remove();
    }
  }

  let fromDate = dateInput;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${fromDate}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      renderData(data);
    })
    .catch((err) => {
      const error = document.createElement("p");
      error.classList.add("apod__error-message");
      error.innerText = `Error: ${err.status} ${err.statusText}`;
      container.appendChild(error);
    });
}
