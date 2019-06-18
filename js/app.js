// Author: Julia Crosara
// FEND Project 2: Memory Game


//Global scope
const deck = document.querySelector(".deck");
let cards = document.querySelectorAll(".card");
let openCards = [];
let moves = 0;
let time = 0;
let timerOff = true;
let timerId;


//Shuffle the cards at the start of the game
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

//Add event listener and toggle open class when clicked
//Add the first two clicked cards to an array
//Start counting moves & tracking stars
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

//"Turn over" clicked cards by toggling open & show classes
function toggleCard(clickedCard) {
    clickedCard.classList.toggle("open");
    clickedCard.classList.toggle("show");
}

//Add clicked cards to an array
function addClickedCard(clickedCard) {
    openCards.push(clickedCard);
}

//Compare the two open cards and see if they match
function compareOpenCards() {
    //If they match, toggle the match class (cards turn green and stay open); empty the array
    if (
        openCards[0].firstElementChild.className ===
        openCards[1].firstElementChild.className
    ) {
        openCards[0].classList.toggle("match");
        openCards[1].classList.toggle("match");
        openCards = [];
        //If they do not match, toggle the open & show classes; keep visible for 1.5 seconds; empty the array
    } else {
        setTimeout(() => {
            toggleCard(openCards[0]);
            toggleCard(openCards[1]);
            openCards = [];
        }, 1500);
    }
}

//Move counter
function countMoves() {
    moves++;
    const score = document.querySelector(".moves");
    score.innerHTML = moves;
}

function resetMoves() {
    moves = 0;
    document.querySelector(".moves").innerHTML = moves;
}

//Timer
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

//Display timer in score panel
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

//Star rating
//Set the star rating based on number of moves
//Player starts with 4 stars; loses a star after 15, 30 moves
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
// Reset to 4 stars
function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll(".stars li");
    for (star of starList) {
        star.style.display = "inline";
    }
}

// Restart button
function restartGame() {
    shuffleCards();
    resetTimer();
    resetMoves();
    resetStars();
}

// Toggles modal window
function toggleModal() {
    const modal = document.querySelector(".modal-bg");
    modal.classList.toggle("hide");
}

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


postModalStats(); // write stats to modal window
toggleModal(); // open Modal

function postModalStats() {
    const timeStat = document.querySelector(".modal-time");
    const clockTime = document.querySelector(".timer").innerHTML;
    const movesStat = document.querySelector(".modal-moves");
    const starsStat = document.querySelector(".modal-stars");
    const stars = countStars();

    timeStat.innerHTML = `Time: ${clockTime}`;
    movesStat.innerHTML = `Moves: ${moves}`;
    starsStat.innerHTML = `Stars: ${stars}`;
}


document.querySelector(".modal-cancel").addEventListener("click", () => {
    toggleModal();
});

document.querySelector(".modal-restart").addEventListener("click", () => {
    // TODO: Call reset game here
});