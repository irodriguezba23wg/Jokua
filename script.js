const startButton = document.getElementById('start-btn');
const targetArea = document.getElementById('target-area');
const scoreBoard = document.getElementById('score');
const timeLeftBoard = document.getElementById('time-left');
let score = 0;
let timeLeft = 30;
let gameInterval;

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = score;
    timeLeftBoard.textContent = timeLeft;

    document.getElementById('start-menu').style.display = 'none';
    targetArea.innerHTML = ''; // Clear any previous targets

    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftBoard.textContent = timeLeft;
            createTarget();
        } else {
            clearInterval(gameInterval);
            alert('Tiempo terminado! Tu puntuación es: ' + score);
            document.getElementById('start-menu').style.display = 'block';
        }
    }, 1000);
}

function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');

    const x = Math.random() * (targetArea.offsetWidth - 50);
    const y = Math.random() * (targetArea.offsetHeight - 50);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener('click', () => {
        score++;
        scoreBoard.textContent = score;
        target.remove(); // Remove the target when clicked
    });

    targetArea.appendChild(target);

    setTimeout(() => {
        if (target.parentElement) target.remove();
    }, 1000); // Targets disappear after 1 second
}

startButton.addEventListener('click', startGame);
