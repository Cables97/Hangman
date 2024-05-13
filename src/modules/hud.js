function winCheck(){
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