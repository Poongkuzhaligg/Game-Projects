var hasclicked;
var cardOne, cardTwo;
var cardOneVal, cardTwoVal, cardOneID, cardTwoID;
function disappearCardOne () {
    document.getElementById(cardOneID).style.display = "none";
}
function disappearCardTwo () {
    document.getElementById(cardTwoID).style.display = "none";

}
function hideCardOne() {
    document.getElementById(cardOneID).src = "./200w.gif";
}
function hideCardTwo() {
    document.getElementById(cardTwoID).src = "./200w.gif";
}
function image (x) {
    var cell = {
        1: "./candy.png", 2: "./cottoncandy.png", 3: "./lolipop.png", 4: "./marsh.png",
        5: "./cottoncandy.png", 6: "./candy.png", 7: "./mint.png", 8: "./choco.webp",
        9: "./corn.png", 10: "./lolipop.png", 11: "./jelly.png", 12: "./marsh.png",
        13: "./jelly.png", 14: "./corn.png", 15: "./choco.webp", 16: "./mint.png"
    }
    var clcard = 'img-'+ x; //to get the current HTML element by the Id using  string concatenation.
    document.getElementById(clcard).src = cell[x]; //current image value is stored in cell[x];
    console.log(hasclicked); 
    if(!hasclicked ){
        hasclicked = true;
        cardOne = x; //current card's key 
        cardOneVal = cell[x]; //current card's value
        cardOneID = clcard; //current card Id
        console.log(hasclicked); // status of clicked card
    }
    else {
        hasclicked = false;
        cardTwo = x; //next card's key 
        cardTwoVal = cell[x]; //next card's value 
        cardTwoID = clcard; //next card's id 
        console.log(hasclicked); // status of next card 

        if(cardOne == cardTwo) { // to avaoid double clicks by checking the key of card.. 
            alert("you clicked the same card!");
            hideCardOne(); //since card one is clicked two times.. Hidecardone is called to hide the card
        }
        else if(cardOneVal === cardTwoVal){ //check if the value of card one is the same as card two 
            console.log("the card is matched");
            disappearCardOne();
            setTimeout (disappearCardTwo, 500); // to show the card and then disappear the card
        }
        else {
            console.log("the card is not matched"); 
            hideCardOne(); // to hide card one 
            setTimeout(hideCardTwo, 500); //hide card two
        }
    }
}


























// function image1() {
//     var x1 = document.getElementById("img-1").src="./candy.png";
// }
// function image2() {
//     var x2 = document.getElementById("img-2").src="./cottoncandy.png";
// }
// function image3() {
//     var x3 = document.getElementById("img-3").src="./lolipop.png";
// }
// function image4() {
//     var x4 = document.getElementById("img-4").src="./cane.png";
// }
// function image5() {
//     var x5 = document.getElementById("img-5").src="./jelly.png";
// }
// function image6() {
//     var x6 = document.getElementById("img-6").src="./corn.png";
// }
// function image7() {
//     var x7 = document.getElementById("img-7").src="./candy.png";
// }
// function image8() {
//     var x8 = document.getElementById("img-8").src="./choco.webp";
// }
// function image9() {
//     var x9 = document.getElementById("img-9").src="./heartcandy.png";
// }
// function image10() {
//     var x10 = document.getElementById("img-10").src="./lolipop.png";
// }
// function image11() {
//     var x11 = document.getElementById("img-11").src="./jelly.png";
// }
// function image12() {
//     var x12 = document.getElementById("img-12").src="./cane.png";
// }
// function image13() {
//     var x13 = document.getElementById("img-13").src="./cottoncandy.png";
// }
// function image14() {
//     var x14 = document.getElementById("img-14").src="./corn.png";
// }
// function image15() {
//     var x15 = document.getElementById("img-15").src="./choco.webp";
// }
// function image16() {
//     var x16 = document.getElementById("img-16").src="./heartcandy.png";
// }

    // arClick.push(x); // push the key of the cell i.e to get which card is clicked
    // console.log(arClick);