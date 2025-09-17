// var swiper = new Swiper(".mySwiper", {
//   loop: true,
//   navigation: {
//     nextEl: "#prev",
//     prevEl: "#next",
//   },
// });

// const cartIcon = document.querySelector(".cart-icon");
// const cartTab = document.querySelector(".cart-tab");
// const closeBtn = document.querySelector(".close-btn");
// const cardList = document.querySelector(".card-list");
// const cartList = document.querySelector(".cart-list");
// const cartTotal = document.querySelector(".cart-total");
// const cartValue = document.querySelector(".cart-value");
// const hamburger = document.querySelector(".hamburger");
// const mobileMenu = document.querySelector(".mobile-menu");
// const bars = document.querySelector(".fa-bars");



// cartIcon.addEventListener("click", (e) => {
//   e.preventDefault();
//   cartTab.classList.add("cart-tab-active");
// });
// closeBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   cartTab.classList.remove("cart-tab-active");
// });

// hamburger.addEventListener("click", () => {
//   mobileMenu.classList.toggle("mobile-menu-active");
// });
// hamburger.addEventListener("click", () => {
//   bars.classList.toggle("fa-xmark");
// });

// let productList = [];
// let cartProduct = [];

// const updateTotals = () => {
//   let totalPrice = 0;
//   let totalItems = 0;


//   document.querySelectorAll(".item").forEach(item=> {

//     const quantity = parseInt(item.querySelector(".quantity-value").textContent);
//     const price = parseFloat(item.querySelector(".item-total").textContent.replace("$",""));
//     totalPrice += price;
//     totalQuantity += quantity;
//   });

//   cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
//   cartValue.textContent = totalQuantity;

// }

// const showCards = () => {
//   productList.forEach((product) => {
//     const orderCard = document.createElement("div");
//     orderCard.classList.add("order-card");

//     orderCard.innerHTML = `
//         <div class="card-image">
//         <img src= ${product.image}>
//         </div>
//         <h4>${product.name}</h4>
//         <h4 class="price">${product.price}</h4>
//         <a href="#" class="btn card-btn">Add to Cart</a>
//         `;

//     cardList.appendChild(orderCard);

//     const cardBtn = orderCard.querySelector(".card-btn");
//     cardBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       addToCart(product);
//     });
//   });
// };

// const addToCart = (product) => {

//  const existingProduct = cartProduct.find((item) => item.id === product.id);
//  if(existingProduct){
//     alert("Product is already in the cart");
//     return;
//  }
//   cartProduct.push(product);

//   let quantity = 1;
//   let price = parseFloat(product.price.replace("₹", ""));

//   const cartItem = document.createElement("div");
//   cartItem.classList.add("item");
//   cartItem.innerHTML = `
//    <div class="item-image">
//       <img src=${product.image}>
//     </div>
//     <div class="detail">
//       <h4>${product.name}</h4>
//       <h4 class="item-total">${product.price}</h4>
//     </div>
//     <div class="flex">
//       <a href="#" class="quantity-btn minus">
//         <i class="fa-solid fa-minus"></i>
//       </a>
//       <h4 class="quantity-value">1</h4>
//       <a href="#" class="quantity-btn plus">
//         <i class="fa-solid fa-plus"></i>
//       </a>
//     </div>`;

//   cartList.appendChild(cartItem);
//   updateTotals();

//   const minusBtn = cartItem.querySelector(".minus");
//   const plusBtn = cartItem.querySelector(".plus");
//   const quantityValue = cartItem.querySelector(".quantity-value");
//   const itemTotal = cartItem.querySelector(".item-total");

//   plusBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     quantity++;
//     quantityValue.textContent = quantity;
//     itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
//     updateTotals();
//   })
//   minusBtn.addEventListener("click", (e) => {
//     e.preventDefault();
    
//     if(quantity >1){
//        quantity--;
//        quantityValue.textContent = quantity;
//        itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
//        updateTotals();
//     }
//     else{
//       cartItem.classList.add("slide-out");
//       setTimeout(() => {
//         cartItem.remove();
//         cartProduct = cartProduct.filter((item) => item.id !== product.id);
//         updateTotals();
//       }, 300);
//       }
    
//   })
// };

// const initApp = () => {
//   fetch("products.json")
//     .then((response) => response.json())
//     .then((data) => {
//       productList = data;
//       showCards();
//     });
// };
// initApp();

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#prev",
    prevEl: "#next",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const bars = document.querySelector(".fa-bars");

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.add("cart-tab-active");
});
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.remove("cart-tab-active");
});

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-menu-active");
});
hamburger.addEventListener("click", () => {
  bars.classList.toggle("fa-xmark");
});

let productList = [];
let cartProduct = [];

const updateTotals = () => {
  let totalPrice = 0;
  let totalItems = 0; // ✅ define local counter

  document.querySelectorAll(".item").forEach((item) => {
    const qtyEl = item.querySelector(".quantity-value");
    const totalEl = item.querySelector(".item-total");

    const quantity = parseInt(qtyEl?.textContent || "0", 10) || 0;

    // remove any currency symbols and non-numeric chars
    const priceText = (totalEl?.textContent || "").replace(/[^0-9.]/g, "");
    const price = parseFloat(priceText) || 0;

    totalPrice += price;
    totalItems += quantity;
  });

  // detect currency symbol from first item (fallback to $)
  let currency = "$";
  const firstTotal = document.querySelector(".item .item-total");
  if (firstTotal) {
    const m = firstTotal.textContent.trim().match(/^[^\d]+/);
    if (m) currency = m[0];
  }

  cartTotal.textContent = `${currency}${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalItems;
};

const showCards = () => {
  if (!cardList) return;
  // optional: clear previous cards if re-rendering
  // cardList.innerHTML = "";
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
        <div class="card-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <h4>${product.name}</h4>
        <h4 class="price">${product.price}</h4>
        <a href="#" class="btn card-btn">Add to Cart</a>
        `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Product is already in the cart");
    return;
  }
  cartProduct.push(product);

  let quantity = 1;
  // parse numeric price robustly (handle ₹, $, etc.)
  const rawPrice = (product.price || "").replace(/[^0-9.]/g, "");
  const price = parseFloat(rawPrice) || 0;
  const currencyMatch = (product.price || "").trim().match(/^[^\d]+/);
  const currency = currencyMatch ? currencyMatch[0] : "$";

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = `
   <div class="item-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="detail">
      <h4>${product.name}</h4>
      <h4 class="item-total">${currency}${(price * 1).toFixed(2)}</h4>
    </div>
    <div class="flex">
      <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>
      <h4 class="quantity-value">1</h4>
      <a href="#" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>
    </div>`;

  cartList.appendChild(cartItem);
  updateTotals();

  const minusBtn = cartItem.querySelector(".minus");
  const plusBtn = cartItem.querySelector(".plus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `${currency}${(price * quantity).toFixed(2)}`;
    updateTotals();
  });
  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `${currency}${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter((item) => item.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    })
    .catch((err) => {
      console.error("Failed to load products.json:", err);
    });
};
initApp();
