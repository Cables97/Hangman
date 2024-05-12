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
// index.js
import express from "express";

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require("./data.json");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send(data);
});

app.listen(3000, (error) => {
  if (error) {
    throw new Error(error);
  }

  console.log("Backend is running");
});