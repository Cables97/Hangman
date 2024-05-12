//----------------------------------
// Fetch Word
//----------------------------------
/*
const randWordURL = 'http://www.randomlists.com/data/words.json'

async function randWordFind() {
  return fetch(randWordURL).then(res => res.json());
}

let randomWord = await randWordFind()

const dictionaryURL = 'http://api.dictionaryapi.dev/api/v2/entries/en/' + randomWord

async function dictFind() {
    return fetch(jsonDataURL).then(res => res.json());
  }

let randomWordDict  = await dictFind();

console.log(randomWord)
*/
const express = require('express');
const request = require('request');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/jokes/random', (req, res) => {
  request(
    { url: '<https://joke-api-strict-cors.appspot.com/jokes/random>' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
