class Shopping {
    render() {
        const productsStore = localStorageUtil.getProducts(); // Получаем список продуктов из локального хранилища
        let htmlCatalog = ''; // Переменная для хранения HTML-кода продуктов в корзине
        let sumCatalog = 0; // Переменная для хранения суммы стоимости продуктов в корзине

        // Перебираем каждый продукт из каталога
        CATALOG.forEach(({ id, name, price }) => {
            if (productsStore.indexOf(id) !== -1) {
                // Если продукт присутствует в корзине, генерируем HTML-код для строки таблицы с его данными
                htmlCatalog += `
            <tr>
              <td class="shopping__element--name">${name}</td>
              <td class="shopping__element--price">${price}Сом</td>
            </tr>
          `;
                sumCatalog += price; // Увеличиваем сумму стоимости продуктов в корзине
            }
        });

        // Формируем HTML для содержимого корзины
        const html = `
        <div class="shopping__container">
          <div class="shopping__close" onclik="shoppingPage.closeShopping">
            <a href="./catalogg.html">
            <img src="./img/cancel_close_delete_exit_logout_remove_x_icon_123217.png" alt="">
            </a>
          </div>
          <table>
            ${htmlCatalog} <!-- Вставляем HTML-код продуктов в корзине -->
            <tr>
              <td class="shopping__element--name">Сумма:</td>
              <td class="shopping__element--price">${sumCatalog.toLocaleString()}Сом</td>
            </tr>
          </table>
        </div>
      `;

        // Устанавливаем сформированный HTML в корневой элемент корзины
        ROOT_SHOPPING.innerHTML = html;
    }
}

// Создаем экземпляр класса Shopping для управления отображением корзины на странице
const shoppingPage =  new  Shopping();