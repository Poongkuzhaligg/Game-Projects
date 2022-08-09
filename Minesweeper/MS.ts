var r:any, c:any;
var colcell:HTMLTableCellElement;
var rno = (<HTMLInputElement>document.getElementById("rno")).value;
var cno = (<HTMLInputElement>document.getElementById("cno")).value;
var button:HTMLButtonElement;

function makeTable() {
    for(r=0; r<(rno);r++)
    {
        var rowcell = (<HTMLTableElement>document.getElementById('boxCont')).insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for(c=0; c<(cno) ;c++)  
        {
            colcell =  rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell' );
            colcell.setAttribute('id', 'cell'+r+c );
            button = document.createElement('button');
            colcell.appendChild(button);
            button.setAttribute('class', 'button');  
        }
    }
}