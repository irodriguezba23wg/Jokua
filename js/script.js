const targetArea = document.getElementById('jokuaren_eremua');
const scoreBoard = document.getElementById('puntuak');

let puntuazioa = 0;
let gameInterval;
let speedFactor = 0.5;
let totalPoints = 0;
let biderkatzailea=1;

startGame();

function startGame() {
    puntuazioa = 0;
    scoreBoard.textContent = puntuazioa;
    targetArea.innerHTML = ''; 

    gameInterval = setInterval(() => {
            let random=Math.floor(Math.random() * 3)+1;
            for (let i=0; i<random;i++){
                createTarget();
            }
    }, 1000 / speedFactor);
}

function createTarget() {
    const diana = document.createElement('div');
    diana.classList.add('diana');

    const x = Math.random() * (targetArea.offsetWidth - 50);
    const y = Math.random() * (targetArea.offsetHeight - 50);

    diana.style.left = x + 'px';
    diana.style.top = y + 'px';

    targetArea.appendChild(diana);

    setTimeout(() => {
        if (diana.parentElement) diana.remove();
    }, 1000 / speedFactor);

    diana.addEventListener('click', (event) => {
        puntuazioa+=1*biderkatzailea;
        scoreBoard.textContent = puntuazioa;
        diana.remove();
    });
}
