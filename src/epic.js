document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'UbtvovgnoY8bvWMl7xv4zXR92dnaVMNPJYAt0OzA';
  
    const routes = {
      spaceGaze: {
        content: `
          <h1 class="main__content-heading">SPACE GAZE</h1>
          <p class="main__content-paragraph">Some info about how great your website is</p>
        `,
        script: null,
        style: null
      },
      epic: {
        content: `
          <div class="sidebar">
            <h2>Select a date</h2>
            <input type="date" id="date-picker" class="calendar">
            <button id="loadGalleryBtn">Show photos</button>
          </div>
          <div class="main-content">
            <h1>NASA EPIC Photo Gallery</h1>
            <div id="photo-container"></div>
            <div class="gallery" id="gallery-container"></div>
          </div>
        `,
        script: null,
        style: './src/epic.css'
      }
    };
  
    const navLinks = document.querySelectorAll('.header__nav__list-item a');
    const mainContent = document.getElementById('main-content');
  
    // Подгрузка стилей с проверкой на дублирование
    function loadStylesheet(href) {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          document.head.appendChild(link);
        }
      }
  
    // Обработчик кликов по навигации
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
  
        const route = event.target.getAttribute('data-route');
  
        if (routes[route]) {
          // Замена контента главной страницы на epic
          mainContent.innerHTML = routes[route].content;
  
          // Загружаем стили (если нужны)
          if (routes[route].style) {
            loadStylesheet(routes[route].style);
          }
  
          // Добавляем функционал для загрузки галереи страницы EPIC
          if (route === 'epic') {
            const loadGalleryBtn = document.getElementById('loadGalleryBtn');
            loadGalleryBtn.removeEventListener('click', loadGallery);
            loadGalleryBtn.addEventListener('click', loadGallery);
          }
        }
      });
    });
  
    // Функция загрузки галереи EPIC с прокруткой наверх и индикатором загрузки
    function loadGallery() {
      const dateInput = document.getElementById('date-picker').value;
      if (!dateInput) {
        alert('Please, select a date.');
        return;
      }
  
      const formattedDate = dateInput.split('-').join('/');
      const galleryContainer = document.getElementById('gallery-container');
      const photoContainer = document.getElementById('photo-container');
      galleryContainer.innerHTML = '<p>Loading images...</p>'; // Индикатор загрузки
      photoContainer.innerHTML = '';  // Очистка контейнера для большой фотографии
  
      // Прокрутка страницы к верхней части при отображении галереи
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  
      fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${dateInput}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          galleryContainer.innerHTML = ''; // Очистка галереи после загрузки данных
          if (data.length === 0) {
            galleryContainer.innerHTML = '<p>No images for this date.</p>';
            return;
          }
  
          // Отображение первой (последней) фотографии большого размера
          const firstImage = data[0].image;
          const firstImageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${firstImage}.jpg`;
          const largeImageElement = document.createElement('img');
          largeImageElement.src = firstImageUrl;
          largeImageElement.alt = "NASA EPIC Photo";
          largeImageElement.title = `Image taken on ${data[0].date}`;
          photoContainer.appendChild(largeImageElement);
  
          // Отображение 12(если есть) предыдущих изображений в галерее за выбранную дату 
          data.slice(1, 13).forEach(item => {
            const image = item.image;
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/jpg/${image}.jpg`;
  
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "NASA EPIC Photo";
            imgElement.title = `Image taken on ${item.date}`;
  
            // Обработчик клика, чтобы обновить большую фотографию (последнее фото, сделанное сервисом epic)
            imgElement.onclick = () => showLargeImage(imageUrl, item.date);
  
            galleryContainer.appendChild(imgElement);
          });
        })
        .catch(error => {
          galleryContainer.innerHTML = '<p>Error loading gallery.</p>';
          console.error('Ошибка при загрузке галереи:', error);
        });
    }
  
    // Функция для отображения большой фотографии (последнее фото, сделанное сервисом epic) при клике
    function showLargeImage(imageUrl, date) {
      const photoContainer = document.getElementById('photo-container');
      photoContainer.innerHTML = '';  // Очистка контейнера
  
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = "NASA EPIC Photo";
      imgElement.title = `Image taken on ${date}`;
  
      photoContainer.appendChild(imgElement);
    }
  });
  