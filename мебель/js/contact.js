// Константы для токена и идентификатора чата в Telegram
const TELEGRAM_BOT_TOKEN = '6998044879:AAEWrmS5OT93ycisVFRR43o3LpFu0P93N_M';
const TELEGRAM_CHAT_ID = '@formgr';

// URL API для отправки сообщений в Telegram
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// Функция для отправки данных формы в Telegram через API
async function sendEmailTelegram(event) {
    event.preventDefault(); // Предотвращает стандартное поведение отправки формы.

    // Выбор элементов формы
    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button'); // Элемент кнопки для отправки формы
    const formSendResult = document.querySelector('.form__send-result'); // Элемент для отображения результата отправки формы

    formSendResult.textContent = ''; // Очистить любое предыдущее сообщение о результате

    // Извлечение данных формы с помощью API FormData
    const { name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());

    // Формирование текста сообщения для отправки в Telegram
    const text = `Заявка от ${name}\nEmail: ${email}\nТелефон: ${phone}\nПасспортные данные: ${pass}`;

    try {
        formBtn.textContent = 'Загрузка...'; // Указывает, что отправка формы находится в процессе

        // Отправка данных в API Telegram с использованием fetch
        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        });

        // Обработка ответа от API Telegram
        if (response.ok) {
            // Отображение сообщения об успешной отправке, если ответ положительный
            formSendResult.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
            form.reset(); // Сброс формы после успешной отправки
        } else {
            // Выброс ошибки, если ответ неудачный
            throw new Error(response.statusText);
        }

    } catch (error) {
        // Обработка ошибок, возникших во время отправки формы
        console.error(error); // Журналирование ошибки в консоли для отладки
        formSendResult.textContent = 'Анкета не отправлена! Попробуйте позже.'; // Отображение сообщения об ошибке пользователю
        formSendResult.style.color = 'red'; // Установка цвета текста сообщения об ошибке на красный

    } finally {
        // Возвращение текста кнопки отправки к исходному состоянию
        formBtn.textContent = 'Отправить';
    }
}