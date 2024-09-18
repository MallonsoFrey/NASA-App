const marsButton = document.querySelector('.mars')
const output = document.querySelector('.main__content')

/*fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=1023&api_key=ujhHC5aAHogxEryayLSB4H3LRoKlpAkpqq48JZ8g')
.then((res) => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))*/

function mainInfo() {
    output.innerHTML = `
    <div class="mars-container">
        <h3>Here you can find out everything about the rover Curiosity</h3>
        <p class="mars-container__no-rover">Unfortunately, the servers of Opportunity and Spirit rovers are currently unavaliable.</p>
        <p>Martian day is called Sol</p>
        <p>You can choose Sol(up to 4300) and which camera's image you'd like to see!</p>
        <input type="number" name="sol" id="sol">
        <select class="mars-container__select" id="cam">
            <option hidden>Choose the camera</option>
            <option value="fhaz">Front Camera</option>
            <option value="rhaz">Rear Camera</option>
            <option value="mardi">Descent Imager</option>
            <option value="navcam">Navigation Camera</option>
        </select>
        <button class="roverButton">Show me!</button>
    </div>
    `
}

marsButton.addEventListener('click', () => {
    mainInfo()

    const chosenSol = document.querySelector('#sol')
    const chosenCam = document.querySelector('#cam')
    const roverButton = document.querySelector('.roverButton')

    roverButton.addEventListener('click', () => {
        const chosenSolValue = chosenSol.value
        const chosenCamValue = chosenCam.value

        if (chosenCamValue === '' || chosenSolValue > 4300 || chosenSolValue <= 0) {
            output.innerHTML = `<p>Please enter valid Sol or choose a camera before proceeding.</p>
            <button class="return">Go back</button>`
            
            const goBackButton = document.querySelector('.return');
            goBackButton.addEventListener('click', mainInfo);
            return
        }

        marsRender(chosenSolValue, chosenCamValue)
    })
})

async function marsRender(num, cam) {
    output.innerHTML = '<img src="./public/images/loading.gif" alt="rocket loading gif">'
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${num}&camera=${cam}&api_key=ujhHC5aAHogxEryayLSB4H3LRoKlpAkpqq48JZ8g`)

        if(!response.ok) {
            return Promise.reject(response.status)
        }

        const data = await response.json()
        if(!data || !data.photos || data.photos.length === 0 || data ==- undefined) {
            output.innerHTML = `
                <div class="mars-container">
                    <p>No photos available. Please try another selection.</p>
                    <button class="return">Go back</button>
                </div>
            `
        }

        output.innerHTML = `
            <div class="mars-container">
                <h2>Mars Rover Photos</h2>
                <div style="width: 20%"><img style="max-width: 100%; height: auto;" src="${data.photos[0].img_src}" alt="Mars Rover Photo"></div>
                <p>Rover: ${data.photos[0].rover.name}</p>
                <p>Date: ${data.photos[0].earth_date}</p>
                <button class="return">Go back</button>
            </div>
        `
        const goBackButton = document.querySelector('.return');
        goBackButton.addEventListener('click', mainInfo);
    } catch (error) {
        output.innerHTML = `
        <div class="mars-container">
            <p>Error fetching data: ${error.message}</p>
            <button class="return">Go back</button>
        </div>
        `

        const goBackButton = document.querySelector('.return');
        goBackButton.addEventListener('click', mainInfo);
    } finally {
        console.log('Request was made')
    }
}