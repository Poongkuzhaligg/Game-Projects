var cno, rno, colcell, rowcell, img;
var imgpos, hasClicked, n;
var count = 0;

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
     rowcell = document.getElementById('container').insertRow(r);
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
























// function randomElement() {
//     var arrNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
//     arrNo.sort()
// }



// function hiddenimg () {
//     colcell.innerHTML = ;
//     // colcell.style.backgroundImage = candyimgs[Math.floor(Math.random() * candyimgs.length)];
// }

    // for(var i=1;i<=rno;i++){
    //     for(var j=1;j<=cno;j++){
    //         var tag = document.createElement("table");
    //     }
    // }
//     var theader = '<table border="1">\n';
//     var tbody = '';
//     for(var i=1; i<= rno; i++) {
//         tbody += '<tr>';

//         for( var j=1; j<=cno; j++) {
//             tbody += '<td>';
//             tbody += 'cell' + i + ',' + j;
//             tbody += '<td>';
//         }
//         tbody += '</tr>\n';
//     }
//     var tfooter = '</table>';
//     document.getElementById('container').innerHTML = theader + tbody + tfooter;

        // var hidimg = document.createElement('img');
        // // colcell.insertCell(hiddenimg);
        // colcell.innerHTML = "<img src= './choco.webp' class='hid-img' />" ;
        // for(var v=0; v< candyimgs.length; v++){
        //     colcell.innerHTML += "<img src=\"'+candyimgs[i]+'\">";
        // }

                // var hidimg = document.getElementsByClassName('cell');
        // hidimg.src = './jelly.png';
        // append(hiddenimg);
        // var cube = document.querySelectorAll('.cell');
        // cube.forEach(function(){
        //     x = Math.floor(Math.random() * (max) +min);
        //     colcell.innerHTML = x;
        // });