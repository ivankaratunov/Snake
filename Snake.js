// Функция обновления позиции змейки
function updateSnake() {
    var prevX = snake.offsetLeft;
    var prevY = snake.offsetTop;
  
    switch (direction) {
      case 'up':
        snake.style.transform = 'rotateX(90deg)';
        snake.style.top = (prevY - gridSize) + 'px';
        break;
      case 'down':
        snake.style.transform = 'rotateX(-90deg)';
        snake.style.top = (prevY + gridSize) + 'px';
        break;
      case 'left':
        snake.style.transform = 'rotateY(90deg)';
        snake.style.left = (prevX - gridSize) + 'px';
        break;
      case 'right':
        snake.style.transform = 'rotateY(-90deg)';
        snake.style.left = (prevX + gridSize) + 'px';
        break;
    }
  
    // Создание нового сегмента змейки
    createSegment();
  
    // Проверка на столкновение с собой
    for (var i = 1; i < segments.length; i++) {
      var segment = segments[i];
      var segmentX = segment.offsetLeft;
      var segmentY = segment.offsetTop;
  
      if (segmentX === prevX && segmentY === prevY) {
        gameOver();
        return;
      }
    }
  
    // Удаление последнего сегмента змейки
    var lastSegment = segments.shift();
    lastSegment.parentNode.removeChild(lastSegment);
  }
  
  // Функция окончания игры
  function gameOver() {
    alert('Игра окончена');
    clearInterval(gameInterval);
  }
  
  // Начальная инициализация игры
  function init() {
    // Создание сегментов змейки
    createSegment();
    createSegment();
    createSegment();
  
    // Установка начальной позиции змейки
    snake.style.left = '0px';
    snake.style.top = '0px';
  
    // Обработка событий клавиатуры
    document.addEventListener('keydown', changeDirection);
    
    // Получение фокуса для обработки событий клавиатуры
    container.focus();
  
    // Запуск игры
    gameInterval = setInterval(updateSnake, 1000);
  }
  
  // Инициализация игры при загрузке страницы
  window.onload = function () {
    init();
  };
  