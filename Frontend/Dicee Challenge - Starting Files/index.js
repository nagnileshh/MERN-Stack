var num1 = Math.floor(Math.random()*6)+1
var image1URL = `./images/dice${num1}.png`

var num2 = Math.floor(Math.random()*6)+1
var image2URL = `./images/dice${num2}.png`

document.querySelector(".dice .img1").setAttribute("src", image1URL)
document.querySelector(".dice .img2").setAttribute("src", image2URL)

var msg = ""

if (num1 > num2) {
    document.querySelector('h1').innerText = "Player1 Won."
} else if (num1 < num2) {
    document.querySelector('h1').innerText = "Player2 Won."
} else {
    document.querySelector('h1').innerText = "Draw!"
}

