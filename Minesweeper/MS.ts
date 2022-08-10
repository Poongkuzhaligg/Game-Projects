var r:any, c:any;

var rowno = <HTMLInputElement>document.getElementById("rno");
var colno = <HTMLInputElement>document.getElementById("cno");
var bomb = <HTMLInputElement>document.getElementById("btn");
var colcel:HTMLTableCellElement;
var bt:HTMLButtonElement;
var putB:string;
var Ar:string[];
var emAr:string[];

function makeTable() {
   var rno = rowno.value;
   var cno = colno.value;
    console.log(rno, cno);
    for(r=0; r< rno; r++)
    {
        var rowcel = (<HTMLTableElement>document.getElementById("boxCont")).insertRow(r);
        rowcel.setAttribute('class', 'cell-cont');
        // rowAr.push(r);
        for(c=0; c< cno; c++)  
        {
            colcel = rowcel.insertCell(c);
            colcel.setAttribute('class', 'cell' );
            colcel.setAttribute('id', 'cell'+r+c );
            bt = document.createElement('button');
            colcel.appendChild(bt);
            bt.setAttribute('class','cell-btn');
            
            setBomb();
        }
       
    }
}

function setBomb() {
    putB = bt.value;
    putB = r+','+c;
    console.log(putB);
    Ar = [];
    Ar.fill(putB);
    // console.log(Ar);
    // emAr = [];
    // emAr.push(...Array(1).fill(Ar))
}


    
    
