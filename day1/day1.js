var fs = require("fs");
var path = require("path");
var inputPath = path.join(__dirname, "./input.txt");
function runReportRepair() {
    fs.readFile(inputPath, function (err, file) {
        if (err)
            return err;
        var numberArray = file.toString().split("\n");
        console.log(numberArray);
        var number = reportRepair(numberArray);
        console.log(number);
    });
}
function reportRepair(numbers) {
    var goalSum = 2020;
    var number1;
    var number2;
    var number3;
    for (var i = 0; i < numbers.length - 3; i++) {
        number1 = parseInt(numbers[i]);
        for (var j = 1; j < numbers.length - 2; j++) {
            number2 = parseInt(numbers[j]);
            for (var k = 2; k < numbers.length - 1; k++) {
                number3 = parseInt(numbers[k]);
                if (number1 + number2 + number3 === goalSum) {
                    console.log(number1, number2, number3);
                    return number1 * number2 * number3;
                }
            }
        }
    }
    return -1;
}
runReportRepair();
