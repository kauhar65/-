class LocalStorageUtil {
    constructor() {
            this.keyName = 'products'; // Устанавливаем ключ для хранения данных о продуктах в локальном хранилище
        }
        // Метод для получения данных о продуктах из локального хранилища
    getProducts() {
            const productsLocalStorage = localStorage.getItem(this.keyName); // Получаем данные из локального хранилища     
            if (productsLocalStorage != null) {
                return JSON.parse(productsLocalStorage); // Если данные есть, преобразуем строку JSON в объект JavaScript
            }
            return []; // Если данных нет, возвращаем пустой массив
        }
        // Метод для добавления или удаления ID продукта из локального хранилища
    putProducts(id) {
        let products = this.getProducts(); // Получаем текущий список продуктов из локального хранилища
        let pushProducts = false; // Флаг, который указывает, добавлен ли продукт или удален

        const index = products.indexOf(id); // Проверяем, есть ли ID продукта в списке

        if (index === -1) {
            products.push(id); // Если ID продукта не найден, добавляем его в список
            pushProducts = true; // Устанавливаем флаг, что продукт был добавлен
        } else {
            products.splice(index, 1); // Если ID продукта найден, удаляем его из списка
        }

        localStorage.setItem(this.keyName, JSON.stringify(products)); // Обновляем данные о продуктах в локальном хранилище

        return { pushProducts, products }; // Возвращаем информацию о том, был ли продукт добавлен или удален, и обновленный список продуктов
    }
}
const localStorageUtil = new LocalStorageUtil(); // Создаем экз