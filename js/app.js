const deck = document.querySelector('.deck');
let cards = document.querySelectorAll(".card");
let openCards = [];
let moves = 0;


//Shuffle the cards at the start of the game
function shuffleCards() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.card'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

shuffleCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//

//addEventListener to listen for clicks and toggle "open" when clicked
//add the first two clicked cards to an array
//start tracking the moves
deck.addEventListener('click', event => {
    const clickedCard = event.target;
    if (clickedCard.classList.contains('card') && openCards.length < 2) {
        toggleCard(clickedCard);
        addClickedCard(clickedCard);
        if (openCards.length === 2) {
            compareOpenCards();
            trackMoves();
        }
    }
});

//"turn over" clicked cards by toggling open & show classes
function toggleCard(clickedCard) {
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');
}

//add clicked cards to an array
function addClickedCard(clickedCard) {
    openCards.push(clickedCard);
}

//compare the two open cards and see if they match
//if they match, toggle the match class (turns them green & keeps them open) and empty the array
//if they do not match, toggle the open & show classes; keep them visible for two seconds; and empty the array
function compareOpenCards() {
    if (
        openCards[0].firstElementChild.className ===
        openCards[1].firstElementChild.className
    ) {
        openCards[0].classList.toggle('match');
        openCards[1].classList.toggle('match');
        openCards = [];
    } else {
        setTimeout(() => {
            toggleCard(openCards[0]);
            toggleCard(openCards[1]);
            openCards = [];
        }, 2000);
    }
}

//track the number of moves; a move is registered after two clicks
function trackMoves() {
        moves++;
        const score = document.querySelector('.moves');
        score.innerHTML = moves;
}








/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
