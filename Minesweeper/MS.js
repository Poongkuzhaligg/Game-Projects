var r, c;
var rowno = document.getElementById("rno");
var colno = document.getElementById("cno");
var bomb = document.getElementById("btn");
var colcel;
var bt;
var putB;
var Ar;
var emAr;
function makeTable() {
    var rno = rowno.value;
    var cno = colno.value;
    console.log(rno, cno);
    for (r = 0; r < rno; r++) {
        var rowcel = document.getElementById("boxCont").insertRow(r);
        rowcel.setAttribute('class', 'cell-cont');
        // rowAr.push(r);
        for (c = 0; c < cno; c++) {
            colcel = rowcel.insertCell(c);
            colcel.setAttribute('class', 'cell');
            colcel.setAttribute('id', 'cell' + r + c);
            bt = document.createElement('button');
            colcel.appendChild(bt);
            bt.setAttribute('class', 'cell-btn');
            setBomb();
        }
    }
}
function setBomb() {
    putB = bt.value;
    putB = r + ',' + c;
    console.log(putB);
    Ar = [];
    Ar.fill(putB);
    // console.log(Ar);
    // emAr = [];
    // emAr.push(...Array(1).fill(Ar))
}
