/// <reference types="../@types/jquery" />

import { displayMealRecipe } from "./meal.js";

// import { searchName } from "../";

// *************main varibles**********

function startSpinner() {
  document.querySelector(".loading").classList.remove("hidden");
}
function stopSpinner() {
  document.querySelector(".loading").classList.add("hidden");
}

const searchByName = document.getElementById("searchByName");
const searchBychar = document.getElementById("searchBychar");
const resultSearch = document.getElementById("resultSearch");
const Categories = $("#Categories");
const Search = document.getElementById("Search");

// ************Events************
searchName("");

// Search.addEventListener("click", function () {

//   location.href = "./search.html";

// });

// searchBychar.addEventListener("input", function (e) {
//   let char = this.value;

//   if (char.length == 1) {
//     searchChar(char);
//   } else {
//     console.log(this.value[0]);
//     this.value = char[0] ? char[0] : "";
//     searchChar();
//   }
// });

// searchByName.addEventListener("input", function () {
//   searchName(this.value);
//   console.log(this.value);
// });

Categories.on("click", function () {
  // 1
  location.href = "./category.html";
  categoryMeals();
});
//  ****************Apis************

async function searchName(nameRecipe) {
  startSpinner();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRecipe}`
  );
  let data = await response.json();
  console.log(data.meals);
  displaySearchRecipe(data.meals);
  stopSpinner();
}

async function searchChar(nameRecipe = "a") {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${nameRecipe}`
  );
  let data = await response.json();
  // console.log(data.meals);
  displaySearchRecipe(data.meals);
}

async function categoryMeals() {
  startSpinner();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  // console.log(data.categories);
  // 1
  displayMealsCategories(data.categories);
  stopSpinner();
}

// 2
async function categorySpecialMeal(meal) {
  startSpinner();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );
  let data = await response.json();
  // console.log(data.meals);
  // 2
  displaySearchRecipe(data.meals);
  stopSpinner();
}

// let we = "";
async function categorySpecialMealByID(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  console.log(data.meals);
  // we = data.meals;
  displaySearchRecipe(data.meals);
}

// ***************functions*************

// aside hide

function displayMealsCategories(meals) {
  let cartona = "";

  for (let i = 0; i < meals.length; i++) {
    let strInstance = meals[i].strCategoryDescription.slice(0, 100);
    strLength =
      strInstance.indexOf(".") != -1 ? strInstance.indexOf(".") : strInstance;

    // console.log(typeof strLength);
    if (typeof strLength == "number") {
      strInstance = meals[i].strCategoryDescription.slice(0, strLength);
    }
    cartona += `
   <div class=" relative group overflow-hidden rounded-lg recipe  pure-Meal" cli='${meals[i].strCategory}' >
            <img src=${meals[i].strCategoryThumb} alt="" class="w-full" />
            <div
              class="absolute inset-0 bg-white/80 translate-y-[110%] group-hover:translate-y-0 duration-[.5s] text-center p-2 "
            >
            <h1 class="text-black font[500] text-[28px]">${meals[i].strCategory}</h1>
              <p class="text-black font[400] text-[16px]">${strInstance}</p>
            </div>
    </div>
  `;
  }

  resultSearch.innerHTML = cartona;
  // document.querySelector("#catego .categ").innerHTML = cartona;

  $(".pure-Meal").on("click", function (e) {
    let mealChoose = e.target.closest(".pure-Meal").getAttribute("cli");
    // 2
    categorySpecialMeal(mealChoose);
  });
}

function displaySearchRecipe(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
   <div class=" relative group overflow-hidden rounded-lg recipe">
            <img src=${meals[i].strMealThumb} alt="" class="w-full" />
            <div
              class="absolute inset-0 bg-white/50 flex items-center translate-y-[100%] group-hover:translate-y-0 duration-[.5s] "
            >
              ${meals[i].strMeal}
            </div>
    </div>
  `;
  }

  if (location.href == "http://127.0.0.1:5501/src/search.html") {
    resultSearch.innerHTML = cartona;
  } else {
    document.querySelector("#first-page .taksyma-first").innerHTML = cartona;
  }

  let recipes = document.querySelectorAll(".recipe");

  for (let i = 0; i < meals.length; i++) {
    let map = new Map(Object.entries(meals[i]));
    let arr = Array.from(map);
    if (arr.length != 3) {
      recipes[i].addEventListener("click", function (e) {
        // location.href = "./meal.html";
        // console.log("arr", arr);
        // console.log("meals[i]", meals[i]);
        displayMealRecipe(meals[i], arr);
      });
    } else {
      recipes[i].addEventListener("click", function (e) {
        console.log(arr[2][1]);
        let dat = categorySpecialMealByID(arr[2][1]);
        map = new Map(Object.entries(dat));
        arr = Array.from(map);
      });
    }
  }
}

// export let dataNew = meals[i];
