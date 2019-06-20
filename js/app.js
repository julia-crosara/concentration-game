// Author: Julia Crosara
// FEND Project 2: Memory Game
// Submitted June 19, 2019


// Global scope
const deck = document.querySelector(".deck");
let cards = document.querySelectorAll(".card");
let openCards = [];
let moves = 0;
let time = 0;
let timerOff = true;
let timerId;
let matched = 0;


// Shuffle the cards at the start of the game
function shuffleCards() {
    const cardsToShuffle = Array.from(document.querySelectorAll(".card"));
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


// Add event listener and toggle open class when clicked
// Add the first two clicked cards to an array
// Start counting moves & tracking stars
deck.addEventListener("click", event => {
    const clickedCard = event.target;
    if (clickedCard.classList.contains("card") && openCards.length < 2) {
        toggleCard(clickedCard);
        if (timerOff) {
            startTimer();
            timerOff = false;
        }
        addClickedCard(clickedCard);
        if (openCards.length === 2) {
            compareOpenCards();
            countMoves();
            trackStars();
        }
    }
});


// "Turn over" clicked cards by toggling open & show classes
function toggleCard(clickedCard) {
    clickedCard.classList.toggle("open");
    clickedCard.classList.toggle("show");
}


// Add clicked cards to an array
function addClickedCard(clickedCard) {
    openCards.push(clickedCard);
}


// Compare the two open cards and see if they match
function compareOpenCards() {
    const TOTAL_PAIRS = 8;
    //If they match, toggle the match class (cards turn green and stay open); empty the array
    if (
        openCards[0].firstElementChild.className ===
        openCards[1].firstElementChild.className
    ) {
        openCards[0].classList.toggle("match");
        openCards[1].classList.toggle("match");
        openCards = [];
        matched++;
        if (matched === TOTAL_PAIRS) {
            gameOver();
        }
        // If they do not match, toggle open & show classes; keep visible for 1.5 seconds; empty the array
    } else {
        setTimeout(() => {
            toggleCard(openCards[0]);
            toggleCard(openCards[1]);
            openCards = [];
        }, 1500);
    }
}


// MOVE COUNTER
function countMoves() {
    moves++;
    const score = document.querySelector(".moves");
    score.innerHTML = moves;
}


function resetMoves() {
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
}


// TIMER
function startTimer() {
    timerId = setInterval(() => {
        time++;
        displayTimer();
        console.log(time);
    }, 1000);
}


function stopTimer() {
    clearInterval(timerId);
}


// Reset timer
function resetTimer() {
    stopTimer();
    timerOff = true;
    time = 0;
    displayTimer();
}


// Display timer in score panel
function displayTimer() {
    const timer = document.querySelector(".timer");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.textContent = time;
    if (seconds < 10) {
        timer.textContent = `${minutes}:0${seconds}`;
    } else {
        timer.textContent = `${minutes}:${seconds}`;
    }
}


// STAR RATING
// Based on number of moves (2 cards per move)
// Player starts with 4 stars; loses a star after 15, 30 moves
function trackStars() {
    if (moves === 15 || moves === 30) {
        removeStar();
    }
}


// Remove star by hiding it
function removeStar() {
    const allStars = document.querySelectorAll(".stars li");
    for (star of allStars) {
        if (star.style.display !== "none") {
            star.style.display = "none";
            break;
        }
    }
}


// Reset to default (4 stars)
function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll(".stars li");
    for (star of starList) {
        star.style.display = "inline";
    }
}


// MODAL WINDOW
// Toggle modal window (show/hide)
function toggleModal() {
    const modal = document.querySelector(".modal-bg");
    modal.classList.toggle("hide");
}


// Count remaining stars; convert stars to a number; post number in modal window
function countStars() {
    stars = document.querySelectorAll(".stars li");
    starCount = 0;
    for (star of stars) {
        if (star.style.display != "none") {
            starCount++;
        }
    }
    return starCount;
}


// Post stats to modal window
function postModalStats() {
    const totalTime = document.querySelector(".modal-time");
    const clockTime = document.querySelector(".timer").innerHTML;
    const totalMoves = document.querySelector(".modal-moves");
    const totalStars = document.querySelector(".modal-stars");
    const stars = countStars();

    totalTime.innerHTML = `Time: ${clockTime}`;
    totalMoves.innerHTML = `Moves: ${moves}`;
    totalStars.innerHTML = `Stars: ${stars}`;
}


// Add click listener to close button [x] in upper right corner of modal window
document.querySelector(".modal-close").addEventListener("click", () => {
    toggleModal();
});

// Add click listener to cancel button
document.querySelector(".modal-cancel").addEventListener("click", () => {
    toggleModal();
});


// RESET GAME
function resetGame() {
    resetTimer();
    resetMoves();
    resetStars();
    shuffleCards();
    resetCards();
}


// Click listener for the restart button (upper right corner)
document.querySelector(".restart").addEventListener("click", resetGame);

// Click listener for the repeat icon next to restart button
document.querySelector(".fa-repeat").addEventListener("click", resetGame);


// GAME OVER
function gameOver() {
    stopTimer();
    postModalStats();
    toggleModal();
}


// REPLAY GAME
function replayGame() {
    resetGame();
    toggleModal();
}


// Click listener for the play again button in the modal window
document.querySelector(".modal-restart").addEventListener("click", replayGame);


// RESET CARDS
// flip them back over to default black
function resetCards() {
    const cards = document.querySelectorAll(".deck li");
    for (let card of cards) {
        card.className = "card";
    }
}