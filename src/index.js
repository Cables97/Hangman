import { initializeBlanks, buildKeyboard  } from "./modules/elementBuilder.js";
import { timerInit, winCheck } from "./modules/hud.js";
import { randomWordGen } from "./modules/getSetFetch.js";

//----------------------------------
// variables
//----------------------------------



let arrChosenLetters = [];
let arrFoundLetters = [];
//animations
const revealTime = 200 ; //1000 = 1s

//----------------------------------
// Fetch Word
//----------------------------------
let word = await randomWordGen(); //if over 12, repull
const arrayWord = word[0]["word"].split("");
//----------------------------------
// Keyboard Init
//----------------------------------

initKeyboard();

//----------------------------------
// Blanks Init
//----------------------------------

initializeBlanks(word);

function toggleKeyPick(el){
    el.preventDefault;
    el.classList.add('click')
        setTimeout(() => { el.classList.remove('click') }, 250);
    el.offsetWidth;

    if(el.classList.contains("down")){
        console.log("already picked")
    }else{
        el.classList.add('down')
        letterCheck(el.dataset.label)
    }
}

function letterCheck(letter){
    console.log(letter)
    arrChosenLetters.push(letter)
    if(arrayWord.includes(letter)){
        console.log("found one")   
        let blanks = document.getElementById("blank-wrapper").querySelectorAll("." + letter);
        console.log(blanks)
        addClassWithDelay(blanks, 'trigger');
        for(let i = 0; i < blanks.length; i++){
            arrFoundLetters.push(letter);
        }
        console.log(arrFoundLetters)
        winCheck(arrFoundLetters, arrayWord);
    }
}


function initKeyboard(){
    buildKeyboard();

    document.querySelectorAll(".key").forEach(element => {
        element.addEventListener("click", () =>{
            toggleKeyPick(element)
        })
    });
}




//----------------------------------
//  Letter Checking
//----------------------------------


//----------------------------------
//  Letter Checking
//----------------------------------

function addClassWithDelay(elements, className) {
    let index = 0;
    
    function addClass() {
        console.log("loop #: " + index)
        // Check if we have reached the end of the elements list
        if (index >= elements.length) {
            return;
        }
        // Add the class to the current element
        elements[index].classList.add(className);
        // Move to the next element
        index++;
        // If there are still elements left, set a timeout for the next iteration
        if (index < elements.length) {
            setTimeout(addClass, revealTime);
        }
    }
    // Start the loop
    addClass();
}

