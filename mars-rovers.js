const marsButton = document.querySelector('.mars')
const output = document.querySelector('.main__content')

/*fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1023&api_key=ujhHC5aAHogxEryayLSB4H3LRoKlpAkpqq48JZ8g')
.then((res) => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))*/

marsButton.addEventListener('click', () => {
    output.innerHTML = `
            <div class="mars-container">
                <h3>Photos of which Rover would you like to see today?</h3>
                <select class="chosen-rover">
                    <option value="curiosity">Curiosity</option>
                    <option value="opportunity">Opportunity</option>
                    <option value="spirit">Spirit</option>
                </select>
                <button class="roverButton">Let's see?</button>
            </div>
        `
})

const chosenRover = document.querySelector('.chosen-rover')
const roverButton = document.querySelector('.roverButton')

roverButton.addEventListener('click', () => {
    const chosenRoverValue = chosenRover.value
    marsRender(chosenRoverValue)
})

async function marsRender(rover) {
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=ujhHC5aAHogxEryayLSB4H3LRoKlpAkpqq48JZ8g`)
        if (!response.ok) {
            return Promise.reject(response.status)
        }

        const data = await response.json()
        if(!data) {
            return Promise.reject('Something went wrong')
        }

        output.innerHTML = `
            <div class="mars-container">
                <h2>Mars Rover Photos</h2>
                <div style="width: 20%"><img style="max-width: 100%; height: auto;" src="${data.photos[0].img_src}" alt="Mars Rover Photo"></div>
                <p>Rover: ${data.photos[0].rover.name}</p>
                <p>Date: ${data.photos[0].earth_date}</p>
            </div>
        `
    } catch (error) {
        output.innerText = `Ошибка: ${error}`
    } finally {
        console.log('Request was made')
    }
}