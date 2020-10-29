
import {mineProdukter} from "./mine-produkter.js"
const MINE_VARER = document.querySelector("#mine-varer");

//______________________________________________________FORSIDE

// Henter objekter fra et importert array og lager HTML på forsiden.

let html = ``;
mineProdukter.forEach(el => {
    html += `
        <div class="vare">
            <img src="${el.bilde}" alt="${el.alt}">
            <h2 class="varenavn">${el.produkt}</h2>
            <div class="priceAndBuy">
                <h3 class="pris">${el.pris}</h3>
                <button class="buyBtn">Legg i handlekurv</button>
            </div>
        </div>
            `;
    });
MINE_VARER.innerHTML = html;

//______________________________________________________HANDLEKURV

const MIN_HANDLEKURV = document.querySelector("#handlekurv");
let handlekurv = [];

let knapper = document.querySelectorAll(".buyBtn");
for (const knapp of knapper) {
    knapp.addEventListener("click", leggTilVare)
    knapp.addEventListener("click", visHandlekurv)
}

//______________________________________________________HANDLEKURV: LEGG TIL-FUNKSJON

//Knytter "click"-eventen fra leggTilVare-funksjonen til alle "legg i handlekurv"-knappene mine på forsiden. Pusher videre objekter inn i nytt array.
// Oppretter ny HTML inne i handlekurven.
//Legger også til fjern-funksjon på knappene som opprettes i handlekurven.
//Kaller også på funkjsonen som summerer total sum i handlekurven.

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
        pris: Number(minPris),
        id:""
        }
    );
    
    //Her benytter jeg meg av en loop som lager et nytt tall for handlekurv-key id. Dermed vil hver vare som legges til i handlekurv ha en unik id. Dette er en fordel dersom bruker legger til flere av samme vare i handlevognen og kanskje ønsker å slette én av varene. 

    for(let i = 0; i < handlekurv.length; i++){
        handlekurv[i].id = "produkt-" + i;
    }

    let html = ``;
    handlekurv.forEach(el => {
        html += `
        <div class="handlekurvElement ${el.id}">
                <img src=${el.bilde} alt="${el.alt}">
                <span class="handlekurvProdukt">${el.vare}</span>
                <span class="handlekurvPris">${el.pris}</span>
                <button class="fjernFraHandlekurv">Fjern</button>
        </div>
        `
    });
    MIN_HANDLEKURV.innerHTML = html;    
    
    //Legger til eventlistener på fjernknapper
    let fjernKnapper = document.querySelectorAll(".fjernFraHandlekurv");

    for (const fjernKnapp of fjernKnapper) {
        fjernKnapp.addEventListener("click", fjernVare);
    }

    oppdaterHandlevogn();
}

//______________________________________________________HANDLEKURV: FJERN-FUNKSJON

//Fjerner innholdet i handlekurv-arrayet og handlekurv-HTML for hver vare.
//Gir også bruker beskjed når handlekurven er tom.
//Kaller samme funksjon for å oppdatere totalsummen i handlekurven.

function fjernVare(event) {
    let fjernObjekt = event.target;
    let valgtProdukt = fjernObjekt.parentElement;
    let valgtProduktNavn = valgtProdukt.querySelector(".handlekurvProdukt").innerText;
    
    for(let i = 0; i < handlekurv.length; i++) {

        if(handlekurv[i].vare === valgtProduktNavn && valgtProdukt.classList.contains(handlekurv[i].id)) {
            handlekurv.splice(i, 1);
            fjernObjekt.parentElement.remove();
            }
        }

        if (handlekurv.length === 0) {
        MIN_HANDLEKURV.innerHTML = `
        <div id="handlekurv"><p>Du har ingen varer i handlekurven.</p>
            </div>
        `
        }

    oppdaterHandlevogn();
}

//______________________________________________________HANDLEKURV: TOTAL-SUM

//Sum baserer seg på pris-value i handlekurv-arrayet.
//Summen vises både i handlekurv og i navigasjonsbar på forsiden

let minSumHer = document.querySelector(".sumHer");
let sumDisplayMainPage = document.querySelector("#desktopSum");

function oppdaterHandlevogn () {
    let sumHer = 0;

    for(let i = 0; i < handlekurv.length; i++){
        sumHer += handlekurv[i].pris;
    }
    minSumHer.innerText = sumHer + "kr";
    sumDisplayMainPage.innerText = sumHer + "kr";
}


//______________________________________________________HANDLEKURV: VIS OG SKJUL HANDLEKURV-DIV

//Bruker boolean + if-setning for å gjøre handlekurven synlig og usynlig når bruker trykker på kurv-ikonet eller direkte på overlay.

const KURV_IKON = document.querySelector("#handlekurvBtn");
let overlayEffect = document.querySelector("#overlay");

let knappTrykket = true;

function visHandlekurv() {

    KURV_IKON.style.backgroundColor = "transparent";
    KURV_IKON.style.border = "none";

    if (knappTrykket === true) {
        handlekurvGrid.style.top = "45vh";
        handlekurvGrid.style.right = "0";
        KURV_IKON.style.backgroundColor = "#a37eba";
        KURV_IKON.style.border = "1px solid black";
        KURV_IKON.innerHTML = `<span id="kryss">X</span>`
        overlayEffect.style.height = "250%";
        overlayEffect.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    } else {
        handlekurvGrid.style.top = "-300vh";
        handlekurvGrid.style.right = "0";
        overlayEffect.style.height = "0%";
        KURV_IKON.innerHTML = `<img id="minHandlekurvLogo" src="./images/shopping-cart-icon.png">`;
    }

    knappTrykket = !knappTrykket;
}

KURV_IKON.addEventListener("click", visHandlekurv);
overlayEffect.addEventListener("click", visHandlekurv);

//______________________________________________________FILTRERING 

//Bruker .filter på arrayet som inneholder alle produktene for nettsiden.
// Oppretter dermed HTML basert på innholdet i det filtrerte arrayet. 

const alleVarer = document.querySelector(".alleVarer");

function nyForside() {
    let html = ``;
    mineProdukter.forEach(el => {
        html += `
            <div class="vare">
                <img src="${el.bilde}" alt="${el.alt}">
                <h2 class="varenavn">${el.produkt}</h2>
                <div class="priceAndBuy">
                    <h3 class="pris">${el.pris}</h3>
                    <button class="buyBtn">Legg i handlekurv</button>
                </div>
            </div>
            `;
    });
    MINE_VARER.innerHTML = html;
    let knapper = document.querySelectorAll(".buyBtn");
    for (const knapp of knapper) {
    knapp.addEventListener("click", leggTilVare)
    knapp.addEventListener("click", visHandlekurv)
    }
}

alleVarer.addEventListener("click", nyForside)

const lampe = document.querySelector(".lamper");
const bord = document.querySelector(".bord");
const stoler = document.querySelector(".stoler");


function filtrer(event){
    let filterKnapp = event.target;
    let filtrerteProdukter = mineProdukter.filter(el => 
    el.id === filterKnapp.innerText)
    ;
    MINE_VARER.innerHTML = ``

    let html = ``;
    filtrerteProdukter.forEach(el => {
        html += `
            <div class="vare">
                <img src="${el.bilde}" alt="${el.alt}">
                <h2 class="varenavn">${el.produkt}</h2>
                <div class="priceAndBuy">
                    <h3 class="pris">${el.pris}</h3>
                    <button class="buyBtn">Legg i handlekurv</button>
                </div>
            </div>
            `;
    
    });

    MINE_VARER.innerHTML = html;
    let knapper = document.querySelectorAll(".buyBtn");
    for (const knapp of knapper) {
    knapp.addEventListener("click", leggTilVare)
    knapp.addEventListener("click", visHandlekurv)
    }
}
lampe.addEventListener("click", filtrer)
bord.addEventListener("click", filtrer)
stoler.addEventListener("click", filtrer)

//______________________________________________________BILDEGALLERI/INSPIRASJON

//Når bruker trykker på "Bli inspirert" i navigasjons-baren, dukker det opp et bildegalleri. 
//Bildegalleriet baserer seg på et eget array.
//Bruker boolean og if-setning for å vise og skjule galleriet.

let inspirasjonKnapp = document.querySelector(".inspirasjonGalleri");
const inspirasjon = document.querySelector("#inspirasjon");
const bildeGalleri = ["./images/inspiration/art-deco-interior-1.jpg", "./images/inspiration/art-deco-interior-2.jpg", "./images/inspiration/art-deco-interior-3.jpg", "./images/inspiration/art-deco-interior.jpg"];

let inspirasjonTrykket = true;

function visBildegalleri() {
    
    let i = 1;
    function byttBilde() {
        if(i >= bildeGalleri.length) {
            i = 0;
        }
        
        const nyttBilde = bildeGalleri[i];
        inspirasjon.innerHTML = `<img src="${nyttBilde}">`;
        i++;
    }

    if (inspirasjonTrykket === true) {
        inspirasjonKnapp.innerHTML = `<span id="kryssUt" class="active">X</span> Bli inspirert`
        inspirasjon.innerHTML = `<img src="./images/inspiration/art-deco-interior.jpg" alt="bilde av art-deco-inspirert interiør">`
        inspirasjon.style.visibility = "visible";
        inspirasjon.style.height = "80vh"

        inspirasjon.addEventListener("click", byttBilde)
        inspirasjon.style.paddingTop = "1em"
        
    } else {
        inspirasjonKnapp.innerText = "Bli inspirert"
        inspirasjon.style.visibility = "hidden";
        inspirasjon.style.height = "0"
        inspirasjonKnapp.classList.remove("active")
    }
    inspirasjonTrykket = !inspirasjonTrykket;
}

inspirasjonKnapp.addEventListener("click", visBildegalleri);


//______________________________________________________SØKEFUNKSJON

//Bruker .filter og value for text-input for å endre arrayet for alle produktene for nettsiden.
//Oppretter ny HTML basert på det oppdaterte arrayet.

let searchBar = document.querySelector("#searchField");

function search(event) {
    let mySearch = event.target.value.toLowerCase();

    let mySearchArray = mineProdukter.filter((el) => {
        return (el.id.toLowerCase().includes(mySearch) || el.produkt.toLowerCase().includes(mySearch));
    });

    MINE_VARER.innerHTML = ``
    
        let html = ``;
        mySearchArray.forEach(el => {
            html += `
                <div class="vare">
                    <img src="${el.bilde}" alt="${el.alt}">
                    <h2 class="varenavn">${el.produkt}</h2>
                    <div class="priceAndBuy">
                        <h3 class="pris">${el.pris}</h3>
                        <button class="buyBtn">Legg i handlekurv</button>
                    </div>
                </div>
                `;
        
        });
    MINE_VARER.innerHTML = html;

    let knapper = document.querySelectorAll(".buyBtn");
    for (const knapp of knapper) {
    knapp.addEventListener("click", leggTilVare)
    knapp.addEventListener("click", visHandlekurv)
    }
}

searchBar.addEventListener("keyup", search) 
