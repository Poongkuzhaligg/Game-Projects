var cno, rno, colcell, rowcell, img;
var imgpos, hasClicked, n;
var count = 0;
var table = document.getElementById('container');

function rowncol() {
    rno = document.getElementById("rno").value;
    cno = document.getElementById("cno").value;

    if( rno != cno) {
        alert("Enter same rows and columns!!");
    }

    if((rno%2)== 1 && (cno%2) == 1) {
        alert("Enter even numbers only!!");
    }

    else if (rno===cno) {
        console.log(rno);
        console.log(cno);
        createTable();
        count++;
        console.log(count);
        if(count == 1) {
            document.getElementById("btn").onclick = null;
            // table.removeChild(rowcell(r).colcell(c));
        }
    }


}

function createTable() {
    let candyImgs = ['./apple.png', './bubtea.webp', './cheesecake.webp','./candy.png', './chicken.png', './chococake.png', './burger.webp', './corn.png', 
    './choco.webp', './cupcake.png', './donut.png', './eggs.png','./frsalad.png', './icecream.png', './macaroon.png', './soup.png', './shake.png', './Tencoco.png',
    './samosa.webp', './sandwich.png','./watmel.png', './toff.png','./cottoncandy.png', './pastta.png', './pizza.png', './taco.png',
    './popcorn.png', './jelly.png','./lolipop.png', './marsh.png', './mint.png', './cane.png', './heartcandy.png', './fries.png'];
    var RPairImgs = [];
    candyImgs.length = (rno*cno)/2;
    RPairImgs.length = (rno*cno)/2;
    RPairImgs = [].concat(...Array(2).fill(candyImgs));
    RPairImgs.sort( () => 0.5 - Math.random() );
    console.log(RPairImgs);

    n = 0;
    for(var r=0; r<(rno);r++)
    {
     rowcell = table.insertRow(r);
     rowcell.setAttribute('class', 'cell-cont');
     for(var c=0;c<(cno);c++)  
        {
            colcell =  rowcell.insertCell(c);
            colcell.setAttribute('class', 'cell' );
            colcell.setAttribute('id', 'cell'+r+c );
            img = document.createElement('img');
            img.src = RPairImgs[n];
            colcell.appendChild(img);
            img.setAttribute('class', 'Hid-img');    
            img.setAttribute('id', 'RI-'+n);
            n++;
        }
    }
}








function reloadgame() {
    window.location.reload();
}






















