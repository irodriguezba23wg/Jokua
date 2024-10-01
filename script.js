const startButton = document.getElementById('start-btn');
const targetArea = document.getElementById('target-area');
const scoreBoard = document.getElementById('score');
const timeLeftBoard = document.getElementById('time-left');
const pointsBoard = document.getElementById('points');
const speedButtons = document.querySelectorAll('.speed-btn');


let score = 0;
let timeLeft = 30;
let gameInterval;
let speedFactor = 1;
let totalPoints = 0;

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
            totalPoints += score;
            pointsBoard.textContent = totalPoints;
            document.getElementById('start-menu').style.display = 'block';
        }
    }, 1000 / speedFactor); // Controla la rapidez de aparición de los objetivos
}

function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');

    const x = Math.random() * (targetArea.offsetWidth - 50);
    const y = Math.random() * (targetArea.offsetHeight - 50);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    targetArea.appendChild(target);

    setTimeout(() => {
        if (target.parentElement) target.remove();
    }, 1000 / speedFactor); // Targets disappear based on speed factor

    // Agregar evento de clic al objetivo
    target.addEventListener('click', (event) => {
        score += speedFactor; // Aumentar la puntuación según la velocidad
        scoreBoard.textContent = score;
        target.remove(); // Remove the target when clicked
    });
}

// Agregar evento de clic a la zona de destino para disparar
targetArea.addEventListener('click', (event) => {
    shootAnimation(event.clientX, event.clientY); // Dispara desde la posición del clic
});

function shootAnimation(mouseX, mouseY) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${mouseX}px`;
    bullet.style.top = `${mouseY}px`;
    document.body.appendChild(bullet);

    // Calcular la posición del objetivo para animar la bala hacia él
    const targetX = mouseX + 10; // Ajuste para que la bala apunte hacia el objetivo
    const targetY = mouseY - 50; // Ajuste para que la bala suba un poco al disparar

    // Animación de la bala
    bullet.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${targetX - mouseX}px, ${targetY - mouseY}px)` }
    ], {
        duration: 300,
        fill: 'forwards'
    });

    // Eliminar la bala después de la animación
    setTimeout(() => {
        bullet.remove();
    }, 300); // Duración de la animación
}

startButton.addEventListener('click', startGame);
