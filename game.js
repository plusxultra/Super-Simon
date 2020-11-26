var buttonColors = ["one","two","three","four","five","six","seven","eight","nine","ten"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keydown(function(){
    if (!started) {
        nextSequence();
        $("#level-title").text("Level "+level);
        started = true;
    }
    else{
        nextSequence();
    };
})

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game over. Press any key to restart.");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*10); 
    var randomChosenNumber = buttonColors[randomNumber];
    gamePattern.push(randomChosenNumber);
    $("#"+randomChosenNumber).fadeOut(100).fadeIn(100);

    if ($("#"+randomChosenNumber).hasClass("red")) {
        playSound("red");
    }else{
        playSound("blue");
    }
};

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
};

$(".btn").click(function(){
    var userChosenColor = this.id;

    if (userChosenColor == "one" || userChosenColor == "two" || userChosenColor == "three" || userChosenColor == "four" || userChosenColor == "five"){
        playSound("red");
    }else {
        playSound("blue");
    }

    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});
