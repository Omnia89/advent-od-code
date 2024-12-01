testo = document.getElementsByTagName("pre")[0].innerText;

let s = testo.split("\n").filter(x => x != "");

const knowns = {2:1, 4:4, 3:7, 7:8}

const getPatterns = (tuple)=>{
	let patterns = {}
	left = tuple.split(" | ")[0].split(" ").map(e=>[e.toString().split("").sort().join(""), e.length])
	left.filter(e=>[2,3,4,7].includes(e[1])).map(e=>patterns[knowns[e[1]]]=e[0])		
	while (true){					
		for (o of left){
			//6,9,0
			if (o[1]==6 	 && o[0].split("").filter(e=>patterns[1].split("").includes(e)).length==1)    patterns[6]=o[0]
			else if (o[1]==6 && o[0].split("").filter(e=>patterns[4].split("").includes(e)).length==4)    patterns[9]=o[0]
			else if (o[1]==6) 																			  patterns[0]=o[0]
			//3,2,5
			else if (o[1]==5 && o[0].split("").filter(e=>patterns[1].split("").includes(e)).length==2) 	  patterns[3]=o[0]
			else if (o[1]==5 && patterns.hasOwnProperty(9) && o[0].split("").filter(e=>patterns[8].split("").filter(x => !patterns[9].split("").includes(x)).includes(e)).length==1) 	  patterns[2]=o[0]
			else if ([2,3,4,7].includes(o[1]) == false) patterns[5] = o[0]		
		}
		if (Object.keys(patterns).length == 10) return Object.entries(patterns)
	}
}

const calc =(tuple)=>{
	let str = ""
	let pt = getPatterns(tuple)	
	for (o of tuple.split(" | ")[1].split(" ").map(e=>e.toString().split("").sort().join(""))){	
		pt.filter(e=>e[1]==o).map(e=>str+=e[0])	
	}
	return Number(str)
}

console.log("P1",s.map(e=>e.split(" | ")[1]).map(e=>e.split(" ").filter(f=>[2,3,4,7].includes(f.length)).length).reduce((a,b)=>a+b))
console.log("P2",s.map(e=>calc(e)).reduce((a,b)=>a+b))
