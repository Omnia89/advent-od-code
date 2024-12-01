// primo step => 78 è sbagliato , 378 sbagliato

testo = document.getElementsByTagName("pre")[0].innerText;
listaTmp = testo.split("\n").filter(x => x != "");

let valori = [];

listaTmp.forEach(el => {
    let riga = el.split(/\s+\|\s+/);

    valori.push({
        digits: riga[0].split(/\s/).filter(x => x != "").map(x => x.trim()),
        output: riga[1].split(/\s/).filter(x => x != "").map(x => x.trim())
    });
});

valori = valori.map(x => {
    return {
        ...x,
        map: {
            0: '',
            1: x.digits.filter(x => x.length == 2)[0],
            2: '',
            3: '',
            4: x.digits.filter(x => x.length == 4)[0],
            5: '',
            6: '',
            7: x.digits.filter(x => x.length == 3)[0],
            8: x.digits.filter(x => x.length == 7)[0],
            9: ''
        },
        check: function (numDaControllare) {
            let n = 0;
            numDaControllare.forEach(nn => {
                if(this.output.includes(this.map[nn])){
                    n++;
                }
            });
            return n;
        },
        checkIgnorante: function() {
            let out = this.output.join(" ");
            let n = 0;
            if(out.match(/(?:^|\s)[a-z]{2}(?:\s|$)/)) { n++; }
            if(out.match(/(?:^|\s)[a-z]{3}(?:\s|$)/)) { n++; }
            if(out.match(/(?:^|\s)[a-z]{4}(?:\s|$)/)) { n++; }
            if(out.match(/(?:^|\s)[a-z]{7}(?:\s|$)/)) { n++; }
            return n;
        }
    };
});

let conta = 0;
let contaIgnorante = 0;

valori.forEach(x => {
    /*
    for(let i = 0; i < 10; i++) {
        if(x.output.includes(x.map[i])) conta++;
    }*/
    conta += x.check([1,4,7,8]);
    contaIgnorante += x.checkIgnorante();
});

console.log("numero di 1, 4, 7 e 8", conta);
console.log("ignorante", contaIgnorante);