var content = document.getElementsByClassName('content')[0];
var startGame = document.getElementsByClassName('start')[0];
var pause = document.getElementsByClassName('pause')[0];
var alert = document.getElementsByClassName('lose')[0];
var close = document.getElementsByClassName('close')[0];
var grade = document.getElementsByTagName('span')[0];
var timer;

init();

function init() {
    //地图
    this.mapWidth = parseInt(getComputedStyle(content).width);
    this.mapHeight = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [3, 2, 'head'],
        [2, 2, 'body'],
        [1, 2, 'body']
    ];

    var top = 0,
    left = 1;

    //开始游戏
    startGame();

    function startGame() {
        food();
        snake();
        move();
        onPause();
        onClose();
    }


    function food() {
        var food = document.createElement('div');
        food.style.width = this.foodW + 'px';
        food.style.height = this.foodH + 'px';
        food.style.position = 'absolute';
        this.foodX = Math.floor(Math.random() * this.mapWidth / 20);
        this.foodY = Math.floor(Math.random() * this.mapHeight / 20);
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 20 + 'px';
        this.mapDiv.appendChild(food).setAttribute('class', 'food');
    }

    function snake() {
        for (var i = 0; i < this.snakeBody.length; i++) {
            var snake = document.createElement('div');
            snake.style.width = this.snakeW + 'px';
            snake.style.height = this.snakeH + 'px';
            snake.style.position = 'absolute';
            snake.style.left = this.snakeBody[i][0] * 20 + 'px';
            snake.style.top = this.snakeBody[i][1] * 20 + 'px';
            snake.classList.add(this.snakeBody[i][2]);
            this.mapDiv.appendChild(snake).classList.add('snake');
        }
    }

    function move() {
        document.onkeydown = function (e) {
            var event = e || window.event;
            switch (e.keyCode) {
                case 38:
                    if (!top) {
                        top = -1;
                        left = 0;
                    }
                    break;
                case 39:
                    if (!left) {
                        top = 0;
                        left = 1;
                    }
                    break;
                case 40:
                    if (!top) {
                        top = 1;
                        left = 0;
                    }
                    break;
                case 37:
                    if (!left) {
                        top = 0;
                        left = -1;
                    }
                    break;
                default:
                    break;
            }
        }
        timer = setInterval(function () {
            var snakeB = document.getElementsByClassName('snake');
            var foodB = document.getElementsByClassName('food')[0];
            var o = this.snakeBody[this.snakeBody.length - 1];
            this.snakeBody.push([o[0], o[1], o[2]]);
            for (var i = this.snakeBody.length - 2; i > 0; i--) {
                this.snakeBody[i][0] = this.snakeBody[i - 1][0];
                this.snakeBody[i][1] = this.snakeBody[i - 1][1];
            }
            this.snakeBody[0][0] += left;
            this.snakeBody[0][1] += top;
            if (this.snakeBody[0][0] == parseInt(this.foodX) && this.snakeBody[0][1] == parseInt(this.foodY)) {
                grade.innerHTML = (this.snakeBody.length-3)*2;
                foodB.parentNode.removeChild(foodB);
                food();
            } else {
                this.snakeBody.pop();
            }
            while (snakeB.length > 0) {
                snakeB[0].parentNode.removeChild(snakeB[0]);
            }
            if (this.snakeBody[0][0] == -1 || this.snakeBody[0][0] == Math.floor(parseInt(window.getComputedStyle(this.mapDiv, null).width) / 20)+1 || this.snakeBody[0][1] == -1 || this.snakeBody[0][1] == Math.floor(parseInt(window.getComputedStyle(this.mapDiv, null).height) / 20)+1 || isTouch()) {
                alert.style.display = 'block';
                clearInterval(timer);
                timer = null;
                document.onkeydown = null;
                pause.innerHTML = '开始';
                //console.log('1');
                //break;
                alert.getElementsByClassName('loseAlert')[0].getElementsByTagName('p')[0].innerHTML = '得了'+(this.snakeBody.length-3)*2+'分';
            }else{
                snake();
            }  
            
        }, 200)
    }

    function onPause() {
        pause.onclick = function () {
            if (timer) {
                clearInterval(timer);
                timer = null;
                document.onkeydown = null;
                this.innerHTML = '开始';
            } else {
                move();
                // top = 0;
                // left = 1;
                this.innerHTML = '暂停';
            }

        }
    }

    function onClose() {
        var that = this;
        close.onclick = function () {
            var snakeB = document.getElementsByClassName('snake');
            alert.style.display = 'none';
            that.snakeBody = [
                [3, 2, 'head'],
                [2, 2, 'body'],
                [1, 2, 'body']
            ];
            top = 0;
            left = 1;
            while (snakeB.length > 0) {
                snakeB[0].parentNode.removeChild(snakeB[0]);
            }
            snake();
        }
    }

    function isTouch(){
        for(var i=1;i<this.snakeBody.length;i++){
            if(this.snakeBody[i][0] == this.snakeBody[0][0] && this.snakeBody[i][1] == this.snakeBody[0][1]){
                return true;
            }
        }
        return false;
    }
}