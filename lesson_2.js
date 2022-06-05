var a = 1, b = 1, c, d;
c = ++a; alert(c); // 2 сначала увеличиваем а на 1 - потом присваиваем
d = b++; alert(d); // 1 сначала присваиваем и возвращаем результат - потом увеличиваем
c = (2 + ++a); alert(c); // 5 на этот момент а=2 + ещё увеличиваем на 1 + прибавляем 2
d = (2 + b++); alert(d); // 4 на этот момент b=2 прибавляем 2 получаем 4 потом увеличиваем б
alert(a); // 3 на этот момент а=3, т.к. прежде дважды была увеличена на 1
alert(b); //аналогично

var a = 2;
var x = 1 + (a *= 2); //5

var a = -10, b = 5;
if (a >= 0 && b >= 0)
    alert(a - b);
else if (a < 0 && b < 0)
    alert(a * b);
else alert(a + b);

var a = 10;
switch (a) {
    case 10:
        alert(10);
    case 11:
        alert(11);
    case 12:
        alert(12);
    case 13:
        alert(13);
    case 14:
        alert(14);
    default:
        alert(15);
        break;
}

function sum(x, y) {
    return (x + y);
}
function minus(x, y) {
    return (x - y);
}

function multiply(x, y) {
    return (x * y);
}
function division(x, y) {
    return (x / y);
}

var a = 10, b = 2;
//alert(sum(a, b));
//alert(minus(a, b));
//alert(multiply(a, b));
//alert(division(a, b));

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case '+':
            return (sum(arg1, arg2));
            break;
        case '-':
            return (minus(arg1, arg2));
            break;
        case '*':
            return (multiply(arg1, arg2));
            break;
        case '/':
            return (division(arg1, arg2));
            break;
    }
}
alert(mathOperation(a, b, '/'))

alert(null == 0) //Значения null и undefined равны друг другу, но не чему бы то ни было еще.
//False

function power(val, pow) {
    if (pow == 1)
        return val;
    else if (pow > 1)
        return val * power(val, pow - 1);
    else if (pow == 0)
        return 1
    else
        return 1 / val * power(val, pow + 1);

}

alert(power(2, -2));
