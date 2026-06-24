function hashPassword(password){
return btoa(password); // simple encoding (not real bcrypt but acceptable for frontend task)
}

function register(){

let user = document.getElementById("regUser").value;
let pass = document.getElementById("regPass").value;
let msg = document.getElementById("msg");

if(user === "" || pass === ""){
msg.innerText = "Fields cannot be empty";
return;
}

if(pass.length < 8 || !/\d/.test(pass)){
msg.innerText = "Password must be 8+ chars and include a number";
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

// duplicate check
let exists = users.find(u => u.user === user);

if(exists){
msg.innerText = "User already exists";
return;
}

users.push({
user: user,
pass: hashPassword(pass)
});

localStorage.setItem("users", JSON.stringify(users));

msg.style.color = "green";
msg.innerText = "Registration successful! Go to login.";
}

function login(){

let user = document.getElementById("loginUser").value;
let pass = document.getElementById("loginPass").value;
let msg = document.getElementById("msg");

let users = JSON.parse(localStorage.getItem("users")) || [];

let found = users.find(u => u.user === user && u.pass === hashPassword(pass));

if(!found){
msg.innerText = "Invalid credentials";
return;
}

localStorage.setItem("loggedIn", user);

window.location.href = "dashboard.html";
}

function logout(){
localStorage.removeItem("loggedIn");
window.location.href = "login.html";
}

// protect dashboard
if(window.location.pathname.includes("dashboard")){
let user = localStorage.getItem("loggedIn");
if(!user){
window.location.href = "login.html";
}
}
