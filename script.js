// script.js
const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

let cards = [];
let flippedCards = [];
let matchedCards = 0;

// Initialize the game
function initializeGame() {
    board.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = 0;

    // Generate a set of cards (pairs of numbers)
    const cardValues = [];
    for (let i = 1; i <= 8; i++) {
        cardValues.push(i, i); // Two of each number
    }
    // Shuffle the cards
    shuffle(cardValues);

    // Create the card elements and append to the board
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        cards.push(card);
        board.appendChild(card);
    });
}

// Shuffle the cards using the Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Flip a card
function flipCard(event) {
    const card = event.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !flippedCards.includes(card)) {
        card.classList.add('flipped');
        card.textContent = card.getAttribute('data-value');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        matchedCards++;
        flippedCards = [];
        if (matchedCards === cards.length / 2) {
            alert('You won!');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Reset the game when the button is clicked
resetButton.addEventListener('click', initializeGame);

// Start the game
initializeGame();
