var rno = document.getElementById("row").value;
var cno = document.getElementById("col").value;
var i, j;
function createTab() {
    for (i = 0; i < (rno); i++) {
        var rowcell = document.getElementsByTagName("table").insertRow(i);
        rowcell.setAttribute("class", "cell");
        for (j = 0; i < (cno); j++) {
            var colcell = rowcell.insertCell(j);
            colcell.setAttribute("class", "cell-1");
        }
    }
}
