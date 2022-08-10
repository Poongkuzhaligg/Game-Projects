var rno = (<HTMLInputElement>document.getElementById("row")).value;
var cno = (<HTMLInputElement>document.getElementById("col")).value;
var i:any, j:any;

function createTab(){
    for( i=0; i<(rno); i++){
        var rowcell = (<HTMLTableElement>document.getElementById("table")).insertRow(i);
        rowcell.setAttribute("class", "cell");
        for( j=0; i<(cno); j++) {
            var colcell = rowcell.insertCell(j);
            colcell.setAttribute("class", "cell-1");
        }
    }
}