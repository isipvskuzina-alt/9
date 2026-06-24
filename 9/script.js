// ========================================
// 1. ДАННЫЕ
// ========================================

let images = [];

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const imageUrlInput = document.getElementById('imageUrl');
const imageTitleInput = document.getElementById('imageTitle');
const addBtn = document.getElementById('addBtn');
const galleryContainer = document.getElementById('galleryContainer');
const emptyMessage = document.getElementById('emptyMessage');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadImages() {
    try {
        const saved = localStorage.getItem('galleryImages');
        if (saved) {
            images = JSON.parse(saved);
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

function saveImages() {
    try {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ========================================
// 4. РЕНДЕРИНГ
// ========================================

function renderGallery() {
    // Очищаем контейнер
    galleryContainer.innerHTML = '';
    
    // Проверяем, есть ли изображения
    if (images.length === 0) {
        emptyMessage.style.display = 'block';
        galleryContainer.style.display = 'none';
        return;
    }
    
    emptyMessage.style.display = 'none';
    galleryContainer.style.display = 'grid';
    
    // Создаём карточки
    images.forEach((image, index) => {
        const card = createCard(image, index);
        galleryContainer.appendChild(card);
    });
}

// ========================================
// 5. СОЗДАНИЕ КАРТОЧКИ (createElement)
// ========================================

function createCard(image, index) {
    // Создаём элементы
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';
    
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.title || 'Изображение';
    img.loading = 'lazy'; // Ленивая загрузка
    
    // Обработка ошибки загрузки
    img.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23ddd"/%3E%3Ctext x="100" y="110" text-anchor="middle" font-size="40" fill="%23999"%3E🖼️%3C/text%3E%3C/svg%3E';
        this.alt = 'Ошибка загрузки';
    };
    
    const info = document.createElement('div');
    info.className = 'info';
    
    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = image.title || 'Без названия';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteImage(index);
    });
    
    // Собираем карточку
    wrapper.appendChild(img);
    card.appendChild(wrapper);
    info.appendChild(title);
    info.appendChild(deleteBtn);
    card.appendChild(info);
    
    return card;
}

// ========================================
// 6. ДОБАВЛЕНИЕ ИЗОБРАЖЕНИЯ
// ========================================

function addImage() {
    const url = imageUrlInput.value.trim();
    const title = imageTitleInput.value.trim();
    
    // Проверяем URL
    if (!url) {
        alert('Введите ссылку на изображение!');
        imageUrlInput.focus();
        return;
    }
    
    // Простая проверка URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('Введите корректную ссылку (начинается с http:// или https://)');
        imageUrlInput.focus();
        return;
    }
    
    // Добавляем изображение
    images.push({
        url: url,
        title: title || 'Без названия',
        addedAt: new Date().toISOString()
    });
    
    // Сохраняем и обновляем
    saveImages();
    renderGallery();
    
    // Очищаем поля
    imageUrlInput.value = '';
    imageTitleInput.value = '';
    imageUrlInput.focus();
    
    console.log(` Добавлено изображение: ${title || 'Без названия'}`);
}

// ========================================
// 7. УДАЛЕНИЕ ИЗОБРАЖЕНИЯ
// ========================================

function deleteImage(index) {
    // Получаем карточку для анимации
    const cards = galleryContainer.querySelectorAll('.card');
    const card = cards[index];
    
    if (card) {
        // Добавляем класс для анимации удаления
        card.classList.add('removing');
        
        // Удаляем после анимации
        setTimeout(() => {
            images.splice(index, 1);
            saveImages();
            renderGallery();
            console.log(` Удалено изображение`);
        }, 300);
    } else {
        images.splice(index, 1);
        saveImages();
        renderGallery();
    }
}

// ========================================
// 8. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log(' Запуск галереи');
    
    // Загружаем сохранённые изображения
    const hasSaved = loadImages();
    
    if (hasSaved) {
        console.log(` Загружено ${images.length} изображений`);
    } else {
        console.log(' Новая галерея');
    }
    
    // Рендерим галерею
    renderGallery();
    
    // Обработчики
    addBtn.addEventListener('click', addImage);
    
    // Добавление по Enter в любом поле
    imageUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            imageTitleInput.focus();
        }
    });
    
    imageTitleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addImage();
        }
    });
    
    console.log(' Галерея готова!');
}

// ========================================
// 9. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);