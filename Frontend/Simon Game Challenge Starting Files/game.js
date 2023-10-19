//Keypress event
$(document).keypress(function (e) {
  if (!started) {
    $("h1").removeClass("game-over")
    nextSequence();
    // console.log(e.key)
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
  // console.log(userChosenColour);
  // console.log("user", userClickedPattern);
  // console.log("computer", gamePattern);

  // f(userClickedPattern, gamePattern)

  if (userClickedPattern.length === gamePattern.length) {
    console.log("final check user-computer", userClickedPattern, gamePattern)
    if (checkArraysForEquality(userClickedPattern, gamePattern)) {
      console.log("inide if")
      userClickedPattern = [];
      nextSequence();
    }
    else {
      console.log("inide else")
      gamePattern = []
      level = 0
      $("h1").text("You lose! Press any key to start again.");
      userClickedPattern = []
      started = false
      $("h1").addClass("game-over")
      var wrongAudio = new Audio("sounds/wrong.mp3")
      wrongAudio.play()
    }
  }
});

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
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  // console.log('computer', gamePattern);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  // console.log(level, gamePattern)
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
  var l = user.length
  // var c = computer
  if (JSON.stringify(user) === JSON.stringify(computer.slice(0,l))){
    console.log("True")
    return true
  }
}

// function f(userClickedPattern, gamePattern){
//   if (userClickedPattern.length === gamePattern.length) {
//     console.log("final check user-computer", userClickedPattern, gamePattern)
//     if (checkArraysForEquality(userClickedPattern, gamePattern)) {
//       console.log("inide if")
//       userClickedPattern = [];
//       nextSequence();
//     }
//     else {
//       console.log("inide else")
//       gameOver()
//     }
//   }
// }

// function gameOver() {
//   gamePattern = []
//   level = 0
//   $("h1").text("You lose! Press any key to start again.");
//   userClickedPattern = []
//   started = false
//   $("h1").addClass("game-over")
//   var wrongAudio = new Audio("sounds/wrong.mp3")
//   wrongAudio.play()
// }