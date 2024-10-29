// Array of card values, each emoji has a pair
const cardValues = ['💘', '👽', '💀', '🤖', '🧿', '💘', '👽', '💀', '🤖', '🧿']; 

// Arrays to track the currently flipped cards and matched cards
let flippedCards = [];
let matchedCards = [];

// Game board element where cards will be added
let gameBoard = document.getElementById('game-board');

// Function to shuffle an array using the Fisher-Yates shuffle algorithm
function shuffle(array) {
  console.log("Shuffling the cards...");
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log("Cards shuffled:", array); // Log the shuffled array
  return array;
}

// Function to initialize and set up the game
function initializeGame() {
  console.log("Initializing game...");

  // Clear the game board and reset matched and flipped card arrays
  gameBoard.innerHTML = '';
  matchedCards = [];
  flippedCards = [];

  // Shuffle the cards and create card elements on the game board
  shuffle(cardValues).forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.innerHTML = `
      <div class="front"></div>
      <div class="back">${value}</div>
    `;

    // Add event listener for flipping the card
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card); // Append card to the game board
  });

  console.log("Game board set up with shuffled cards.");
}

// Function to handle card flipping
function flipCard() {
  console.log("Card clicked:", this.dataset.value);

  // Check if two cards are already flipped or this card is already flipped/matched
  if (flippedCards.length < 2 && !this.classList.contains('flip') && !matchedCards.includes(this)) {
    this.classList.add('flip'); // Flip the card visually
    flippedCards.push(this); // Add the card to the flipped cards array
    console.log("Cards flipped:", flippedCards.map(card => card.dataset.value));

    // Check if we have two flipped cards to compare
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Function to check if two flipped cards match
function checkForMatch() {
  let [card1, card2] = flippedCards;
  console.log("Checking for match between:", card1.dataset.value, card2.dataset.value);

  // If the flipped cards match
  if (card1.dataset.value === card2.dataset.value) {
    console.log("Match found!");

    // Add them to matched cards and clear flipped cards
    matchedCards.push(card1, card2);
    flippedCards = [];

    // Check if all cards have been matched
    if (matchedCards.length === cardValues.length) {
      setTimeout(() => {
        console.log("All pairs matched! Game won.");
        alert("Congratulations! You've matched all pairs!");
      }, 500);
    }
  } else {
    // If cards don't match, flip them back after a short delay
    console.log("No match. Flipping cards back.");
    setTimeout(() => {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}

// Restart button event listener to reset the game
document.getElementById('restart').addEventListener('click', () => {
  console.log("Restarting the game...");
  initializeGame();
});

// Start the game on page load
initializeGame();

