var r, c;
var colcell;
var rno = document.getElementById("rno").value;
var cno = document.getElementById("cno").value;
function makeTable() {
    for (r = 0; r < (rno); r++) {
        var rowcell = document.getElementById('boxCont').insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for (c = 0; c < (cno); c++) {
            colcell = rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell');
            colcell.setAttribute('id', 'cell' + r + c);
        }
    }
}
