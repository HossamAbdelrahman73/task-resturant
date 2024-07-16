// const { name } = require("commander");

location;

const nameinp = document.querySelector("#name");
const mail = document.querySelector("#mail");
const phone = document.querySelector("#phone");
const age = document.querySelector("#age");
const password = document.querySelector("#password");
const repassword = document.querySelector("#repassword");

let inputs = [nameinp, mail, phone, age, password];

let validInputs = [
  /^[a-z0-9_-]{3,15}$/,
  /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  /^([5-9]{1}|([1-9][0-9]){1}|100)$/,
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
];

for (let i = 0; i < validInputs.length; i++) {
  inputs[i].addEventListener("input", function () {
    if (validInputs[i].test(inputs[i].value)) {
      this.nextElementSibling.classList.add("hidden");
    } else {
      this.nextElementSibling.classList.remove("hidden");
    }
  });
}
repassword.addEventListener("input", function () {
  if (repassword.value == password.value) {
    this.nextElementSibling.classList.add("hidden");
  } else {
    this.nextElementSibling.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".loading").classList.add("hidden");
});
