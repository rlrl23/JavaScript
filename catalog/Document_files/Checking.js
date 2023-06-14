
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

        }
        else {
            myBasket.products[prod] = count;

            /*document.querySelector('.basket_products').appendChild(create_mini_card(prod, count));
            document.getElementsByClassName('basket_products')[0].style.display = '';*/

        }
        var parag = document.querySelector('#basket_count');
        parag.innerHTML = 'В корзине товаров - ' + myBasket.countProduct() + ', на общую сумму - ' + myBasket.basketPrice() + ' руб.';

        document.getElementById('buy_all').style.display = '';
    },
    delProduct: function (prod, count) {
        if (count == myBasket.products[prod]) {
            delete myBasket.products[prod];
            console.log(myBasket.products);
            document.querySelector('#in_basket_' + prod).remove();
        }
        else {
            myBasket.products[prod] -= count;
            change_mini_card(prod);
        }
    },
    countProduct: function () {
        if (Object.keys(this.products).length > 0)
            return Object.keys(this.products).length;
        else {
            return 0;
        }
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
        document.querySelector('.catalog').appendChild(card);
    }
}
function create_basket() {

    var nav = document.createElement('div');
    nav.className = 'nav';
    var str = "<img src='basket.png'>";

    if (Object.keys(myBasket.products).length == 0) {
        str += '<p class="count" id="basket_count">Корзина пуста</p>'
        nav.innerHTML = str;
        document.querySelector('.basket').appendChild(nav);
        create_button_buy();
        document.getElementById('buy_all').style.display = 'none';
    }
    else {
        str += '<p class="count" id="basket_count"> В корзине товаров - ' + myBasket.countProduct() + '\n';
        str += 'на общую сумму - ' + myBasket.basketPrice() + ' руб. </p > ';
        str += ' <button type="button" id="buy_all">Купить</button>'
        nav.innerHTML = str;
        document.querySelector('.basket').appendChild(nav);
    }

    var basket_products = document.createElement('div');
    basket_products.className = 'basket_products';
    document.querySelector('.basket').appendChild(basket_products);
}
function create_mini_cards(basket_list) {

    for (product in myBasket.products) {
        var str = '<img src="' + product + '.jpg" alt="' + product + '">';
        str += '<h3>' + product + '</h3>';
        str += '<p class="count" id="in_basket_' + product + 'count">' + myBasket.products[product] + ' кг.</p>';
        str += ' <button type="button" id="' + product + '" class="add" >Добавить</button ><button type="button" id="' + product + '" class="delete">Удалить</button>';
        var card = document.createElement('div');
        card.className = ' mini card';
        card.id = 'in_basket_' + product;
        card.innerHTML = str;
        basket_list.appendChild(card);
    }

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

    document.querySelector('.nav').addEventListener('click', function (event) {
        if (event.target.tagName == 'IMG') { create_basket_page(); }
        else { return }
    });
}
function create_basket_page() {
    function close(closeImg) { closeImg.parentElement.remove(); }

    var basket_page = document.createElement('div');
    basket_page.className = 'back';

    var heading = document.createElement('h1');
    heading.textContent = 'Состав корзины';
    basket_page.appendChild(heading);

    var basket_list = document.createElement('div');
    basket_list.classList.add = 'gallery__image';
    basket_page.appendChild(basket_list);
    create_mini_cards(basket_list);

    var total = document.createElement('p');
    total.className = 'count';
    total.textContent = 'В корзине товаров - ' + myBasket.countProduct() + '\n на общую сумму - ' + myBasket.basketPrice() + ' руб.'
    basket_list.appendChild(total);

    basket_page.appendChild(basket_list);

    var button_next = document.createElement('button');
    button_next.id = 'next';
    button_next.textContent = 'Далее';
    button_next.addEventListener('click', () => {
        basket_list.remove();
        create_adress_list(heading);
    })
    basket_list.appendChild(button_next);

    var button_close = new Image();
    button_close.classList.add('gallery__close');
    button_close.src = 'close.png';
    button_close.addEventListener('click', (event) => {
        close(event.target);
    });
    basket_page.appendChild(button_close);

    document.querySelector('body').appendChild(basket_page);


    basket_list.addEventListener('click', function (event) {
        if (event.target.tagName == 'BUTTON' && event.target.className == 'add') {
            myBasket.addProduct(String(event.target.id), 1);
            change_mini_card(String(event.target.id));
            total.textContent = 'В корзине товаров - ' + myBasket.countProduct() + ', на общую сумму - ' + myBasket.basketPrice() + ' руб.';
        }
        else if (event.target.tagName == 'BUTTON' && event.target.className == 'delete') {
            myBasket.delProduct(String(event.target.id), 1);
            total.textContent = 'В корзине товаров - ' + myBasket.countProduct() + ', на общую сумму - ' + myBasket.basketPrice() + ' руб.';
        }
    });
    function create_adress_list(heading) {
        heading.textContent = 'Адрес доставки';
        var adress_list = document.createElement('div');
        basket_page.appendChild(adress_list);
        str = '<h3>Доставка осуществлятся только по городу Екатеринбург</h3>';
        /*function create_fields(street) {
            var field = document.createElement('div');
            field.className = 'field';
            adress_list.appendChild(field);
            label = document.createElement('label');
            label.textContent = '"' + street + '"';
            field.appendChild(label);
            var input = document.createElement('input');
            input.type = 'text';
            input.name = street;
            field.appendChild(input);
        }
        create_fields('street');
        create_fields('building');
        create_fields('flat');
        create_fields('telephone');

        var street = document.createElement('input');
        street.type = text;*/
        str += '<div class="field"><label>Улица</label><input type="text" name="street"></div>';
        str += '<div class="field"><label>Дом</label><input type="text" name="building"></input></div>';
        str += '<div class="field"><label>Квартира</label><input type="text" name="flat"></input></div>';
        str += '<div class="field"><label>Номер телефона</label><input type="tel" name="tel" pattern=\+7\-[0-9]{3}\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}></input></div>';
        str += '<h3>Cтоимость доставки - 100 руб. В отдаленные районы - 300 руб.</h3>';
        adress_list.innerHTML = str;

        /* var order = {
             'adress': (input['street'].value()),
             'products_list': myBasket.products,
             'total_price': myBasket.price,
         }
         console.log(order);*/

        var button_next = document.createElement('button');
        button_next.id = 'next';
        button_next.textContent = 'Далее';
        button_next.addEventListener('click', () => {
            console.log(document.querySelector('#sreet'));
            console.log(document.querySelector('input').value);
            //adress_list.remove();
            //create_comments_list(heading);
        })
        adress_list.appendChild(button_next);
    }



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
        modalImageCloseSrc: 'close.png',
    });
});

