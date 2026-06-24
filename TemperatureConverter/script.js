function convertTemperature(){

let temp =
document.getElementById("temperature").value;

let unit =
document.getElementById("unit").value;

let result =
document.getElementById("result");

let error =
document.getElementById("error");

result.innerHTML = "";
error.innerHTML = "";

if(temp === ""){
error.innerHTML =
"Please enter a temperature value.";
return;
}

if(isNaN(temp)){
error.innerHTML =
"Only numeric values are allowed.";
return;
}

temp = parseFloat(temp);

if(unit === "celsius"){

if(temp < -273.15){
error.innerHTML =
"Temperature cannot be below absolute zero.";
return;
}

let fahrenheit =
(temp * 9/5) + 32;

let kelvin =
temp + 273.15;

result.innerHTML =
`Celsius: ${temp.toFixed(2)} °C <br>
Fahrenheit: ${fahrenheit.toFixed(2)} °F <br>
Kelvin: ${kelvin.toFixed(2)} K`;
}

else if(unit === "fahrenheit"){

if(temp < -459.67){
error.innerHTML =
"Temperature cannot be below absolute zero.";
return;
}

let celsius =
(temp - 32) * 5/9;

let kelvin =
celsius + 273.15;

result.innerHTML =
`Celsius: ${celsius.toFixed(2)} °C <br>
Fahrenheit: ${temp.toFixed(2)} °F <br>
Kelvin: ${kelvin.toFixed(2)} K`;
}

else{

if(temp < 0){
error.innerHTML =
"Temperature cannot be below absolute zero.";
return;
}

let celsius =
temp - 273.15;

let fahrenheit =
(celsius * 9/5) + 32;

result.innerHTML =
`Celsius: ${celsius.toFixed(2)} °C <br>
Fahrenheit: ${fahrenheit.toFixed(2)} °F <br>
Kelvin: ${temp.toFixed(2)} K`;
}
}
