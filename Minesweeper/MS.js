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
            // setBombID('cell'+r+c);
            putB = 'cell' + r + c;
            bIDAr.push(putB);
        }
    }
    setBomb();
    setNos();
}
// function setBombID(putB:string){
//     bIDAr.push(putB);
// }
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
                (_a = document.getElementById(mineID)) === null || _a === void 0 ? void 0 : _a.setAttribute("onclick", "clickBomb()");
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
    var x = 0, y = 0;
    var initC = document.getElementById('cell' + x + y);
    console.log(initC);
    var C1 = document.getElementById('cell' + (x - 1) + (y - 1));
    var C2 = document.getElementById('cell' + (x - 1) + (y));
    var C3 = document.getElementById('cell' + (x - 1) + (y + 1));
    var C4 = document.getElementById('cell' + (x) + (y + 1));
    var C5 = document.getElementById('cell' + (x + 1) + (y + 1));
    var C6 = document.getElementById('cell' + (x + 1) + (y));
    var C7 = document.getElementById('cell' + (x + 1) + (y - 1));
    var C8 = document.getElementById('cell' + (x) + (y - 1));
    var tds = document.getElementsByTagName("td");
    // for( let t=0; t<tds.length; t++) {
    //     if(tds[t].innerHTML =="💣") {
    //         t++;
    //     }
    //     else{
    //         tds[t].innerHTML = "1" ;
    //     }
    // }
    // if(initC?.innerHTML == '💣'){
    //     console.log('true');
    // }
    // else{
    //     console.log('false');
    // }
}
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
