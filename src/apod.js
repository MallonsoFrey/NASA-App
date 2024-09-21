export const main = document.querySelector('.main');
export const apodLink = document.getElementById('apod');
//export const newApod = document.getElementById('newApod');

const mainContent = document.querySelector('.main__content');
const key = 'TVrvR0LgwIjSOHwBsUFSkXqF1jizNTL1Ob6IG2gB';

let createApod = false;
//let createNewApod = false;

export function setCreateApod() {
    if (!createApod) {
        getData();
        createApod = true;
    }
}

function getData() {
    fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${key}`
    )
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({
            status: res.status,
            statusText: res.statusText,
        });
        }
    })
    .then((data) => {
        console.log(data);
        renderData(data);
    })
    .catch((err) => {
        const errContainer = document.createElement("div");
        errContainer.textContent = `Error: ${err.status} ${err.statusText}`;
        main.appendChild(errContainer);
    });
}

function renderData(obj) {
    let fromDate = obj.date.split("-")
    const date = new Date(fromDate[0], fromDate[1] - 1, fromDate[2])
    const formatter = new Intl.DateTimeFormat('en', {
        month: 'short'
    });
    const month = formatter.format(date);
    mainContent.innerHTML = `
        <div class="apod_content">
            <h2>Astronomy Picture of the Day</h2>
            <p>Today is ${date.getDate()} ${month} ${date.getFullYear()}</p>
            <h3>${obj.title}</h3>
            <div><img style="max-width: 100%; height: auto;" src="${obj.url}" alt="Astronomy Picture of the Day"/></div>
            <a class="imagehd" href="${obj.hdurl}" target="_blank">Press on me for high-resolution image</a>
            <p>${obj.explanation}</p>
            <div>
                <h3>Select another date</h2>
                <input type="date" id="date-picker" class="calendar">
                <button id="newApod">Show picture</button>
            </div>
        </div>`;
    const newApod = document.getElementById('newApod');
    newApod.addEventListener("click", setCreateNewApod);
}

function setCreateNewApod() {
    const dateInput = document.getElementById('date-picker').value;
    if (!dateInput) {
        alert('Please, select a date.');
        return;
    }
    let fromDate = dateInput;
    console.log(fromDate);
    fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${fromDate}`
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject({
                status: res.status,
                statusText: res.statusText,
            });
            }
        })
        .then((data) => {
            console.log(data);
            renderData(data);
        })
        .catch((err) => {
            const errContainer = document.createElement("div");
            errContainer.textContent = `Error: ${err.status} ${err.statusText}`;
            main.appendChild(errContainer);
        });
}

