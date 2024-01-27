let val1, val2, stored;
let dot = false;
let first = true;
let screenResult = false;

function add(a, b) {return a+b;}
function subtract(a, b) {return a-b;}
function multiply(a, b) {return a*b;}
function divide(a, b) {if (b == 0) {return 0;} return Math.round((a/b) * 100) / 100;}
function fractional(a) {if (a < 0 || a > 50000) {return a;} let total = 0; for (let i = a; i>0; i--){total+=i;} return total;}
function percentage(a) {return a/100;}

function checkSize(val){
    if (val.toString().length >= 12) {
        window.alert("Number too big");
        return false;
    }
    return true;
}

function updateScreen(val){ 
    if (checkSize(val)) {document.querySelector(".screen").innerHTML = val;}
}

function reset(){
    val1 = 0;
    val2 = 0;
    stored = "";
    first = true;
    screenResult = false;
    dot = false;
    updateScreen("");
}

function addStr(str){
    if (screenResult){updateScreen(""); screenResult = false;}
    if (checkSize(document.querySelector(".screen").innerHTML + str)){
        document.querySelector(".screen").innerHTML += str;
    }
    checkDot();
}

function deleteChar(){
    document.querySelector(".screen").textContent = document.querySelector(".screen").textContent.slice(0, -1);
    checkDot();
}

function addDot(){
    if (!dot) {
        addStr(".");
    }
}

function operate(sign){
    switch (sign){
        case "+":
            return add(val1,val2);
            break;
        case "-":
            return subtract(val1,val2);
            break;
        case "*":
            return multiply(val1,val2);
            break;
        case "/":
            return divide(val1, val2);
            break;
        case "!":
            return fractional(val1);
            break;
        case "%":
            return percentage(val1);
            break;
    }
}

function checkDot(){
    dot = document.querySelector(".screen").textContent.includes(".");
}

function getVal1(){
    let value = document.querySelector(".screen").innerHTML;
    val1 = (dot)? parseFloat(value) : parseInt(value);
}

function getVal2(){
    let value = document.querySelector(".screen").innerHTML;
    val2 = (dot)? parseFloat(value) : parseInt(value);
}

function handler(sign){
    if (document.querySelector(".screen").innerHTML != ""){
        if (first){
            if (sign != "="){
                getVal1();
                switch (sign){
                    case "!":
                        val1 = operate(sign);
                        updateScreen(val1);
                        break;
                    case "%":
                        val1 = operate(sign);
                        updateScreen(val1);
                        break;
                    default:
                        stored = sign;
                        updateScreen("");
                        break;
                }
                first = false;
            }
        }
        else{
            if (stored != ""){
                getVal2();
                val1 = operate(stored);
                switch (sign){
                    case "=":
                        stored = "";
                        first = true;
                        break;
                    case "!":
                        stored = "";
                        val1 = operate(sign);
                        first = true;
                        break;
                    case "%":
                        stored = "";
                        val1 = operate(sign);
                        first = true;
                        break;
                    default:
                        screenResult = true;
                        stored = sign;
                        break;
                }
                updateScreen(val1);
            }
        }
    }
    checkDot();
}