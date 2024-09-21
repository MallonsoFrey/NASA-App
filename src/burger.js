import { burger, headerNav, body, dark, aCollection } from "./vars-burger";

export function clickClose(e) {
  document.querySelector(".active").classList.remove("active");
  headerNav.classList.remove("header-nav__active");
  body.classList.remove("no_scroll");
  dark.classList.remove("dark");
}

export function click(e) {
  e.preventDefault();
  this.classList.toggle("active");
  headerNav.classList.toggle("header-nav__active");
  body.classList.toggle("no_scroll");
  dark.classList.toggle("dark");
  if (burger.classList.contains("active")) {
    Array.from(aCollection).forEach((element) => {
      element.addEventListener("click", clickClose);
    });
    dark.addEventListener("click", clickClose);
  }
}
