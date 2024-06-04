// Selecting elements from the HTML
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Reseting the game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    // Generating empty letter slots for the word
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    // Enabling keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show"); // Hiding the game over modal
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making the currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();    
}

// Function to display game over modal
const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word: ` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show"); //display the modal
}

// Function to handle game logic when a letter is clicked 
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter))
    {
        // If the clicked letter is correct, update display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter)
            {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If the clicked letter is incorrect, update guess count
        // and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; //Disabling the clicked button so the user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Check if game is won or lost
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Initial setup
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord); // Setup "Play Again" button behavior