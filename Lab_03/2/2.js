let minimumLength = 0;
let maximumLength = 0;
let capitalLetters = false;
let specialCharacters = false;
let characters = [];
let password = '';
let i;
let passwordLength;
let letter;

function generate() {
    minimumLength = document.querySelector("#minimumLength").value;
    maximumLength = document.querySelector("#maximumLength").value;
    capitalLetters = document.querySelector("#capitalLetters").checked;
    specialCharacters = document.querySelector("#specialCharacters").checked;

    console.log(minimumLength, maximumLength, capitalLetters, specialCharacters)

    characters = [];
    password = '';

    // smallLetters
    for (i = 97; i < 123; i++) {
        characters.push(i);
    }

    // capitalLetters
    if (capitalLetters) {
        for (i = 65; i < 91.; i++) {
            characters.push(i);
        }
    }

    // specialCharacters
    if (specialCharacters) {
        for (i = 33; i < 48; i++) {
            characters.push(i);
        }
        for (i = 58; i < 65; i++) {
            characters.push(i);
        }
        for (i = 91; i < 97; i++) {
            characters.push(i);
        }
        for (i = 123; i < 127; i++) {
            characters.push(i);
        }
    }

    passwordLength = Math.floor(Math.random() * (maximumLength - minimumLength + 1)) + parseInt(minimumLength);
    console.log(passwordLength);

    for (i = 0; i < passwordLength; i++) {
        letter = characters[Math.floor(Math.random()*characters.length)];
        password += String.fromCharCode(letter);
    }

    alert(password);
}