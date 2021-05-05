'use strict';

var diceEl = document.getElementsByClassName('dice')[0];
var score0El = document.getElementById('score--0');
var score1El = document.getElementById('score--1');
var player0El = document.querySelector('.player--0');
var player1El = document.querySelector('.player--1');
var current0El = document.getElementById('current--0');
var current1El = document.getElementById('current--1');

var btnNew = document.querySelector('.btn--new');
var btnRoll = document.querySelector('.btn--roll');
var btnHold = document.querySelector('.btn--hold');

var scores;
var currentScore;
var activePlayer;
var playing;
var isPlaying = true;

//Starter Conditions..
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  if (isPlaying) {
    var dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `Images/dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player.
    if (dice != 1) {
      //Add dice to current score.

      currentScore = currentScore + dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to next player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player score is 100
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      isPlaying = false;
    } else {
      //3. switch player

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
