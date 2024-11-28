document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = navLinks.querySelectorAll('a'); // Все ссылки внутри навигации
    const sections = document.querySelectorAll('section'); // Все разделы
    const logo = document.querySelector('.logo'); // Логотип

    // Переключение отображения меню и анимации
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылки + плавный скролл
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const targetId = link.getAttribute('href').substring(1); // Получаем ID раздела
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Плавный скролл
                    block: 'start' // Начинаем скроллить от верхней границы раздела
                });

                // Закрытие бургер-меню после клика
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        });
    });

    // Скролл к главному экрану при клике на логотип
    logo.addEventListener('click', (event) => {
        event.preventDefault(); // Предотвращаем переход по ссылке
        window.scrollTo({
            top: 0, // Скроллим к самому верху
            behavior: 'smooth' // Плавный скролл
        });

        // Закрытие бургер-меню (если открыто)
        navLinks.classList.remove('active');
        burgerMenu.classList.remove('active');
    });

    // Отслеживание активного раздела при скролле
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50; // Добавляем небольшой отступ
            if (pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        // Устанавливаем активный класс для текущей ссылки
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // ==========================
    // Портфолио: фильтрация с анимацией и модальное окно
    // ==========================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const modalDesc = document.querySelector('.modal-description');
    const modalClose = document.querySelector('.modal-close');

    // Фильтрация работ с анимацией
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-filter');

            // Активная кнопка
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            // Анимация скрытия и отображения карточек
            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden'); // Убираем скрытие
                    setTimeout(() => item.style.display = 'block', 300); // Плавно отображаем
                } else {
                    item.classList.add('hidden'); // Добавляем класс для скрытия
                    setTimeout(() => item.style.display = 'none', 300); // Полностью скрываем
                }
            });
        });
    });

    // Открытие модального окна
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('video').src;
            const description = item.querySelector('h3').textContent;

            modalImg.src = imgSrc;
            modalDesc.textContent = description;

            modal.classList.add('active');
        });
    });

    // Закрытие модального окна
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
