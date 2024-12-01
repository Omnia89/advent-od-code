const testo = document.getElementsByTagName("pre")[0].innerText;

/**
 * pacchetto Numero:
 * 3 bit            => versione pacchetto
 * 3 bit            => tipologia (= 4)
 * 5 bit (ripetuti) => UNITA (il valore del pacchetto è il valore delle unità concatenate)
 * 
 * UNITA:
 * 1 bit            => identifica se ultima unità del pacchetto (ultima unità = 0)
 * 4 bit            => valore esadecimale (da concatenare)
 * 
 * pacchetto Operazione:
 * 3 bit            => versione pacchetto 
 * 3 bit            => tipologia (= 6)
 * 1 bit            => se =0, il numero successivo (15 bit) sono il numero di bit dei sottopacchetti contenuti
 *                     se =1, il numero successivo (11 bit) sono il numero di sottopacchetti contenuti
 * 15/11 bit        => numero di bit o sottopacchetti
 * X bit            => sottopacchetti (possono essere sia Operazione che Numero) (ricursione o stack)
 */

/**
 * punteggio 1: somma di tutte le versioni
 */

class Stack {
    constructor(){
        this.stackCount = 0;
        this.elements = [];
    }

    add(obj) {
        this.elements.push(obj);
        this.stackCount++;
    }

    pop() {
        if(this.stackCount == 0) return undefined;
        this.stackCount--;
        return this.elements.pop();
    }

    check() {
        return this.elements[this.stackCount - 1];
    }

    checkIndice(n) {
        if(n < 1) return undefined;
        return this.elements[this.stackCount - 1 - (n - 1)];
    }

    get size() {
        return this.stackCount;
    }

}

class Pacchetto {
    constructor(id, stringa) {
        this.id = id;
        this.elaborato = false;
        this.hex = stringa;
        this.binario = parseInt(this.hex).toString(2);

        this.versione = undefined;
        this.tipologia = undefined;
        this.valore = undefined;
        this.tipoOperazione = undefined;
        this.numeroSub = undefined;
    }

    intestazione() {
        this.versione = parseInt(this.binario.substring(0,3), 2);
        let isNum = parseInt(this.binario.substring(3,3), 2) == 4;
        this.tipologia = isNum ? 'numero' : 'operazione';

        if(isNum) {
            let num = '';
            let idx = 0;
            while(true) {
                num += this.binario.substring(6 + idx + 1, 4);
                if(this.binario.substring(6 + idx, 1) == '0') break;
                idx += 5;
            }
            this.valore = parseInt(num, 2);
            this.elaborato = true;
        } else {
            let isBin = this.binario.substring(6, 1) == '0';
            this.tipoOperazione = isBin ? 'bit' : 'pacchetti';
            this.numeroSub = parseInt(this.binario.substring(7, isBin ? 15 : 11), 2);
        }
    }
}

const stack = new Stack();
const finiti = []
let nextId = 1;
let gerarchia = {};

let primo = new Pacchetto(nextId++, testo);
stack.add(primo);

