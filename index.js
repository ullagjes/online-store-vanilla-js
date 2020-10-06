// Dette trenger jeg at javascripten min gjør:


// Handlekurven min skal være en tom array. Dermed trenger jeg en funksjon som gjør at når jeg trykker på knappen
// "kjøp", legger den til navnet på varen, bildet og prisen. Her må jeg lage en universell funksjon med gitte 
// parametere, slik at jeg kan koble ulike knapper til den samme funksjonen, men legge til de unike parameterne
// for den spesifikke varen. Dermed på knappene mine være unike og angi parameteren som skal legges inn i 
// handlekurv-arrayet. 
// Inne i handlekurven - som vil være en div i html-dokumentet mitt, må prisen for hver vare som legges til, 
// summeres. Dette kan antakelig legges til samme funksjon som ovenfor. 
// Det skal også være mulig å slette en vare, og dermed må summen i handlevognen endre seg. Altså må en ny knapp 
// opprettes for hver gang arrayet oppdateres med en ny vare. 

const handlekurv = document.querySelector("#handlekurv");


function handle(vare, pris) {
    let handlekurvInnhold = [];
    handlekurvInnhold.push(vare, pris);
    console.log(handlekurvInnhold);
}

handle("kjole", 200);