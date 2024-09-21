export function initializeEpicPage() {
  const apiKey = 'UbtvovgnoY8bvWMl7xv4zXR92dnaVMNPJYAt0OzA';
  const mainContent = document.getElementById('main-content');

  // new содержимое для EPIC галереи
  mainContent.innerHTML = `
    <div class="main-content">
      <h1>NASA EPIC Photo Gallery</h1>
      <div class="sidebar">
        <h2>Select a date</h2>
        <input type="date" id="date-picker" class="calendar">
        <button id="loadGalleryBtn">Show photos</button>
      </div>
      <div id="photo-container" class="photo-container"></div>
      <div class="gallery" id="gallery-container"></div>
    </div>
  `;

  const loadGalleryBtn = document.getElementById('loadGalleryBtn');
  loadGalleryBtn.addEventListener('click', loadGallery);

  // Функция для загрузки галереи
  function loadGallery() {
    const dateInput = document.getElementById('date-picker').value;
    if (!dateInput) {
      alert('Please, select a date.');
      return;
    }

    const formattedDate = dateInput.split('-').join('/');
    const galleryContainer = document.getElementById('gallery-container');
    const photoContainer = document.getElementById('photo-container');

    galleryContainer.innerHTML = '<p>Loading images...</p>';
    photoContainer.innerHTML = '';

    fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${dateInput}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        galleryContainer.innerHTML = '';
        if (data.length === 0) {
          galleryContainer.innerHTML = '<p>No images for this date.</p>';
          return;
        }

        const firstImage = data[0].image;
        const firstImageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${firstImage}.jpg`;
        showLargeImage(firstImageUrl, data[0].date);

        data.slice(1, 13).forEach(item => {
          const image = item.image;
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${image}.jpg`;

          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;
          imgElement.alt = "NASA EPIC Photo";
          imgElement.title = `Image taken on ${item.date}`;

          imgElement.onclick = () => showLargeImage(imageUrl, item.date);

          galleryContainer.appendChild(imgElement);
        });
      })
      .catch(error => {
        galleryContainer.innerHTML = '<p>Error loading gallery.</p>';
        console.error('Error loading gallery:', error);
      });
  }

  // Функция для отображения крупного изображения
  function showLargeImage(imageUrl, date) {
    const photoContainer = document.getElementById('photo-container');
    photoContainer.innerHTML = '';

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = "NASA EPIC Photo";
    imgElement.title = `Image taken on ${date}`;

    photoContainer.appendChild(imgElement);

    if (!document.getElementById('closeGalleryBtn')) {
      addCloseGalleryButton();
    }
  }

  // Функция для добавления кнопки закрытия
  function addCloseGalleryButton() {
    const closeGalleryBtn = document.createElement('button');
    closeGalleryBtn.id = 'closeGalleryBtn';
    closeGalleryBtn.className = 'close-gallery';
    closeGalleryBtn.textContent = '×';

    const photoContainer = document.getElementById('photo-container');
    photoContainer.appendChild(closeGalleryBtn);

    closeGalleryBtn.addEventListener('click', closeGallery);
  }

  // Функция для закрытия галереи
  function closeGallery() {
    mainContent.innerHTML = `
      <h1 class="main__content-heading">SPACE GAZE</h1>
      <p class="main__content-paragraph">
        Some info about how great your website is.
      </p>
    `;
  }
}
