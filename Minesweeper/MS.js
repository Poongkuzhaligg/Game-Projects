var r, c, b, n, cellVal, putB;
var rowno = document.getElementById("rno"), colno = document.getElementById("cno"), bomb = document.getElementById("bmb");
var colcell, rowcell, bt;
var bIDAr = [];
var bombAr = [];
var rn, cn;
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
    var n = 0;
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
            n++;
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
    var tds = document.getElementsByTagName("td");
    var n = 0;
    // for(let t=0; t<tds.length; t++){
    // let x = 0, y = 0;
    for (var x = 0; x < rn; x++) {
        for (var y = 0; y < cn; y++) {
            var initC = document.getElementById('cell' + x + y);
            console.log(initC);
            if ((initC === null || initC === void 0 ? void 0 : initC.innerHTML) == "💣") {
                console.log("true");
            }
            else {
                console.log("false");
            }
        }
    }
    // if(initC?.innerHTML =="💣"){
    // }
    // console.log(x);
    // console.log(y);
}
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
function Reset() {
    location.reload();
}
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
