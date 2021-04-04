let tableOfAlternatives = JSON.parse(localStorage.tableAlt);
let numCriterion = parseInt(localStorage.numCriterion);

let tableAlt = document.createElement("table");
tableAlt.className = "table";
document.getElementById("table").append(tableAlt);
let thead = document.createElement("thead");
tableAlt.append(thead);
let tR = document.createElement("tr");
thead.append(tR);

for (let i = 0; i < tableOfAlternatives.length; i++) {
    let th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "K" + (i+1);
    tR.append(th);
}

for (let i = 0; i < tableOfAlternatives.length; i++) {

    for (let j = 0; j < tableOfAlternatives[i].length; j++) {

    }
}