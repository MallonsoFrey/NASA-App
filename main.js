import {main, apodLink, getData} from "./apod";

apodLink.addEventListener("mouseover", function() {
    this.textContent = "Astronomy Picture of the Day";
});

apodLink.addEventListener("mouseout", function() {
    this.textContent = "APOD";
});

apodLink.addEventListener("click", getData);