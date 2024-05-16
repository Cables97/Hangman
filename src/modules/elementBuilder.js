//----------------------------------
// Build Keyboard
//----------------------------------

//builds keyboard based on layout string --will implement QWERTY board layout. 
function buildKeyboard(){
    const alphabet = "abcdefghi-jklmnopqrs-tuvwxyz";
    const qwerty = "qwertyuiop-asdfghjkl-zxcvbnm"

    let keyboard = qwerty;
    const additionalKeys = [];
    const arrayAlphabet = keyboard.split("").concat(additionalKeys);
    const domKeyboard = document.getElementById("keyboard");
    //build keyboard Buttons
    for(let i = 0; i < arrayAlphabet.length ; i++){

        if (/^[a-zA-Z]+$/.test(keyboard[i])) {
            console.log("True: All letters are sorted.");
            let letter = arrayAlphabet[i];
            let button = document.createElement('button');
            button.classList.add(letter);
            button.classList.add("btn");
            button.classList.add("key");
            button.dataset.label = letter;
            domKeyboard.append(button);

        } else {
            //let br = document.createElement('br');
            //domKeyboard.append(br);

            let div = document.createElement('div');
            div.classList.add("empty-key-space");
            domKeyboard.append(div);
        }


    }
}

function keyDown(el){
    el.preventDefault;
    el.classList.add('click')
        setTimeout(() => { el.classList.remove('click') }, 250);
    el.offsetWidth;
    if(!el.classList.contains("down")){
        el.classList.add('down')
    }
}

function resetKeyboard(){
    const keys = document.querySelectorAll(".key");
    for ( let i = 0 ; i < keys.length ; i++){
        keys[i].classList.remove("down")
    }
}

//----------------------------------
// Build Game Board
//----------------------------------

function buildBlankBox(word){
    //console.log("building blanks for: " + word[0]["word"])
    let arrayWord = word[0]["word"].split("");
    //console.log(arrayWord);
    arrayWord.forEach(letter => {
        if (/^[a-zA-Z]+$/.test(letter)) {
            buildBlank(letter)
        } else {
            shownBlank(letter);
        }
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

function emptyBlankBox(){
    let blanks = document.querySelectorAll(".blank");
    blanks.forEach(element => {
        //console.log("removing element")
        element.remove();
    });
}

function initBlanks(word){
    emptyBlankBox();
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

function shownBlank(letter){
    const domBlanksBox = document.getElementById("blank-wrapper");

    let blank = document.createElement('div');
        blank.classList.add("blank");
        blank.classList.add(letter)
        domBlanksBox.append(blank);

    let text = document.createElement('div');
        text.classList.add("letter");
        text.innerHTML = letter;
        blank.append(text);
}






export { initBlanks, buildKeyboard, keyDown , resetKeyboard}