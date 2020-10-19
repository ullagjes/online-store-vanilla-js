let varer = document.querySelectorAll('.varenavn');
let alleVarer = document.querySelector("#mine-varer");


for(const vare of varer) {
    vare.addEventListener("click", utvidVare);
}


let vareUtvidet = true;

function utvidVare(event) {
    let vareKlikket = event.target;
    let områdeKlikket = vareKlikket.parentElement;
    if(vareUtvidet === true) {
        alleVarer.innerHTML = `<p>hei</p>`;
        
        } else {
            områdeKlikket.classList.remove("vareUtvidet");
        }
    vareUtvidet = !vareUtvidet;
}

