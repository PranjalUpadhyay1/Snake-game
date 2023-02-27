//Game Constants & variables
let inputDir = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const music = new Audio('music/music.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let sankeArr = [
    {x: 13, y: 15}
]

food = {x: 3, y: 15};

//Game funcions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000< 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(snake) {
    for (let i = 1; i < sankeArr.length; i++) {
        //If you bump into yourself
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }

        //If you bump into the wall
        if(snake[0].x >=18 || snake[0].y >=18 || snake[0].x<=0 || snake[0].y<=0){
            return true;
        }
        
    }
}


function gameEngine() {
    //Part 1: Updating the sanke array & food
    music.play();
    if(isCollide(sankeArr)){
        gameOverSound.play();
        music.pause();
        inputDir = {x:0, y:0};
        alert("Game over! Press any key to play again!");
        sankeArr = [{x: 13, y: 15}];
        music.play();
        score = 0;
    }
    
    //If you have eaten the food, increase the score and respawns the food
    if(sankeArr[0].y === food.y && sankeArr[0].x === food.x){
        foodSound.play()
        score+=1;
        scoreBox.innerHTML = "Score: " + score;
        sankeArr.unshift({x:sankeArr[0].x + inputDir.x, y:sankeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16; 
        food = {x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())}
    }

    //Moving the snake
    for (let i = sankeArr.length - 2; i>=0  ; i--) {
        sankeArr[i+1] = {...sankeArr[i]};

    }

    sankeArr[0].x += inputDir.x;
    sankeArr[0].y += inputDir.y;

    //Part 2: Display the sanke array & food
    //Displaying the snake
    board.innerHTML = "";
    sankeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
        snakeElement.classList.add('head');
        }
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })


    //Displaying the food
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = food.y;
    snakeElement.style.gridColumnStart = food.x;
    snakeElement.classList.add('food')
    board.appendChild(snakeElement);
}










//Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir ={x:0, y:1}  //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=  0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=  0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=  -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=  1;
            inputDir.y = 0;
                break;
    
        default:
            break;
    }
})