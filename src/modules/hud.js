function winCheck(chosenWords, goalWord){
    const set1 = new Set(chosenWords);
    const set2 = new Set(goalWord);
    let boolWin = chosenWords.every(item => set2.has(item)) && goalWord.every(item => set1.has(item));
    console.log(boolWin)
}

let timer;
let domTimer = document.getElementById("timer");

//timerInit();

function timerInit(){
    timer = 0;
    setInterval(timerInc, 1000);
}

function timerInc(){
    timer++;
    domTimer.innerHTML = timer
    //console.log(timer)
}

export { timerInit , winCheck }