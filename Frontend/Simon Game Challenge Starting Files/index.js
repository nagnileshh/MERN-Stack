//Keypress event
$(document).keypress(function (e) {
  if (!started) {
    $("h1").removeClass("game-over");
    nextSequence();
    $("h1").text(`Level ${level}`);
    started = true;
  }
});

//Button click event
$(".btn").click(function (e) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  gameOver();

});

function gameOver() {
  if (
    JSON.stringify(userClickedPattern) ===
    JSON.stringify(gamePattern.slice(0, userClickedPattern.length))
  ) {
    if (l === gamePattern.length) {
        userClickedPattern = [];
        nextSequence()
    }
  } else {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
    $("h1").text("You lose! Press any key to start again.");
    $("h1").addClass("game-over");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
  }
}

var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  level++;
  $("h1").text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function() {
    $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  }, 200)
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkArraysForEquality(user, computer) {
  if (JSON.stringify(user) === JSON.stringify(computer.slice(0, user.length))) {
    console.log("True");
    return true;
  }
}
