// la riga usata come "perno" per fare il fold, in teoria non avrà mai punti, ma comunque dopo il fold viene tolta

testo = document.getElementsByTagName("pre")[0].innerText;
temp = testo.split("\n\n");
let coordinate = temp[0].split("\n").filter(x => x != "");
let foldings = temp[1].split("\n").filter(x => x != "");

let xMax = 0;
let yMax = 0;

coordinate = coordinate.map(el => {
    let t = el.split(",");

    let x = parseInt(t[0]);
    let y = parseInt(t[1]);

    return {x, y};
});

foldings = foldings.map(el => {
    const match = el.match(/([xy])\=(\d+)/);

    let v = parseInt(match[2]);
    if(match[1] === 'x') {
        xMax = Math.max(xMax, v);
    } else {
        yMax = Math.max(yMax, v);
    }

    return {
        foldAlong: match[1],
        value: parseInt(v)
    }
});

xMax = xMax * 2 + 1;
yMax = yMax * 2 + 1;

let griglia = [];

for(let r = 0; r < yMax; r++){
    let riga = [];
    for(let c = 0; c < xMax; c++){
        riga.push(0);
    }
    griglia.push(riga);
}

coordinate.forEach(p => {
    griglia[p.y][p.x] = 1;
});
/*
console.log("test---------");
griglia = [
    [0,0,0],
    [0,1,1],
    [0,1,0],
    [0,1,0],
    [0,0,0],
    [1,0,1],
    [0,0,0],
];

foldings = [
    {
        foldAlong: 'y',
        value: 3
    }
]

xMax = 2;
yMax = 6;
*/
function piega(fold) {
    // la piega non è per forza a metà, e in caso sia meno di metà, la parte in basso o a dx sarà sempre più piccola
    let ris = [];
    if(fold.foldAlong === 'x') {

        /*
        for(let y = 0; y < griglia.length; y++){
            let r = [];
            let i;
            let limite = fold.value - (griglia[0].length - fold.value - 1);
            for(i = 0; i < limite; i++) {
                r.push(griglia[y][i]);
            }
            let step = 1;
            for(; i < fold.value; i++) {
                r.push(griglia[y][i] || griglia[y][griglia[y].length - step]);
                step++;
            }
            ris.push(r);
        }*/

        for(let y = 0; y < griglia.length; y++){
            let r = [];
            for(let i = 0; i < fold.value; i++) {
                let step = griglia[0].length - (i + 1);
                r.push(griglia[y][i] || griglia[y][step]);
            }
            ris.push(r);
        }

    } else {

        for(let y = 0; y < fold.value; y++) {
            /*
            let r = [];
            let i;
            let limite = fold.value - (griglia.length - fold.value - 1);
            if(y < limite) {
                for(let x = 0; x < griglia[0].length; x++){
                    r.push(griglia[y][x]);
                }
            } else {
                let step = 1;
                for(let x = 0; x < griglia[0].length; x++){
                    r[x] = griglia[y][x] || griglia[griglia.length - step][x];
                    step++;
                }
            }

            ris.push(r);
            */
            let r = [];
            let step = 1;
            for(let x = 0; x < griglia[0].length; x++){
                let step = griglia.length - (y + 1);
                r[x] = griglia[y][x] || griglia[step][x];
            }

            ris.push(r);
        }

    }

    return ris;
}

function conta() {
    let con = 0;
    for (let r = 0; r < griglia.length; r++) {
        for (let c = 0; c < griglia[0].length; c++) {
            if(griglia[r][c] == 1) con++;
        }
    }
    return con;
}


//console.log("griglia[0].length", griglia[0].length);
//console.log("griglia.length", griglia.length);


griglia = piega(foldings[0]);

//console.log("piega", foldings[0]);
//console.log("griglia[0].length", griglia[0].length);
//console.log("griglia.length", griglia.length);

primo = true;
foldings.forEach(f => {
    griglia = piega(f);
    if(primo) {
        primo = false;
        let punti = conta();
        console.log("punti 1 piega", punti);
    }
});

console.log("griglia!");
righe = griglia.map(r => {
    r.join("");
}).join("\n");
console.log(righe);