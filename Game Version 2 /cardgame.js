// let candyimgs = ['./candy.png', './corn.png', './choco.webp', './cottoncandy.png', './jelly.png','./lolipop.png', './heartcandy.png', './cane.png', './mint.png', './marsh.png', 
// './candy.png', './corn.png', './choco.webp', './cottoncandy.png', './jelly.png','./lolipop.png', './heartcandy.png', './cane.png', './mint.png', './marsh.png'  ];
var arrNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

var cno, rno, colcell, rowcell;
var imgpos, x;
let max = (rno*cno)/2;
let min =1;
var table = document.querySelector("tbody");


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
    }

}

function createTable() {
    for(var r=0;r<(rno);r++)
    {
     rowcell = document.getElementById('container').insertRow(r);
     rowcell.setAttribute('class', 'cell-cont' );
     for(var c=0;c<(cno);c++)  
      {
        colcell =  rowcell.insertCell(c);
        colcell.setAttribute('class', 'cell' );
        colcell.setAttribute('id', 'cell'+r+c );
        
        // colcell.value= r+ " " + c; 
        // imgpos = colcell.value;
        // colcell.innerHTML = imgpos; 
        // for(i=min; i<=max; i++) {
        //     var display = arrNo[i];
        //     document.getElementById("check").innerHTML = display;
        // }
        
        var Rnum = arrNo[Math.floor(Math.random() * arrNo.length)];
        colcell.innerHTML= Rnum;
        // var cube = document.querySelectorAll('.cell');
        // cube.forEach(function(){
        //     x = Math.floor(Math.random() * (max) +min);
        //     colcell.innerHTML = x;
        // });
       }
    }
}







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