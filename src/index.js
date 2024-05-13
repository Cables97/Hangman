import { buildKeyboard, buildBlankBox} from "./modules/elementBuilder.js";


//----------------------------------
// Fetch Word
//----------------------------------

async function randWordFind() {
    const randWordURL = './src/modules/words.json'
    return fetch(randWordURL).then(res => res.json());
  }
  
async function dictFind(randWord) {
const dictionaryURL = 'http://api.dictionaryapi.dev/api/v2/entries/en/' + randWord
return fetch(dictionaryURL).then(res => res.json());
}

async function  randomWordGen(){
let randomWords = await randWordFind()
//console.log(randomWord)
let randNum = Math.floor(Math.random() * randomWords.length)
let randWord = randomWords[randNum]
//console.log(randWord);

let randomWordDict  = await dictFind(randWord);
//console.log(randomWordDict)
return randomWordDict
}

let word = await randomWordGen();
const arrayWord = word[0]["word"].split("");
//----------------------------------
// Keyboard Init
//----------------------------------

let chosenLetters = [];
buildKeyboard();

document.querySelectorAll(".key").forEach(element => {
    element.addEventListener("click", () =>{
        toggleKeyPick(element)
    })
});

function toggleKeyPick(el){
    el.preventDefault;
    el.classList.add('click')
        setTimeout(() => { el.classList.remove('click') }, 200);
    el.offsetWidth;

    if(el.classList.contains("down")){
        console.log("already picked")
    }else{
        el.classList.add('down')
        letterCheck(el.dataset.label)
    }
}


//----------------------------------
// Blanks Init
//----------------------------------

initializeBlanks();

function initializeBlanks(){

    buildBlankBox(word);
    let blanks = document.querySelectorAll(".blank");
    blanks.forEach(element => {
        element.addEventListener("click", () => {
        let letter = element.getElementsByClassName("letter")[0].innerHTML
        })
    });
    for(let i = 0; i < blanks.length; i++){
        blanks[i].classList.add("show")
    }
 
}


//----------------------------------
//  Letter Checking
//----------------------------------

function letterCheck(letter){
    console.log(letter)
    chosenLetters.push(letter)
    if(arrayWord.includes(letter)){
        console.log("found one")
        letterReveal(letter)
    }
}

function letterReveal(letter){
    let blanks = document.querySelectorAll(".blank");
    
    blanks.forEach(blank => {
        
        let lett = blank.getElementsByClassName("letter")[0].innerHTML
        if(lett === letter){
            setTimeout(function() {
                console.log("banana " + letter)
            }, 1000);
        }
    })
}

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