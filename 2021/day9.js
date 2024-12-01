testo = document.getElementsByTagName("pre")[0].innerText;
righeTmp = testo.split("\n").filter(x => x != "");

let griglia = [];

let puntiBassi = [];
let visitati = [];

righeTmp.forEach(el => {
    let els = el.split("");
    griglia.push(els.map(x => parseInt(x)));
    let ar = [];
    for(let i = 0; i < els.length; i++) { ar.push(0); }
    visitati.push(ar);
});

let xMax = griglia[0].length;
let yMax = griglia.length;

function controllaDintorni(x, y) {
    let check = griglia[y][x];

    let n = griglia[y - 1] ? griglia[y - 1][x] : 99;
    let s = griglia[y + 1] ? griglia[y + 1][x] : 99;
    let w = griglia[y][x - 1] ?? 99;
    let e = griglia[y][x + 1] ?? 99;

    
    return (n > check) && 
        (s > check) &&
        (w > check) &&
        (e > check);
}

for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
        if(controllaDintorni(x, y)) {
            puntiBassi.push({
                x: x,
                y: y,
                val: griglia[y][x]
            });
        }
    }
}

let rischio = 0;
puntiBassi.forEach(x => {
    rischio += x.val + 1;
});

console.log("rischio 1", rischio);

function visita(conta, x, y) {

    if(griglia[y][x] == 9) return conta;

    visitati[y][x] = 1;
    
    conta++;

    if(x > 0 && visitati[y][x - 1] == 0) {
        conta = visita(conta, x - 1, y);
    }

    if(x < xMax - 1 && visitati[y][x + 1] == 0) {
        conta = visita(conta, x + 1, y);
    }

    if(y > 0 && visitati[y - 1][x] == 0) {
        conta = visita(conta, x, y - 1);
    }

    if(y < yMax - 1 && visitati[y + 1][x] == 0) {
        conta = visita(conta, x, y + 1);
    }

    return conta;
}

let grandezze = [];
puntiBassi.forEach(el => {
    let n = visita(0, el.x, el.y);
    el.nPunti = n;
    grandezze.push(n);
});

gradezze = grandezze.sort(function(a,b){return a - b}).reverse();

let rischioCrateri = grandezze[0] * grandezze[1] * grandezze[2];
console.log("rischio 2 ", rischioCrateri);