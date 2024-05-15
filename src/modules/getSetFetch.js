
async function randWordFind() {
    const randWordURL = './src/modules/words.json'
    return fetch(randWordURL).then(res => res.json());
}
  
async function dictFind(randWord) {
    const dictionaryURL = 'http://api.dictionaryapi.dev/api/v2/entries/en/' + randWord
    return fetch(dictionaryURL).then(res => res.json());
}

async function  randomWordGen(minLetters, maxLetters){
    //find random word in list
    let randomWords = await randWordFind()
        
    let randNum = Math.floor(Math.random() * randomWords.length)
    let randWord = randomWords[randNum]
    console.log(randWord)
    if(randWord.length > minLetters && randWord.length <= maxLetters){
        console.log( randWord + " too big/short, re-pulling");
        randomWordGen()
    }
    else{
            //console.log(randWord);
        let randomWordDict  = await dictFind(randWord);
            //console.log(randomWordDict)
        return randomWordDict

    }
}

 function randomWordMaster(minLetters, maxLetters){
    setTimeout(() => {
        const word =  randomWordGen(minLetters, maxLetters);
        console.log("word:")
        console.log(word)
        return word;
    }, 1000);
}


export { randomWordGen , randomWordMaster}