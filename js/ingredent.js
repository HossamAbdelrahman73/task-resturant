/// <reference types="../@types/jquery" />

getAreas();

// ========apis============

function startSpinner() {
  document.querySelector(".loading").classList.remove("hidden");
}
function stopSpinner() {
  document.querySelector(".loading").classList.add("hidden");
}

async function getAreas() {
  startSpinner();
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const data = await api.json();
  console.log(data.meals);
  displayArea(data.meals);
  stopSpinner();
}

async function getAreasSingle(ingr) {
  startSpinner();
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`
  );
  const data = await api.json();
  // console.log(data.meals);

  displaySearchRecipe(data.meals);
  stopSpinner();
}

async function categorySpecialMealByID(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  console.log(data.meals[0]);
  let map = new Map(Object.entries(data.meals[0]));
  let arr = Array.from(map);
  // we = data.meals;
  displayMealRecipe(data.meals[0], arr);
}

// ==========functions===========

function displayArea(ingrs) {
  let cartona = ``;
  for (let i = 0; i < 20; i++) {
    // console.log(ingrs[i].strDescription);
    let strInstance = ingrs[i].strDescription.slice(0, 100);
    strLength =
      strInstance.indexOf(".") != -1 ? strInstance.indexOf(".") : strInstance;

    // console.log(typeof strLength);
    if (typeof strLength == "number") {
      strInstance = ingrs[i].strDescription.slice(0, strLength);
    }
    cartona += `
     <div class='ingr-icon' dat='${ingrs[i].strIngredient}'>
            <span
              ><i class="fa-solid fa-drumstick-bite text-[64px] font-[900]"></i
            ></span>
            <p class="font-[500] text-[26px]">${ingrs[i].strIngredient}</p>
            <p class="font-[400] text-[16px]">
             ${strInstance}
            </p>
          </div>
    `;
  }

  document.querySelector(".intgr").innerHTML = cartona;

  let dataArea = document.querySelectorAll(".ingr-icon");
  // console.log(dataArea);
  for (let i = 0; i < 20; i++) {
    dataArea[i].addEventListener("click", function () {
      getAreasSingle(this.getAttribute("dat"));
      // console.log(this.getAttribute("dat"));
    });
  }
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

  document.querySelector(".intgr").innerHTML = cartona;

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
        categorySpecialMealByID(arr[2][1]);

        // console.log("arr", arr);
        // console.log("map", map);
      });
    }

    // // if (arr.length != 3) {
    // recipes[i].addEventListener("click", function (e) {
    //   // displayMealRecipe(meals[i], arr);
    //   console.log("arr", arr);
    //   console.log("map", map);
    // });

    // }
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
