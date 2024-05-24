import { initBlanks, buildKeyboard, keyDown , resetKeyboard } from "./modules/elementBuilder.js";
import { initTimer , menuToggle , endToggle, menuClose , livesDec , initLives , giveHint , initHints} from "./modules/hud.js";
import { letterCheck, addClassWithDelay } from "./modules/smallFunctions.js";


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

async function randWordFind(minLetters, maxLetters){
    const wordBank = await fetch('./src/modules/words.json');
    const arrWordBank = await wordBank.json();
    console.log(arrWordBank);
    let randNum, randWord;
    let boolWord = false
    //loop through to find a matching word. Querying multiple words is faster than sorting
    while (!boolWord){
        randNum = Math.floor(Math.random() * arrWordBank.length);
        randWord = arrWordBank[randNum];
        
        if(randWord.length > minLetters && randWord.length < maxLetters){
             boolWord = true 
             console.log(randWord); 
            } else{
            console.log(randWord + " too long " + randWord.length)
            }
    } 
    const dictionaryURL = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + randWord);
    const dictWord = await dictionaryURL.json();
    console.log(dictWord);
    if((typeof dictWord[0]["word"] === 'string' || dictWord[0]["word"] instanceof String)){
        return dictWord
    }else{
        console.log("error")
    }
        
}

let word = [{word:"place-holder"}];

let cleanStr = word[0]["word"].replace(/[^a-zA-Z0-9]/g, '');

let arrayWord = cleanStr.split("");

//----------------------------------
// Keyboard Init
//----------------------------------

function initKeyboard(){
    buildKeyboard();
    document.querySelectorAll(".key").forEach(element => {
        element.addEventListener("click", () =>{
            keyboardDown(element)
        })
    });
}

function keyboardDown(element){
        //click animation
    let letter = element.dataset.label;
    arrChosenLetters.push(letter)
    if(letterCheck(element.dataset.label, arrayWord)){
        if(!element.classList.contains("down")){
            let blanks = document.getElementById("blank-wrapper").querySelectorAll("." + letter);
            addClassWithDelay(blanks, 'trigger');
                //add all instances off the letter to the found letters
            for(let i = 0; i < blanks.length; i++){
                arrFoundLetters.push(letter);
            }
            console.log(arrFoundLetters)
            winCheck(arrFoundLetters, arrayWord);
        }else{
            console.log("Found Key is already pressed")
        }

    } else{//fail
        let bool = element.classList.contains("down");
        if(bool){
            console.log("Key is already pressed")
        }else{
            livesDec();
        }
    }
    keyDown(element);

}

initKeyboard();

//----------------------------------
// Buttons
//----------------------------------


document.getElementById('replay').addEventListener("click", () =>{
    menuToggle();
})

document.getElementById("hint-btn").addEventListener("click" , () => {
    console.log("hint");
    giveHint(word);
})

document.getElementById("close-btn").addEventListener("click" , () =>{

    if (confirm("Are you sure you want to leave?\n") == true) {
        window.open("https://cables97.github.io/"); 
        window.close();
    }
})






//----------------------------------
//  Start Game
//----------------------------------

onLoad();

function onLoad(){
    menuToggle();
}

function startGame(){
    arrChosenLetters = [];
    arrFoundLetters = [];
    resetKeyboard();
    initBlanks(word);
    initTimer();
    menuClose();
    initHints(word);
}

//----------------------------------
//  Game Modes
//----------------------------------
document.getElementById("easy-mode").addEventListener ( "click" , modeEasy)
async function modeEasy(){
    word = await randWordFind( 3,6 )
    let cleanStr = word[0]["word"].replace(/[^a-zA-Z0-9]/g, '');
    arrayWord = cleanStr.split("");
    console.log( "matching word:  " + word[0]["word"]);
    initLives(8);
    startGame();
}

document.getElementById("med-mode").addEventListener ( "click" , modeMedium)
async function modeMedium(){
    word = await randWordFind( 6,9 )
    let cleanStr = word[0]["word"].replace(/[^a-zA-Z0-9]/g, '');
    arrayWord = cleanStr.split("");
    console.log( "matching word:  " + word[0]["word"]);
    initLives(5);
    startGame();
}

document.getElementById("hard-mode").addEventListener ( "click" , modeHard)
async function modeHard(){
    word = await randWordFind( 9,12 )
    let cleanStr = word[0]["word"].replace(/[^a-zA-Z0-9]/g, '');
    arrayWord = cleanStr.split("");
    console.log( "matching word:  " + word[0]["word"]);
    initLives(3);
    startGame();
}

//----------------------------------
//  Win State
//----------------------------------

function winCheck(chosenWords, goalWord){
    const set1 = new Set(chosenWords);
    const set2 = new Set(goalWord);
    let boolWin = chosenWords.every(item => set2.has(item)) && goalWord.every(item => set1.has(item));
    if(boolWin){
        youWin();
    }
}

function youWin(){
    console.log("YouWin!!")
    setTimeout(() => {
        endToggle(true);
    }, 2000);
    
}
