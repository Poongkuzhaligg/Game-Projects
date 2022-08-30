var r:any, c:any, b:any, n:any, cellVal:any, putB:string, minesFlagged:number = 0;
var rowno = <HTMLInputElement>document.getElementById("rno"), colno = <HTMLInputElement>document.getElementById("cno"), bomb = <HTMLInputElement>document.getElementById("bmb");
var colcell:HTMLTableCellElement, rowcell:HTMLTableRowElement, bt:HTMLButtonElement, initC:HTMLTableCellElement, CoverBtn:HTMLButtonElement, MinesC:HTMLParagraphElement;
var bIDAr:string[] = [];
var bombAr:string[] = [];
var rn:any, cn:any, mn:any, count:number = 0, mineID:string;
var c1:string, c2: string, c3:string, c4:string, c5:string, c6:string, c7:string, c8:string;

function makeTable() {
    count++;
    if(count==1){
        (<HTMLButtonElement>document.getElementById('btn')).onclick = null;
    }
    var rno = rowno.value;
    var cno = colno.value;
    rn = rno; cn = cno;
    let n:number = 0;
    for(r=0; r< rno; r++)
    {
        rowcell = (<HTMLTableElement>document.getElementById("boxCont")).insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for(c=0; c< cno; c++)  
        {
            let f=0;
            colcell = rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell' );
            colcell.setAttribute('id', 'cell'+r+'-'+c );
            let CoverBtn = document.createElement("button");
            colcell.appendChild(CoverBtn);
            CoverBtn.setAttribute('id', r+'-'+c);
            CoverBtn.classList.add('Cover');
            CoverBtn.setAttribute("onclick", "coverRemove(this.id)")
            CoverBtn.setAttribute("oncontextmenu", "handleRightClick(this.id, event)")
            putB = 'cell'+r+'-'+c;
            bIDAr.push(putB);
            f++;
        }
    }
    setBomb();
    setNos();
}

function setBomb(){
    console.log(bIDAr);
    var Mno = +(bomb.value);
    mn = Mno;
        for( let i=0; i<Mno; i++){
            mineID = bIDAr[Math.floor(Math.random() * bIDAr.length)];
            if(bombAr.includes(mineID)!= true){
                bombAr.push(mineID);
                document.getElementById(mineID)!.setAttribute("class", "bombimg");
                document.getElementById(mineID)?.setAttribute("onclick", "setTimeout(clickBomb,500)");
                console.log(mineID);
            }
            else{
                i--;
            }
        }    
}

function clickBomb(){
    (<HTMLTableElement>document.getElementById("boxCont")).style.display = "none";
    var gameOver = (<HTMLParagraphElement>document.getElementById('gOver')).style.display = "block";
}

function setNos(){
    for(let x=0; x<rn; x++){
        for(let y=0; y<cn; y++ ){
            initC = <HTMLTableCellElement>document.getElementById('cell'+x+'-'+y);
            console.log(initC);
            if(initC.className == "bombimg"){ //to avoid changing the innerhtml of cell that has bomb.
                y+1;  //if yes go to the next cell
            }
            else {
                setNumber(x,y);
            }
        }  
    }   
}

function setNumber(u:number,v:number){
    var adjCells:string[] = [];
    console.log((rn-1),(cn-1));
    if((u>0) && (v>0)){
        adjCells.push('cell'+(u-1)+'-'+(v-1));
    }
    if(u>0)
    {
        adjCells.push('cell'+(u-1)+'-'+v);
    }
    if((u>0) && (v<cn-1)){
        adjCells.push('cell'+(u-1)+'-'+(v+1));
    }
    if(v<cn-1) {
        adjCells.push('cell'+u+'-'+(v+1));
    }
    if((u<rn-1) && (v<cn-1)){
        adjCells.push('cell'+(u+1)+'-'+(v+1));
    }
    if(u<rn-1){
        adjCells.push('cell'+(u+1)+'-'+v);
    }
    if((u<rn-1) && (v>0)){
        adjCells.push('cell'+(u+1)+'-'+(v-1));
    }
    if(v>0){
        adjCells.push('cell'+u+'-'+(v-1));
    }
    console.log(adjCells);
    var Bcount=0;
    for(let t=0; t<adjCells.length; t++){
        let CurrentcellID = adjCells[t];
        let Currentcell = document.getElementById(CurrentcellID);
        if(Currentcell?.className=="bombimg"){
            Bcount++;
            if(Bcount == 1){
                initC.setAttribute('class', 'one');
                initC.classList.add('numberCell');
            }
            else if(Bcount == 2){
                initC.setAttribute('class', 'two');
                initC.classList.add('numberCell');
            }
            else if(Bcount == 3){
                initC.setAttribute('class', 'three');
                initC.classList.add('numberCell');
            }
            else if(Bcount == 4){
                initC.setAttribute('class', 'four');
                initC.classList.add('numberCell');
            }
            else if(Bcount == 5){
                initC.setAttribute('class', 'five');
                initC.classList.add('numberCell');
            }
            else if(Bcount == 6){
                initC.setAttribute('class', 'six');
                initC.classList.add('numberCell');
            }
            if(Bcount == 7){
                initC.setAttribute('class', 'seven');
                initC.classList.add('numberCell');
            }
        }
    }
}

function handleRightClick(id: string, event: any){
    console.log('id' , id );
    event.preventDefault();
    event.stopPropagation();
    let FlaggedCell = <HTMLButtonElement>document.getElementById(id);
    let parentEl = (<HTMLTableCellElement>document.getElementById(id)).parentElement;

    if(FlaggedCell.innerHTML == "🚩"){ // checking if the cell already has flag..if so this condition will remove and replace all the onclicks which was kept null on placing the flags
        FlaggedCell.innerHTML = " ";
        FlaggedCell.setAttribute("onclick", "coverRemove(this.id)");
        if(parentEl?.className == "bombimg"){ //again checking if the flagged cell is bomb cell if so this condition will replace CLICKEDBOMB onclick func.
            parentEl.setAttribute("onclick", "setTimeout(clickBomb,500)")
        }
    }

    else{
        FlaggedCell.innerHTML = "🚩";
        FlaggedCell.removeAttribute('onclick');
        if(parentEl?.className == "bombimg"){  //to check if the flagged cell has bomb if so to enable its onclick fns.
            parentEl?.removeAttribute("onclick");
            minesFlagged++;
            console.log(minesFlagged);
            if(minesFlagged == mn){ //when minesFlagged is equal to mine number input then user wins.
                (<HTMLParagraphElement>document.getElementById('gWon')).style.display = "block";
            }
        }
    }
}

function coverRemove(coverID:string){
    console.log(coverID);
    var tempID = coverID.split('-');
    let Cr = tempID[0];
    let Cc = tempID[1];
    console.log(+Cr, +Cc);
    expandCells(+Cr, +Cc);

}

function expandCells(Crn:number, Ccn:number){
    let coverIDAr = [];
    let Tid = Crn+'-'+Ccn;
    let TidElement = document.getElementById(Tid);
            if(TidElement?.parentElement?.className!= "bombimg"){
                (<HTMLButtonElement>document.getElementById(Tid)).style.display = "none";
                if((Crn>0) && (Ccn>0)){
                    coverIDAr.push((Crn-1)+'-'+(Ccn-1));
                }
                if(Crn>0){
                    coverIDAr.push((Crn-1)+'-'+Ccn);
                }
                if((Crn>0) && (Ccn<cn-1)){
                    coverIDAr.push((Crn-1)+'-'+(Ccn+1));
                }
                if(Ccn<cn-1) {
                    coverIDAr.push(Crn+'-'+(Ccn+1));
                }
                if((Crn<rn-1) && (Ccn<cn-1)){
                    coverIDAr.push((Crn+1)+'-'+(Ccn+1));
                }
                if(Crn<rn-1){
                    coverIDAr.push((Crn+1)+'-'+Ccn);
                }
                if((Crn<rn-1) && (Ccn>0)){
                    coverIDAr.push((Crn+1)+'-'+(Ccn-1));
                }
                if(Ccn>0){
                    coverIDAr.push(Crn+'-'+(Ccn-1));
                }
                console.log(coverIDAr);
                for(let d=0; d<coverIDAr.length; d++){
                    let CurrentcoverID = coverIDAr[d];
                    let coverEl = document.getElementById(CurrentcoverID)?.parentElement;
                    if((coverEl?.className == "numberCell") || (coverEl?.className != "bombimg") && (coverEl?.className == "cell")){
                        (<HTMLButtonElement>document.getElementById(CurrentcoverID)).style.display = "none";
                        
                    }
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
                    //for(let t-0; t<eightCell.length; t++){
                    //     if(document.getElementById(eightCell[t])!.innerHTML = "💣" )
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


    // if(document.getElementById(coverID)?.parentElement?.className == "bombimg"){
    //     for(let o=0; o<bombAr.length; o++){
    //         (document.getElementById(bombAr[o]))?.removeChild(CoverBtn);
    //     }
    // }

    // else {
    // (<HTMLButtonElement>document.getElementById(coverID)).style.display = "none";
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

            // function coverRemove(coverID:string){
            //     console.log(coverID);
            //     let splitCid = coverID.split("");
            //     if(splitCid.length == 4){
            //         let Br = splitCid[1];
            //         let Bc = splitCid[3];
            //         expandCells(+Br,+Bc);
            //     }
            //     else if(splitCid.length == 4){
            //         let Br = splitCid[1]+""+splitCid[2];
            //         let Bc = splitCid[4];
            //         expandCells(+Br,+Bc);
            //     }
            //     else if(splitCid.length == 4){
            //         let Br = splitCid[1];
            //         let Bc = splitCid[3]+""+splitCid[4];
            //         expandCells(+Br,+Bc);
            //     }
            //     else{
            //         let Br = splitCid[1]+""+splitCid[2];
            //         let Bc = splitCid[4]+""+splitCid[5];
            //         expandCells(+Br,+Bc);
            
            //     }
            //     (<HTMLButtonElement>document.getElementById(coverID)).style.display = "none";
            // }
            
            // function expandCells(Rb:number, Cb:any){
            //     console.log(Rb, Cb);
            //     var coverIDAr:string[] = [];
            //     let Cover1 = 'C'+Rb+"-"+Cb;
            //     for(let q=0; q<rn; q++){
            //         for(let p=0; p<cn; p++){
            //             if(document.getElementById(Cover1)?.parentElement?.className!= "bombimg"){
            //                 if((Rb>0) && (Cb>0)){
            //                     coverIDAr.push('cell'+(Rb-1)+'-'+(Cb-1));
            //                 }
            //                 if(Rb>0)
            //                 {
            //                     coverIDAr.push('cell'+(Rb-1)+'-'+Cb);
            //                 }
            //                 if((Rb>0) && (Cb<cn-1)){
            //                     coverIDAr.push('cell'+(Rb-1)+'-'+(Cb+1));
            //                 }
            //                 if(Cb<cn-1) {
            //                     coverIDAr.push('cell'+Rb+'-'+(Cb+1));
            //                 }
            //                 if((Rb<rn-1) && (Cb<cn-1)){
            //                     coverIDAr.push('cell'+(Rb+1)+'-'+(Cb+1));
            //                 }
            //                 if(Rb<rn-1){
            //                     coverIDAr.push('cell'+(Rb+1)+'-'+Cb);
            //                 }
            //                 if((Rb<rn-1) && (Cb>0)){
            //                     coverIDAr.push('cell'+(Rb+1)+'-'+(Cb-1));
            //                 }
            //                 if(Cb>0){
            //                     coverIDAr.push('cell'+Rb+'-'+(Cb-1));
            //                 }
            //             }
            //         }
            //         }
            // }


// let C1 = document.getElementById('cell'+(x-1)+(y-1));
    // let C2 = document.getElementById('cell'+(x-1)+(y));
    // let C3 = document.getElementById('cell'+(x-1)+(y+1));
    // let C4 = document.getElementById('cell'+(x)+(y+1));
    // let C5 = document.getElementById('cell'+(x+1)+(y+1));
    // let C6 = document.getElementById('cell'+(x+1)+(y));
    // let C7 = document.getElementById('cell'+(x+1)+(y-1));
    // let C8 = document.getElementById('cell'+(x)+(y-1));

    // var NumbereCell = countb.toString(); 
    // console.log(NumbereCell);
    // if(NumbereCell = "1"){
    //     initC.setAttribute('class','one')
    // }   
    // else if(NumbereCell = "12"){
    //     initC.setAttribute('class','two')
    // }   
    // else if(NumbereCell = "123"){
    //     initC.setAttribute('class','three')
    // }   