let humburgerIcon = document.querySelector("#humburgerIcon");
let navBox = document.querySelector("#navBox");
let signBtn = document.querySelector("#signBtn");
humburgerIcon.addEventListener("click", () => {
  navBox.classList.add("show");
  signBtn.classList.add("show");
});
