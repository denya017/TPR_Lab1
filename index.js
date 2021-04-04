fillingOptions();
fillingScales();
document.getElementById('inputNumberOfCriterion').addEventListener("click", fillingScales);

function cls() {
    document.getElementById("totalNumber").innerHTML = "";
    document.getElementById("table").innerHTML = "";
    document.getElementById("bestAlt").innerHTML = "";
    document.getElementById("badAlt").innerHTML = "";
    document.getElementById("control").innerHTML = "";
}

function fillingOptions() {
    for (let i = 2; i <= 14; i++) {
        let optionTag = document.createElement('option');
        optionTag.setAttribute('value', i.toString());
        optionTag.innerHTML = i.toString();
        document.getElementById('inputNumberOfCriterion').append(optionTag);
    }
    document.getElementById('inputNumberOfCriterion').selectedIndex = 0;
}

function getNumberOfCriterion() {
    let selectedOptionIndex = document.getElementById('inputNumberOfCriterion').selectedIndex;
    let numberOfCriterion = parseInt(document.getElementById("inputNumberOfCriterion").options[selectedOptionIndex].value);
    return numberOfCriterion;
}

function fillingScales() {
    //document.getElementById('titleSizeOf').innerHTML = "Введите размер шкалы критериев";
    document.getElementById('sizesOfK').innerHTML = "";
    let numberOfCriterion = getNumberOfCriterion();

    for (let i = 1; i < numberOfCriterion+1; i++) {
        let divTag = document.createElement('div');
        divTag.className = "col-auto";
        let labelTag = document.createElement('label');
        labelTag.setAttribute('for', 'sizeOfK'+i);
        labelTag.innerHTML = "K"+i;
        divTag.append(labelTag);
        let inputTag = document.createElement('input');
        inputTag.className = "form-control mb-2";
        inputTag.setAttribute('type', 'number');
        inputTag.setAttribute('id', 'sizeOfK'+i);
        inputTag.setAttribute('min', '1');
        inputTag.setAttribute('value', '1');
        inputTag.required=true;
        divTag.append(inputTag);
        document.getElementById('sizesOfK').append(divTag);
    }
    cls();
}

function getScales(numCriterion) {
    let scales = [];
    for (let i = 0; i < numCriterion; i++) {
        let a = parseInt(document.getElementById("sizeOfK"+(i+1)).value);
        scales.push(a);
    }
    return scales;
}

function tableOjAlternatives() {
    let numCriterion = getNumberOfCriterion();
    let scales = getScales(numCriterion);

    let numAlternatives = 1;
    for (let i = 0; i < scales.length; i++) {
        numAlternatives *= scales[i];
    }
    document.getElementById("totalNumber").innerHTML = "Количество гипотетически возможных альтернатив = " + numAlternatives;

    let tableOfAlternatives = new Array(numAlternatives);
    for (let i = 0; i < tableOfAlternatives.length; i++) {
        tableOfAlternatives[i] = new Array(numCriterion);
    }

    let cycleRight = [];
    for (let i = 0; i < numCriterion-1; i++) {
        let a = 1;
        for (let j = i + 1; j < numCriterion; j++) {
            a *= scales[j];
        }
        cycleRight.push(a);
    }

    let cycleLeft = [];
    for (let i = 1; i < numCriterion - 1; i++) {
        let a = 1;
        for (let j = 0; j < i; j++) {
            a *= scales[j];
        }
        cycleLeft.push(a);
    }

    ///////// First collumn /////////////
    let counter = 0;
    for (let j = 0; j < scales[0]; j++) {
        for (let k = 0; k < cycleRight[0]; k++) {
            tableOfAlternatives[counter][0] = j + 1;
            counter++;
        }
    }
    ///////// Middle collumn /////////////
    if (numCriterion > 2) {
        for (let i = 1; i < numCriterion - 1; i++) {
            let a = 0;
            for (let m = 0; m < cycleLeft[i-1]; m++) {
                for (let j = 0; j < scales[i]; j++) {
                    for (let k = 0; k < cycleRight[i]; k++) {
                        tableOfAlternatives[a][i] = j + 1;
                        a++;
                    }
                }
            }
        }
    }
    ///////// Last collumn /////////////
    counter = 0;
    for (let i = 0; i < (numAlternatives / scales[numCriterion - 1]); i++) {
        for (let j = 0; j < scales[numCriterion - 1]; j++) {
            tableOfAlternatives[counter][numCriterion - 1] = j + 1;
            counter++;
        }
    }

    //localStorage.setItem("negAlt", JSON.stringify())
    localStorage.setItem("tableAlt", JSON.stringify(tableOfAlternatives));
    localStorage.setItem("numCriterion", numCriterion.toString());


    document.getElementById("table").innerHTML = `<a href="table.html" target="_blank">Открыть таблицу</a>`;

    /////best
    let bestAlternative = "";
    for (let i = 0; i < numCriterion; i++) {
        bestAlternative += "k" + (i + 1) +""+ 1;
        if (i != (numCriterion - 1)) {
            bestAlternative += " , ";
        }
    }
    document.getElementById("bestAlt").innerHTML = "Лучшая альтернатива: ( " + bestAlternative + " )";
    //////bad
    let badAlternative = "";
    for (let i = 0; i < numCriterion; i++) {
        badAlternative += "k" + (i + 1) +""+ scales[i];
        if (i != (numCriterion - 1)) {
            badAlternative += " , ";
        }
    }
    document.getElementById("badAlt").innerHTML = "Худшая альтернатива: ( " + badAlternative + " )";

    document.getElementById('control').innerHTML = "";
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary my-3";
    btn.onclick = controlAlt;
    btn.innerHTML = "Выбрать контрольную альтернативу";
    document.getElementById('control').append(btn);
}

<<<<<<< Updated upstream
function controlAlt() {
    document.getElementById('control').innerHTML = `<p class="my-3">Выберите альтернативу</p>`;
=======
function classifiedAlternatives() {
    document.getElementById('classified').innerHTML = `<p class="my-3">Выберите контрольную альтернативу</p>`;
>>>>>>> Stashed changes
    let numberOfCriterion = getNumberOfCriterion();
    let scale = getScales(numberOfCriterion);
    for (let i = 1; i < numberOfCriterion+1; i++) {
        let divTag = document.createElement('div');
        divTag.className = "col-auto";
        let labelTag = document.createElement('label');
        labelTag.setAttribute('for', 'selectedK'+i);
        labelTag.innerHTML = "K"+i;
        divTag.append(labelTag);
        let inputTag = document.createElement('input');
        inputTag.className = "form-control mb-2";
        inputTag.setAttribute('type', 'number');
        inputTag.setAttribute('id', 'selectedK'+i);
        inputTag.setAttribute('min', '1');
        inputTag.setAttribute('max', scale[i-1]);
        inputTag.setAttribute('value', '1');
        inputTag.required=true;
        divTag.append(inputTag);
        document.getElementById('control').append(divTag);
    }
<<<<<<< Updated upstream

    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary my-3";
    btn.onclick = classifyAlt;
    btn.innerHTML = "Классифициорвать альтернативы";
    document.getElementById('classify').append(btn);
}
=======
}
>>>>>>> Stashed changes
