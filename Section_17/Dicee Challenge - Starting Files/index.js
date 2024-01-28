var player1 = Math.floor(Math.random() * 6);
var player2 = Math.floor(Math.random() * 6);
console.log("Player 1: " + player1 + ", Player 2: " + player2 )

document.querySelector(".img1").src = "./images/dice" + (player1 + 1) + ".png";
document.querySelector(".img2").src = "./images/dice" + (player2 + 1) + ".png";

if (player1 === player2) 
{ 
    document.querySelector("h1").textContent = "It's a tie!";
}
else if (player1 > player2)
{
    document.querySelector("h1").textContent = "Player 1 wins!";
}
else if (player1 < player2)
{
    document.querySelector("h1").textContent = "Player 2 wins!";
}


