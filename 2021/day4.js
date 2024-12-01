function risolvi(testo) {
//testo = '';

// il primo indice sono le estazioni, le altre 100 sono le tessere
tessere = testo.split("\n\n");

chiamate = tessere.shift();
chiamate = chiamate.split(',').map(x => parseInt(x));

// trasformo le tessere in un'array di matrici
console.log("inizio creazione tabelle");
for(ii = 0; ii < tessere.length; ii++) {
    righe = tessere[ii].split("\n");
    righe = righe.filter(x => x != '').map(x => x.trim());
    for(j = 0; j < 5; j++){
        t = righe[j].split(/\s+/);
        righe[j] = t.map(x => parseInt(x))
    }
    tessere[ii] = righe;
}
console.log("fine tabelle");
console.log("creo clone tabella");

tessereSegnate = [];

for (indice = 0; indice < tessere.length; indice++){
    tessereSegnate.push(
        [
            [1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [1,1,1,1,1]
        ]
    );
}
console.log("fine clone");

const sommaTessera = (indiceTessera) => {
    temp_sum = 0;
    for(let tr = 0; tr < 5; tr++){  
        for(let tc = 0; tc < 5; tc++){
            temp_sum += tessere[indiceTessera][tr][tc] * tessereSegnate[indiceTessera][tr][tc];
        }
    }
    return temp_sum;
}


const segna_controlla = (iTessera, numero) => {
    for(i = 0; i < 5; i++){
        pos = tessere[iTessera][i].indexOf(numero);
        if(pos != -1) {
            tessereSegnate[iTessera][i][pos] = 0;
        }
    }

    cols = [0,0,0,0,0];
    sum = 0;
    vinto = false;
    for(i = 0; i < 5; i++) {
        check = tessereSegnate[iTessera][i][0] 
            + tessereSegnate[iTessera][i][1] 
            + tessereSegnate[iTessera][i][2] 
            + tessereSegnate[iTessera][i][3]
            + tessereSegnate[iTessera][i][4];
        if(check == 0) { vinto = true; }
        
        cols[0] += tessereSegnate[iTessera][i][0];
        cols[1] += tessereSegnate[iTessera][i][1];
        cols[2] += tessereSegnate[iTessera][i][2];
        cols[3] += tessereSegnate[iTessera][i][3];
        cols[4] += tessereSegnate[iTessera][i][4];
    }
    if(cols.indexOf(0) != -1) { vinto = true; }

    if(vinto) {
        return sommaTessera(iTessera) * numero;
    }

    return false;
}

ultimoRisultato = 0;
n = 1;
ordineVittoria = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
punteggi = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
for(m = 0; m < chiamate.length; m++){
    console.log("estrazione", m);
    
    for(k = 0; k < tessere.length; k++) {
        if(ordineVittoria[k] == 0) {
            ris = segna_controlla(k, chiamate[m]);
            if(ris != false) {
                //console.log("schedina vincente n:", k);
                //ultimoRisultato = ris;
                //break;
                ordineVittoria[k] = n++;
                punteggi[k]=ris;
            }
        }
    }
    //if(ultimoRisultato != 0){
    //    break;
    //}
}

//console.info("Ultimo vincitore", ultimoRisultato);
ultimo = ordineVittoria.indexOf(100);
console.info("ultimo", punteggi[ultimo]);
}