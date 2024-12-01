function calcoloRicorsivo() {
testo = document.getElementsByTagName("pre")[0].innerText;
listaTmp = testo.split(",").filter(x => x != "")
pesci = listaTmp.map(x => parseInt(x));

for (let ciclo = 0; ciclo < 80; ciclo++) {
    if(ciclo % 10 == 0) console.log("ciclo", ciclo);
    let nuovi = 0;
    pesci = pesci.map(x => {
        if(x == 0){
            nuovi++;
            return 6;
        } else {
            return x - 1;
        }
    });
    
    for(let i = 0; i < nuovi; i++) {
        pesci.push(8);
    }
}

console.log("numero pesci", pesci.length);
}

// per i 256
function calcoloFurbo(giorni) {
    // meglio fare un array/object con la key il numero di giorni rimanenti, ed il valore il numero di pesci
    // e mano a mano sposto i valori, in questo modo non creo un array gargantuesco
    testo = document.getElementsByTagName("pre")[0].innerText;
    listaTmp = testo.split(",").filter(x => x != "")
    listaPesci = listaTmp.map(x => parseInt(x));

    const pesci = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };

    listaPesci.forEach(x => {
        pesci[x]++;
    });

    for (let ciclo = 0; ciclo < giorni; ciclo++) {
        if(ciclo % 10 == 0) console.log("ciclo", ciclo);

        nuovi = pesci[0];

        pesci[0] = pesci[1];
        pesci[1] = pesci[2];
        pesci[2] = pesci[3];
        pesci[3] = pesci[4];
        pesci[4] = pesci[5];
        pesci[5] = pesci[6];
        pesci[6] = pesci[7] + nuovi;
        pesci[7] = pesci[8];
        pesci[8] = nuovi;
    }

    s = 0;
    for(let i = 0; i < 9; i++){
        s += pesci[i];
    }

    console.log("numero pesci", s);
}