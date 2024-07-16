const closeBtn = $("#closeBtn");
const aside = $("aside");
const contentaside = $(".content-aside");
const text = $(".text");
const elementsTrans = $("#elements-trans");
let count = 0;
// elementsTrans.hide(0);

let logo = document.getElementById("logo");
logo.addEventListener("click", function () {
  location.href = "./index.html";
});

closeBtn.on("click", function (e) {
  if (aside.hasClass("translate-x-[-80%]") && count != 0) {
    closeBtn.html(` <i
            class="fa-solid fa-xmark text-[32px] font-[900] cursor-pointer"
          ></i>`);
    elementsTrans.removeClass("translate-y-[100%]");
    text.removeClass("translate-y-36");
  } else {
    closeBtn.html(
      ` <i class="fa-solid fa-bars text-[32px] font-[900] cursor-pointer"></i>`
    );
    elementsTrans.addClass("translate-y-[100%]");
    text.addClass("translate-y-36");
    elementsTrans.show(0);

    count++;
  }
  aside.toggleClass("translate-x-[-80%]");
});

const Categories = $("#Categories");

Categories.on("click", function () {
  location.href = "./category.html";
});

const Search = document.getElementById("Search");

Search.addEventListener("click", function () {
  location.href = "./search.html";
});

const area = $("#Area");

area.on("click", function () {
  location.href = "./area.html";
});

const ingredent = $("#Ingredent");

ingredent.on("click", function () {
  location.href = "./ingredent.html";
});

const contact = $("#Contact");

contact.on("click", function () {
  location.href = "./contact.html";
});
