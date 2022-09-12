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
        }
    }
}
function clickBomb() {
    var _a;
    for (var s = 0; s < cIDAr.length; s++) {
        var findB = cIDAr[s];
        var findBcell = document.getElementById(findB);
        if ((_a = findBcell.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("bombimg")) {
            findBcell.style.display = "none";
        }
    }
    stopGame();
    var gameOver = document.getElementById('gOver').style.display = "block";
}
function setNos() {
    for (var x = 0; x < rn; x++) {
        for (var y = 0; y < cn; y++) {
            initC = document.getElementById('cell' + x + '-' + y);
            console.log(initC);
            if (initC.className == "bombimg") {
                y + 1;
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
        else if ((parentEl === null || parentEl === void 0 ? void 0 : parentEl.className) == "cell" || (parentEl === null || parentEl === void 0 ? void 0 : parentEl.className) == "numbercell") {
            FlaggedCell.setAttribute("onclick", "checkCover(this.id)");
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
                stopGame();
                document.getElementById('gWon').style.display = "block";
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
                coverIDAr.push((Cr - 1) + '-' + (Cc - 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc - 1))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc - 1));
                expCells((Cr - 1), (Cc - 1));
            }
        }
    }
    if (Cr > 0) {
        if ((_b = document.getElementById((Cr - 1) + '-' + (Cc)).parentElement) === null || _b === void 0 ? void 0 : _b.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc));
            }
        }
        else {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc));
                expCells((Cr - 1), (Cc));
            }
        }
    }
    if ((Cr > 0) && (Cc < cn - 1)) {
        if ((_c = document.getElementById((Cr - 1) + '-' + (Cc + 1)).parentElement) === null || _c === void 0 ? void 0 : _c.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc + 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr - 1) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr - 1) + '-' + (Cc + 1));
                expCells((Cr - 1), (Cc + 1));
            }
        }
    }
    if (Cc < cn - 1) {
        if ((_d = document.getElementById((Cr) + '-' + (Cc + 1)).parentElement) === null || _d === void 0 ? void 0 : _d.classList.contains("numberCell")) {
            if (!coverIDAr.includes((Cr) + '-' + (Cc + 1))) {
                coverIDAr.push(Cr + '-' + (Cc + 1));
            }
        }
        else {
            if (!coverIDAr.includes((Cr) + '-' + (Cc + 1))) {
                coverIDAr.push((Cr) + '-' + (Cc + 1));
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
function stopGame() {
    for (var s = 0; s < cIDAr.length; s++) {
        var findB = cIDAr[s];
        var findBcell = document.getElementById(findB);
        findBcell.onclick = null;
        findBcell.oncontextmenu = null;
    }
}
function Reset() {
    location.reload();
}
