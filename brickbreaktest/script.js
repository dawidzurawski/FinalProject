const grid = document.querySelector(".grid") //created grid variable that cannot be changed. querySelector() looks for class of grid
const scoreDisplay = document.querySelector("#score") //finds id of score
const brickWidth = 105
const brickHeight = 25
const ballDiameter = 20
const boardWidth = 995
const boardHeight = 650
const paddleWidth = 100
const paddleHeight = 20
const btn = document.createElement("button")
let playing = false
let timerId
let dx = 2
let dy = 2
let score = 0

btn.innerText = "START"
document.body.appendChild(btn)

const paddleStart = [450, 30]
let currentPosition = paddleStart

const ballStart = [490, 70]
let ballCurrentPosition = ballStart

//create individual brick
class Brick {
    constructor(xAxis, yAxis) { //decipher points from the x and y Axis
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + brickWidth, yAxis]
        this.topLeft = [xAxis, yAxis + brickHeight]
        this.topRight = [xAxis + brickWidth, yAxis + brickHeight]
    }
}

//array of all the bricks
const bricks = [
    new Brick(5,590),
    new Brick(115,590),
    new Brick(225,590),
    new Brick(445,590),
    new Brick(555,590),
    new Brick(665,590),
    new Brick(775,590),
    new Brick(5,560), 
    new Brick(115,560),
    new Brick(335,560),
    new Brick(445,560),
    new Brick(555,560),
    new Brick(775,560),
    new Brick(885,560),
    new Brick(5,530), 
    new Brick(115,530),
    new Brick(225,530),
    new Brick(335,530),
    new Brick(445,530),
    new Brick(555,530),
    new Brick(665,530),
    new Brick(775,530),
    new Brick(885,530),
    new Brick(5,500), 
    new Brick(115,500),
    new Brick(335,500),
    new Brick(445,500),
    new Brick(555,500),
    new Brick(665,500),
    new Brick(775,500),
    new Brick(115,470),
    new Brick(225,470),
    new Brick(335,470),
    new Brick(445,470),
    new Brick(555,470),
    new Brick(665,470),
    new Brick(775,470),
    new Brick(885,470),
    new Brick(5,440), 
    new Brick(115,440),
    new Brick(335,440),
    new Brick(445,440),
    new Brick(555,440),
    new Brick(665,440),
    new Brick(885,440),    
    new Brick(5,410), 
    new Brick(115,410),
    new Brick(225,410),
    new Brick(335,410),
    new Brick(445,410),
    new Brick(665,410),
    new Brick(775,410),
    new Brick(885,410),
    new Brick(5,380), 
    new Brick(115,380),
    new Brick(225,380),
    new Brick(335,380),
    new Brick(445,380),
    new Brick(555,380),
    new Brick(665,380),
    new Brick(775,380),
    new Brick(885,380),
    new Brick(5,350), 
    new Brick(115,350),
    new Brick(225,350),
    new Brick(335,350),
    new Brick(555,350),
    new Brick(665,350),
    new Brick(885,350),
    new Brick(115,320),
    new Brick(225,320),
    new Brick(335,320),
    new Brick(445,320),
    new Brick(555,320),
    new Brick(665,320),
    new Brick(775,320),
    new Brick(885,320),
    new Brick(5,290), 
    new Brick(115,290),
    new Brick(225,290),
    new Brick(335,290),
    new Brick(555,290),
    new Brick(665,290),
    new Brick(775,290),
    new Brick(885,290),
    new Brick(5,260), 
    new Brick(115,260),
    new Brick(225,260),
    new Brick(335,260),
    new Brick(445,260),
    new Brick(555,260),
    new Brick(775,260),
    new Brick(885,260),
    new Brick(5,230), 
    new Brick(115,230),
    new Brick(225,230),
    new Brick(335,230),
    new Brick(445,230),
    new Brick(555,230),
    new Brick(665,230),
    new Brick(775,230),
    new Brick(885,230),
    new Brick(115,200),
    new Brick(335,200),
    new Brick(445,200),
    new Brick(555,200),
    new Brick(665,200),
    new Brick(775,200),
    new Brick(885,200),
]

console.log(bricks[0])

//draw every brick
function addBricks() {
    for (let i = 0; i < bricks.length; i++) { //for loop to draw every brick
    const brick = document.createElement("div") //created brick variable that cannot be changed. createElement() method creates an Element Node with the specified name  
    brick.classList.add("brick")
    brick.style.left = bricks[i].bottomLeft[0] + "px"
    brick.style.bottom = bricks[i].bottomLeft[1] + "px"
    grid.appendChild(brick) //adds brick to grid
    }
}

addBricks()  //calls function

//add paddle
const paddle = document.createElement("div")
paddle.classList.add("paddle")
drawPaddle()
grid.appendChild(paddle)

//draw paddle
function drawPaddle() {
    paddle.style.left = currentPosition[0] + "px"
    paddle.style.bottom = currentPosition[1] + "px"
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + "px"
    ball.style.bottom = ballCurrentPosition[1] + "px"
}

//move paddle
function movePaddle(e) {
    switch(e.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 0){ //stops brick from going off
            currentPosition[0] -= 20 //moves the paddles position to the left
            drawPaddle()
            }
            break;
        case "ArrowRight":
            if (currentPosition[0] < boardWidth-paddleWidth){
                currentPosition[0] += 20
                drawPaddle()
            }
    }
}

document.addEventListener("keydown", movePaddle) //listens out for whenever a key is pressed down

//add ball
const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

btn.addEventListener("click", moveBall) 
    //move ball
    function moveBall() {
        ballCurrentPosition[0] += dx //moves ball on x axis
        ballCurrentPosition[1] += dy //moves ball on y axis
        drawBall()
        checkForCollisions()
    }

let intervalFreq = 25
timerId = setInterval(moveBall, intervalFreq) //ball speed


//collision checking
function checkForCollisions() {
    //brick collissions
    for (let i = 0; i < bricks.length; i++) {
        if (
            (ballCurrentPosition[0] > bricks[i].bottomLeft[0] && ballCurrentPosition[0] < bricks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > bricks[i].bottomLeft[1] && ballCurrentPosition[1] < bricks[i].topLeft[1])
        ) {
            const allBricks = Array.from(document.querySelectorAll(".brick"))
            allBricks[i].classList.remove("brick")
            bricks.splice(i, 1)
            changeTimer() 
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            //check win
            if(bricks.length === 0) {
                scoreDisplay.innerHTML = "WINNER!!!"
                clearInterval(timerId)
                document.removeEventListener("keydown", movePaddle)
            }
        }
    }


    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || //if ball x axis is greater than or equal to BoardW-BallD
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) || //if ball y axis is greater than or qual to 
        ballCurrentPosition[0] < 0 //if ball is less than x axis
        ) {
        changeDirection()
    }

    //check for paddle collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0]) && (ballCurrentPosition[0] < currentPosition[0] + paddleWidth) && //makes sure that the ball goes down the sides of the paddle
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + paddleHeight)
    ) {
        changeDirection()
    }

    //check for game over
    if (ballCurrentPosition[1] < 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = "YOU LOSE!"
        document.removeEventListener("keydown", movepaddle)
    }
}

function changeDirection() {
    if (dx === 2 && dy === 2) {
        dy = -2
        return
    }
    if (dx === 2 && dy === -2) {
        dx = -2
        return
    }
    if (dx === -2 && dy === -2) {
        dy = 2
        return
    }
    if (dx === -2 && dy === 2) {
        dx = 2
        return
    }
}

function changeTimer(){
    clearInterval(timerId)
    intervalFreq*=0.98
    timerId = setInterval(moveBall, intervalFreq)
}