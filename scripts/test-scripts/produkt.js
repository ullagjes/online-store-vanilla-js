let mittHovedbilde = document.querySelector(".mainProduktContainer");

const bildePreview = document.getElementsByTagName("img");

let bildeAlternativ1 = document.querySelector(".preview");
let bildeAlternativ2 = document.querySelector(".preview2");
let bildeAlternativ3 = document.querySelector(".preview3");

function bytteBilde(event) {
    mittHovedbilde.innerHTML = ``;

    if(event.target === bildeAlternativ2){
        mittHovedbilde.innerHTML += `<img class="mainProdukt" src="images/chair/deco-chair-1-side.jpg">`;
    }

    if(event.target === bildeAlternativ3){
        mittHovedbilde.innerHTML = ``;

        mittHovedbilde.innerHTML += `<img class="mainProdukt" src="images/test-bilde-3.jpg">`;
    }

    if(event.target === bildeAlternativ1) {
        mittHovedbilde.innerHTML += `<img class="mainProdukt" src="images/test-bilde.jpg">`;
    }

}

bildeAlternativ1.addEventListener("mouseover", bytteBilde);
bildeAlternativ2.addEventListener("mouseover", bytteBilde);
bildeAlternativ3.addEventListener("mouseover", bytteBilde);
