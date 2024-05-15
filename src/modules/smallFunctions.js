//----------------------------------
// Letter check
//----------------------------------
function letterCheck(letter, arrWord){
    if(arrWord.includes(letter)){
        return true;
    }
    else {
        return false;
    }
}


function addClassWithDelay(elements, className) {
    let index = 0;
    
    function addClass() {
        console.log("loop #: " + index)
        // Check if we have reached the end of the elements list
        if (index >= elements.length) {
            return;
        }
        // Add the class to the current element
        elements[index].classList.add(className);
        // Move to the next element
        index++;
        // If there are still elements left, set a timeout for the next iteration
        if (index < elements.length) {
            setTimeout(addClass, 200);
        }
    }
    // Start the loop
    addClass();
}




export { letterCheck, addClassWithDelay } 