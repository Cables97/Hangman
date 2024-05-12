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
console.log(word[0])

 

document.getElementById('btn').addEventListener("click", () =>{

    if(document.getElementById('btn').classList.contains('active')){
        document.getElementById('btn').classList.remove('active')
        
    } else{
        document.getElementById('btn').classList.add('active')
    }
    
})