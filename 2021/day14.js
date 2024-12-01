testo = document.getElementsByTagName("pre")[0].innerText;
let [catena, coppieTmp] = testo.split("\n\n");
let righe = coppieTmp.split("\n").filter(x => x != "");

const coppie = {};

righe.forEach(el => {
    let [chiave, val] = el.split(/\s+\-\>\s+/);
    coppie[chiave] = val;
});

// parte 1
const cicli = 10;

for(let n = 0; n < cicli; n++){
    let nuovaCatena = "";
    for(let i = 0; i < catena.length - 1; i++) {
        let coppia = catena.substr(i, 2);
        let mezzo = coppie[coppia];
        nuovaCatena += coppia[0] + mezzo;
    }
    nuovaCatena += catena.substr(-1);
    catena = nuovaCatena;
}

function conteggia() {
    const conta = {};

    for(let i = 0; i < catena.length; i++) {
        if(conta[catena[i]] === undefined) {
            conta[catena[i]] = 1;
        } else {
            conta[catena[i]] += 1;
        }
    }

    return conta;
}

let score = conteggia();

const charMax = {
    char: '',
    val: 0
};

const charMin = {
    char: '',
    val: 999999
};


for (const [key, val] of Object.entries(score)) {
    if(val > charMax.val) {
        charMax.char = key;
        charMax.val = val;
    }

    if(val < charMin.val) {
        charMin.char = key;
        charMin.val = val;
    }
}

console.log("min", charMin);
console.log("max", charMax);
console.log("punteggio", charMax.val - charMin.val);

// parte 2

const [template, ruleString] = testo.split('\n\n');
const rules = ruleString.split('\n').map(rule => rule.split(' -> '));

// create chunks from template
const chunks = {};
for (let i = 0; i < template.length - 1; i++) {
  if (!chunks[template.slice(i, i + 2)]) {
    chunks[template.slice(i, i + 2)] = 1;
  } else {
    chunks[template.slice(i, i + 2)]++;
  }
}

const rules_2 = rules.map(rule => [rule[0], [rule[0][0] + rule[1], rule[1] + rule[0][1]]]);

// initialize all other possible chunks with 0
rules_2.forEach(rule => {
  if (chunks[rule[0]] === undefined) {
    chunks[rule[0]] = 0;
  }
  if (chunks[rule[1][0]] === undefined) {
    chunks[rule[1][0]] = 0;
  }
  if (chunks[rule[1][1]] === undefined) {
    chunks[rule[1][1]] = 0;
  }
});

console.log('chunks at begin:', chunks);

const rulesTable = Object.fromEntries(rules_2);
console.log('rules table:', rulesTable);

function polymerization(chunks, rules) {
  const newChunks = {};
  for (const key in chunks) {
    if (chunks[key]) {
      for (const newChunk of rules[key]) {
        if (!newChunks[newChunk]) {
          newChunks[newChunk] = chunks[key];
        } else {
          newChunks[newChunk] += chunks[key];
        }
      }
    }
  }
  return newChunks;
}

function calcChars(chunks) {
  const charTable = {};
  for (const keyString in chunks) {
    if (chunks[keyString]) {
      for (const char of keyString) {
        if (!charTable[char]) {
          charTable[char] = chunks[keyString];
        } else {
          charTable[char] += chunks[keyString];
        }
      }
    }
  }
  charTable.K++;
  charTable.F++;
  for (const key in charTable) {
    charTable[key] = charTable[key] / 2;
  }
  return charTable;
}

let newChunks = {...chunks};
for (let i = 0; i < 40; i++) {
  newChunks = polymerization(newChunks, rulesTable);
}
console.log('chunks after 40 polymerization:', newChunks);
const charTable = calcChars(newChunks);
const charValues = Object.values(charTable).sort((a, b) => b - a);
const result = charValues[0] - charValues[charValues.length - 1];
console.log("primo", charValues[0], "secondo", charValues[charValues.length - 1]);
console.log(result);