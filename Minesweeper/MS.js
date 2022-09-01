var r, c, b, n, cellVal, putB, minesFlagged = 0;
var rowno = document.getElementById("rno"), colno = document.getElementById("cno"), bomb = document.getElementById("bmb");
var colcell, rowcell, bt, initC, CoverBtn, MinesC;
var bIDAr = [];
var bombAr = [];
var openCoverID = [];
var coverIDAr = [];
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
    var n = 0;
    for (r = 0; r < rno; r++) {
        rowcell = document.getElementById("boxCont").insertRow(r);
        rowcell.setAttribute('class', 'cell-cont');
        for (c = 0; c < cno; c++) {
            var f = 0;
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
            bIDAr.push(putB);
            f++;
        }
    }
    setBomb();
    setNos();
}
function setBomb() {
    var _a;
    console.log(bIDAr);
    var Mno = +(bomb.value);
    mn = Mno;
    for (var i = 0; i < Mno; i++) {
        mineID = bIDAr[Math.floor(Math.random() * bIDAr.length)];
        if (bombAr.includes(mineID) != true) {
            bombAr.push(mineID);
            document.getElementById(mineID).setAttribute("class", "bombimg");
            (_a = document.getElementById(mineID)) === null || _a === void 0 ? void 0 : _a.setAttribute("onclick", "setTimeout(clickBomb,500)");
            console.log(mineID);
        }
        else {
            i--;
        }
    }
}
function clickBomb() {
    document.getElementById("boxCont").style.display = "none";
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
    console.log((rn - 1), (cn - 1));
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
                    initC.setAttribute('class', 'one');
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
    if (FlaggedCell.innerHTML == "🚩") { // checking if the cell already has flag..if so this condition will remove and replace all the onclicks which was kept null on placing the flags
        FlaggedCell.innerHTML = " ";
        FlaggedCell.setAttribute("onclick", "coverRemove(this.id)");
        if ((parentEl === null || parentEl === void 0 ? void 0 : parentEl.className) == "bombimg") { //again checking if the flagged cell is bomb cell if so this condition will replace CLICKEDBOMB onclick func.
            parentEl.setAttribute("onclick", "setTimeout(clickBomb,500)");
            minesFlagged--;
        }
    }
    else {
        FlaggedCell.innerHTML = "🚩";
        FlaggedCell.removeAttribute('onclick');
        if ((parentEl === null || parentEl === void 0 ? void 0 : parentEl.className) == "bombimg") { //to check if the flagged cell has bomb if so to enable its onclick fns.
            parentEl === null || parentEl === void 0 ? void 0 : parentEl.removeAttribute("onclick");
            minesFlagged++;
            console.log(minesFlagged);
            if (minesFlagged == mn) { //when minesFlagged is equal to mine number input then user wins.
                document.getElementById('gWon').style.display = "block";
            }
        }
    }
}
function checkCover(checkID) {
    var _a;
    if (((_a = document.getElementById(checkID).parentElement) === null || _a === void 0 ? void 0 : _a.className) == "bombimg") { //checking this condition here because for expanding bombcells will be filtered out so its cover wont be removed and user wont be able to see the bomb..
        document.getElementById(checkID).style.display = "none";
    }
    else {
        coverRemove(checkID);
    }
}
function coverRemove(coverID) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var tempID = coverID.split('-');
    var Cr = +tempID[0];
    var Cc = +tempID[1];
    console.log(+Cr, +Cc);
    var TidElement = document.getElementById(coverID);
    if (((_a = TidElement === null || TidElement === void 0 ? void 0 : TidElement.parentElement) === null || _a === void 0 ? void 0 : _a.className) != "bombimg") {
        document.getElementById(coverID).style.display = "none";
        (_b = document.getElementById(coverID).parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("checked");
        if ((Cr > 0) && (Cc > 0)) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc - 1)) && (((_d = (_c = document.getElementById((Cr - 1) + '-' + (Cc - 1))) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.className) != "checked")) {
                coverIDAr.push((Cr - 1) + '-' + (Cc - 1));
            }
        }
        if (Cr > 0) {
            if (!coverIDAr.includes((Cr - 1) + '-' + Cc) && (((_f = (_e = document.getElementById((Cr - 1) + '-' + Cc)) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.className) != "checked")) {
                coverIDAr.push((Cr - 1) + '-' + Cc);
            }
        }
        if ((Cr > 0) && (Cc < cn - 1)) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc + 1)) && (((_h = (_g = document.getElementById((Cr - 1) + '-' + (Cc + 1))) === null || _g === void 0 ? void 0 : _g.parentElement) === null || _h === void 0 ? void 0 : _h.className) != "checked")) {
                coverIDAr.push((Cr - 1) + '-' + (Cc + 1));
            }
        }
        if (Cc < cn - 1) {
            if (!coverIDAr.includes(Cr + '-' + (Cc + 1)) && (((_k = (_j = document.getElementById(Cr + '-' + (Cc + 1))) === null || _j === void 0 ? void 0 : _j.parentElement) === null || _k === void 0 ? void 0 : _k.className) != "checked")) {
                coverIDAr.push(Cr + '-' + (Cc + 1));
            }
        }
        if ((Cr < rn - 1) && (Cc < cn - 1)) {
            if (!coverIDAr.includes((Cr + 1) + '-' + (Cc + 1)) && (((_m = (_l = document.getElementById((Cr + 1) + '-' + (Cc + 1))) === null || _l === void 0 ? void 0 : _l.parentElement) === null || _m === void 0 ? void 0 : _m.className) != "checked")) {
                coverIDAr.push((Cr + 1) + '-' + (Cc + 1));
            }
        }
        if (Cr < rn - 1) {
            if (!coverIDAr.includes((Cr + 1) + '-' + Cc) && (((_p = (_o = document.getElementById((Cr + 1) + '-' + Cc)) === null || _o === void 0 ? void 0 : _o.parentElement) === null || _p === void 0 ? void 0 : _p.className) != "checked")) {
                coverIDAr.push((Cr + 1) + '-' + Cc);
            }
        }
        if ((Cr < rn - 1) && (Cc > 0)) {
            if (!coverIDAr.includes((Cr + 1) + '-' + (Cc - 1)) && (((_r = (_q = document.getElementById((Cr + 1) + '-' + (Cc - 1))) === null || _q === void 0 ? void 0 : _q.parentElement) === null || _r === void 0 ? void 0 : _r.className) != "checked")) {
                coverIDAr.push((Cr + 1) + '-' + (Cc - 1));
            }
        }
        if (Cc > 0) {
            if (!coverIDAr.includes(Cr + '-' + (Cc - 1)) && (((_t = (_s = document.getElementById(Cr + '-' + (Cc - 1))) === null || _s === void 0 ? void 0 : _s.parentElement) === null || _t === void 0 ? void 0 : _t.className) != "checked")) {
                coverIDAr.push(Cr + '-' + (Cc - 1));
            }
        }
        console.log(coverIDAr);
    }
    expandCells(coverIDAr);
}
function expandCells(tempCoverID) {
    var _a, _b, _c;
    var openId;
    for (var d = 0; d < tempCoverID.length; d++) {
        var CurrentcoverID = tempCoverID[d];
        var PcoverEl = (_a = document.getElementById(CurrentcoverID)) === null || _a === void 0 ? void 0 : _a.parentElement;
        if ((PcoverEl === null || PcoverEl === void 0 ? void 0 : PcoverEl.className) != "bombimg") { //checking if the neighboring cells doesn't have bomb.
            document.getElementById(CurrentcoverID).style.display = "none";
            (_b = document.getElementById(CurrentcoverID).parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("checked");
        }
        if (d == (tempCoverID.length - 1)) {
            for (var z = (tempCoverID.length - 1); z >= 0; z--) {
                // console.log("hey", tempCoverID[z]);
                openId = tempCoverID[z];
                var openPid = (_c = document.getElementById(openId)) === null || _c === void 0 ? void 0 : _c.parentElement;
                console.log(openPid === null || openPid === void 0 ? void 0 : openPid.className);
                if ((openPid === null || openPid === void 0 ? void 0 : openPid.className) == "cell") {
                    // coverRemove(openId);
                    console.log("true");
                }
                else {
                    console.log("false");
                    z--;
                }
            }
        }
    }
}
function Reset() {
    location.reload();
}
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
