var r:any, c:any, b:any, n:any, cellVal:any, putB:string;
var rowno = <HTMLInputElement>document.getElementById("rno"), colno = <HTMLInputElement>document.getElementById("cno"), bomb = <HTMLInputElement>document.getElementById("bmb");
var colcell:HTMLTableCellElement, rowcell:HTMLTableRowElement, bt:HTMLButtonElement;
var bIDAr:string[] = [];
var bombAr:string[] = [];
var rn:any, cn:any;

function makeTable() {
    var rno = rowno.value;
    var cno = colno.value;
    rn = rno; cn = cno;
    console.log(rn, cn);
    for(r=0; r< rno; r++)
    {
        rowcell = (<HTMLTableElement>document.getElementById("boxCont")).insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for(c=0; c< cno; c++)  
        {
            colcell = rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell' );
            colcell.setAttribute('id', 'cell'+r+c );
            putB = 'cell'+r+c;
            bIDAr.push(putB);
        }
    }
    setBomb();
    setNos();
}


function setBomb(){
    console.log(bIDAr)
    var Mno = +(bomb.value);
    let n = 0
    if(Mno < (rn*cn) ){
        for( let i=0; i<Mno; i++){
            let mineID = bIDAr[Math.floor(Math.random() * bIDAr.length)];
            if(bombAr.includes(mineID)!= true){
                bombAr.push(mineID);
                document.getElementById(mineID)!.innerHTML= "💣";
                document.getElementById(mineID)?.setAttribute("onclick", "clickBomb()");
                console.log(mineID);
            }
            else{
                i--;
            }
            n++;
            console.log(n);
        }    
    }
    else{
        alert("Too much Mines!!");
        Reset();
    }
}

function clickBomb(){
    (<HTMLTableElement>document.getElementById("boxCont")).style.display = "none";
    var gameOver = (<HTMLParagraphElement>document.getElementById('gOver')).style.display = "block";
}

function setNos(){
    let x = 0, y = 0;
    let initC = document.getElementById('cell'+x+y);
    console.log(initC);
    let C1 = document.getElementById('cell'+(x-1)+(y-1));
    let C2 = document.getElementById('cell'+(x-1)+(y));
    let C3 = document.getElementById('cell'+(x-1)+(y+1));
    let C4 = document.getElementById('cell'+(x)+(y+1));
    let C5 = document.getElementById('cell'+(x+1)+(y+1));
    let C6 = document.getElementById('cell'+(x+1)+(y));
    let C7 = document.getElementById('cell'+(x+1)+(y-1));
    let C8 = document.getElementById('cell'+(x)+(y-1));
    
    let tds = document.getElementsByTagName("td");
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



