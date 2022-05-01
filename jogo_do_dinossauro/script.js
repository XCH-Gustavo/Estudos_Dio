const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false
let isGameOver = false;
let position = 0

function handeleKeyUp(event){
    if(event.keyCode === 32){
        if (!isJumping){
            jump()
        }
    }
}

function jump() {
    isJumping = true
    let upInterval = setInterval(() => { //executa a cada intervalo
        if (position >= 150){
            clearInterval(upInterval)

            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval)
                    isJumping = false
                }
                position -= 20
                dino.style.bottom = position + 'px'
            })
        }else {
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randownTime = Math.random() * 6000

    if (isGameOver) return;

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    let leftinterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftinterval)
            background.removeChild(cactus)
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftinterval)
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
        }else{
            cactusPosition -=10
            cactus.style.left = cactusPosition + 'px'
        }
    }, 20)

    setTimeout(createCactus, randownTime)
}

createCactus()

document.addEventListener('keyup', handeleKeyUp)

