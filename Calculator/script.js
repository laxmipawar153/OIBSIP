const display = document.getElementById("display");

const buttons =
document.querySelectorAll("button");

let currentInput = "";

buttons.forEach(button => {

button.addEventListener("click", () => {

const value = button.textContent;

if(value === "C"){

currentInput = "";
display.value = "";

}

else if(value === "DEL"){

currentInput =
currentInput.slice(0,-1);

display.value = currentInput;

}

else if(value === "="){

calculate();

}

else{

currentInput += value;

display.value = currentInput;

}

});

});

function calculate(){

try{

let tokens =
currentInput.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);

if(!tokens) return;

let result =
parseFloat(tokens[0]);

for(let i=1;i<tokens.length;i+=2){

let operator = tokens[i];

let nextNumber =
parseFloat(tokens[i+1]);

switch(operator){

case "+":
result += nextNumber;
break;

case "-":
result -= nextNumber;
break;

case "*":
result *= nextNumber;
break;

case "/":

if(nextNumber === 0){

display.value =
"Cannot divide by zero";

currentInput = "";

return;
}

result /= nextNumber;
break;
}

}

display.value = result;
currentInput = result.toString();

}

catch{

display.value = "Error";
currentInput = "";

}

}
