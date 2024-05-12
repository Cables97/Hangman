//----------------------------------
// Fetch Word
//----------------------------------

const randWordURL = '.src/words.json'

async function randWordFind() {
  return fetch(randWordURL).then(res => res.json());
}

let randomWord = await randWordFind()

const dictionaryURL = 'http://api.dictionaryapi.dev/api/v2/entries/en/' + randomWord[1]

async function dictFind() {
    return fetch(jsonDataURL).then(res => res.json());
  }

let randomWordDict  = await dictFind();

console.log(randomWord)
