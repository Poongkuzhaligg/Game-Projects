var ar:number[] = [1, 2, 3 , 4, 5, 6 , 7, 8, 9, 10];
let mNo:number = ar.length;
mNo = 5

    var r:any = Math.floor(Math.random() * mNo) + 1;
    if(ar.indexOf(r) === -1) ar.push(r);

console.log(ar);