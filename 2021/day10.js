testo = document.getElementsByTagName("pre")[0].innerText;
righe = testo.split("\n").filter(x => x != "");

const aperture = '([<{';
const chiusure = ')]>}';

const coppie = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
}

const coppie2 = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}


const punteggi = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

let punteggio = 0;
righe.forEach(riga => {
    let stack = [];
    for(let i = 0; i < riga.length; i++){
        let char = riga[i];
        if(aperture.includes(char)) {
            stack.push(char);
        } else if(chiusure.includes(char)) {
            let p = stack.pop();
            if(p != coppie[char]) {
                punteggio += punteggi[char];
                break;
            }
        } else {
            console.log("errore, carattere non conosciuto", char);
        }
    }
});

console.log("punteggio", punteggio);

const punteggi2 = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

let incomplete = [];
righe.forEach(riga => {
    let stack = [];
    for(let i = 0; i < riga.length; i++){
        let char = riga[i];
        if(aperture.includes(char)) {
            stack.push(char);
        } else if(chiusure.includes(char)) {
            let p = stack.pop();
            if(p != coppie[char]) {
                stack = [];
                break;
            }
        } else {
            console.log("errore, carattere non conosciuto", char);
        }
    }
    if(stack.length > 0) {
        let chiusa = "";
        chiusa = stack.reverse().map(x => coppie2[x]).join('');

        let punti = 0;
        for(let k = 0; k < chiusa.length; k++) {
            punti *= 5;
            punti += punteggi2[chiusa[k]];
        }

        incomplete.push(punti);
    }
});

incomplete = incomplete.sort(function(a,b){return a - b});

console.log("punteggi 2", incomplete[Math.floor(incomplete.length / 2)]);