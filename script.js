const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const aud = new Audio('audio.mp3')


const bg = new Image()
const block1 = new Image()
const block2 = new Image()
const ball = new Image()

const width = canvas.width
const height = canvas.height
let fieldSideFlag = null

let blockVel = 3
let ballVel = 5

let counter1 = 0
let counter2 = 0


let collisionDot = 0
let collisionSideDot = 0

let block1Param = {
    x: 0,
    y: (height - 80) / 2,
    width: 20,
    height: 80
}

let block2Param = {
    x: width - 20,
    y: (height - 80) / 2,
    width: 20,
    height: 80
}

let ballParam = {
    x: block1Param.width,
    y: (height - 15) / 2,
    width: 15,
    height: 15,
    activity: false,
    moveSideFlag: false
}

bg.src = 'img/bg.jpg'
block1.src = 'img/block.png'
block2.src = 'img/block.png'
ball.src = 'img/ball.png'

const blockCenter = (block1Param.height - ballParam.height) / 2
const sideCenter = (width - ballParam.width) / 2


window.addEventListener('load', function () {
    game()
})


function render() {
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(block1, block1Param.x, block1Param.y, block1Param.width, block1Param.height)
    ctx.drawImage(block2, block2Param.x, block2Param.y, block2Param.width, block2Param.height)
    ctx.drawImage(ball, ballParam.x, ballParam.y, ballParam.width, ballParam.height)
   
    textCounter()
}


function textCounter() {
    ctx.font = "15px serif"
    ctx.fillStyle = "#fff"
    ctx.textAlign = 'center'
    ctx.fillText(`${counter1} | ${counter2}`, width / 2 - 10, 15)
}

function count() {
    if (ballParam.x <= 0 && ballParam.x > -10) {
        counter2++
        ballParam.x = 10000
        ballParam.y = height / 2
        setTimeout(() => {newSet()}, 500)
    }
    if (ballParam.x >= width && ballParam.x < width + 10) {
        counter1++
        ballParam.x = -10000
        ballParam.y = height / 2
        setTimeout(() => {newSet()}, 500)
    }
}


function newSet() {
    ballParam.x = block1Param.width
    ballParam.y = (height - 15) / 2
    ballParam.moveSideFlag = false
   
    block1Param.x = 0
    block1Param.y = (height - 80) / 2
    block1Param.width = 20
    block1Param.height = 80
    
    block2Param.x = width - 20
    block2Param.y = (height - 80) / 2
    block2Param.width = 20
    block2Param.height = 80
}


function run() {
    if (ballParam.activity) {
        count()
        fieldSideBoolean()
        ballSideAngle()
        ballCollision()
        ballMoveSide()
        ballAngle()
    } 
}



function ballAngle() {
    if (ballParam.moveSideFlag) {
        if (ballParam.x + 50 >= block2Param.x) {
            collisionDot = ballParam.y - block2Param.y
        }
        ballParam.y += (collisionDot - blockCenter) / 20
    } else {
        if (ballParam.x <= block1Param.x + 50) {
            collisionDot = ballParam.y - block1Param.y
        }
        ballParam.y += (collisionDot - blockCenter) / 20
    }
}


function ballSideAngle() {
    if (fieldSideFlag) {
        ballParam.y += ballVel
    } 
    
    if (fieldSideFlag === false) {
        ballParam.y -= ballVel
    }
}

function ballMoveSide() {
    if (ballParam.moveSideFlag) {
        ballParam.x -= ballVel
    } else {
        ballParam.x += ballVel
    }
}

function fieldSideBoolean() {
    if (ballParam.y <= 0) {
        fieldSideFlag = true
        aud.play()
    }
    if (ballParam.y >= height - 15) {
        fieldSideFlag = false
        aud.play()
    }
}

function ballCollision() {
    if (ballParam.x + 10 >= block2Param.x && ballParam.x <= block2Param.x + 20 && ballParam.y + 10 >= block2Param.y && ballParam.y <= block2Param.y + 80) {
        ballParam.moveSideFlag = true
        aud.play()
    }
    if (ballParam.x <= block1Param.x + 20 && ballParam.x >= block1Param.x && ballParam.y + 10 >= block1Param.y && ballParam.y <= block1Param.y + 80) {
        ballParam.moveSideFlag = false
        aud.play()
    }
}







document.addEventListener('keydown', function () {
    if (event.keyCode === 13) {
        ballParam.activity = true

        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 81) {     
                clickBlockTransitionY(block1Param, -blockVel)
            }
            if (event.keyCode === 65) {
                clickBlockTransitionY(block1Param, blockVel)
            }
        })
        
        
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 80) {
                clickBlockTransitionY(block2Param, -blockVel)
            }
            if (event.keyCode === 76) {
                clickBlockTransitionY(block2Param, blockVel)
            }
        }) 
    }
})



function clickBlockTransitionY(block, vel) {
    let blockY = setInterval(function () {
        blockTransitionY(block, vel)
    }, 1)
    document.addEventListener('keyup', function (event) {
        clearInterval(blockY)
    })
}





function blockTransitionY(block, x) {
    block.y += x
    if (block.y <= 0) {
        block.y = 0
    }
    if (block.y >= height - block.height) {
        block.y = height - block.height
    }
}



function game() {
    render()
    run()

    window.requestAnimationFrame(function () {
        game()
    })
}


