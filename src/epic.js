import { spaceGazeRender } from "../main";

export function initializeEpicPage() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
    <div class="epic__container">
      <h1 id="epic__container-heading">NASA EPIC Photo Gallery</h1>
      <div class="sidebar">
        <h2>Select a date</h2>
        <input type="date" id="date-picker" class="calendar">
        <button id="loadGalleryBtn">Show photos</button>
      </div>
      <div id="photo-container" class="photo-container"></div>
      <div class="gallery" id="gallery-container"></div>
    </div>
  `;

  const loadGalleryBtn = document.getElementById("loadGalleryBtn");
  loadGalleryBtn.addEventListener("click", loadGallery);
}

//function loading gallery
function loadGallery() {
  const apiKey = "UbtvovgnoY8bvWMl7xv4zXR92dnaVMNPJYAt0OzA";
  const dateInput = document.getElementById("date-picker").value;
  const container = document.querySelector(".sidebar");
  let error = container.querySelector(".epic__error-message");

  if (!dateInput) {
    if (!error) {
      // Создаем новое сообщение об ошибке, если его еще нет
      error = document.createElement("p");
      error.classList.add("epic__error-message");
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

  const formattedDate = dateInput.split("-").join("/");
  const galleryContainer = document.getElementById("gallery-container");
  const photoContainer = document.getElementById("photo-container");

  galleryContainer.innerHTML = "<p>Loading images...</p>";
  photoContainer.innerHTML = "";
  //galleryContainer.innerHTML =
  //  '<img src="./src/images/loading.gif" alt="rocket loading gif">';
  console.log("something is up");

  fetch(
    `https://epic.gsfc.nasa.gov/api/natural/date/${dateInput}?api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      galleryContainer.innerHTML = "";
      if (data.length === 0) {
        galleryContainer.innerHTML = "<p>No images for this date.</p>";
        return;
      }

      const firstImage = data[0].image;
      const firstImageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${firstImage}.jpg`;
      showLargeImage(firstImageUrl, data[0].date);

      data.slice(1, 13).forEach((item) => {
        const image = item.image;
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${image}.jpg`;

        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "NASA EPIC Photo";
        imgElement.title = `Image taken on ${item.date}`;

        imgElement.onclick = () => showLargeImage(imageUrl, item.date);

        galleryContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      galleryContainer.innerHTML = "<p>Error loading gallery.</p>";
      console.error("Error loading gallery:", error);
    });
}

// Function to display the large image
function showLargeImage(imageUrl, date) {
  const photoContainer = document.getElementById("photo-container");
  photoContainer.innerHTML = "";
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.alt = "NASA EPIC Photo";
  imgElement.title = `Image taken on ${date}`;
  photoContainer.appendChild(imgElement);
  if (!document.getElementById("closeGalleryBtn")) {
    addCloseGalleryButton();
  }
}

// Function to add the close gallery button
function addCloseGalleryButton() {
  const closeGalleryBtn = document.createElement("button");
  closeGalleryBtn.id = "closeGalleryBtn";
  closeGalleryBtn.className = "close-gallery";
  closeGalleryBtn.textContent = "×";
  const photoContainer = document.getElementById("photo-container");
  photoContainer.appendChild(closeGalleryBtn);
  closeGalleryBtn.addEventListener("click", spaceGazeRender);
}
