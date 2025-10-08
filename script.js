let humburgerIcon = document.querySelector("#humburgerIcon");
let navBox = document.querySelector("#navBox");
let signBtn = document.querySelector("#signBtn");
humburgerIcon.addEventListener("click", () => {
  navBox.classList.add("show");
  signBtn.classList.add("show");
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  let count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector("#item-value").textContent = count;
}

function AddToCart(name, price, img) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    alert(`${name} quantity increased in cart`);
  } else {
    cart.push({ name, price, img, quantity: 1 });
    // alert(`${name} is already added to cart`);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

function DisplayCart() {
  const cartcontainer = document.getElementById("productBox");
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartcontainer) return;

  if (cartData.length === 0) {
    cartcontainer.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cartcontainer.innerHTML = "";

  cartData.forEach((item, index) => {
    const container = document.createElement("div");
    container.classList.add("produc-box");

    const NameDiv = document.createElement("div");
    NameDiv.innerHTML = `${item.name}`;

    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img src = ${item.img} alt = "burger img">`;

    const PriceBox = document.createElement("div");
    PriceBox.innerHTML = `₹${item.price * item.quantity}`;

    const quantityBox = document.createElement("div");
    quantityBox.innerHTML = `<p>${item.quantity}</p>`;

    const removeBtn = document.createElement("div");
    removeBtn.innerHTML = `<Button class = "removeBtn" data-index = ${index}>Remove</Button>`;

    container.append(NameDiv);
    container.append(imgDiv);
    container.append(PriceBox);
    container.append(quantityBox);
    container.append(removeBtn);

    cartcontainer.appendChild(container);
  });

  // document.querySelector("#item-value").innerText = `${item.quantity} || 0`;

  document.querySelectorAll(".removeBtn").forEach((Btn) => {
    Btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeCartValue(index);
    });
  });
}

function removeCartValue(index) {
  // const data = JSON.parse("cart", localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  DisplayCart();
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".AddToCart").forEach((Btn, index) => {
    Btn.addEventListener("click", (e) => {
      const item = e.target.closest(".itemBox");
      const name = item.dataset.name;
      const price = parseFloat(item.dataset.price);
      const img = item.dataset.img;

      AddToCart(name, price, img);
    });
  });

  if (document.querySelector("#productBox")) {
    DisplayCart();
  }
});
