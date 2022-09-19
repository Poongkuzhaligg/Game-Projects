var cno, rno, colcell, rowcell, img, cardOneEl, cardTwoEl, Card1, Card2, cardOne, cardTwo, cardOneId, cardTwoId;
var imgpos, hasClicked, n, matchedAr = [];
var count = 0;
var hasclicked;
let table = document.getElementById('container');

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
    for(let r=0; r<(rno);r++)
    {
     rowcell = table.insertRow(r);
     rowcell.setAttribute('class', 'cell-cont');
     for(let c=0;c<(cno);c++)  
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
            colcell.addEventListener('click', openCard);
        }
    }
}

function openCard(){
    var CurrentCard = document.getElementById(this.id);
    var imgCard = CurrentCard.firstChild;
    imgCard.style.display = "block";
    console.log(imgCard.src.toString())
    if(!hasclicked ){
        hasclicked = true;
        cardOne = imgCard.src.toString();  
        cardOneId = imgCard.id;
        cardOneEl = imgCard; 
        Card1 = CurrentCard;
        console.log(hasclicked); 
    }
    else {
        hasclicked = false;
        cardTwo = imgCard.src.toString();  
        cardTwoId = imgCard.id;
        cardTwoEl = imgCard; 
        Card2 = CurrentCard;
        console.log(hasclicked); 

        if(cardOneId == cardTwoId) { 
            alert("you clicked the same card!");
            hideCardOne();
            return;
        }
        else if(cardOne === cardTwo){ 
            console.log("Cards are matched");
            matchedAr.push(cardOneId,cardTwoId);
            // setTimeout (disappearCardOne, 300);
            // setTimeout (disappearCardTwo, 300);
            console.log(matchedAr);
        }
        else {
            console.log("Not matched"); 
            setTimeout(hideCardOne, 500); 
            setTimeout(hideCardTwo, 500); 
        }
    }
    if(matchedAr.length == (rno*cno)){
        setTimeout(() => {
            document.getElementById("gameOver").style.display = "block";
        }, 400);
        console.log("Game over!");
    }
}

// function disappearCardOne() {
//     Card1.style.display = "none";
// }
// function disappearCardTwo() {
//     Card2.style.display = "none";
// }
function hideCardOne() {
    cardOneEl.style.display = "none";
}
function hideCardTwo() {
    cardTwoEl.style.display = "none";
}
function reloadgame() {
    window.location.reload();
}






















