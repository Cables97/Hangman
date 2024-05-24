

let timer = 0
let livesLeft = 0;


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

    document.getElementById("lives-container").style.width = numLives * 38 + "px";


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
// Hints
//----------------------------------

function giveHint(word){
    let randNum, outDef, outPos, meaning;
    let hintBox = document.getElementById("hint-box");
    let wordMeanings = word[0]["meanings"];
    let hintCount = 0;
    let hintList = hintBox.querySelectorAll(".hint")


    if(hintList){
        hintCount = hintList.length;
    }
    
    let defCount = 0;
    wordMeanings.forEach(meaning => {
        defCount += meaning["definitions"].length
    });



    if(hintCount < defCount && hintCount <= 3){
        //meanings
        if (wordMeanings.length > 1 ){
            randNum = Math.floor(Math.random() * wordMeanings.length);
            meaning = wordMeanings[randNum];

        } else{
            meaning = wordMeanings[0];
        }

        //definitions
        if(meaning["definitions"].length > 1){
            randNum = Math.floor(Math.random() * meaning["definitions"].length);
            outDef = meaning["definitions"][randNum]["definition"];
            outPos = meaning["partOfSpeech"]
        }
        else{
            outDef = meaning["definitions"][0]["definition"];
            outPos = meaning["partOfSpeech"]
        }
        console.log(outPos)
        console.log(outDef)





        //out
        let hint = document.createElement('h2');
        hint.classList.add("hint");
        hint.innerHTML = "<span class='part-of-speech'>" + outPos + ":</span>" + outDef ;
        hintBox.append(hint);
    }
}



function clearHints(){
    let hintBox = document.getElementById("hint-box");
    let hints = hintBox.querySelectorAll(".hint");
    hints.forEach(element => {
       element.remove(); 
    });
}

function initHints(word){
    clearHints();
    giveHint(word)
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
    let time = document.getElementById("timer").innerHTML;
    let winTimer = document.getElementById("win-timer");

    let winLives = document.getElementById("win-lives");
    let lives = document.getElementById("lives").querySelectorAll(".life").length;

    let winHints = document.getElementById("win-hints-used");
    let hintCount = document.getElementById("hint-box").querySelectorAll(".hint").length - 1;

    winTimer.innerHTML = time;
    console.log("timer: " + time);
    winLives.innerHTML = lives;
    console.log("lives: " + livesLeft);
    winHints.innerHTML = hintCount ;
    console.log("hints: " + hintCount);
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



export { initTimer , menuToggle , endToggle , menuClose , livesDec, initLives , giveHint , initHints}