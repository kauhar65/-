class Header {
    // Метод для открытия страницы корзины
    handleShoppingOpenPage() {
            shoppingPage.render(); // Вызов метода render() класса Shopping для отображения корзины
        }
        // Метод для отображения верхней части страницы
    render(counter) {
        // Генерация HTML для верхней части страницы
        const html = `
        <div class="header__container" onclick="headerPage.handleShoppingOpenPage()">
        <nav class="nav">
            <div class="nav-list">
                <img class="nav-list-logo" src="./img/logo.svg" alt="logotip">
                <ul class="nav-list-menu">
                    <li class="nav-list-menu-item">
                        <a href="/index.html">ГЛАВНАЯ</a>
                    </li>
                    <li class="nav-list-menu-item">
                        <a href="/catalog.html">КАТАЛОГ</a>
                    </li>
                    <li class="nav-list-menu-item">
                        <a href="#">О НАС</a>
                    </li>
                    <li class="nav-list-menu-item">
                        <a href="#">ГАЛЕРЕЯ</a>
                    </li>
                    <li class="nav-list-menu-item">
                        <a href="#">КОНТАКТЫ</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="nav__basket">
            <h3>🧑🏿</h3>
            <div class="basket-radius">
                <span>${counter}</span>
                <!-- Счетчик продуктов в корзине -->
            </div>
        </div>
      `;
        // Установка сгенерированного HTML в корневой элемент верхней части страницы
        ROOT_HEADER.innerHTML = html;
    }
}
const headerPage = new Header(); // Создание экземпляра класса Header
// Получение списка продуктов из локального хранилища и отображение верхней части страницы с счетчиком продуктов
const productsStore = localStorageUtil.getProducts();
headerPage.render(productsStore.length);