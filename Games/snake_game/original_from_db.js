var snakeBoard = document.createElement('canvas');
snakeBoard.width = 400;
snakeBoard.height = 250;
snakeBoard.style.background = "pink";
document.getElementById("outputid").appendChild(snakeBoard);
var snakeBoard_ctx = snakeBoard.getContext("2d");
var snake_col = 'lightgreen';
var snake_border = 'darkgreen';
snake = [
    {
        x: 200,
        y: 200
    },
    {
        x: 190,
        y: 200
    },
    {
        x: 180,
        y: 200
    },
    {
        x: 170,
        y: 200
    }, {
        x: 160,
        y: 200
    }
]
function drawSnakePart(snakePart) {
    snakeBoard_ctx.fillStyle = snake_col;
    snakeBoard_ctx.strokestyle = snake_border;
    snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function drawSnake() {
    snake.forEach(drawSnakePart)
}
drawSnake();
gen_food();
drawFood();
var food_x;
var food_y;
var dx = 10;
var dy = 0;
function drawFood() {
    snakeBoard_ctx.fillStyle = 'red';
    snakeBoard_ctx.strokestyle = 'darkgreen';
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10);
}
function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function gen_food() {
    food_x = random_food(0, snakeBoard.width - 10);
    food_y = random_food(0, snakeBoard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        var has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten)
            gen_food();

    });
}
function move_snake() {
    var head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head);
    var has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        gen_food();
    } else {
        snake.pop();
    }
}
function clear_Board() {
    snakeBoard_ctx.fillStyle = "pink";
    snakeBoard_ctx.strokestyle = "black";
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true

    }
    var hitLeftWall = snake[0].x < 0;
    var hitRightWall = snake[0].x > snakeBoard.width - 10;
    var hitToptWall = snake[0].y < 0;
    var hitBottomWall = snake[0].y > snakeBoard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}
main();
function main() {
    if (has_game_ended())
        return;

    changing_direction = false;
    setTimeout(function onTick() {
        clear_Board();
        drawFood();
        move_snake();
        drawSnake();
        main();
    }, 100)
}
var changing_direction = false;
document.addEventListener("keydown", change_direction);
function change_direction(event) {
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;
    var diff = 10;
    if (changing_direction)
        return;

    changing_direction = true;
    var keyPressed = event.keyCode;
    var goingUp = dy === - diff;
    var goingDown = dy === diff;
    var goingRight = dx === diff;
    var goingLeft = dx === - diff;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = - diff;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = - diff;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = diff;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = diff;
    }
}