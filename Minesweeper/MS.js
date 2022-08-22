var r, c, b, n, cellVal, putB;
var rowno = document.getElementById("rno"), colno = document.getElementById("cno"), bomb = document.getElementById("bmb");
var colcell, rowcell, bt, initC;
var bIDAr = [];
var bombAr = [];
var rn, cn;
var c1, c2, c3, c4, c5, c6, c7, c8;
function makeTable() {
    var rno = rowno.value;
    var cno = colno.value;
    rn = rno;
    cn = cno;
    console.log(rn, cn);
    for (r = 0; r < rno; r++) {
        rowcell = document.getElementById("boxCont").insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for (c = 0; c < cno; c++) {
            colcell = rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell');
            colcell.setAttribute('id', 'cell' + r + c);
            putB = 'cell' + r + c;
            bIDAr.push(putB);
        }
    }
    setBomb();
    setNos();
}
function setBomb() {
    var _a;
    console.log(bIDAr);
    var Mno = +(bomb.value);
    if (Mno < (rn * cn)) {
        for (var i = 0; i < Mno; i++) {
            var mineID = bIDAr[Math.floor(Math.random() * bIDAr.length)];
            if (bombAr.includes(mineID) != true) {
                bombAr.push(mineID);
                document.getElementById(mineID).innerHTML = "💣";
                (_a = document.getElementById(mineID)) === null || _a === void 0 ? void 0 : _a.setAttribute("onclick", "setTimeout(clickBomb,500)");
                console.log(mineID);
            }
            else {
                i--;
            }
            console.log(n);
        }
    }
    else {
        alert("Too much Mines!!");
        Reset();
    }
}
function clickBomb() {
    document.getElementById("boxCont").style.display = "none";
    var gameOver = document.getElementById('gOver').style.display = "block";
}
function setNos() {
    for (var x = 0; x < rn; x++) {
        for (var y = 0; y < cn; y++) {
            initC = document.getElementById('cell' + x + y);
            console.log(initC);
            if (initC.innerHTML == "💣") {
                y + 1;
            }
            else {
                setNumber(x, y);
            }
        }
    }
}
function setNumber(u, v) {
    var adjCells = [];
    if ((u > 0) && (v > 0)) {
        adjCells.push('cell' + (u - 1) + (v - 1));
    }
    if (u > 0) {
        adjCells.push('cell' + (u - 1) + v);
    }
    if ((u > 0) && (v < cn - 1)) {
        adjCells.push('cell' + (u - 1) + (v + 1));
    }
    if (v < cn - 1) {
        adjCells.push('cell' + u + (v + 1));
    }
    if ((u < rn - 1) && (v < cn - 1)) {
        adjCells.push('cell' + (u + 1) + (v + 1));
    }
    if (u < rn - 1) {
        adjCells.push('cell' + (u + 1) + v);
    }
    if ((u < rn - 1) && (v > 0)) {
        adjCells.push('cell' + (u + 1) + (v - 1));
    }
    if (v > 0) {
        adjCells.push('cell' + u + (v - 1));
    }
    console.log(adjCells);
    var Bcount = 0;
    for (var t = 0; t < adjCells.length; t++) {
        var CurrentcellID = adjCells[t];
        var Currentcell = document.getElementById(CurrentcellID);
        if ((Currentcell === null || Currentcell === void 0 ? void 0 : Currentcell.innerHTML) == "💣") {
            Bcount++;
            var countb = Bcount;
            initC.innerHTML = countb.toString();
        }
    }
}
function Reset() {
    location.reload();
}
// c1 = 'cell'+(x-1)+""+(y-1);
// c2 = 'cell'+(x-1)+""+(y);
// c3 = 'cell'+(x-1)+""+(y+1);
// c4 = 'cell'+(x)+""+(y+1);
// c5 = 'cell'+(x+1)+""+(y+1);
// c6 = 'cell'+(x-1)+""+(y);
// c7 = 'cell'+(x+1)+""+(y-1);
// c8 = 'cell'+(x+1)+""+(y-1);
// eightCell.push(c1, c2, c3, c4, c5, c6, c7, c8);
// console.log(eightCell);
//     else if(document.getElementById(eightCell[cell])!.innerHTML = "💣" )
//     {
//         let Bcount = 0;
//         Bcount++;
//         let Bnumber:any = Bcount;
//         initC.innerHTML = Bnumber;
//     }
//     else{
//         initC.innerHTML = " ";
//     }
// }
// for( let t=0; t<tds.length; t++) {
//     if(initC?.innerHTML =="💣") {
//         t++;
//     }
//     else{
//         // tds[t].innerHTML = " ";
//     }
//     console.log(n)
// }
//first get 5 random values from array...then place bomb to the inner html of the id or add classlist to it
// function setArray() {
//     emAr.push(putB);
//     emAr.sort( () => 0.5 - Math.random());
//     console.log(emAr[1]);
//     console.log(emAr);
//     for(var i=0; i<arLen; i++){
//         arB = [];
//         arB.push(emAr[i]);
//         console.log(arB);
//     }
//     setBomb();
// }
// bt = document.createElement('button');
// colcell.appendChild(bt);
// bt.setAttribute('class','cell-btn');
// putB = bt.value;
// let C1 = document.getElementById('cell'+(x-1)+(y-1));
// let C2 = document.getElementById('cell'+(x-1)+(y));
// let C3 = document.getElementById('cell'+(x-1)+(y+1));
// let C4 = document.getElementById('cell'+(x)+(y+1));
// let C5 = document.getElementById('cell'+(x+1)+(y+1));
// let C6 = document.getElementById('cell'+(x+1)+(y));
// let C7 = document.getElementById('cell'+(x+1)+(y-1));
// let C8 = document.getElementById('cell'+(x)+(y-1));
