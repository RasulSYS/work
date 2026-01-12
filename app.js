const resultElement = document.getElementById('result')
const submitBtn = document.getElementById('submit')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const multiplyBtn = document.getElementById('multiply')
const divideBtn = document.getElementById('divide')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
let action = '+'

plusBtn.onclick = function () {
    action = '+'
}
minusBtn.onclick = function () {
    action = '-'
}
multiplyBtn.onclick = function () {
    action = '*'
}
divideBtn.onclick = function () {
    action = '/'
}

function printResult (result){
    if(result>0){
        resultElement.style.color = 'green'
    }else{
        resultElement.style.color = 'red'
    }
    resultElement.textContent = result
}

function computeNumberWithAction(inp1, inp2, actionSymbol){
    const num1 = Number(inp1.value)
    const num2 = Number(inp2.value)
    if(actionSymbol == '+'){
        return num1 + num2
    }else if(actionSymbol == '-'){
        return num1 - num2
    }else if(actionSymbol == '/'){
        return num1 / num2
    }else if(actionSymbol == '*'){
        return num1 * num2
    }
}
submitBtn.onclick = function (){
    result = computeNumberWithAction(input1, input2, action)
    printResult(result)
}