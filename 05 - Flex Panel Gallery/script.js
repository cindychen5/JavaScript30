//grab all the panels
const panels = document.querySelectorAll('.panel');

//write fxn that will toggle that class
//this in turn triggers a CSS open
function toggleOpen() {
    this.classList.toggle('open')
}

//when the first JS finishes, the transitionend will trigger this fxn
function toggleActive(e) {
    console.log(e.propertyName)
    if(e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
    }
}

//on each of the panels, loop over each one, listen for click, run toggle fxn when it is run
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));