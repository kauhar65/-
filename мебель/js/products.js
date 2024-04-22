class Products {
    constructor() {
            // Определение CSS классов и меток кнопок
            this.classNameActive = 'products__element--btn-active';
            this.labelAdd = 'Добавить в корзину';
            this.labelRemove = 'Убрать из корзины';
        }
        // Метод для добавления или удаления продукта из корзины
    handleLocalStore(element, id) {
            // Вызываем метод putProducts из объекта localStorageUtil для добавления или удаления продукта
            const { pushProducts, products } = localStorageUtil.putProducts(id);
            // Обновляем текст кнопки и добавляем/удаляем класс активности в зависимости от действия
            if (pushProducts) {
                element.innerHTML = this.labelRemove;
                element.classList.add(this.classNameActive);
            } else {
                element.innerHTML = this.labelAdd;
                element.classList.remove(this.classNameActive);
            }
            // Перерисовываем заголовок страницы для отображения обновленного количества продуктов в корзине
            headerPage.render(products.length);
        }
        // Метод для отображения списка продуктов на странице
    render() {
        const productsStore = localStorageUtil.getProducts(); // Получаем список продуктов из локального хранилища
        let htmlCatalog = ''; // Переменная для хранения HTML разметки продуктов
        // Проходим по каждому продукту из каталога
        CATALOG.forEach(({ id, name, img, price }) => {
            let activeClass = '';
            let activeText = '';
            // Проверяем, добавлен ли продукт в корзину, и устанавливаем соответствующий текст и класс кнопки
            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeText = this.labelRemove;
                activeClass = " " + this.classNameActive;
            }

            // Формируем HTML-разметку для каждого продукта
            htmlCatalog += `
          <li class="products__element">
            <img class="products__element--img" src="${img}" />
            <h4 class="products__element--name">${name}</h4>
            <div class="products__element--footer">
              <p class="products__element--price">${price.toLocaleString()} сом.</p>
              <button 
                class="products__element--btn${activeClass}"
                onclick="productsPage.handleLocalStore(this, '${id}')"
              >${activeText}</button>
            </div>
          </li>
        `;
        });

        // Формируем HTML-разметку для контейнера продуктов и устанавливаем его в качестве содержимого ROOT_PRODUCTS
        const html = `
        <ul class="products__container">
          ${htmlCatalog}
        </ul>
      `;
        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products(); // Создаем экземпляр класса Products
productsPage.render(); // Вызываем метод render для отображения списка продуктов на странице