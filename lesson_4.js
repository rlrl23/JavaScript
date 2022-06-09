//1 Число в объект 
function number_by_words() {
    var number = prompt('Введите число от 0 до 999');
    var result = {};
    var count = 0;
    for (var num = number.length - 1; num >= 0; --num) {
        if (Number.isInteger(Number.parseInt(number[num]))) {
            count++
            switch (count) {
                case 1:
                    result['единицы'] = number[num];
                    break;
                case 2:
                    result['десятки'] = number[num];
                    break;
                case 3:
                    result['сотни'] = number[num];
                    break;
                case 4:
                    alert('число превышает 999');
                    result = {};
                    break;
            }
        } else {
            alert('Введено не число');
            result = {};
            break;
        }

    } console.log(result);
}
number_by_words();

//2 and 3
let catalog = {
    price: {
        'apple': 110, 'potato': 50, 'icecream': 350, 'tomato': 220
    },
    products: { 'apple': 10, 'potato': 50, 'icecream': 10, 'tomato': 5 }
};
let myBasket = {
    products: { 'apple': 1, 'potato': 0.5, 'icecream': 2 },
    basketPrice: function () {
        var sum = 0;
        for (var val in this.products) {
            sum += catalog.price[val] * this.products[val];
        } return ('В корзине товаров на сумму ' + sum + ' руб');
    },
    addProduct: function (prod, count) {
        if (catalog.products[prod] < count) {
            console.log('Этого товара осталось ' + catalog.products[prod]);
        }
        else {
            catalog.products[prod] -= count;
            if (prod in myBasket.products) {
                myBasket.products[prod] += count;
            }
            else {
                myBasket.products[prod] = count;
            }
        }
    },
    delProduct: function (prod, count) {
        catalog.products[prod] += count;
        myBasket.products[prod] -= count;
        if (count >= myBasket.products[prod]) {
            delete myBasket.products[prod];
        }
    }
};
console.log(myBasket.basketPrice());
console.log(catalog.price);
console.log(myBasket.products);
myBasket.addProduct('apple', 2);
console.log(myBasket.products);
myBasket.delProduct('apple', 3);
console.log(myBasket.products);
console.log(myBasket.basketPrice());
console.log(catalog.products);