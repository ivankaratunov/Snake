// Получение элемента canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Размеры экрана
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// Размеры змейки
var snakeSize = 20;
var snakeWidth = 20;

// Позиция змейки
var x = canvasWidth / 2;
var y = canvasHeight / 2;

// Время задержки между обновлениями (в миллисекундах)
var delay = 100;

// Функция обновления игры
function updateGame() {
    // Очистка canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Обновление позиции змейки
    var direction = getRandomDirection();
    if (direction === "right") {
        x += snakeSize;
    } else if (direction === "left") {
        x -= snakeSize;
    } else if (direction === "up") {
        y -= snakeSize;
    } else if (direction === "down") {
        y += snakeSize;
    }

    // Проверка на выход за границы экрана
    if (x + snakeSize > canvasWidth || x < 0 || y + snakeSize > canvasHeight || y < 0) {
        gameOver();
    }

    // Отрисовка змейки
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, snakeSize, snakeWidth);
}

// Функция получения случайного направления
function getRandomDirection() {
    var directions = ["right", "left", "up", "down"];
    var randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}

// Функция окончания игры
function gameOver() {
    clearInterval(gameInterval);
    displayRestartButton();
}

// Функция отображения кнопки "Начать заново"
function displayRestartButton() {
    var restartButton = document.createElement("button");
    restartButton.innerHTML = "Начать заново";
    restartButton.addEventListener("click", restartGame);
    document.body.appendChild(restartButton);
}

// Функция перезапуска игры
function restartGame() {
    // Сброс значений
    x = canvasWidth / 2;
    y = canvasHeight / 2;

    // Удаление кнопки "Начать заново"
    var restartButton = document.querySelector("button");
    if (restartButton) {
        restartButton.parentNode.removeChild(restartButton);
    }

    // Запуск игры
    gameInterval = setInterval(updateGame, delay);
}

// Запуск игры
var gameInterval = setInterval(updateGame, delay);
