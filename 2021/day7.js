testo = document.getElementsByTagName("pre")[0].innerText;
listaPos = testo.split(",").filter(x => x != "").map(x => parseInt(x));

function media(lista) {
    let sum = 0;
    lista.forEach(e => sum += e);
    return sum / lista.length;
}

function moda(lista) {
    let num = {};

    lista.forEach(x => num[x] = num[x] ? 1 : num[x] + 1);

    nMax = null;
    for(const [k, v] of Object.entries(num)) {
        if(nMax == null) {
            nMax = k;
        } else {
            if(num[nMax] < v) {
                nMax = k;
            }
        }
    }

    return nMax;
}

function calcolaConsumo(pos) {
    let cons = 0;

    listaPos.forEach(e => cons += Math.abs(e - pos));

    return cons;
}

function usaMedia() {
    return calcolaConsumo(media(listaPos));
}

function usaModa() {
    return calcolaConsumo(moda(listaPos));
}

function bruteForce() {
    let minore = 9999999;
    listaPos.forEach(x => {
        let c = calcolaConsumo(x);
        if(c < minore) minore = c;
    });

    return minore;
}

function consumoSpostamento(n) {
    return (n*(n+1)) / 2;
}

function nuovoConsumo(pos) {
    let cons = 0;

    listaPos.forEach(e => cons += consumoSpostamento(Math.abs(e - pos)));

    return cons;
}

function bruteForceNew() {
    let minore = 99999999999999;
    listaPos.forEach(x => {
        let c = nuovoConsumo(x);
        if(c < minore) minore = c;
    });

    return minore;
}

//media e moda poco efficenti
//console.log("media", usaMedia());
//console.log("moda", usaModa());
console.log("brute force", bruteForce());

console.log("brute force nuovo consumo", bruteForceNew())