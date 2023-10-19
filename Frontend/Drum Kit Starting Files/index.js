var numberOfDrums = document.querySelectorAll(".drum").length

for (let i = 0; i < numberOfDrums; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML
        playSound(buttonInnerHTML)
        animationHandler(buttonInnerHTML)
    })
}

function handleClick() {
    
    var buttonInnerHTML = this.innerHTML   //how we are getting this value without even passing it from the parent

    playSound(buttonInnerHTML)

    animationHandler(buttonInnerHTML)

    // var audio = new Audio("./sounds/crash.mp3")
    // audio.play()
    // this.style.color = 'white'

}

//Handling Keaboard events

document.addEventListener("keypress", function(e) {
    // handleKeyPress(e.key)
    playSound(e.key)
    animationHandler(e.key)
});

// document.addEventListener("keypress", handleKeyPress(e.key))  //why this is not working? can we call func with arguments?

// function handleKeyPress(key) {
//     playSound(key)
//     animationHandler(key)
// }

function playSound(key) {
    switch (key) {
        case 'w':
            var crash = new Audio("sounds/crash.mp3")
            crash.play()
            break;

        case 'a':
            var kickBass = new Audio("sounds/kick-bass.mp3")
            kickBass.play()
            break;
        
        case 's':
            var snare = new Audio("sounds/snare.mp3")
            snare.play()
            break;

        case 'd':
            var tom1 = new Audio("sounds/tom-1.mp3")
            tom1.play()
            break;

        case 'j':
            var tom2 = new Audio("sounds/tom-2.mp3")
            tom2.play()
            break;

        case 'k':
            var tom3 = new Audio("sounds/tom-3.mp3")
            tom3.play()
            break;

        case 'l':
            var tom4 = new Audio("sounds/tom-4.mp3")
            tom4.play()
            break;
    
        default:
            break;
    }
}

function animationHandler(key) {
    var activeButton = document.querySelector("." + key)
    activeButton.classList.add('pressed')
    setTimeout( function () {
        activeButton.classList.remove('pressed')
    }, 100)
}