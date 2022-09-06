var r, c, b, n, cellVal, putB, putC, minesFlagged = 0;
var rowno = document.getElementById("rno"), colno = document.getElementById("cno"), bomb = document.getElementById("bmb");
var colcell, rowcell, bt, initC, CoverBtn, MinesC;
var bIDAr = [];
var cIDAr = [];
var bombAr = [];
var openCoverID = [];
var coverIDAr;
var rn, cn, mn, count = 0, mineID;
var c1, c2, c3, c4, c5, c6, c7, c8;
function makeTable() {
    count++;
    if (count == 1) {
        document.getElementById('btn').onclick = null;
    }
    var rno = rowno.value;
    var cno = colno.value;
    rn = rno;
    cn = cno;
    for (r = 0; r < rno; r++) {
        rowcell = document.getElementById("boxCont").insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for (c = 0; c < cno; c++) {
            colcell = rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell');
            colcell.setAttribute('id', 'cell' + r + '-' + c);
            var CoverBtn_1 = document.createElement("button");
            colcell.appendChild(CoverBtn_1);
            CoverBtn_1.setAttribute('id', r + '-' + c);
            CoverBtn_1.classList.add('Cover');
            CoverBtn_1.setAttribute("onclick", "checkCover(this.id)");
            CoverBtn_1.setAttribute("oncontextmenu", "handleRightClick(this.id, event)");
            putB = 'cell' + r + '-' + c;
            putC = r + '-' + c;
            bIDAr.push(putB);
            cIDAr.push(putC);
        }
    }
    setBomb();
    setNos();
    console.log("ready");
}
function setBomb() {
    var _a;
    // console.log(bIDAr);
    var Mno = +(bomb.value);
    mn = Mno;
    for (var i = 0; i < Mno;) {
        mineID = bIDAr[Math.floor(Math.random() * bIDAr.length)];
        if (bombAr.includes(mineID) != true) {
            bombAr.push(mineID);
            document.getElementById(mineID).setAttribute("class", "bombimg");
            // document.getElementById(mineID)?.setAttribute("onclick", "setTimeout(clickBomb, 500)");
            (_a = document.getElementById(mineID)) === null || _a === void 0 ? void 0 : _a.setAttribute("onclick", "clickBomb()");
            i++;
            // console.log(mineID);
        }
        // else{
        //     i--;
        // }
    }
}
function clickBomb() {
    var _a;
    // for( let s=0; s<rn; s++){
    //     for(let w=0; w<cn; w++){
    //         console.log(`${s}-${w}`);
    for (var s = 0; s < cIDAr.length; s++) {
        var findB = cIDAr[s];
        var findBcell = document.getElementById(findB);
        if ((_a = findBcell.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("bombimg")) {
            findBcell.style.display = "none";
        }
        findBcell.onclick = null;
        findBcell.oncontextmenu = null;
    }
    // (<HTMLTableElement>document.getElementById("boxCont")).style.display = "none";
    var gameOver = document.getElementById('gOver').style.display = "block";
}
function setNos() {
    for (var x = 0; x < rn; x++) {
        for (var y = 0; y < cn; y++) {
            initC = document.getElementById('cell' + x + '-' + y);
            console.log(initC);
            if (initC.className == "bombimg") { //to avoid changing the cell that has bomb.
                y + 1; //if yes go to the next cell
            }
            else {
                setNumber(x, y);
            }
        }
    }
}
function setNumber(u, v) {
    var adjCells = [];
    // console.log((rn-1),(cn-1));
    if ((u > 0) && (v > 0)) {
        adjCells.push('cell' + (u - 1) + '-' + (v - 1));
    }
    if (u > 0) {
        adjCells.push('cell' + (u - 1) + '-' + v);
    }
    if ((u > 0) && (v < cn - 1)) {
        adjCells.push('cell' + (u - 1) + '-' + (v + 1));
    }
    if (v < cn - 1) {
        adjCells.push('cell' + u + '-' + (v + 1));
    }
    if ((u < rn - 1) && (v < cn - 1)) {
        adjCells.push('cell' + (u + 1) + '-' + (v + 1));
    }
    if (u < rn - 1) {
        adjCells.push('cell' + (u + 1) + '-' + v);
    }
    if ((u < rn - 1) && (v > 0)) {
        adjCells.push('cell' + (u + 1) + '-' + (v - 1));
    }
    if (v > 0) {
        adjCells.push('cell' + u + '-' + (v - 1));
    }
    console.log(adjCells);
    var Bcount = 0;
    for (var t = 0; t < adjCells.length; t++) {
        var CurrentcellID = adjCells[t];
        var Currentcell = document.getElementById(CurrentcellID);
        if ((Currentcell === null || Currentcell === void 0 ? void 0 : Currentcell.className) == "bombimg") {
            Bcount++;
            switch (Bcount) {
                case 1:
                    initC.setAttribute('class', 'one');
                    initC.classList.add('numberCell');
                    break;
                case 2:
                    initC.setAttribute('class', 'two');
                    initC.classList.add('numberCell');
                    break;
                case 3:
                    initC.setAttribute('class', 'three');
                    initC.classList.add('numberCell');
                    break;
                case 4:
                    initC.setAttribute('class', 'four');
                    initC.classList.add('numberCell');
                    break;
                case 5:
                    initC.setAttribute('class', 'five');
                    initC.classList.add('numberCell');
                    break;
                case 6:
                    initC.setAttribute('class', 'six');
                    initC.classList.add('numberCell');
                    break;
                case 7:
                    initC.setAttribute('class', 'seven');
                    initC.classList.add('numberCell');
                    break;
            }
        }
    }
}
function handleRightClick(id, event) {
    console.log('id', id);
    event.preventDefault();
    event.stopPropagation();
    var FlaggedCell = document.getElementById(id);
    var parentEl = document.getElementById(id).parentElement;
    if (FlaggedCell.innerHTML == "🚩") {
        FlaggedCell.innerHTML = " ";
        FlaggedCell.setAttribute("onclick", "checkCover(this.id)");
        if ((parentEl === null || parentEl === void 0 ? void 0 : parentEl.className) == "bombimg") {
            parentEl.setAttribute("onclick", "setTimeout(clickBomb,500)");
            minesFlagged--;
        }
    }
    else {
        FlaggedCell.innerHTML = "🚩";
        FlaggedCell.removeAttribute('onclick');
        if ((parentEl === null || parentEl === void 0 ? void 0 : parentEl.className) == "bombimg") {
            parentEl === null || parentEl === void 0 ? void 0 : parentEl.removeAttribute("onclick");
            minesFlagged++;
            console.log(minesFlagged);
            if (minesFlagged == mn) {
                document.getElementById('gWon').style.display = "block";
                for (var s = 0; s < cIDAr.length; s++) {
                    var findB = cIDAr[s];
                    var findBcell = document.getElementById(findB);
                    findBcell.onclick = null;
                    findBcell.oncontextmenu = null;
                }
            }
        }
    }
}
function checkCover(checkID) {
    var _a, _b, _c;
    console.log("clicked ID " + checkID);
    coverIDAr = [];
    if (((_a = document.getElementById(checkID).parentElement) === null || _a === void 0 ? void 0 : _a.className) == "bombimg") {
        document.getElementById(checkID).style.display = "none";
        console.log('It is a bombcell');
        return;
    }
    if ((_b = document.getElementById(checkID).parentElement) === null || _b === void 0 ? void 0 : _b.classList.contains("numberCell")) {
        document.getElementById(checkID).style.display = "none";
        console.log('It is a numbercell');
        return;
    }
    if ((_c = document.getElementById(checkID).parentElement) === null || _c === void 0 ? void 0 : _c.classList.contains("cell")) {
        console.log('It is a cell');
        coverIDAr.push(checkID);
        var tempID = checkID.split('-');
        var Crn = +tempID[0];
        var Ccn = +tempID[1];
        console.log("it works");
        expCells(Crn, Ccn);
    }
}
function expCells(Cr, Cc) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if ((Cr > 0) && (Cc > 0)) {
        if ((_a = document.getElementById((Cr - 1) + '-' + (Cc - 1)).parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc - 1))) {
                // console.log('if works');
                coverIDAr.push((Cr - 1) + '-' + (Cc - 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc - 1))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc - 1));
                // console.log('else works');
                expCells((Cr - 1), (Cc - 1));
            }
        }
    }
    if (Cr > 0) {
        if ((_b = document.getElementById((Cr - 1) + '-' + (Cc)).parentElement) === null || _b === void 0 ? void 0 : _b.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc))) {
                // console.log('if works');
                coverIDAr.push((Cr - 1) + '-' + (Cc));
            }
        }
        else {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc));
                // console.log('else works');
                expCells((Cr - 1), (Cc));
            }
        }
    }
    if ((Cr > 0) && (Cc < cn - 1)) {
        if ((_c = document.getElementById((Cr - 1) + '-' + (Cc + 1)).parentElement) === null || _c === void 0 ? void 0 : _c.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc + 1))) {
                // console.log('if works');
                coverIDAr.push((Cr - 1) + '-' + (Cc + 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc + 1));
                // console.log('else works');
                expCells((Cr - 1), (Cc + 1));
            }
        }
    }
    if (Cc < cn - 1) {
        if ((_d = document.getElementById((Cr) + '-' + (Cc + 1)).parentElement) === null || _d === void 0 ? void 0 : _d.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr) + '-' + (Cc + 1))) {
                // console.log('if works');
                coverIDAr.push(Cr + '-' + (Cc + 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr) + '-' + (Cc + 1));
                // console.log('else works');
                expCells((Cr), (Cc + 1));
            }
        }
    }
    if ((Cr < rn - 1) && (Cc < cn - 1)) {
        if ((_e = document.getElementById((Cr + 1) + '-' + (Cc + 1)).parentElement) === null || _e === void 0 ? void 0 : _e.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr + 1) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr + 1) + '-' + (Cc + 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr + 1) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr + 1) + '-' + (Cc + 1));
                expCells((Cr + 1), (Cc + 1));
            }
        }
    }
    if (Cr < rn - 1) {
        if ((_f = document.getElementById((Cr + 1) + '-' + (Cc)).parentElement) === null || _f === void 0 ? void 0 : _f.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr + 1) + '-' + Cc)) {
                coverIDAr.push((Cr + 1) + '-' + Cc);
            }
        }
        else {
            if (!coverIDAr.includes((Cr + 1) + '-' + Cc)) {
                coverIDAr.push((Cr + 1) + '-' + Cc);
                expCells((Cr + 1), Cc);
            }
        }
    }
    if ((Cr < rn - 1) && (Cc > 0)) {
        if ((_g = document.getElementById((Cr + 1) + '-' + (Cc - 1)).parentElement) === null || _g === void 0 ? void 0 : _g.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr + 1) + '-' + (Cc - 1))) {
                coverIDAr.push((Cr + 1) + '-' + (Cc - 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr + 1) + '-' + (Cc - 1))) {
                coverIDAr.push((Cr + 1) + '-' + (Cc - 1));
                expCells((Cr + 1), (Cc - 1));
            }
        }
    }
    if (Cc > 0) {
        if ((_h = document.getElementById((Cr) + '-' + (Cc - 1)).parentElement) === null || _h === void 0 ? void 0 : _h.classList.contains("numberCell")) {
            if (!coverIDAr.includes(Cr + '-' + (Cc - 1))) {
                coverIDAr.push(Cr + '-' + (Cc - 1));
            }
        }
        else {
            if (!coverIDAr.includes(Cr + '-' + (Cc - 1))) {
                coverIDAr.push(Cr + '-' + (Cc - 1));
                expCells(Cr, (Cc - 1));
            }
        }
    }
    coverRemove(coverIDAr);
}
function coverRemove(coverID) {
    console.log(coverID);
    for (var z = 0; z < coverID.length; z++) {
        console.log(coverID);
        var zId = coverID[z];
        document.getElementById(zId).style.display = "none";
    }
}
function Reset() {
    location.reload();
}
// }
//     var tempID = coverID.split('-');
//     let Cr = +tempID[0];
//     let Cc = +tempID[1];
//     console.log(+Cr, +Cc);
//     let TidElement = document.getElementById(coverID);
//     if(TidElement?.parentElement?.className!= "bombimg"){
//     (<HTMLButtonElement>document.getElementById(coverID)).style.display = "none";
//     (<HTMLButtonElement>document.getElementById(coverID)).parentElement?.classList.add("checked");
//         if((Cr>0) && (Cc>0)){
//             if(!coverIDAr.includes((Cr-1)+'-'+(Cc-1))){
//                 coverIDAr.push((Cr-1)+'-'+(Cc-1));
//             }
//         }
//         if(Cr>0){
//             if(!coverIDAr.includes((Cr-1)+'-'+Cc) ){
//                 coverIDAr.push((Cr-1)+'-'+Cc);
//             }
//         }
//         if((Cr>0) && (Cc<cn-1)){
//             if(!coverIDAr.includes((Cr-1)+'-'+(Cc+1)) ){
//                 coverIDAr.push((Cr-1)+'-'+(Cc+1));
//             }
//         }
//         if(Cc<cn-1) {
//             if(!coverIDAr.includes(Cr+'-'+(Cc+1)) ){
//                 coverIDAr.push(Cr+'-'+(Cc+1));
//             }
//         }
//         if((Cr<rn-1) && (Cc<cn-1)){
//             if(!coverIDAr.includes((Cr+1)+'-'+(Cc+1)) ){
//                 coverIDAr.push((Cr+1)+'-'+(Cc+1));
//             }
//         }
//         if(Cr<rn-1){
//             if(!coverIDAr.includes((Cr+1)+'-'+Cc) ){
//                 coverIDAr.push((Cr+1)+'-'+Cc);
//             }
//         }
//         if((Cr<rn-1) && (Cc>0)){
//             if(!coverIDAr.includes((Cr+1)+'-'+(Cc-1)) ){
//                 coverIDAr.push((Cr+1)+'-'+(Cc-1));   
//             }
//         }
//         if(Cc>0){
//             if(!coverIDAr.includes(Cr+'-'+(Cc-1)) ){
//                 coverIDAr.push(Cr+'-'+(Cc-1));
//             }
//         }
//         console.log(coverIDAr);
//     }
//     expandCells(coverIDAr); 
// }
// function expandCells(tempCoverID:string[]){
//     let openId;
//     for(let d=0; d<tempCoverID.length; d++){
//         let CurrentcoverID = tempCoverID[d];
//         let PcoverEl = document.getElementById(CurrentcoverID)?.parentElement;
//         if( PcoverEl?.className != "bombimg"){ //checking if the neighboring cells doesn't have bomb.
//             // (<HTMLButtonElement>document.getElementById(CurrentcoverID)).style.display = "none";
//             (<HTMLTableCellElement>document.getElementById(CurrentcoverID)).parentElement?.classList.add("checked");
//             openCoverID.push(CurrentcoverID);
//         }
//     }
//     for( let z=0; z<tempCoverID.length; z++){
//         if(document.getElementById(tempCoverID[z])?.parentElement?.className == 'cell'){
//             console.log('true');
//         }
//     }
// }    
// function openCells(tempCoverID:string[]){
// }
// function FurtherExpand(Or:number, Oc:number){
//         if((Or>0) && (Oc>0)){
//             if( !openCoverID.includes((Or-1)+'-'+(Oc-1)) ){
//                 openCoverID.push((Or-1)+'-'+(Oc-1));
//             }
//         }
//         if(Or>0){
//             if( !openCoverID.includes((Or-1)+'-'+Oc) ){
//                 openCoverID.push((Or-1)+'-'+Oc);
//             }
//         }
//         if((Or>0) && (Oc<cn-1)){
//             if( !openCoverID.includes((Or-1)+'-'+(Oc+1)) ){
//                 openCoverID.push((Or-1)+'-'+(Oc+1));
//             }
//         }
//         if(Oc<cn-1) {
//             if( !openCoverID.includes( Or+'-'+(Oc+1)) ){
//                 openCoverID.push(Or+'-'+(Oc+1));
//             }
//         }
//         if((Or<rn-1) && (Oc<cn-1)){
//             if( !openCoverID.includes((Or+1)+'-'+(Oc+1)) ){
//                 openCoverID.push((Or+1)+'-'+(Oc+1));
//             }
//         }
//         if(Or<rn-1){
//             if( !openCoverID.includes( (Or+1)+'-'+ Oc) ){
//                 openCoverID.push((Or+1)+'-'+Oc);
//             }
//         }
//         if((Or<rn-1) && (Oc>0)){
//             if(!openCoverID.includes((Or+1)+'-'+(Oc-1)) ){
//                 openCoverID.push((Or+1)+'-'+(Oc-1));
//             }
//         }
//         if(Oc>0){
//             if( !openCoverID.includes(Or+'-'+(Oc-1)) ){
//                 openCoverID.push(Or+'-'+(Oc-1));
//             }
//         }
//    for( let z=0; z<coverIDAr.length; z++){ //lastly commented
//     let checkID = coverIDAr[z];
//     let ppid = document.getElementById(checkID)?.parentElement;
//     if( ppid?.className != "bombimg" && ppid?.className == "numberCell"){
//         openCells(coverIDAr);
//         return;
//     }
//     let openId = checkID.split('-');
//     let Or = +openId[0];
//     let Oc = +openId[1];
//     expandCells(Or, Oc)
// }
//     console.log(openCoverID);
//     for( let z=0; z<openCoverID.length; z++){
//         let opCoID = openCoverID[z];
//         let parentOcid = document.getElementById(opCoID)?.parentElement;
//         if( parentOcid?.className != "bombimg"){ //checking if the neighboring cells doesn't have bomb.
//             // if(parentOcid?.className == "cell"){
//             //     opCoID.split("-");
//             //     console.log('hey'+opCoID);
//             // }
//             // else{
//                 (<HTMLButtonElement>document.getElementById(opCoID)).style.display = "none";
//             }
//         }
//     }
// }
// if( d == (tempCoverID.length - 1) ){
//     for(let z = (tempCoverID.length - 1); z>=0; z--){
//         // console.log("hey", tempCoverID[z]);
//         openId = tempCoverID[z];
//         let openPid = document.getElementById(openId)?.parentElement;
//         console.log(openPid?.className);
//         if( openPid?.className == "cell"){
//             // coverRemove(openId);
//             console.log("true");
//         }
//         else{
//             console.log("false");
//             z--;
//         }
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
//(<HTMLButtonElement>document.getElementById(CurrentcoverID)).style.display = "none";
// function expCells(Cr:number, Cc:number){
//     if((Cr>0) && (Cc>0)){
//         if((<HTMLTableCellElement>document.getElementById((Cr-1)+'-'+(Cc-1))).parentElement?.classList.contains("numberCell")){
//             if( !coverIDAr.includes((Cr-1)+'-'+(Cc-1)) ){
//                 console.log('if works');
//                 coverIDAr.push((Cr-1)+'-'+(Cc-1));
//                 // return;
//             }
//         }
//         else{
//             if( !coverIDAr.includes((Cr-1)+'-'+(Cc-1)) ){
//                 coverIDAr.push((Cr-1)+'-'+(Cc-1));
//                 console.log('else works');
//                 itworks((Cr-1),(Cc-1));
//             }
//         }
//     }
//     if(Cr>0){
//         if((<HTMLTableCellElement>document.getElementById((Cr-1)+'-'+(Cc))).parentElement?.classList.contains("numberCell")){
//             if(!coverIDAr.includes((Cr-1)+'-'+(Cc))){
//                 console.log('if works');
//                 coverIDAr.push((Cr-1)+'-'+(Cc));
//                 // return;
//             }
//         }
//         else{
//             if(!coverIDAr.includes((Cr-1)+'-'+(Cc))){
//                 coverIDAr.push((Cr-1)+'-'+(Cc));
//                 console.log('else works');
//                 itworks((Cr-1),(Cc));
//             }
//         }
//     }
//     if((Cr>0) && (Cc<cn-1)){
//         if((<HTMLTableCellElement>document.getElementById((Cr-1)+'-'+(Cc+1))).parentElement?.classList.contains("numberCell")){
//             if(!coverIDAr.includes((Cr-1)+'-'+(Cc+1))){
//                 console.log('if works');
//                 coverIDAr.push((Cr-1)+'-'+(Cc+1));
//                 // return;
//             }
//         }
//         else{
//             if(!coverIDAr.includes((Cr-1)+'-'+(Cc+1))){
//                 coverIDAr.push((Cr-1)+'-'+(Cc+1));
//                 console.log('else works');
//                 itworks((Cr-1),(Cc+1));
//             }
//         }
//     }
//     if(Cc<cn-1) {
//         if((<HTMLTableCellElement>document.getElementById((Cr)+'-'+(Cc+1))).parentElement?.classList.contains("numberCell")){
//             if(!coverIDAr.includes((Cr)+'-'+(Cc+1))){
//                 console.log('if works');
//                 coverIDAr.push(Cr+'-'+(Cc+1));
//             // return;
//             }
//         }
//         else{
//             coverIDAr.push((Cr)+'-'+(Cc+1));
//             console.log('else works');
//             itworks((Cr),(Cc+1));
//         }
//     }
//     if((Cr<rn-1) && (Cc<cn-1)){
//         if((<HTMLTableCellElement>document.getElementById((Cr+1)+'-'+(Cc+1))).parentElement?.classList.contains("numberCell")){
//             if(!coverIDAr.includes((Cr+1)+'-'+(Cc+1)) ){
//                 coverIDAr.push((Cr+1)+'-'+(Cc+1));
//                 // return;
//             }
//         }
//         else{
//             coverIDAr.push((Cr+1)+'-'+(Cc+1));
//             itworks((Cr+1),(Cc+1));
//         }
//     }
//     setTimeout(() => {
//     if(Cr<rn-1){
//         if((<HTMLTableCellElement>document.getElementById((Cr+1)+'-'+(Cc))).parentElement?.classList.contains("numberCell")){
//             if(!coverIDAr.includes((Cr+1)+'-'+Cc)){
//                 coverIDAr.push((Cr+1)+'-'+Cc);
//                 return;
//             }
//         }
//         else{
//             coverIDAr.push((Cr+1)+'-'+Cc);
//             itworks((Cr+1),Cc);
//         }
//     }
// }, 100);
//     console.log(coverIDAr);
//     coverRemove(coverIDAr);
// if((Cr<rn-1) && (Cc>0)){
//     if((<HTMLTableCellElement>document.getElementById((Cr+1)+'-'+(Cc-1))).parentElement?.classList.contains("numberCell")){   
//         coverIDAr.push((Cr+1)+'-'+(Cc-1));
//         return;
//     }
//     else{
//         coverIDAr.push((Cr+1)+'-'+(Cc-1));
//         itworks((Cr+1),(Cc-1));
//     }
// }
// if(Cc>0){
//     if((<HTMLTableCellElement>document.getElementById((Cr)+'-'+(Cc-1))).parentElement?.classList.contains("numberCell")){
//         coverIDAr.push(Cr+'-'+(Cc-1));
//         return;
//     }
//     else{
//         coverIDAr.push(Cr+'-'+(Cc-1));
//         itworks(Cr,(Cc-1))
//     }
// }
// }
