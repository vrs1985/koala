$(document).ready(function(){
function rect(color, x, y, width, height){
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw = function (){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}
function arc(color, x, y, r, startangle, endangle){
    this.color = color;
    this.x = x;
    this.y = y;
    this.r = r;
    this.startangle = startangle;
    this.endangle = endangle;
    this.draw = function (){

        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, this.startangle, this.endangle);
        context.fill();
        context.closePath();
    };
}

function collision(objA, objB) {
    if (objA.x + objA.r     > objB.x &&
        objA.x                  < objB.x + objB.r &&
        objA.y + objA.r    > objB.y &&
        objA.y                  < objB.y + objB.r)
    {
            return true;
    } else {
            return false;
    }
}

function playerMove(e){
    if(start){
    var y = e.offsetY;
    if (player.height / 2 + 10 < y && y < game.height - player.height / 2 - 10) {
        player.y = y - player.height / 2;
    } }
}

function aiMove() {
    var y;
    switch (ball.vY){
        case 2:
            vY = 2;
            break;
        case 3:
            vY = 3;
            break;
        case 4:
            vY = 4;
            break;
        case 5:
            vY = 5;
            break;
        case 6:
            vY = 5;
            break;
        case 7:
            vY = 6;
            break;
        case 8:
            vY = 7;
            break;
        case 9:
            vY = 7;
            break;
        case 10:
            vY = 8;
            break;
        case 11:
            vY = 9;
            break;
        case 0:
            vY = 0;
            break;
    }

    if(ball.y < ai.y + ai.height / 2){
        y = ai.y - vY;
    } else{
        y = ai.y + vY;
    }
    if(10 < y && y < game.height - ai.height - 10){
        ai.y = y;
    }
}

function startGame(){
    if(!start){
        ball.vX = -2;
        ball.vY = 2;
        start = true;
    }
}

function draw(){
    game.draw();
    /*score on the field*/
    context.font = 'bold 128px courier';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#3d3d3d';
    context.fillText (ai.scores, 100, 0);
    context.fillText (player.scores, game.width - 100, 0);
    /*middle line*/
    for (var i = 0; i < game.height; i += 50){
        context.fillStyle = "#3d3d3d";
        context.fillRect(game.width / 2 - 7.5, i, 15, 30);
    }
    ai.draw();
    player.draw();
    ball.draw();
    if(!start){
            /*count total/win/lose*/
    context.fillStyle = '#F00';       
    context.font = 'bold 20px Arial';
    context.fillText ('Total: ' + game.total + ' Win: ' + game.win + ' Lose: ' 
        + game.lose, game.width / 2, 0);
    if (game.total != 0){
        context.fillStyle = '#F00';       
        context.font = 'bold 80px Arial';
        context.fillText (game.champ, game.width / 2, game.height / 2);
    } }
}

function update(){
    aiMove();
        /*change ball's coord*/
    if(ball.y < 0 || ball.y + ball.r > game.height){
        ball.vY = -ball.vY;
    }
    if(ball.x < 0){
        ball.vX = -ball.vX;
        player.scores++;
    }
    if(ball.x+ball.r > game.width){
        ball.vX = -ball.vX;
        ai.scores++;
    }

    if(ai.scores === 10 || player.scores === 10){
        if (ai.scores === 10){
            game.lose++;
            start = false;
            ball.x = game.width - player.width - 1.5 * ball.r - 10;
            ball.y = game.height /2 - ball.r;
            ai.y = game.height / 2 - ai.height / 2;
            player.y = game.height / 2 - player.height / 2;
            game.champ = "YOU LOSE";
        }else{
            game.win++;
            start = false;
            ball.x = game.width - player.width - 1.5 * ball.r - 10;
            ball.y = game.height /2 - ball.r;
            ai.y = game.height / 2 - ai.height / 2;
            player.y = game.height / 2 - player.height / 2;
            game.champ = "YOU WIN";
        }
        ball.vX = 0;
        ball.vY = 0;
        ai.scores = 0;
        player.scores = 0;
        game.total++;
        game.champ;
    }

    if((collision(ai, ball) && ball.vX < 0) || (collision(player, ball) && ball.vX > 0)){
        if(ball.vX < 11 && -9 < ball.vX){
            if(ball.vX < 0){
                ball.vX--;
            } else{
                ball.vX++;
            }
            if(ball.vY < 0){
                ball.vY--;
            } else {
                ball.vY++;
            }
        }
    ball.vX = -ball.vX;
    }

    ball.x += ball.vX;
    ball.y += ball.vY;
}

function play(){
    draw();
    update();
}

function init(){
    start = false;
        /*game field*/
    game = new rect("#000", 0, 0, 480, 320);
    game.total = 0;
    game.win = 0;
    game.lose = 0;
        /*players*/
    ai = new rect("#fff", 10, game.height / 2 - 40, 20, 80);
    player = new rect("#fff", game.width - 30, game.height / 2 - 40, 20, 80);
        /*scores*/
    ai.scores = 0;
    player.scores = 0;
        /*ball*/
    ball = new arc("#ff0", 40, game.height / 2, 10,0, 2*Math.PI);
        /*speed ball's*/
    ball.vX = 0;
    ball.vY = 0;

    var canvas = document.getElementById('canvasPreloader');
    canvas.width = game.width;
    canvas.height = game.height;
    context = canvas.getContext('2d');
    canvas.onclick = startGame;
    canvas.onmousemove = playerMove;
    setInterval(play, 1000/50);
}
init();

});