// De waarden van de kaarten (fruit-emoji's)
const cardValues = [
    '🍎', '🍎', '🍊', '🍊', '🍌', '🍌', '🍓', '🍓',
    '🍉', '🍉', '🍇', '🍇', '🍍', '🍍', '🍒', '🍒'
];
let cardElements = []; // Houdt de gecreëerde kaarten bij
let firstCard = null;// De eerste aangeklikte kaart
let secondCard = null;// De tweede aangeklikte kaart
let lockBoard = false;// Vlag om het bord te vergrendelen tijdens het controleren van een match
let score1 = 0;  // Score voor speler 1
let score2 = 0;  // Score voor speler 2
let currentPlayer = 1;  // Houdt bij wie de beurt heeft

const gameContainer = document.getElementById('game-container'); // Het container-element voor het spel
const restartButton = document.getElementById('restart-button');// De restart-knop

// Functie om de kaarten te maken
function createCards() {
    const shuffledValues = cardValues.sort(() => 0.5 - Math.random()); // Schud de kaarten zodat ze willekeurig verschijnen
    
        // Maak een kaart voor elke waarde in de shuffledValues array
    shuffledValues.forEach(value => {
        const card = document.createElement('div');// Maak een nieuw div-element voor de kaart
        card.classList.add('card');// Voeg de class 'card' toe voor de styling
        card.dataset.value = value;// Sla de waarde van de kaart op in een dataset (verborgen attribuut)
        card.addEventListener('click', flipCard);// Voeg een event listener toe die de kaart omdraait bij een klik
        gameContainer.appendChild(card);// Voeg de kaart toe aan de container in de HTML
        cardElements.push(card);// Voeg de kaart toe aan de cardElements array
    });
}

// Functie om een kaart om te draaien
function flipCard() {
     // Als het bord vergrendeld is of de kaart al is omgedraaid, doe dan niets
    if (lockBoard || this === firstCard) return;
      // Draai de kaart om en toon de waarde
    this.classList.add('flipped');
    this.textContent = this.dataset.value;

     // Als er nog geen eerste kaart is, sla deze kaart dan op als de eerste
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    // Sla de tweede kaart op en vergrendel het bord
    secondCard = this;
    lockBoard = true;

     // Controleer of de twee kaarten een match zijn
    checkForMatch();
}

// Functie om te controleren of de twee omgedraaide kaarten een match zijn
function checkForMatch() {
      // Als de waarden van de twee kaarten gelijk zijn, is er een match
    if (firstCard.dataset.value === secondCard.dataset.value) {
        resetBoard();// Reset het bord (de kaarten worden weggehaald van het bord)
    } else {
         // Als er geen match is, draai de kaarten om na een korte tijd (1 seconde)
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

// Reset de status van de kaarten na elke actie
function resetBoard() {
    [firstCard, secondCard] = [null, null];// Zet de kaarten terug naar null
    lockBoard = false;// Ontgrendel het bord
}


// Update de score en toon de huidige speler
function updateScore() {
    document.getElementById('score1').textContent = score1;// Update de score van speler 1
    document.getElementById('score2').textContent = score2;// Update de score van speler 2
    document.getElementById('currentPlayerDisplay').textContent = `Player ${currentPlayer}'s turn`;// Toon wie de beurt heeft
}

// Wijzig de checkForMatch functie om de score bij te werken
function checkForMatch() {
        // Als de waarden van de twee kaarten gelijk zijn, verhoog de score van de huidige speler
    if (firstCard.dataset.value === secondCard.dataset.value) {
        if (currentPlayer === 1) {
            score1++;  // Verhoog score voor speler 1
        } else {
            score2++;  // Verhoog score voor speler 2
        }
        updateScore();  // Update de scoreboard
        resetBoard(true); // Reset het bord zonder de speler te wisselen
    } else {
        // Als er geen match is, draai de kaarten om na 1 seconde
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.classList.remove('flipped');
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

// Reset het bord en wissel van speler indien nodig
function resetBoard(samePlayer = false) {
    [firstCard, secondCard] = [null, null];// Zet de kaarten terug naar null
    lockBoard = false;// Ontgrendel het bord

    if (!samePlayer) {
        // Wissel van speler na een mismatch
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
    updateScore();// Update de score na het wisselen van speler
}

// Voeg een event listener toe voor de restart-knop
restartButton.addEventListener('click', restartGame);
createCards();

// Reset scores bij het herstarten van het spel
function restartGame() {
    score1 = 0;  // Reset score voor speler 1
    score2 = 0;  // Reset score voor speler 2
    updateScore();  // Update de scoreboard displays
    currentPlayer = 1;  // Zet de actieve speler terug naar Player 1
    updateScore();  // Update de scoreboard displays
    cardElements.forEach(card => {
        card.classList.remove('flipped');// Draai alle kaarten om naar de beginpositie
        card.textContent = '';// Verwijder de waarde van de kaarten
    });
    cardElements = [];// Maak de array van kaarten leeg
    firstCard = null;// Reset de eerste kaart
    secondCard = null;// Reset de tweede kaart
    lockBoard = false;// Ontgrendel het bord
    gameContainer.innerHTML = ""; // Maak het gameContainer element leeg
    createCards();// Maak de kaarten opnieuw

}   