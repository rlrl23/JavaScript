//1 С помощью цикла while вывести все простые числа в промежутке от 0 до 100
function aratosfen() {
    var res = [];
    for (var i = 0; i <= 100; i++) {
        res.push(i);
    }
    res[1] = 0;
    for (var i = 0; i <= 100; i++) {
        if (res[i] != 0) {
            var k = i * 2;
            while (k <= 100) {
                res[k] = 0;
                k += i;

            }
        }
    }
    for (var i = 0; i <= 100; i++) {
        if (res[i] != 0) {
            console.log(res[i])
        }
    }
}
aratosfen();

//2 and 3
var myBasket = { 'apple': 1, 'potato': 0.5, 'icecream': 2 };

function countBasketPrice(myBasket) {
    var sum = 0;
    for (var val in myBasket) {
        switch (val) {
            case 'apple':
                sum += 110 * myBasket[val];
                break;
            case 'potato':
                sum += 50 * myBasket[val];
                break;
            case 'icecream':
                sum += 350 * myBasket[val];
                break;
            case 'tomato':
                sum += 220 * myBasket[val];
                break;
            default:
                break;
        }

    } return sum;
}
alert(countBasketPrice(myBasket));

//4
function one_line() {
    for (var i = 0; i <= 9; console.log(i++)) { }
}


//5 
function piramida() {
    var string = '';
    for (var i = 1; i < 21; i++) {
        string = string + 'x';
        console.log(string);
    }
}