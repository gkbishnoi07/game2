let words = [
    "apple", "banana", "grape", "orange", "strawberry", "kiwifruit", "pineapple", "watermelon", "blueberry", "raspberry", 
    "science", "programming", "adventure", "mystery", "champion", "incredible", "opinion", "freedom", "journey", "puzzle"
];
let selectedWord = '';
let attemptsLeft = 10;
let guessedWord = [];
let letterInput = document.getElementById('letter-input');
let submitButton = document.getElementById('submit');
let attemptsDisplay = document.getElementById('attempts');
let wordDisplay = document.getElementById('word-display');
let hintDisplay = document.getElementById('hint');
let messageDisplay = document.getElementById('msg');
let playAgainButton = document.getElementById('play-again');

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)]; // Choose a random word
    guessedWord = Array(selectedWord.length).fill('_'); // Initialize guessedWord with underscores
    attemptsLeft = 10; // Reset attempts
    attemptsDisplay.textContent = attemptsLeft;
    wordDisplay.textContent = guessedWord.join(' '); // Display the word with blanks
    hintDisplay.textContent = 'Hint: ' + selectedWord[0]; // Reveal first letter as a hint
    messageDisplay.textContent = '';
    playAgainButton.style.display = 'none'; // Hide "Play Again" button
    letterInput.value = ''; // Clear input
    letterInput.focus(); // Focus on input field
}

function checkGuess() {
    let guessedLetter = letterInput.value.toLowerCase();
    letterInput.value = ''; // Clear input field
    if (guessedLetter.length !== 1 || !/[a-z]/.test(guessedLetter)) {
        messageDisplay.textContent = 'Please enter a valid letter.';
        return;
    }

    let correctGuess = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            guessedWord[i] = guessedLetter; // Fill in the correct letter
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        attemptsLeft--;
        attemptsDisplay.textContent = attemptsLeft;
    }

    wordDisplay.textContent = guessedWord.join(' '); // Update word display
    if (guessedWord.join('') === selectedWord) {
        messageDisplay.textContent = 'Congratulations! You guessed the word!';
        playAgainButton.style.display = 'block'; // Show "Play Again" button
    } else if (attemptsLeft === 0) {
        messageDisplay.textContent = 'Game Over! The word was: ' + selectedWord;
        playAgainButton.style.display = 'block'; // Show "Play Again" button
    }
}

function restartGame() {
    startGame();
}

submitButton.addEventListener('click', checkGuess);
playAgainButton.addEventListener('click', restartGame);

// Start the game when the page loads
startGame();
