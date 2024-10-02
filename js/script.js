const startButton = document.getElementById('hasiera-botoia');
const targetArea = document.getElementById('jokuaren_eremua');
const scoreBoard = document.getElementById('puntuazioa');
const timeLeftBoard = document.getElementById('denbora');
const pointsBoard = document.getElementById('puntuak');

let puntuazioa = 0;
let timeLeft = 30;
let gameInterval;
let speedFactor = 1;
let totalPoints = 0;

function startGame() {
    puntuazioa = 0;
    timeLeft = 30;
    scoreBoard.textContent = puntuazioa;
    timeLeftBoard.textContent = timeLeft;

    document.getElementById('hasiera-menua').style.display = 'none';
    targetArea.innerHTML = ''; 

    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftBoard.textContent = timeLeft;
            createTarget();
        } else {
            clearInterval(gameInterval);
            alert('Denbora amaitu da! Zure puntuazioa: ' + puntuazioa);
            totalPoints += puntuazioa;
            pointsBoard.textContent = totalPoints;
            document.getElementById('hasiera-menua').style.display = 'block';
        }
    }, 1000 / speedFactor); // Controla la rapidez de aparición de los objetivos
}

function createTarget() {
    const target = document.createElement('div');
    target.classList.add('diana');

    const x = Math.random() * (targetArea.offsetWidth - 50);
    const y = Math.random() * (targetArea.offsetHeight - 50);

    target.style.left = x + 'px';
    target.style.top = y + 'px';

    targetArea.appendChild(target);

    setTimeout(() => {
        if (target.parentElement) target.remove();
    }, 1000 / speedFactor); // Targets disappear based on speed factor

    target.addEventListener('click', (event) => {
        puntuazioa++;
        scoreBoard.textContent = puntuazioa;
        target.remove();
    });
}

// Agregar evento de clic a la zona de destino para disparar
/*targetArea.addEventListener('click', (event) => {
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
}*/

startButton.addEventListener('click', startGame);
