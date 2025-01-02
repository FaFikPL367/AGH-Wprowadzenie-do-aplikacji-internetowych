const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("startButton");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Wczytywanie zdjęcia do kursora
const crosshairImage = new Image();
crosshairImage.src = 'images/aim.png';

// Wczytanie zdjęć do żyć
const emptyHeart = new Image();
const fullHeart = new Image();
emptyHeart.src = 'images/empty_heart.png';
fullHeart.src = 'images/full_heart.png'

// Tło do canvasa
const backgroundImage = new Image();
backgroundImage.src = "images/board-bg.jpg";

// Dostanie dostępu do sprite
const spriteSheet = new Image();
spriteSheet.src = "images/walkingdead.png";

// Wielkości naszego sprite'a
const frameWidth = 200;
const frameHeight = 312;
const totalFrames = 10;
let currentFrame = 0;

// Parametry animacji zależnej od prędkości
const distancePerFrame = 20;

// Tablica z zombiakami
const zombies = [];

// Pozycja myszy
let mouseX = 0;
let mouseY = 0;

// Zmienna na wynik gracza
let score = 50;

// Zmienna na życia
let lives = 3

// Zmienna do obsługi gry
let isGameOver = false;
let gameRunning = false;

// Muzyka
const gameOverSound = new Audio("images/sad-music.mp3")

// FUNKCJE DO RYSOWANIA NA CANVASIE
let animationID;
// Funkcja do rysowania/animacji gry
function draw() {
    // Czyszczenie canvasa
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie tła
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Rysowanie wyniku
    drawScore();

    // Sprawdzanie końca gry
    checkGameOver();

    // Sprawdzanie czy gra się zakonczyła
    if (isGameOver) return;

    // Animacja zombiego
    zombies.forEach(zombie => {
        zombieAnimation(zombie);
    });

    // Rysowanie celownika na pozycji myszy
    if (gameRunning) {
        const crosshairSize = 128;
        context.drawImage(crosshairImage, mouseX - crosshairSize / 2, mouseY - crosshairSize / 2, crosshairSize, crosshairSize);
    }

    // Kontynuacja animacji
    animationID = requestAnimationFrame(draw);
}


// Funkcja do rysowania wyniku
function drawScore() {
    context.font = "bold 100px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillText(`Score: ${score}`, canvas.width - 700, 100);
}


// Funkcja do rysowania żyć
function drawLives(heart1, heart2, heart3) {
    const heartSize = 100;
    context.drawImage(heart1, 20, 10, heartSize, heartSize);
    context.drawImage(heart2, 140, 10, heartSize, heartSize);
    context.drawImage(heart3, 260, 10, heartSize, heartSize);
}


// FUNKCJE DO TWORZENIA I WYKONYWANIA SIĘ ZOMBIE
// Funkcja do tworzenia zombie w dowolnych pozycjach i o dowolnej szybkości
function createZombie() {
    if (!gameRunning) return;
    const zombie = {
        x: innerWidth,
        y: canvas.height - frameHeight - Math.random() * (frameHeight/2),
        speed: 2 + Math.random() * 3,
        currentFrame: 0,
        distanceTravelled: 0,
        scale: 0.5 + Math.random() * 0.5,
    };

    // Dodać do wszystkich zombiaków
    zombies.push(zombie);
}


// Funkcja do animowania zombiego
function zombieAnimation(zombie) {
    // Poruszenie się zombiego w lewo
    zombie.x -= zombie.speed;
    zombie.distanceTravelled += zombie.speed;

     // Zmiana klatki, jeśli zombie pokona dystans na klatkę
     if (zombie.distanceTravelled >= distancePerFrame) {
        zombie.currentFrame = (zombie.currentFrame + 1) % totalFrames; // Następna klatka
        zombie.distanceTravelled = 0; // Reset przebytego dystansu
    }

    // Aby zombie nie wyszedł poza mapę
    if (zombie.x + frameWidth * zombie.scale < 0) {
        zombies.splice(zombies.indexOf(zombie), 1); // Usuwanie zombiego z tablicy
        lives--;
    }

    // Obliczanie współrzędnych klatki sprite'a
    const sx = zombie.currentFrame * frameWidth;
    const sy = 0;

    context.drawImage(spriteSheet, sx, sy, frameWidth, frameHeight, zombie.x, zombie.y, frameWidth*zombie.scale, frameHeight*zombie.scale);
}


// FUNKCJE DO OBSŁUGI LOGIKI W GRZE
// Funkcja do zmieniania ilości pełnych serc i sprawdzania czy gra się zakończyła
function checkGameOver() {
    switch (lives) {
        case 3:
            drawLives(fullHeart, fullHeart, fullHeart);
            break;
        case 2:
            drawLives(fullHeart, fullHeart, emptyHeart);
            break;
        case 1:
            drawLives(fullHeart, emptyHeart, emptyHeart);
            break;
        case 0:
            drawLives(emptyHeart, emptyHeart, emptyHeart);
            isGameOver = true;

            gameOverSound.play();
            gameOverSound.volume = 0.5;

            canvas.style = "cursor: pointer";

            context.font = "bold 100px Arial";
            context.fillStyle = "#FF0000";
            context.fillText("GAME OVER", canvas.width / 2 - 300, canvas.height / 2);
            
            cancelAnimationFrame(animationID);

            // Pokaż przycisk restartu
            restartButton.style.display = "block";
            restartButton.style.position = "absolute";
            restartButton.style.left = `${canvas.width/2 - 50}px`;
            restartButton.style.top = `${canvas.height/2 + 50}px`;
    }
    return;
}


// Funkcja do startowania gry
function startGame() {
    // Po wciśnięciu guzika znikamy go
    startButton.style.display = "none";
    gameRunning = true;

    // Tworzenie zombie
    setInterval(createZombie, 1500);

    // Zainicjujemy grę
    restartGame();
    requestAnimationFrame(draw);
}


// Funkcja do restartowania gry
function restartGame() {
    // Resetuje zmienne gry
    lives = 3;
    score = 55;
    isGameOver = false;
    zombies.length = 0; // usuwanie wszystkich zombie

    gameOverSound.pause();

    // Zniknąć guzik po kliknięciu
    restartButton.style.display = "none";
    canvas.style.cursor = "none";

    // Odnowienie rysowania 
    requestAnimationFrame(draw);
}


// HANDLERY DO WEJŚCIA
// Funkcja do obsługi ruchu myszką
function mouseMoveHandler(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}


// Funkcja do radzenia sobie z kliknięciem myszką
function mouseClickHandler(e) {
    // Pobranie pozycji kursora
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Trafiony zombie
    let killZombie = false;

    // Sprawdzamy czy możemy strzelać
    if (score != 0) {
        // Sprawdzenie wszystkicclickbie
        for (let i = 0; i < zombies.length; i++) {
            const zombie = zombies[i];

            // Sprawdzamy czy trafiłem w zombiego
            if (clickX >= zombie.x && clickX <= zombie.x + frameWidth * zombie.scale &&
                clickY >= zombie.y && clickY <= zombie.y + frameHeight *zombie.scale) {
                    zombies.splice(i, 1);
                    score+=20;
                    killZombie = true;
                    break; // aby nie sprawdzać dalej
            }
        }

        // Za nie trafienie w zombiego
        if (!killZombie && score - 5 >= 0) {
            score -= 5;
        }
    }
}


// Dodanie eventu dla klikniecia myszką
document.addEventListener("click", mouseClickHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
restartButton.addEventListener("click", restartGame);
startButton.addEventListener("click", startGame)


// Uruchomienie animacji po załadowaniu sprite'a i tła (czego na ich załadowanie)
backgroundImage.onload = function () {
    spriteSheet.onload = function () {
        requestAnimationFrame(draw);
};
};
