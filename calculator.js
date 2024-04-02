function add(a, b) {
    let sum = a + b;
    return sum.toFixed(1)
}

function subtract(a, b) {
    let difference = a - b;
    return difference.toFixed(1)
}

function multiply(a, b) {
    let product = a * b;
    return product.toFixed(1)
}

function divide(a, b) {
    let quotient = a / b;
    return quotient.toFixed(1)
}

function calculate(num1,op,num2) {
    let newNum1 = parseFloat(num1)
    let newNum2 = parseFloat(num2)
    if(op === '+'){
        return add(newNum1,newNum2)
    } else if(op === '-') {
        return subtract(newNum1, newNum2)
    } else if(op === 'x') {
        return multiply(newNum1, newNum2)
    } else if(op === '/'){
        return divide(newNum1, newNum2)
    }
}

const operatorCheck = [0,9,8,7,6,5,4,3,2,1]
var lastCharacter = '';
let decimal = 0;
let operatorClicked = true;

document.addEventListener('DOMContentLoaded', function() {
    const flexContainer = document.querySelector('.flex-container')
    const deleteButton = document.querySelector('.delete')
    const clearButton = document.querySelector('.clear')
    const numScreen = document.querySelector('#screen');
    const equal = document.querySelector('.equal')
    const numbers = document.querySelectorAll('.button.number');

    clearButton.addEventListener('click', (event) => {
        numScreen.textContent = '';
        lastCharacter = '';
        operatorClicked = true;
        decimal = 0;
    })

deleteButton.addEventListener('click', function(event) {
        if (lastCharacter === 'operator') {
            numScreen.textContent = numScreen.textContent.slice(0, numScreen.textContent.length - 3)
            lastCharacter = '';
            decimal = 0;
            // console.log(numScreen.textContent.slice(0, numScreen.textContent.length - 1))
        } else {
            numScreen.textContent = numScreen.textContent = numScreen.textContent.slice(0, numScreen.textContent.length - 1);
            lastCharacter = 'operator';
            decimal = 1;
            // console.log(numScreen.textContent.slice(0, numScreen.textContent.length - 1))
        }
})

Array.from(numbers).forEach(function(numberButton){
    numberButton.addEventListener('click', (event) => {
        const clickedNumber = parseInt(event.target.textContent);
        numScreen.textContent += clickedNumber;
        lastCharacter = '';
        operatorClicked = false;

    })
});

const operations = document.querySelectorAll('.operations')
Array.from(operations).forEach(function(operationsButton){
    operationsButton.addEventListener('click', (event) => {
        const classes = event.target.classList;
        if(lastCharacter === '' && operatorClicked === false) {
            if(classes.contains('division')) {
                numScreen.textContent += ' / '
                lastCharacter = 'operator';
                decimal = 0;
                operatorClicked = true;
            } else if (classes.contains('multiplication')){
                numScreen.textContent += ' x '
                lastCharacter = 'operator';
                decimal = 0;
                operatorClicked = true;
            } else if (classes.contains('subtraction')) {
                numScreen.textContent += ' - '
                lastCharacter = 'operator';
                decimal = 0;
                operatorClicked = true;
            } else if(classes.contains('addition')) {
                numScreen.textContent += ' + '
                lastCharacter = 'operator';
                decimal = 0;
                operatorClicked = true;
            }
        } else if (lastCharacter === 'operator') {
            decimal = 0;
        }

        if(decimal === 0) {
            if(classes.contains('decimal')) {
                numScreen.textContent += '.'
                decimal = 1;
                console.log(decimal)
            }
        }

    })
})

equal.addEventListener('click', (event) => {
    lastCharacter = 'answer';
    const numberList = numScreen.textContent.trim().split(' ');

    let acccumulator = numberList[0];
    let operator = '';

    if(operatorClicked === false){

        for(let i = 1; i < numberList.length; ++i) {
            if(numberList[i] === '+'){
                operator = '+';
            } else if(numberList[i] === '-') {
                operator = '-';
            }  else if(numberList[i] === '/') {
                operator = '/';
            }  else if(numberList[i] === 'x') {
                operator = 'x'
            } else {
                acccumulator = calculate(acccumulator, operator, numberList[i])
            }
            operatorClicked = false;
            decimal = 1;
        }
        numScreen.textContent = acccumulator;
    } else {
        alert("You're a missing number!")
    }


})


})
