export const main = document.querySelector('.main');
export const apodLink = document.getElementById('apod');
export let createApod = false;

//const body = document.getElementsByTagName('body')[0];
const wrapper = document.querySelector('.wrapper');
const mainContent = document.querySelector('.main__content');
//const header = document.querySelector('.header');

export function getData() {
    fetch(
    "https://api.nasa.gov/planetary/apod?api_key=TVrvR0LgwIjSOHwBsUFSkXqF1jizNTL1Ob6IG2gB"
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
    mainContent.innerHTML = `
        <div class="apod_content">
            <h2>Astronomy Picture of the Day</h2>
            <h3>${obj.title}</h3>
            <div style="width: 40%"><img style="max-width: 100%; height: auto;" src="${obj.url}" alt="Astronomy Picture of the Day"/></div>
            <a class="imagehd" href="${obj.hdurl}" target="_blank">Press on me for high-resolution image</a>
            <p>${obj.explanation}</p>
        </div>`;
    main.style.cssText += `
        top: 0;
        height: calc(100% - 54.1211px);;
    `;
    wrapper.style.cssText = `
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        background-color: black;
    `;
}
