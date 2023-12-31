const canvas = document.getElementById("gameCanvas");
        const context = canvas.getContext("2d");

        const segmentSize = 20;
        let snakeSegments = [];
        let direction = "right";
        let food = {};
        let score = 0;
        let gameInterval;

        // Функция для создания змейки
        function createSnake() {
            const startX = Math.floor(canvas.width / 2);
            const startY = Math.floor(canvas.height / 2);

            for (let i = 0; i < 4; i++) {
                const segment = { x: startX - i * segmentSize, y: startY };
                snakeSegments.push(segment);
            }
        }

        // Функция для рисования змейки
        function drawSnake() {
            snakeSegments.forEach(function(segment) {
                context.fillStyle = "lime";
                context.fillRect(segment.x, segment.y, segmentSize, segmentSize);
            });
        }

        // Функция для обновления положения змейки
        function updateSnake() {
            const head = { x: snakeSegments[0].x, y: snakeSegments[0].y };
            if (direction === "right") {
                head.x += segmentSize;
            } else if (direction === "left") {
                head.x -= segmentSize;
            } else if (direction === "up") {
                head.y -= segmentSize;
            } else if (direction === "down") {
                head.y += segmentSize;
            }
            snakeSegments.unshift(head);

            // Проверка на столкновение с границей canvas
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
                endGame();
            }

            // Проверка на столкновение с самой змейкой
            for (let i = 1; i < snakeSegments.length; i++) {
                if (head.x === snakeSegments[i].x && head.y === snakeSegments[i].y) {
                    endGame();
                }
            }

            // Проверка на поедание пищи
            if (head.x === food.x && head.y === food.y) {
                createFood();
                score++;
            } else {
                snakeSegments.pop();
            }
        }

        // Функция для создания пищи
        function createFood() {
            const maxX = canvas.width / segmentSize;
            const maxY = canvas.height / segmentSize;

            food = {
                x: Math.floor(Math.random() * maxX) * segmentSize,
                y: Math.floor(Math.random() * maxY) * segmentSize
            };
        }

        // Функция для рисования пищи
        function drawFood() {
            context.fillStyle = "red";
            context.fillRect(food.x, food.y, segmentSize, segmentSize);
        }

        // Функция для завершения игры
        function endGame() {
            clearInterval(gameInterval);
            alert("Игра окончена! Ваш счет: " + score);
            document.getElementById("restartButton").disabled = false;
        }

        // Функция для очистки canvas
        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Функция для обработки нажатий клавиш
        function handleKeyPress(event) {
            if (event.key === "ArrowRight" && direction !== "left") {
                direction = "right";
            } else if (event.key === "ArrowLeft" && direction !== "right") {
                direction = "left";
            } else if (event.key === "ArrowUp" && direction !== "down") {
                direction = "up";
            } else if (event.key === "ArrowDown" && direction !== "up") {
                direction = "down";
            }
        }

        // Главная функция игры
        function gameLoop() {
            clearCanvas();
            updateSnake();
            drawSnake();
            drawFood();
        }

        // Функция для перезапуска игры
        function restartGame() {
            snakeSegments = [];
            direction = "right";
            score = 0;
            createSnake();
            createFood();
            document.getElementById("restartButton").disabled = true;
            gameInterval = setInterval(gameLoop, 100);
        }

        // Обработчик нажатия на кнопку "Начать игру"
        const startButton = document.getElementById("startButton");
        startButton.addEventListener("click", function() {
            // Удаляем обработчик события с кнопки, чтобы игра не могла быть запущена повторно
            startButton.removeEventListener("click", arguments.callee);
            // Создание начальной змейки
            createSnake();
            // Создание пищи
            createFood();
            // Обработка нажатий клавиш
            document.addEventListener("keydown", handleKeyPress);
            // Запуск игрового цикла
            gameInterval = setInterval(gameLoop, 100);
        });

        // Обработчик нажатия на кнопку "Начать заново"
        const restartButton = document.getElementById("restartButton");
        restartButton.addEventListener("click", restartGame);