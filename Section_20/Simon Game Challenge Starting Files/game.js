var buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = -1;
var playerCanCopy = false;
var gameStarted = false;

$(".btn").on("click", handleClick);
$(document).on("keydown", startGame);

function startGame(){
    if(!gameStarted) {
        randomChosenColour = null;
        gamePattern = []
        userClickedPattern = []
        level = -1
        playerCanCopy = false
        gameStarted = true;
        nextSequence();
    }
}

function handleClick(event){
    if(playerCanCopy){
        var colour = event.target.id
        userClickedPattern.push(colour);
        handleAnimation(colour);

        var samePattern = checkAnswer();
        if(!samePattern) return gameOver();
        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            playerCanCopy = false;
            nextSequence();
        }
    }
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    level += 1;
    $("h1").text("Level " + level);

    handleAnimationSequence(gamePattern);
}

function handleAnimationSequence(gamePattern){
    var i = 0;
    const interval = setInterval(function(){
        if(i < gamePattern.length){
            const currentElement = $("#" + gamePattern[i]);
            currentElement.addClass("pressed")
            makeSound(gamePattern[i])
             setTimeout(function(){
                currentElement.removeClass("pressed")
             }, 500);
            i++
        }
        else{
            clearInterval(interval);
            playerCanCopy = true;
        }
    }, 1000)
}

function checkAnswer(){
    for(var i = 0; i < userClickedPattern.length; i++){
        if (userClickedPattern[i] !== gamePattern[i]){
            return false;
        }
    }
    return true;
}

function handleAnimation(colour){
    $("#" + colour).addClass("pressed")
        makeSound(colour);
        setTimeout(function(){
            $("#" + colour).removeClass("pressed");
        }, 100);
}

function makeSound(colour){
    var audio;
    switch (colour) {
        case "green":
            audio = new Audio("./sounds/green.mp3");
            break;
    
        case "red":
            audio = new Audio("./sounds/red.mp3");
            break;
            
        case "yellow":
            audio = new Audio("./sounds/yellow.mp3");
            break;

        case "blue":
            audio = new Audio("./sounds/blue.mp3");
            break;

        case "wrong":
            audio = new Audio("./sounds/wrong.mp3");
            break;
        default:
            console.log(colour);
            break;
    }
    audio.play();
}

function gameOver(){
    $("h1").text("Game Over");
    $(".btn").off();
    $(document).off();
}