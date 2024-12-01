testo = document.getElementsByTagName("pre")[0].innerText;
righeTmp = testo.split("\n").filter(x => x != "");

let griglia = [];

righeTmp.forEach(r => {
    griglia.push(r.split("").map(x => parseInt(x)));
});

function pulsa(punto) {
    const xMin = punto.x > 0 ? -1 : 0;
    const xMax = punto.x < 9 ? +1 : 0;
    
    const yMin = punto.y > 0 ? -1 : 0;
    const yMax = punto.y < 9 ? +1 : 0;

    const aumentati = [];
    for (let xx = xMin; xx <= xMax; xx++) {
        for (let yy = yMin; yy <= yMax; yy++) {
            griglia[punto.y + yy][punto.x + xx]++;
            if(griglia[punto.y + yy][punto.x + xx] > 9) {
                aumentati.push({
                    x: punto.x + xx,
                    y: punto.y + yy
                })
            }
        }
    }
    
    return aumentati;
}

function turno() {

    let pulsati = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];

    let todo = [];

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            let t = ++griglia[r][c];
            if(t > 9) {
                todo.push({
                    x: c,
                    y: r
                });
            }
        }
    }
    
    let conta = 0;

    while(todo.length > 0) {
        let p = todo.pop();
        if(pulsati[p.y][p.x] == 0) {
            conta++;
            pulsati[p.y][p.x] = 1;
            todo.push(...pulsa(p));
        }
    }

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            if(griglia[r][c] > 9) {
                griglia[r][c] = 0;
            }
        }
    }

    return conta;
}

/*
let punteggio = 0;

for (let tt = 0; tt < 100; tt++) {
    punteggio += turno();
}

console.log("punteggio", punteggio);
*/
let turni = 0;
while(true) {
    turni++;
    let pp = turno();
    if(pp == 100) break;
}

console.log("turni", turni);