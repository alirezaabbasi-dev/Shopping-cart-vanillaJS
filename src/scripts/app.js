import data from "./data.js";

const $ = document;
const container = $.querySelector(".container");
const menu = $.querySelector(".user-basket");
const basket = $.querySelector(".basket");
const basketWrapper = $.querySelector(".basket-wrapper");
const overlay = $.querySelector(".overlay");
const finalPriceElement = $.querySelector("#final-price");
const modal = $.querySelector(".Modal");
const logoutBtn = $.querySelector(".logout");

const ModalYesBtn = $.querySelector("#Modal-yes");
const ModalNoBtn = $.querySelector("#Modal-no");

let userBasket = [];
function finallyPriceHandler() {
  const finalPrice = userBasket.reduce((acc, product) => {
    return acc + Number(product.price) * product.count;
  }, 0);

  finalPriceElement.innerText = `${finalPrice.toLocaleString()} $`;
}

function basketClickHandler(array) {
  const { id, name, price, img, description, count } = array;

  let isInUserBasket = userBasket.some((product) => product.id === array.id);
  if (isInUserBasket) {
    const filteredBasket = userBasket.filter(
      (product) => product.id === array.id
    );

    if (count <= filteredBasket[0].count) {
      showAlert("warn", "you cant add");
    } else {
      filteredBasket[0].count += 1;
      showAlert("success", "product added", 3000);
    }
  } else {
    const newArray = { id, name, price, count: 1, img, description };
    userBasket.push(newArray);
    showAlert("success", "product added", 3000);
  }
}

function deleteProductsFromBasketHandler(id) {
  const newUserBasket = userBasket.filter((product) => product.id !== id);
  userBasket = newUserBasket;
  userBasketProducts();
}
// Increase product count in basket
function increaseCount(item) {
  const foundItem = userBasket.find((i) => i.id === item.id);
  const productData = data.find((p) => p.id === item.id); // get max available count
  if (foundItem) {
    if (foundItem.count < productData.count) {
      foundItem.count++;
      userBasketProducts(); // update UI
      showAlert("success", "product added", 3000);
    } else {
      showAlert("warn", "you can't add more", 3000);
    }
  }
}

// Decrease product count in basket
function decreaseCount(item) {
  const foundItem = userBasket.find((i) => i.id === item.id);
  if (foundItem) {
    if (foundItem.count > 1) {
      foundItem.count--;
      userBasketProducts(); // update UI
    } else {
      // remove product if count reaches 0
      deleteProductsFromBasketHandler(item.id);
    }
  }
}
function changeTheme() {
  let theme = localStorage.getItem("theme");

  if (theme) {
    theme === "light"
      ? body.classList.remove("dark-theme")
      : body.classList.add("dark-theme");
  } else {
    localStorage.setItem("theme", "light");
  }
}
function userBasketProducts() {
  basketWrapper.innerHTML = "";
  userBasket.map((item) => {
    const { id, name, price, count, img, description } = item;
    const template = `
        <!-- Product -->
        <div class="basket-product">
        <div class="basket-product__delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
          </svg>
        </div>
          <div class="basket-product__picture">
            <img src="${img}" alt="">
          </div>
          <div class="basket-product__counter">
            <span onclick="" class="basket-product__counter-plus">+</span>
            <span>${count}</span>
            <span class="basket-product__counter-minus">-</span>
          </div>
          <div class="basket-product__details">
            <h4>${name}</h4>
            <p>${price} $</p>
          </div>
        </div>
      <!-- Product -->
  `;
    basketWrapper.insertAdjacentHTML("beforeend", template);

    const deleteBtns = $.querySelectorAll(".basket-product__delete");
    const deleteBtn = deleteBtns[deleteBtns.length - 1];
    deleteBtn.addEventListener("click", () =>
      deleteProductsFromBasketHandler(id)
    );

    const plusBtns = $.querySelectorAll(".basket-product__counter-plus");
    const plusBtn = plusBtns[plusBtns.length - 1];

    plusBtn.addEventListener("click", () => {
      increaseCount(item);
    });
    const minusBtns = $.querySelectorAll(".basket-product__counter-minus");
    const minusBtn = minusBtns[minusBtns.length - 1];

    minusBtn.addEventListener("click", () => {
      decreaseCount(item);
    });
  });
  finallyPriceHandler();
}
function showAlert(alertType = "success", title, duration = 2000) {
  $.querySelector(".alert-wrapper").insertAdjacentHTML(
    "afterbegin",
    `
  <div class="alert ${alertType === "success" ? "success" : "warn"}">
    ${title}
  </div>
    `
  );
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, duration);
}
data.map((item) => {
  const { name, price, count, img, description } = item;
  const template = `
        <div class="box">
          <div class="box__img">
            <img src="${img}" alt="">
          </div>
          <h4 class="box__title">${name}</h4>
          <p class="box__description">${description}</p>
          <div class="box__price-count-wrapper">
          <span class="box__price">${price.toLocaleString()} $</span>
          <span class="box__count"> ${count}</span>
          </div>
          <button class="box__btn">Add to cart</button>
        </div>
  `;
  container.insertAdjacentHTML("beforeend", template);

  const btns = $.querySelectorAll(".box__btn");
  const btn = btns[btns.length - 1];

  btn.addEventListener("click", () => {
    basketClickHandler(item);
    userBasketProducts();
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  basket.classList.remove("active");
  modal.classList.remove("active");
});
menu.addEventListener("click", () => {
  overlay.classList.add("active");
  basket.classList.add("active");
});
logoutBtn.addEventListener("click", () => {
  modal.classList.add("active");
  overlay.classList.add("active");
});

ModalYesBtn.addEventListener("click", () => {
  document.cookie = "username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

  modal.classList.remove("active");
  overlay.classList.remove("active");
  window.location.href = "./signup.html";
});
ModalNoBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

const body = document.body;
const themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  let theme = localStorage.getItem("theme");
  theme === "light"
    ? localStorage.setItem("theme", "dark")
    : localStorage.setItem("theme", "light");
});

window.addEventListener("load", () => {
  userBasketProducts();
  finallyPriceHandler();
  changeTheme();
});
