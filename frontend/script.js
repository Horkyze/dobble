const icons = [
    "fas fa-apple-alt", "fas fa-anchor", "fas fa-bolt", "fas fa-bone",
    "fas fa-bicycle", "fas fa-bug", "fas fa-bus", "fas fa-candy-cane",
    "fas fa-car", "fas fa-cat", "fas fa-cloud", "fas fa-crow",
    "fas fa-crown", "fas fa-dice", "fas fa-dog", "fas fa-dragon",
    "fas fa-feather", "fas fa-fish", "fas fa-flask", "fas fa-frog",
    "fas fa-gift", "fas fa-guitar", "fas fa-hat-wizard", "fas fa-heart",
    "fas fa-helicopter", "fas fa-hippo", "fas fa-horse", "fas fa-ice-cream",
    "fas fa-key", "fas fa-kiwi-bird", "fas fa-leaf", "fas fa-lightbulb",
    "fas fa-moon", "fas fa-mug-hot", "fas fa-paint-brush", "fas fa-paper-plane",
    "fas fa-paw", "fas fa-pencil-alt", "fas fa-pepper-hot", "fas fa-robot",
    "fas fa-rocket", "fas fa-skull", "fas fa-snowflake", "fas fa-star",
    "fas fa-sun", "fas fa-tooth", "fas fa-tree", "fas fa-umbrella",
    "fas fa-user-astronaut", "fas fa-volleyball-ball", "fas fa-wind", "fas fa-wine-glass",
    "fas fa-yin-yang", "fas fa-archway", "fas fa-baby-carriage", "fas fa-bell",
    "fas fa-birthday-cake", "fas fa-broom", "fas fa-camera", "fas fa-campground"
];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


let colorMode = false;


function generateAndDisplayCards() {
  // Replace symbolsInput and symbols with:
  const symbols = icons;

  const p = 7;  // For a Dobble deck with 8 symbols per card
  const generatedNumbers = generateDobbleDeck(p);

  const cards = generatedNumbers.map(cardNumbers => cardNumbers.map(num => symbols[num]));

  //displayCards(cards);
  const generatedCards = cards;  // Store all generated cards
	displayRandomCards(generatedCards);
}

function displayCards(cards) {
  const cardsDiv = document.getElementById('cards');
  cardsDiv.innerHTML = '';

  for (let card of cards) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    shuffleArray(card).forEach((symbol, index) => {
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');

        // Set the class for the shuffled symbol position
        symbolDiv.classList.add(`position-${index + 1}`);

        symbolDiv.innerHTML = `<i class="${symbol}"></i>`;
        if (colorMode) {
            symbolDiv.style.color = generateColorForSymbol(symbol);
        }
        cardDiv.appendChild(symbolDiv);
    });

    cardsDiv.appendChild(cardDiv);
  }
}

function generateColorForSymbol(symbol) {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

function toggleColorMode() {
  colorMode = !colorMode;
  generateAndDisplayCards();
}

let currentCards = [];

function getRandomCard(cards) {
    return cards[Math.floor(Math.random() * cards.length)];
}

function findMatchingSymbol(card1, card2) {
    return card1.find(symbol => card2.includes(symbol));
}

function displayRandomCards(cards) {
    const card1 = getRandomCard(cards);
    let card2;

    do {
        card2 = getRandomCard(cards);
    } while (findMatchingSymbol(card1, card2) === undefined);

    currentCards = [card1, card2];
    displayCardsSideBySide(card1, card2);
}

function displayCardsSideBySide(card1, card2) {
    const cardsDiv = document.getElementById('cards');
    cardsDiv.innerHTML = '';

    [card1, card2].forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        shuffleArray(card).forEach((symbol, index) => {
            const symbolDiv = document.createElement('div');
            symbolDiv.classList.add('symbol', `position-${index + 1}`);
            symbolDiv.innerHTML = `<i class="${symbol}"></i>`;
            if (colorMode) {
                symbolDiv.style.color = generateColorForSymbol(symbol);
            }
            cardDiv.appendChild(symbolDiv);

            // Add click event to symbols
            symbolDiv.addEventListener('click', function() {
                if (symbol === findMatchingSymbol(currentCards[0], currentCards[1])) {
                    symbolDiv.classList.add('correct');
                    setTimeout(() => {
                        displayRandomCards(generatedCards);
                    }, 1000);  // Wait 1 second before showing new cards
                }
            });
        });
        cardsDiv.appendChild(cardDiv);
    });
}

// ... Previous JS ...

const socket = io.connect();

// Create Room
document.getElementById('createRoomBtn').addEventListener('click', function() {
    const roomName = document.getElementById('roomNameInput').value;
    socket.emit('create-room', roomName);
});

// Join Room
document.getElementById('joinRoomBtn').addEventListener('click', function() {
    const roomName = document.getElementById('roomNameInput').value;
    const playerName = document.getElementById('playerNameInput').value;
    socket.emit('join-room', roomName, playerName);
});

// Listen to server events
socket.on('update-players', (players) => {
    // Update the player list and scores
});

socket.on('new-card', (card) => {
    // Display the new card in the middle of the screen
});

socket.on('new-card', (card) => {
    const deckCardDiv = document.getElementById('deckCard');
    deckCardDiv.innerHTML = '';

    const playerCardDiv = document.getElementById('playerCard');
    playerCardDiv.innerHTML = '';

    // Assuming you have a function `displayCard` that accepts a card array and a container
    displayCard(card, deckCardDiv); // Display new card in the deck

    // Generate player's card (can also be sent from server)
    const playerCard = generateCard(); // Your function to generate a Dobble card
    displayCard(playerCard, playerCardDiv);
});

function displayCard(card, container) {
    card.forEach((symbol, index) => {
        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'symbol';
        symbolDiv.innerHTML = `<i class="fa ${symbol}"></i>`;
        
        symbolDiv.addEventListener('click', () => symbolClicked(symbol));
        
        container.appendChild(symbolDiv);
    });
}

function symbolClicked(symbol) {
    // Here you should check if the clicked symbol matches any symbol in the deckCard
    // For simplicity, we are emitting the event without check
    // Ideally, you would prevent false positives
    socket.emit('match-found', currentRoomName, symbol);
}



