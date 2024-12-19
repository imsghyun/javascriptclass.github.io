var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img1, this.x, this.y, 50, 50)
    }
}

class Cactus {
    constructor() {
        this.x = 500
        this.y = 200
        this.width = 50
        this.height = 50
    }
    draw() {
        ctx.fillStyle = 'red'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img2, this.x, this.y, 50, 50)
    }
}
var img1 = new Image()
var img2 = new Image()
img1.src = 'dino.png'
img2.src = 'cactus.png'

var timer = 0
var cactusList = []
var jumpTimer = 0
var animation;


function move () {
    animation = requestAnimationFrame(move)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    timer++

    if(timer % 200  === 0) {
        var cactus = new Cactus()
        cactusList.push(cactus)
    }

    cactusList.forEach((cactus, i, o) => {
        if(cactus.x < 0) {
            o.splice(i, 1)
        }
        crash(dino, cactus);

        cactus.x--
        cactus.draw()
    })

    if(jump === true) {
        dino.y -= 5
        jumpTimer++
    }
    if(jump === false) {
        if(dino.y < 200) {
            dino.y += 5
        }
    }
    if(jumpTimer > 20 ) {
        jump = false
        jumpTimer = 0
    }

    dino.draw()
}
move()


//충돌확인
function crash(dino, cactus) {

    var xCalc = cactus.x - (dino.x + dino.width)
    var yCalc = cactus.y - (dino.y + dino.height)

    if(xCalc < 0 && yCalc < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
        alert('game over')
    }

}


var jump = false;
document.addEventListener('keydown', (e)=> {
    if(e.code === 'Space') {
        jump = true
    }
})