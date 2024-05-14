//----------------------------------
// Build Keyboard
//----------------------------------

function buildKeyboard(){
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const arrayAlphabet = alphabet.split("");
    const domKeyboard = document.getElementById("keyboard");

    for(let i = 0; i < arrayAlphabet.length ; i++){
        let letter = arrayAlphabet[i];
        let button = document.createElement('div');
        button.classList.add(letter);
        button.classList.add("btn");
        button.classList.add("key");
        button.dataset.label = letter;
        domKeyboard.append(button);
    }
}





//----------------------------------
// Build Game Board
//----------------------------------


function buildBlankBox(word){
    console.log(word[0])
    const arrayWord = word[0]["word"].split("");
    arrayWord.forEach(letter => {
        buildBlank(letter)
    });  
}

function buildBlank(letter){
    const domBlanksBox = document.getElementById("blank-wrapper");

    let blank = document.createElement('div');
        blank.classList.add("blank");
        blank.classList.add(letter)
        domBlanksBox.append(blank);

    let left = document.createElement('div');
        left.classList.add("b-s");
        left.classList.add("left");
        blank.append(left);

    let right = document.createElement('div');
        right.classList.add("b-s");
        right.classList.add("right");
        blank.append(right);

    let text = document.createElement('div');
        text.classList.add("letter");
        text.innerHTML = letter;
        blank.append(text);
}

function initializeBlanks(word){

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






export { initializeBlanks, buildKeyboard }