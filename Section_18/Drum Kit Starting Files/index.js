
for(var i = 0; i <document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",  handleButtonClick);
}
document.addEventListener("keydown", handleKeyClick)


function handleButtonClick(event) {
    var buttonInnerHTML = event.target.innerHTML.toLowerCase();
    makeSound(buttonInnerHTML)
    buttonAnimation(buttonInnerHTML)
}

function handleKeyClick(event){
    var keyPressed = event.key.toLowerCase();
    makeSound(keyPressed);
    buttonAnimation(keyPressed)
}

function makeSound(key){
    var audio;
    switch (key) {
        case "w":
            audio = new Audio("./sounds/tom-1.mp3");
            break;
    
        case "a":
            audio = new Audio("./sounds/tom-2.mp3");
            break;
            
        case "s":
            audio = new Audio("./sounds/tom-3.mp3");
            break;

        case "d":
            audio = new Audio("./sounds/tom-4.mp3");
            break;

        case "j":
            audio = new Audio("./sounds/snare.mp3");
            break;

        case "k":
            audio = new Audio("./sounds/crash.mp3");
            break;

        case "l":
            audio = new Audio("./sounds/kick-bass.mp3");
            break;
        default:
            console.log(event.target.innerHTML)
            break;
    }
    audio.play();
}

function buttonAnimation(currentKey){

    var activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("pressed")
    
    setTimeout(function() {
        activeButton.classList.remove("pressed")
    }, 100)
}