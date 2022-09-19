var r:any, c:any, b:any, n:any, cellVal:any, putB:string, putC:string, minesFlagged:number = 0;
var rowno = <HTMLInputElement>document.getElementById("rno"), colno = <HTMLInputElement>document.getElementById("cno"), bomb = <HTMLInputElement>document.getElementById("bmb");
var colcell:HTMLTableCellElement, rowcell:HTMLTableRowElement, bt:HTMLButtonElement, initC:HTMLTableCellElement, CoverBtn:HTMLButtonElement, MinesC:HTMLParagraphElement;
var bIDAr:string[] = [];
var cIDAr:string[] = [];
var bombAr:string[] = [];
var openCoverID:string[] = [];
let coverIDAr:string[];
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
    for(r=0; r< rno; r++)
    {
        rowcell = (<HTMLTableElement>document.getElementById("boxCont")).insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for(c=0; c< cno; c++)  
        {
            colcell = rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell' );
            colcell.setAttribute('id', 'cell'+r+'-'+c );
            let CoverBtn = document.createElement("button");
            colcell.appendChild(CoverBtn);
            CoverBtn.setAttribute('id', r+'-'+c);
            CoverBtn.classList.add('Cover');
            CoverBtn.setAttribute("onclick", "checkCover(this.id)")
            CoverBtn.setAttribute("oncontextmenu", "handleRightClick(this.id, event)")
            putB = 'cell'+r+'-'+c;
            putC = r+'-'+c;
            bIDAr.push(putB);
            cIDAr.push(putC);
        }
    }
    setBomb();
    setNos();
    console.log("ready");
}

function setBomb(){
    var Mno = +(bomb.value);
    mn = Mno;
        for( let i=0; i<Mno;){
            mineID = bIDAr[Math.floor(Math.random() * bIDAr.length)];
            if(bombAr.includes(mineID)!= true){
                bombAr.push(mineID);
                document.getElementById(mineID)!.setAttribute("class", "bombimg");
                // document.getElementById(mineID)?.setAttribute("onclick", "setTimeout(clickBomb, 500)");
                document.getElementById(mineID)?.setAttribute("onclick", "clickBomb()")
                i++;
            }
        }    
}

function clickBomb(){
    for( let s=0; s<cIDAr.length; s++){
        let findB = cIDAr[s];
        let findBcell = <HTMLButtonElement>document.getElementById(findB);
        if( findBcell.parentElement?.classList.contains("bombimg")){
            findBcell.style.display ="none";
        }
    }
    stopGame();
    (<HTMLParagraphElement>document.getElementById('gOver')).style.display = "block";
}

function setNos(){
    for(let x=0; x<rn; x++){
        for(let y=0; y<cn; y++ ){
            initC = <HTMLTableCellElement>document.getElementById('cell'+x+'-'+y);
            console.log(initC);
            if(initC.className == "bombimg"){ 
                y+1;  
            }
            else {
                setNumber(x,y);
            }
        }  
    }   
}

function setNumber(u:number,v:number){
    var adjCells:string[] = [];
    // console.log((rn-1),(cn-1));
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
            switch (Bcount){
                case 1 : 
                    initC.setAttribute('class', 'one');
                    initC.classList.add('numberCell');
                    break;
                case 2 : 
                    initC.setAttribute('class', 'two');
                    initC.classList.add('numberCell');
                    break;
                case 3 : 
                    initC.setAttribute('class', 'three');
                    initC.classList.add('numberCell');
                    break;
                case 4 : 
                    initC.setAttribute('class', 'four');
                    initC.classList.add('numberCell');
                    break;
                case 5 : 
                    initC.setAttribute('class', 'five');
                    initC.classList.add('numberCell');
                    break;
                case 6 : 
                    initC.setAttribute('class', 'six');
                    initC.classList.add('numberCell');
                    break;
                case 7 : 
                    initC.setAttribute('class', 'seven');
                    initC.classList.add('numberCell');
                    break;
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
    if(FlaggedCell.innerHTML == "🚩"){ 
        FlaggedCell.innerHTML = " ";
        if(parentEl?.className == "bombimg"){ 
            parentEl.setAttribute("onclick", "setTimeout(clickBomb,500)");
            minesFlagged--;
        }
        else if(parentEl?.className == "cell" || parentEl?.className == "numbercell"){
            FlaggedCell.setAttribute("onclick", "checkCover(this.id)");
        }
    }

    else{
        FlaggedCell.innerHTML = "🚩";
        if(parentEl?.className == "bombimg"){  
            parentEl?.removeAttribute("onclick");
            minesFlagged++;
            console.log(minesFlagged);
            if(minesFlagged == mn){
                stopGame();
                (<HTMLParagraphElement>document.getElementById('gWon')).style.display = "block";
            }
        }
        else if(parentEl?.className == "cell" || parentEl?.className == "numbercell"){
            FlaggedCell.removeAttribute("onclick");
        }
    }
}

function checkCover(checkID:string){
    console.log("clicked ID "+checkID);
    coverIDAr = [];
    if((<HTMLButtonElement>document.getElementById(checkID)).parentElement?.className == "bombimg"){ 
        (<HTMLButtonElement>document.getElementById(checkID)).style.display = "none"; 
        console.log('It is a bombcell');
        return;
    }
    if((<HTMLButtonElement>document.getElementById(checkID)).parentElement?.classList.contains("numberCell")){ 
        (<HTMLButtonElement>document.getElementById(checkID)).style.display = "none"; 
        console.log('It is a numbercell');
        return;
    }
    if((<HTMLButtonElement>document.getElementById(checkID)).parentElement?.classList.contains("cell")){ 
        // console.log('It is a cell');
        coverIDAr.push(checkID);
        var tempID = checkID.split('-');
        let Crn = +tempID[0];
        let Ccn = +tempID[1];
        console.log("it works");
        expCells(Crn, Ccn);
    }
}

function expCells(Cr:number, Cc:number){
    if((Cr>0) && (Cc>0)){
        if((<HTMLTableCellElement>document.getElementById((Cr-1)+'-'+(Cc-1))).parentElement?.classList.contains("numberCell")){ 
            if( !coverIDAr.includes((Cr-1)+'-'+(Cc-1)) ){ 
                coverIDAr.push((Cr-1)+'-'+(Cc-1));
                return;
            }
        }
        else{ 
            if( !coverIDAr.includes((Cr-1)+'-'+(Cc-1)) ){
                coverIDAr.push((Cr-1)+'-'+(Cc-1));
                expCells((Cr-1),(Cc-1));
            }
        }
    }
    if(Cr>0){
        if((<HTMLTableCellElement>document.getElementById((Cr-1)+'-'+(Cc))).parentElement?.classList.contains("numberCell")){
            if(!coverIDAr.includes((Cr-1)+'-'+(Cc))){
                coverIDAr.push((Cr-1)+'-'+(Cc));
                return;
            }
        }
        else{
            if(!coverIDAr.includes((Cr-1)+'-'+(Cc))){
                coverIDAr.push((Cr-1)+'-'+(Cc));
                expCells((Cr-1),(Cc));
            }
        }
    }
    if((Cr>0) && (Cc<cn-1)){
        if((<HTMLTableCellElement>document.getElementById((Cr-1)+'-'+(Cc+1))).parentElement?.classList.contains("numberCell")){
            if(!coverIDAr.includes((Cr-1)+'-'+(Cc+1))){
                coverIDAr.push((Cr-1)+'-'+(Cc+1));
                return;
            }
        }
        else{
            if(!coverIDAr.includes((Cr-1)+'-'+(Cc+1))){
                coverIDAr.push((Cr-1)+'-'+(Cc+1));
                expCells((Cr-1),(Cc+1));
            }
        }
    }
    if(Cc<cn-1) {
        if((<HTMLTableCellElement>document.getElementById((Cr)+'-'+(Cc+1))).parentElement?.classList.contains("numberCell")){
            if(!coverIDAr.includes((Cr)+'-'+(Cc+1))){
                coverIDAr.push(Cr+'-'+(Cc+1));
                return;
            }
        }
        else{
            if(!coverIDAr.includes((Cr)+'-'+(Cc+1))){
                coverIDAr.push((Cr)+'-'+(Cc+1));
                expCells((Cr),(Cc+1));
            }
        }
    }
    if((Cr<rn-1) && (Cc<cn-1)){
        if((<HTMLTableCellElement>document.getElementById((Cr+1)+'-'+(Cc+1))).parentElement?.classList.contains("numberCell")){
            if(!coverIDAr.includes((Cr+1)+'-'+(Cc+1)) ){
                coverIDAr.push((Cr+1)+'-'+(Cc+1));
                return;
            }
        }
        else{
            if(!coverIDAr.includes((Cr+1)+'-'+(Cc+1)) ){
                coverIDAr.push((Cr+1)+'-'+(Cc+1));
                expCells((Cr+1),(Cc+1));
            }
        }
    }
        
    if(Cr<rn-1){
        if((<HTMLTableCellElement>document.getElementById((Cr+1)+'-'+(Cc))).parentElement?.classList.contains("numberCell")){
            if(!coverIDAr.includes((Cr+1)+'-'+Cc)){
                coverIDAr.push((Cr+1)+'-'+Cc);
                return;
            }
        }
        else{
            if(!coverIDAr.includes((Cr+1)+'-'+Cc)){
                coverIDAr.push((Cr+1)+'-'+Cc);
                expCells((Cr+1),Cc);
            }
        }
    }

    if((Cr<rn-1) && (Cc>0)){
        if((<HTMLTableCellElement>document.getElementById((Cr+1)+'-'+(Cc-1))).parentElement?.classList.contains("numberCell")){   
            if(!coverIDAr.includes((Cr+1)+'-'+(Cc-1))){
                coverIDAr.push((Cr+1)+'-'+(Cc-1));
                return;
            }
        }
        else{
            if(!coverIDAr.includes((Cr+1)+'-'+(Cc-1))){
                coverIDAr.push((Cr+1)+'-'+(Cc-1));
                expCells((Cr+1),(Cc-1));
            }

        }
    }
    if(Cc>0){
        if((<HTMLTableCellElement>document.getElementById((Cr)+'-'+(Cc-1))).parentElement?.classList.contains("numberCell")){
            if(!coverIDAr.includes(Cr+'-'+(Cc-1))){
                coverIDAr.push(Cr+'-'+(Cc-1));
                return;
            }
        }
        else{
            if(!coverIDAr.includes(Cr+'-'+(Cc-1))){
                coverIDAr.push(Cr+'-'+(Cc-1));
                expCells(Cr,(Cc-1));
            }
        }
    }
    coverRemove(coverIDAr);

}

function coverRemove(coverID:string[]){
    console.log(coverID);
    for(let z=0; z<coverID.length; z++){
        console.log(coverID);
        let zId = coverID[z];
        (<HTMLButtonElement>document.getElementById(zId)).style.display = "none";
    }
}

function stopGame(){
    for( let s=0; s<cIDAr.length; s++){
        let findB = cIDAr[s];
        let findBcell = <HTMLButtonElement>document.getElementById(findB);
        findBcell.onclick = null;
        findBcell.oncontextmenu = null;
    }
}

function Reset() {
    location.reload();
}

