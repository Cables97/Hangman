

let timer = 0
let livesLeft = 0;
let hintsUsed = 69;



//----------------------------------
// Timer
//----------------------------------



function initTimer(){
    let domTimer = document.getElementById("timer");
    timer = 0;

    setInterval( () =>{
        timer++;
        var minute = Math.floor(timer / 60);
        var seconds = timer % 60;
        domTimer.innerHTML = minute.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
    }, 1000);
}

//----------------------------------
// Lives
//----------------------------------

function initLives(numLives){
    let lives = document.getElementById("lives")
    livesLeft = numLives

    document.getElementById("lives-container").style.width = numLives * 34 + "px";


    let blanks = lives.querySelectorAll(".life");
    blanks.forEach(element => {
        //console.log("removing element")
        element.remove();
    });
    (document.getElementById("danger")) ? document.getElementById("danger").remove() : console.log("Danger doesn't exist")
    
    //builds lives
    for(let i = 0; i < livesLeft ; i++){
        let div = document.createElement('div');
            div.classList.add("life");
            lives.append(div);

        let skull = document.createElement('i');
            skull.classList.add("fa-solid");
            skull.classList.add("fa-skull");
            skull.classList.add("fa-2x");
            div.append(skull);
    }
}

function livesDec(){
    let lives = document.getElementById("lives").querySelectorAll(".life");
    livesLeft = document.getElementById("lives").querySelectorAll(".life").length;
    let liveToRemove = lives[livesLeft - 1];
    livesLeft --;

    if(livesLeft > 0){
        liveToRemove.remove()
    }

    if(livesLeft == 0){
        liveToRemove.remove()
        let danger = document.createElement('h4');
            danger.classList.add("danger");
            danger.id = "danger"
            danger.innerHTML = "DANGER";
            document.getElementById("lives").append(danger);
    }

    //gameOver
    if(livesLeft < 0){
        console.log(liveToRemove)
        console.log("gameover")
        document.getElementById("danger").remove();
        endToggle(false);
    }


    console.log(livesLeft);
    
    //liveToRemove.classList.remove("live-add");
    //liveToRemove.classList.add("live-remove");
}

//----------------------------------
// Menus
//----------------------------------
function menuToggle(){
    let menuWrapper = document.getElementById("menu-wrapper");
    let menu = document.getElementById("menu");
    let endScreen = document.getElementById("end-screen");


    if(!endScreen.classList.contains("menu-close")){
        endScreen.classList.remove("menu-open");
        endScreen.classList.add("menu-close");
    }
    

    if(!menuWrapper.classList.contains("bg-open")){
        menuWrapper.classList.remove("bg-close");
        menuWrapper.classList.add("bg-open");
    }

    if(menu.classList.contains("menu-open")){
        menu.classList.add("menu-close")
        menu.classList.remove("menu-open")

    }
    else{
        menu.classList.remove("menu-close")
        menu.classList.add("menu-open")
    }
    (menu.classList.contains("menu-open")) ?  console.log("Menu Screen Open") :  console.log("Menu Screen Close");

}

function endToggle(winLose){
    let menuWrapper = document.getElementById("menu-wrapper");
    let menu = document.getElementById("menu");
    let endScreen = document.getElementById("end-screen");

    winScreenUpdate();

    if(winLose){
        document.getElementById("end-title").innerHTML = "You Did It!"
        document.getElementById("end-sub").innerHTML = "You found the word!"
    } else {
        document.getElementById("end-title").innerHTML = "Oh No!"
        document.getElementById("end-sub").innerHTML = "You ran out of lives!"
    }




    if(!menu.classList.contains("menu-close")){
        menu.classList.remove("menu-open");
        menu.classList.add("menu-close");
    }
    

    if(!menuWrapper.classList.contains("bg-open")){
        menuWrapper.classList.remove("bg-close");
        menuWrapper.classList.add("bg-open");
    }

    if(endScreen.classList.contains("menu-open")){
        endScreen.classList.add("menu-close")
        endScreen.classList.remove("menu-open")

    }else{
        endScreen.classList.remove("menu-close")
        endScreen.classList.add("menu-open")
    }
    (endScreen.classList.contains("menu-open")) ?  console.log("Win Screen Open") :  console.log("Win Screen Close");

}


function winScreenUpdate(){
    let timer = document.getElementById("timer").innerHTML;
    let winLives = document.getElementById("win-lives");
    let winTimer = document.getElementById("win-timer");
    let lives = document.getElementById("lives").querySelectorAll(".life").length;

    let winHints = document.getElementById("win-hints-used");

    winTimer.innerHTML = timer;
    console.log("timer: " + timer);
    winLives.innerHTML = lives;
    console.log("lives: " + livesLeft);
    winHints.innerHTML = hintsUsed ;
    console.log("hints: " + hintsUsed);
}

function menuClose(){
    let menuWrapper = document.getElementById("menu-wrapper");
    let menu = document.getElementById("menu");
    let endScreen = document.getElementById("end-screen");
    console.log("Win Screen Open");

    if(!endScreen.classList.contains("menu-close")){
        endScreen.classList.remove("menu-open");
        endScreen.classList.add("menu-close");
    }

    if(!menu.classList.contains("menu-close")){
        menu.classList.remove("menu-open");
        menu.classList.add("menu-close");
    }

    if(menuWrapper.classList.contains("bg-open")){
        //close
        menuWrapper.classList.remove("bg-open")
        menuWrapper.classList.add("bg-close")
        
    }else{
        menuWrapper.classList.remove("bg-close")
        menuWrapper.classList.add("bg-open")
    }
    (menuWrapper.classList.contains("bg-open")) ?  console.log("Menu BG Screen Open") :  console.log("Menu BG Screen Close");

}



export { initTimer , menuToggle , endToggle , menuClose , livesDec, initLives}