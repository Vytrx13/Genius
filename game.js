
const button_colors = ["red", "blue", "green", "yellow"];
var game_seq = [];
var user_seq = [];
var level = 0;
var game_started = false;
var pode_jogar = false;


$(document).keypress(function(){
    if (!game_started) {
        game_started = true;
        $("#level-title").text("Level " + level);
        proximo_seq();
    }
});


$(".btn").click(function()
{
    if (game_started && pode_jogar)
    {var user_color = $(this).attr("id"); // pega o id do botão clicado (q é a cor)
    user_seq.push(user_color);
    
    if (checar_resposta(user_seq.length - 1) === false) {
        // perdeu
        play_sound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over");
        $("#pode_jogar").text("Pressione uma tecla para jogar novamente");
        game_seq = [];
        user_seq = [];
        level = 0;
        game_started = false;
       
    }
    // proxima rodada
    else if (user_seq.length === game_seq.length) {
        play_sound(user_color);
        // setTimeout(function(){
        //     proximo_seq();
        // }, 1000);
        proximo_seq();
        user_seq = [];
    }
    else {
        play_sound(user_color)
    }

    $(this).addClass("pressed");
    setTimeout(function(){
        $("#" + user_color).removeClass("pressed");
    }, 200);}
    
});

function play_sound (color) { // color pode ser wrong tambem
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function checar_resposta (index) {
    if (game_seq[index] === user_seq[index]) return true;
    return false;
}


function proximo_seq() {
    level++;
    $("#level-title").text("Level " + level);
    $("#pode_jogar").text("Mostrando a sequência");
    pode_jogar = false;
    var num = Math.floor(Math.random() * 4);
    var random_color = button_colors[num];
    game_seq.push(random_color);

    game_seq.forEach((color, index) => {
        setTimeout(() => {
            $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
            var audio = new Audio("sounds/" + color + ".mp3");
            audio.play();
        }, (index+1) * 600); // Delay increases with each step (600ms per color)
    });


    setTimeout(function(){
        pode_jogar = true;
        $("#pode_jogar").text("Repita a sequência");
    }, (game_seq.length+1) * 600);
}









