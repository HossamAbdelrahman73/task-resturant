// import { dataNew } from "./index.js";

export function displayMealRecipe(data, arr) {
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

// console.log(dataNew);
