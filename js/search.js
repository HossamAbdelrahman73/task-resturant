/// <reference types="../@types/jquery" />

// import { aside, closeBtn, elementsTrans, text } from "./index.js";
// import { displayMealRecipe } from "./meal.js";

// import { categorySpecialMealByID } from "./category.js";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".loading").classList.add("hidden");
});

function startSpinner() {
  document.querySelector(".loading").classList.remove("hidden");
}
function stopSpinner() {
  document.querySelector(".loading").classList.add("hidden");
}
// console.log(location.href == "http://127.0.0.1:5501/src/search.html");

// *************main varibles**********

const searchByName = document.getElementById("searchByName");
const searchBychar = document.getElementById("searchBychar");
const resultSearch = document.getElementById("resultSearch");

// console.log(he);
// console.log(searchBychar);

// ************Events************

searchBychar.addEventListener("input", function (e) {
  let char = this.value;

  if (char.length == 1) {
    searchChar(char);
  } else {
    console.log(this.value[0]);
    this.value = char[0] ? char[0] : "";
    searchChar();
  }
});

searchByName.addEventListener("input", function () {
  searchName(this.value);
  console.log(this.value);
});

//  ****************Apis************

async function searchName(nameRecipe) {
  startSpinner();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRecipe}`
  );
  let data = await response.json();
  console.log(data.meals);
  // displaySearchRecipe
  stopSpinner();
  displaySearchRecipe(data.meals);
}

async function searchChar(nameRecipe = "a") {
  startSpinner();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${nameRecipe}`
  );
  let data = await response.json();
  // console.log(data.meals);
  stopSpinner();
  displaySearchRecipe(data.meals);
}

// ***************functions***********

// function displaySearchRecipe(meals) {
//   let cartona = "";
//   for (let i = 0; i < meals.length; i++) {
//     cartona += `
//    <div class=" relative group overflow-hidden rounded-lg recipe">
//             <img src=${meals[i].strMealThumb} alt="" class="w-full" />
//             <div
//               class="absolute inset-0 bg-white/50 flex items-center translate-y-[100%] group-hover:translate-y-0 duration-[.5s] "
//             >
//               ${meals[i].strMeal}
//             </div>
//     </div>
//   `;
//   }

//   resultSearch.innerHTML = cartona;

//   let recipes = document.querySelectorAll(".recipe");

//   for (let i = 0; i < meals.length; i++) {
//     let map = new Map(Object.entries(meals[i]));
//     let arr = Array.from(map);

//     // console.log("arr", arr);
//     // console.log("map", map);
//     // console.log("meal[i]", meals[i]);
//     if (arr.length != 3) {
//       recipes[i].addEventListener("click", function (e) {
//         // console.log(arr);
//         console.log("hello");
//         displayMealRecipe(this, meals[i], arr);
//         // console.log(meals[i]);
//       });
//     } else {
//       recipes[i].addEventListener("click", function (e) {
//         console.log(arr[2][1]);
//         let dat = categorySpecialMealByID(arr[2][1]);
//         map = new Map(Object.entries(dat));
//         arr = Array.from(map);

//         // console.log(we);
//         // console.log(dat);
//         // console.log(map);
//         // console.log(arr);
//         // displayMealRecipe(this, dat, arr);
//         // console.log("objid", objId);
//         // displayMealSpecialRecipe(this, objId, arr);
//       });
//     }
//   }
// }

// function displayMealRecipe(rec, data, arr) {
//   let content = "";
//   for (let i = 0; i < 20; i++) {
//     if (arr[i + 9][1]) {
//       content += `
//         <span
//                   class="bg-[#CFF4FC] text-[#055160] py-2 px-1 rounded-md mx-1 my-2 inline-block"
//                   >${arr[i + 29][1]} ${arr[i + 9][1]}</span>
//       `;
//     }
//   }
//   let contentTags = "";
//   let str = data.strTags;
//   if (str != null) {
//     let wordsArr = str.split(",");
//     for (let i = 0; i < wordsArr.length; i++) {
//       contentTags += `
//                 <span
//                   class="bg-[#F8D7DA] text-red-700 py-2 px-1 rounded-md mx-1 my-2 inline-block"
//                 >
//                   ${wordsArr[i]}
//                 </span>
//         `;
//     }
//   }

//   let cartona = `
//       <div
//           class="grid md:grid-cols-[32%_minmax(0,1fr)] text-white gap-x-5 py-8"
//         >
//           <div class="mb-5 md:mb-0">
//             <img
//               src="${data.strMealThumb}"
//               class="w-full rounded-2xl"
//               alt=""
//             />
//             <h1 class="font-[500] text-[30px] text-[#f9f6f6 ]">
//             ${data.strMeal}
//             </h1>
//           </div>
//           <div>
//             <h2 class="font-[500] text-[30px] text-[#f9f6f6 ]">Instructions</h2>
//             <p class="font-[400] text-[16px] text-[#f9f6f6 ]">
//               ${data.strInstructions}
//             </p>
//             <p class="font-[700] text-[26px] text-[#f9f6f6 ] mt-4">
//               Area : ${data.strArea}
//             </p>
//             <p class="font-[700] text-[26px] text-[#f9f6f6 ]">
//               Category : ${data.strCategory}
//             </p>
//             <p class="font-[700] text-[26px] text-[#f9f6f6 ]">Recipes :</p>
//             <div class="mt-3 demo">
//               ${content}
//             </div>
//             <p class="font-[500] text-[26px] text-[#f9f6f6 ] my-4">Tags :</p>
//             <div>
//             ${contentTags}

//             </div>
//             <div>

//               <a target="_blank" href="${data.strSource}"
//                 class="bg-green-700 px-2 text-white py-2 rounded-md mx-1 my-2 inline-block"
//               >
//                 Source
//               </a>
//               <a target="_blank" href="${data.strYoutube}"
//                 class="bg-red-700 px-4 text-white py-2  rounded-md mx-1 my-2 inline-block"
//               >
//                 Youtube
//               </a>
//             </div>
//           </div>
//         </div>
//   `;

//   rec.closest(".container").innerHTML = cartona;
// }

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

  resultSearch.innerHTML = cartona;

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

function displayMealRecipe(data, arr) {
  let content = "";
  for (let i = 0; i < 20; i++) {
    if (arr[i + 9][1]) {
      content += `
        <span
                  class="bg-[#CFF4FC] text-[#055160] py-2 px-1 rounded-md mx-1 my-2 inline-block"
                  >${arr[i + 29][1]} ${arr[i + 9][1]}</span>
      `;
    }
  }
  let contentTags = "";
  let str = data.strTags;
  if (str != null) {
    let wordsArr = str.split(",");
    for (let i = 0; i < wordsArr.length; i++) {
      contentTags += `
                <span
                  class="bg-[#F8D7DA] text-red-700 py-2 px-1 rounded-md mx-1 my-2 inline-block"
                >
                  ${wordsArr[i]}
                </span>
        `;
    }
  }

  let cartona = `
      <div
          class="grid md:grid-cols-[32%_minmax(0,1fr)] text-white gap-x-5 py-8"
        >
          <div class="mb-5 md:mb-0">
            <img
              src="${data.strMealThumb}"
              class="w-full rounded-2xl"
              alt=""
            />
            <h1 class="font-[500] text-[30px] text-[#f9f6f6 ]">
            ${data.strMeal}
            </h1>
          </div>
          <div>
            <h2 class="font-[500] text-[30px] text-[#f9f6f6 ]">Instructions</h2>
            <p class="font-[400] text-[16px] text-[#f9f6f6 ]">
              ${data.strInstructions}
            </p>
            <p class="font-[700] text-[26px] text-[#f9f6f6 ] mt-4">
              Area : ${data.strArea}
            </p>
            <p class="font-[700] text-[26px] text-[#f9f6f6 ]">
              Category : ${data.strCategory}
            </p>
            <p class="font-[700] text-[26px] text-[#f9f6f6 ]">Recipes :</p>
            <div class="mt-3 demo">
              ${content}
            </div>
            <p class="font-[500] text-[26px] text-[#f9f6f6 ] my-4">Tags :</p>
            <div>
            ${contentTags}

            </div>
            <div>

              <a target="_blank" href="${data.strSource}"
                class="bg-green-700 px-2 text-white py-2 rounded-md mx-1 my-2 inline-block"
              >
                Source
              </a>
              <a target="_blank" href="${data.strYoutube}"
                class="bg-red-700 px-4 text-white py-2  rounded-md mx-1 my-2 inline-block"
              >
                Youtube
              </a>
            </div>
          </div>
        </div>
  `;

  // rec.closest(".container").innerHTML = cartona;
  document.querySelector(".container").innerHTML = cartona;
}
