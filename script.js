document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".menu-btn");
    const sections = document.querySelectorAll(".code-section");

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const targetId = event.target.getAttribute("data-target");

            buttons.forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add("active");
                } else {
                    section.classList.remove("active");
                }
            });
        });
    });

    // По умолчанию отображаем секцию "Home"
    document.querySelector(".menu-btn[data-target='home-section']").click();
});

// Функция для форматирования даты в формате день.месяц.год
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Функция для проверки времени
function checkTimeZone() {
    const workingHoursStart = 9; // Начало рабочего времени в МСК
    const workingHoursEnd = 18; // Конец рабочего времени в МСК

    const moscowDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }));
    const localDate = new Date();

    const formattedMoscowTime = formatDate(moscowDate);
    const formattedLocalTime = formatDate(localDate);

    const moscowHours = moscowDate.getHours();

    let message = `Московское время: ${formattedMoscowTime}\nВаше местное время: ${formattedLocalTime}\n`;

    if (moscowHours >= workingHoursStart && moscowHours < workingHoursEnd) {
        return true; // В рабочие часы
    } else {
        message += "В данный момент в Москве нерабочие часы. Пожалуйста, попробуйте позже.";
        showModal(message);
        return false; // Не рабочие часы
    }
}

// Функция для отображения модального окна
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');

    modalMessage.innerHTML = message.replace(/\n/g, '<br>');
    modal.style.display = 'flex';

    // Добавляем обработчик закрытия модального окна
    const toolbarButtons = document.querySelectorAll("#modal .toolbar .btn");
    toolbarButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = 'none';
        });
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

// Обработчик кнопки "Позвонить"
function handleCallButtonClick(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки
    const isWorkingHours = checkTimeZone();
    if (!isWorkingHours) {
        showModal("В данный момент в Москве нерабочие часы. Пожалуйста, попробуйте позже.");
    }
}

// Добавляем обработчик к кнопке "Позвонить" в секции контактов
document.addEventListener("DOMContentLoaded", () => {
    const callButton = document.getElementById("call-button");
    if (callButton) {
        callButton.addEventListener("click", handleCallButtonClick);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const mapButton = document.getElementById("map-button");
    if (mapButton) {
        mapButton.addEventListener("click", () => {
            const yandexMapsUrl = 'https://yandex.ru/maps/?text=Москва';
            window.open(yandexMapsUrl, '_blank');
        });
    }
});