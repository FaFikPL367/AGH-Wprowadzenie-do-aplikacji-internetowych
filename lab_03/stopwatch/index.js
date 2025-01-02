// Pobranie elementów ze strony
const displayTimer = document.getElementById("display-timer");
const startBtn = document.getElementById("btn-start");
const stopBtn = document.getElementById("btn-stop");
const resetBtn = document.getElementById("btn-reset");
const saveBtn = document.getElementById("btn-save");
const placeSave = document.getElementById("save-place");

// Potrzebne zmienne do wykonania programu
let isRunning = false; // Zmienna określajaca czy stoper właczony
let timer = null; // funckja wykonywana co jakiś czas
let elapsedTime = 0; // czas minięty od odpalenia stopera
let startTime = 0; // czas rozpoczęcia timera
let counter = 1;

// Funckja odpowiadająca za start stopera
function start() {
    // Sprawdzamy czy stoper odpalony
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // ustawienie czasu początkowego

        // Funkcja, która będzie się wywoływała co 1000 ms czyli co 1 sekunde
        timer = setInterval(update, 1000);
        isRunning = true; // stoper został uruchomiony
    }
}

// Funkcja do stopowania stopera
function stop() {
    // Jeżeli stoper odpalony
    if (isRunning) {
        clearInterval(timer); // czyścimy interval
        isRunning = false;
    }
}

// Funkcja do resetowania stopera
function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    startTime = 0;
    isRunning = false;
    counter = 1;

    placeSave.innerHTML = "";
    displayTimer.textContent = "0s";
}

function save() {
    if (isRunning) {
        const curretSetTime = displayTimer.textContent; // aktualny czas

        const savedTimeElement = document.createElement('div'); // tworzymy element
        savedTimeElement.textContent = `${counter}. ${curretSetTime}`; // ustawiamy w nim czas
        counter++;

        placeSave.appendChild(savedTimeElement);
    }
}

// Funkcja do aktualizowanie timera
function update() {
    // Tylko dwie wartości będziemy wyświetlać
    let seconds = 0;
    let minutes = 0;

    const currentTime = Date.now(); // ustawienia aktualnego czasu
    elapsedTime = currentTime - startTime; // czas, który minal od startu

    minutes = Math.floor(elapsedTime / 60000);
    seconds = Math.floor(elapsedTime / 1000) % 60;

    // Aby wyświetlały się minuty
    if (minutes != 0) {
        displayTimer.textContent = `${minutes}min ${seconds}s`;
    } else {
        displayTimer.textContent = `${seconds}s`;
    }
}
