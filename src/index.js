import { initializeBlanks, buildKeyboard, keyDown } from "./modules/elementBuilder.js";
import { timerInit } from "./modules/hud.js";
//import { randomWordGen , randomWordMaster } from "./modules/getSetFetch.js";
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
        const dictionaryURL = await fetch('http://api.dictionaryapi.dev/api/v2/entries/en/' + randWord);
        const dictWord = await dictionaryURL.json();
        console.log(dictWord);
        if((typeof dictWord[0]["word"] === 'string' || dictWord[0]["word"] instanceof String)){
            return dictWord
        }else{
            console.log("error")
        }
        
}

let word = [{word:"placeholder"}];
let arrayWord = word[0]["word"].split("");

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
    keyDown(element);
    let letter = element.dataset.label;
    arrChosenLetters.push(letter)
    if(letterCheck(element.dataset.label, arrayWord)){
        let blanks = document.getElementById("blank-wrapper").querySelectorAll("." + letter);
        addClassWithDelay(blanks, 'trigger');
            //add all instances off the letter to the found letters
        for(let i = 0; i < blanks.length; i++){
            arrFoundLetters.push(letter);
        }
        console.log(arrFoundLetters)
        winCheck(arrFoundLetters, arrayWord);
    } else{//fail


    }

}

initKeyboard();

//----------------------------------
// Blanks Init
//----------------------------------


//----------------------------------
//  Start Game
//----------------------------------

function startGame(){
    initializeBlanks(word);
}

//----------------------------------
//  Game Modes
//----------------------------------
document.getElementById("easy-mode").addEventListener ( "click" , modeEasy)
async function modeEasy(){
    word = await randWordFind( 3,6 )
    arrayWord = word[0]["word"].split("");
    console.log( "matching word:  " + word[0]["word"]);
    startGame();
}

document.getElementById("med-mode").addEventListener ( "click" , modeMedium)
async function modeMedium(){
    word = await randWordFind( 6,9 )
    console.log( "matching word:  " + word[0]["word"]);
}

document.getElementById("hard-mode").addEventListener ( "click" , modeHard)
async function modeHard(){
    word = await randWordFind( 9,12 )
    console.log( "matching word:  " + word[0]["word"]);
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
    let menuWrapper = document.getElementById("menu-wrapper")
    let menu = document.getElementById("menu")
    let winScreen = document.getElementById("win-screen")


    menu.style.display = "none";
    winScreen.style.display = "";

}


