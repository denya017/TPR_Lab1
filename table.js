let tableOfAlternatives = JSON.parse(localStorage.tableAlt);
let numCriterion = parseInt(localStorage.numCriterion);

let tableAlt = document.createElement("table");
tableAlt.className = "table table-hover";
document.getElementById("table").append(tableAlt);
let thead = document.createElement("thead");
tableAlt.append(thead);
let tR = document.createElement("tr");
thead.append(tR);

for (let i = 0; i < numCriterion; i++) {
    let th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = "K" + (i+1);
    tR.append(th);
}

let tbody = document.createElement("tbody");
tableAlt.append(tbody);

for (let i = 0; i < tableOfAlternatives.length; i++) {
    let tr = document.createElement("tr");
    tbody.append(tr);
    for (let j = 0; j < tableOfAlternatives[i].length; j++) {
        let td = document.createElement("td");
        td.innerHTML = tableOfAlternatives[i][j];
        tr.append(td);
    }
}