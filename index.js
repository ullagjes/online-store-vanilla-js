// Dette trenger jeg at javascripten min gjør:


// Handlekurven min skal være en tom array. Dermed trenger jeg en funksjon som pusher inn et nytt objekt i handlekurv-arrayetnår jeg trykker på kjøpknappen. Jeg vil lage hvert objekt på forhånd hvor innholdet har tre hoved-keys: navn på produktet, pris og bilde. Bildene må lastes opp i egen img-mappe. Dermed kan jeg også bruke disse objektene til å fylle inn nettstedet mitt. 

const MINE_VARER = document.querySelector("#mine-varer");
const MIN_HANDLEKURV = document.querySelector("#handlekurv");
let handlekurv = [];

//HENTER ALLE PRODUKTENE OG GENERER FORSIDE

let mineProdukter = [
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 1", 
    pris: 100
    },
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 2", 
    pris: 100
    },
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 3", 
    pris: 100
    },
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 4", 
    pris: 100
    },
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 5", 
    pris: 100
    },
    {
    bilde: "./images/test-bilde.jpg", 
    produkt: "Vare 6", 
    pris: 100
    },
    {
    bilde: "./images/test-bilde.jpg", 
    produkt: "Vare 7", 
    pris: 100
    },
    {
    bilde: "./images/test-bilde.jpg", 
    produkt: "Vare 8", 
    pris: 100
    },
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 9", 
    pris: 100
    },
    {
    bilde:"./images/test-bilde.jpg",
    produkt: "Vare 10", 
    pris: 100
    },
    {
    bilde: "./images/test-bilde.jpg", 
    produkt: "Vare 11", 
    pris: 100
    },
    {
    bilde: "./images/test-bilde.jpg", 
    produkt: "Vare 12", 
    pris: 100
    }
];

function forside () {
    let html = ``;
    mineProdukter.forEach(el => {
        html += `
            <div class="vare">
                <img src="${el.bilde}">
                <h2 class="varenavn">${el.produkt}</h2>
                <div class="priceAndBuy">
                    <h3 class="pris">${el.pris}</h3>
                    <button class="buyBtn">Legg i handlekurv</button>
                </div>
            </div>
            `;
    });
    MINE_VARER.innerHTML = html;
}

forside();

// LEGG TIL VARE I HANDLEKURV

let knapper = document.querySelectorAll(".buyBtn");
for(const knapp of knapper) {
    knapp.addEventListener("click", leggTilVare)
}

function leggTilVare(event) {

    let knapp = event.target;
    let trykketInnhold = knapp.parentElement.parentElement;
    let minVare = trykketInnhold.querySelector(".varenavn").innerText;
    let minPris = trykketInnhold.querySelector(".pris").innerText;
    let mittBilde = trykketInnhold.querySelector("img").src;
    
    handlekurv.push(
        {
        bilde: mittBilde,
        vare: minVare, 
        pris: minPris
        }
        );


    let html = ``;
    handlekurv.forEach(el => {
        html +=`
        <div class="handlekurvElement">
                <img src=${el.bilde}>
                <span class="handlekurvProdukt">${el.vare}</span>
                <span class="handlekurvPris">${el.pris}</span>
                <input class="handlekurvKvantitet" type="number"> 
                <button class="fjernFraHandlekurv">Fjern</button>
            </div>
            `
    });

    MIN_HANDLEKURV.innerHTML = html;

    let fjernKnapper = document.querySelectorAll(".fjernFraHandlekurv");

    for(const fjernKnapp of fjernKnapper) {
    fjernKnapp.addEventListener("click", fjernVare);
    }   

    console.log(handlekurv);
}

//FJERNKNAPPER - denne funksjonen fjerner både innholdet i arrayet og html-innholdet i handlekurven

function fjernVare(event) {
    let fjernObjekt = event.target;
    fjernObjekt = fjernObjekt.parentElement.remove();
    fjernObjekt = handlekurv.shift();
    console.log(handlekurv);
}






// grunnleggende struktur for funksjon til flere knapper

/*let knapper = document.querySelectorAll(".buyBtn");

for(const knapp of knapper) {
    knapp.addEventListener("click", test)
}

function test() {
    console.log("hei");
}*/
