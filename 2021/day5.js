testo = document.getElementsByTagName("pre")[0].innerText;
listaTmp = testo.split("\n").filter(x => x != "")
linee = [];

for(let i = 0; i < listaTmp.length; i++){
    linee.push(listaTmp[i].split(/\s*->\s*/))
}

linee = linee.map(x => {
    temp1 = x[0].split(',');
    temp2 = x[1].split(',');

    return {
        start: {
            x: parseInt(temp1[0]),
            y: parseInt(temp1[1])
        },
        end: {
            x: parseInt(temp2[0]),
            y: parseInt(temp2[1])
        }
    }
});

// immagino un max di 1000 come griglia
const griglia = [];
for(let i = 0; i < 1000; i++) {
    riga = [];
    for(let j = 0; j < 1000; j++) {
        riga.push(0); // metto 0 al posto del punto per facilitare i conti e confronti
    }
    griglia.push(riga);
}

function trovaIndice(inizio, fine, indice, delta) {
    const x = [];
    const y = [];

    const stepX = inizio.x < fine.x ? 1 : -1;
    const stepY = inizio.y < fine.y ? 1 : -1;

    xi = inizio.x;
    n = 0;
    while (n <= delta) {
        x.push(xi);
        xi += stepX;
        n++;
    }

    yi = inizio.y;
    n = 0;
    while (n <= delta) {
        y.push(yi);
        yi += stepY;
        n++;
    }

    return {
        x: x[indice],
        y: y[indice],
    }
}

linee.forEach(l => {
    if (l.start.x == l.end.x) {
        //linea verticale
        let min = Math.min(l.start.y, l.end.y);
        let max = Math.max(l.start.y, l.end.y);

        for (let i = min; i <= max; i++) {
            griglia[i][l.start.x]++;
        }
    } else if (l.start.y == l.end.y) {
        //linea orizzontale
        let min = Math.min(l.start.x, l.end.x);
        let max = Math.max(l.start.x, l.end.x);

        for (let i = min; i <= max; i++) {
            griglia[l.start.y][i]++;
        }
    } else {
        // diagonale
        let delta = Math.abs(l.start.x - l.end.x);
        for(let i = 0; i <= delta; i++){
            let ind = trovaIndice(l.start, l.end, i, delta);
            griglia[ind.y][ind.x]++;
        }
    }
});

conta = 0;
for(let i = 0; i < 1000; i++) {
    for(let j = 0; j < 1000; j++) {
        if(griglia[i][j] > 1) conta++;
    }
}

console.log("numero intersezioni", conta);