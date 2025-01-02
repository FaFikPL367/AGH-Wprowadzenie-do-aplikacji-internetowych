// Tablice z wartościami do generowania haseł
let numbers = "1234567890";
let smallLetters = "abcdefghijklmnopqrstuvwxyz";
let bigLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let specialCharacters = "!@#$%&*"


// Funkcja do generowania długości hasła
function passwordLength() {
    let minimumLength = parseInt(document.getElementById("min").value);
    let maximumLength = parseInt(document.getElementById("max").value);

    // Ustawianie domyślnych wartości
    if (isNaN(minimumLength)) minimumLength = 5;
    if (isNaN(maximumLength)) maximumLength = 12;
    if (minimumLength > maximumLength) {
        minimumLength = 5;
        maximumLength = 12;
    }

    return Math.floor(Math.random() * (maximumLength - minimumLength) + minimumLength);
}

// Funkcja do generowania hasła z akceptowanych wartości
function passwordGenerator() {
    // Czy akceptujemy inne rodzaje znaków
    let acceptBigLetters = document.getElementById("big-letters").checked;
    let acceptSpecialCharacters = document.getElementById("special-characters").checked;

    // Domyślne wartości do generowania hasła
    let availableCharacters = numbers + smallLetters;
    // Długość naszego hasła
    let lenghtOfPassword = passwordLength();

    // Sprawdzanie czy użytkownik chce inne znaki
    availableCharacters = acceptBigLetters ? availableCharacters + bigLetters : availableCharacters;
    availableCharacters = acceptSpecialCharacters ? availableCharacters + specialCharacters : availableCharacters;

    // Hasło wygenerowane
    let result = "";

    for (let i = 0; i < lenghtOfPassword; i++) {
        result = result + availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    }

    // Wyświetlenia hasła użytkownikowi
    alert(result);
}

