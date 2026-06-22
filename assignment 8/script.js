const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("sticky-full");
  } else {
    nav.classList.remove("sticky-full");
  }
});