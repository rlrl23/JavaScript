//1 Chess Board

function create_table() {
    var str = '<table><tbody>';
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (var i = 8; i > 0; i--) {
        str += '<tr><th>' + i + '</th>';
        for (var letter in letters) {
            str += '<td id="' + letters[letter] + i + '"></td>';
        }
        str += '</tr>';
    }
    str += '<tr><th></th>';
    for (var letter in letters) {
        str += '<th>' + letters[letter] + '</th>';
    }
    str += '</tr></tbody></table>';
    return str;
}

function my_initiation() {
    var content = document.querySelector('.centered');
    var table = create_table();
    content.innerHTML = table;
    document.querySelector('table').className = "chess";

    var styles = document.createElement('style');
    styles.type = 'text/css';
    styles.innerHTML = ".chess {border-spacing: 0;border-collapse: collapse;} " + ".chess tr td {border: 1px solid;width: 5em;height: 5em;text-align: center;vertical-align: middle;background: #0a0a0a;} " + ".chess tr:nth-child(odd) td:nth-child(even) {background: #f9f7f4;} " + ".chess tr:nth-child(even) td:nth-child(odd) {background: #f5f4f3;}";
    document.querySelector('head').appendChild(styles);
}

window.onload = my_initiation();