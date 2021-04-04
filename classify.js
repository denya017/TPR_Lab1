let numCriterion = parseInt(localStorage.numCriterion);
let selectedAlternative =  JSON.parse(localStorage.control);
let tableOfAlternatives = JSON.parse(localStorage.tableAlt);

let positiveAlternative = [];
let negativeAlternative = [];
let disparateAlternative = [];

let bufArray = [];


for (let i = 0; i < tableOfAlternatives.length; i++) {
    let buf = 0
    for (let j = 0; j < numCriterion; j++){
        if (parseInt(selectedAlternative[j]) == tableOfAlternatives[i][j]){
            buf++
        }
    }
    if (buf == 3){
        continue
    }
    let pos = 0, neg = 0;
    for (let j = 0; j < tableOfAlternatives[i].length; j++) {
        if (tableOfAlternatives[i][j] <= selectedAlternative[j]) {
            pos++;
        }
        if (tableOfAlternatives[i][j] >= selectedAlternative[j]) {
            neg++;
        }

    }
    if (pos == numCriterion) {
        positiveAlternative.push(tableOfAlternatives[i]);
    }
    else if (neg == numCriterion) {
        negativeAlternative.push(tableOfAlternatives[i]);
    }
    else {
        disparateAlternative.push(tableOfAlternatives[i]);
    }

    let best = '<p class="m-3">Лучших ' + positiveAlternative.length + '</p>';
    let bad = '<p class="m-3">Худших ' + negativeAlternative.length + '</p>';
    let disp = '<p class="m-3">Несранимых ' + disparateAlternative.length + '</p>';
    document.getElementById('info').innerHTML = best + bad + disp;
}

bufArray = positiveAlternative;

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

for (let i = 0; i < bufArray.length; i++) {
    let tr = document.createElement("tr");
    tbody.append(tr);
    for (let j = 0; j < bufArray[i].length; j++) {
        let td = document.createElement("td");
        td.innerHTML = bufArray[i][j];
        tr.append(td);
    }
}

function chosen(){
    tbody.innerHTML = '';
    if (document.getElementById('input').value == 'Лучшие'){
        bufArray = positiveAlternative;
    }
    else if (document.getElementById('input').value == 'Худшие') {
        bufArray = negativeAlternative;
    }
    else{
        bufArray = disparateAlternative;
    }

    for (let i = 0; i < bufArray.length; i++) {
        let tr = document.createElement("tr");
        tbody.append(tr);
        for (let j = 0; j < bufArray[i].length; j++) {
            let td = document.createElement("td");
            td.innerHTML = bufArray[i][j];
            tr.append(td);
        }
    }
}

function clear(){
    for (let i = 0; i < bufArray.length; i++){
        tbody.deleteRow(i);
    }
}

document.getElementById('input').addEventListener("change", chosen);
