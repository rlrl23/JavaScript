
let catalog = {
    price: {
        'apple': 110, 'potato': 50, 'icecream': 350, 'tomato': 220
    },
    products: { 'apple': 10, 'potato': 50, 'icecream': 10, 'tomato': 5 }
};

let myBasket = {
    products: {},
    basketPrice: function () {
        var sum = 0;
        for (var val in this.products) {
            sum += catalog.price[val] * this.products[val];
        } return sum;
    },
    addProduct: function (prod, count) {

        if (prod in myBasket.products) {
            myBasket.products[prod] += count;
            change_mini_card(prod);

        }
        else {
            myBasket.products[prod] = count;

            document.querySelector('.basket_products').appendChild(create_mini_card(prod, count));
            document.getElementsByClassName('basket_products')[0].style.display = '';

        }
        var parag = document.querySelector('.count');
        parag.innerHTML = 'В корзине товаров - ' + myBasket.countProduct() + ', на общую сумму - ' + myBasket.basketPrice() + ' руб.';

        document.getElementById('buy_all').style.display = '';
    },
    delProduct: function (prod, count) {
        catalog.products[prod] += count;
        myBasket.products[prod] -= count;
        if (count >= myBasket.products[prod]) {
            delete myBasket.products[prod];
        }
    },
    countProduct: function () {
        if (Object.keys(this.products).length > 0)
            return Object.keys(this.products).length;
    },
    makeEmpty: function () {
        alert('Поздравляю с покупкой!');
        myBasket.products = {};
        console.log(myBasket.products);
        document.querySelector('.count').innerHTML = 'Корзина пуста';
        document.getElementById('buy_all').style.display = 'none';
        document.getElementsByClassName('basket_products')[0].style.display = 'none';

    }
};

function create_catalog(products) {
    function create_card(product, price) {
        var str = '<img src="' + product + '_mini.jpg" data-full-image-url="' + product + '.jpg" alt="' + product + '">';
        str += '<h3>' + product + '</h3>';
        str += '<p class="price">' + price + ' руб.</p>'
        str += ' <button type="button" id="' + product + '" class="add">В корзину</button>'
        return str;
    }
    for (var product in products) {
        var price = products[product];
        var card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = create_card(product, price);
        var box = document.querySelector('.box');
        document.querySelector('.catalog').appendChild(card);
    }
}
function create_basket() {

    var nav = document.createElement('div');
    nav.className = 'nav';
    var str = "<img src='basket.png'></img>";

    if (Object.keys(myBasket.products).length == 0) {
        str += '<p class="count">Корзина пуста</p>'
        nav.innerHTML = str;
        document.querySelector('.basket').appendChild(nav);
        create_button_buy();
        document.getElementById('buy_all').style.display = 'none';
    }
    else {
        str += '<p class="count"> В корзине товаров - ' + myBasket.countProduct() + '\n';
        str += 'на общую сумму - ' + myBasket.basketPrice() + ' руб. </p > ';
        str += ' <button type="button" id="buy_all">Купить</button>'
        nav.innerHTML = str;
        document.querySelector('.basket').appendChild(nav);
    }

    var basket_products = document.createElement('div');
    basket_products.className = 'basket_products';
    document.querySelector('.basket').appendChild(basket_products);
}
function create_mini_card(product, count) {
    var str = '<img src="' + product + '.jpg" alt="' + product + '">';
    str += '<h3>' + product + '</h3>';
    str += '<p class="count" id="in_basket_' + product + 'count">' + count + ' кг.</p>';
    str += ' <button type="button" id="' + product + '" class="add" >Добавить</button ><button type="button" id="' + product + '" class="delete">Удалить</button>';
    var card = document.createElement('div');
    card.className = ' mini card';
    card.id = 'in_basket_' + product;
    card.innerHTML = str;
    return card;
}
function change_mini_card(product) {
    return document.querySelector('#in_basket_' + product + 'count').textContent = myBasket.products[product] + ' кг.';

}
function create_button_buy() {
    var buy_all = document.createElement('button');
    buy_all.id = 'buy_all';
    buy_all.textContent = 'Купить';
    document.querySelector('.nav').appendChild(buy_all);
}

function click_button() {

    for (product in catalog.price) {

        document.querySelector('#' + product).addEventListener('click',
            function (event) { myBasket.addProduct(String(event.target.id), 1); });
    }
    document.querySelector('#buy_all').addEventListener('click', myBasket.makeEmpty);

}

function init() {
    create_catalog(catalog.price);
    create_basket(myBasket.products);

    click_button();
}
window.onload = init;

const gallery = {
    settings: {
        galleryMainContainer: '.galleryContainer',
        previewSelector: '.card',
        modalImageContainer: 'gallery__modal',
        modalImageClass: 'gallery__image',
        modalImageScreen: 'gallery__screen',
        modalImageClose: 'gallery__close',
        modalImageCloseSrc: 'close.png',
    },

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        const galleryContainer = document.querySelector(this.settings.previewSelector);
        galleryContainer.addEventListener('click', (event) => this.containerClickHandler(event));
    },

    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') {
            return;
        }

        this.createGalleryModal(event.target);
    },

    createGalleryModal(img) {
        const galleryModal = document.createElement('div');
        galleryModal.classList.add(this.settings.modalImageContainer);

        const galleryScreen = document.createElement('div');
        galleryScreen.classList.add(this.settings.modalImageScreen);
        galleryModal.appendChild(galleryScreen);

        const galleryClose = new Image();
        galleryClose.classList.add(this.settings.modalImageClose);
        galleryClose.src = this.settings.modalImageCloseSrc;
        galleryClose.addEventListener('click', (event) => {
            this.close(event.target);
        });
        galleryModal.appendChild(galleryClose);

        const galleryImage = new Image();
        galleryImage.classList.add(this.settings.modalImageClass);
        galleryImage.src = img.dataset.fullImageUrl;
        galleryModal.appendChild(galleryImage);

        document.querySelector(this.settings.galleryMainContainer).appendChild(galleryModal);
    },

    close(closeImg) {
        closeImg.parentElement.remove();
    }
};

window.addEventListener('load', () => {
    gallery.init({
        galleryMainContainer: 'body',
        previewSelector: '.catalog',
        modalImageScreen: 'gallery__back',
        modalImageCloseSrc: 'close_.png',
    });
});

