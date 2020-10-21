"use strict";

/**
 * Author: Vorname Nachname (email@ostfalia.de) - Mat.Nr.
 *
 * This is the player-"class" of the pong-project.
 *
 * It contains most of the logic of this project (like behaviour, visualisation of the game-elements, localStorage, etc.)
 * The most important functions are initialize() and update() - every other method of this game is called from those two methods.
 */
// Global attributes

// the interval with which the update-loop gets executed (low values mean faster gameplay)
// 35 looks like real pong, 60 is useful for debugging
var updateSpeed = 30;

// the amount of pixels a players'pad is going to move after one of the direction keys has been pressed
var shiftAmount = 10;

// An offset used from within the center of the canvas to position each of the players highscore
var highScoreOffsetFromCenter = 50;

// The y position of the highscore
var highScoreYPosition = 60;

// Elements from the DOM
var canvas = null;
var context = null;

// instances of the model classes
var player1;
var player2;
var ball;
var utils;

// the variable which points to the winner of the game, is null / "undefined" until a winenr has been set
var winner;

// in the original pong, a player has to get 11 points in order to win.
var targetHighScore = 11;

// the text variable which is used to display the winner at the end of each round.
var targetText;

// the dimenions of the restart-button (which is not a DOM-Element but a poor drawn rectangle)
// ... the width of the restart-button
var restartButtonWidth = 200;
// ... the height of the restart-button
var restartButtonHeight = 50;
// ... the x-position of the restart-button
var restartButtonX;
// ... the y-position of the restart-button
var restartButtonY;

// The string-variable which is used to persist the highscore, using the localStorage-functionality of the firefox-browser
var storageKey = "HIGHSCORES";


function initialize() {
    // The utils-model contains helper-methods and a set of game-state-defining variables:
    utils = new Utils(
        true , // start the game with activated sound-output
        false, // the first player should not be controlled by the "computer"
        true , // the second player should be controlled by the "computer"
        true , // control the first player + with the mouse
        false, // don't control the second player + with the mouse
        false, // don't show the direction vector of the ball
        false, // don't show the distances between the paddles and the balls
        false  // don't start the game in paused-mode, of course!
    );

    // create references of the page-elements
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    // initialize the players
    player1 = new Player(
        context,
        "Spieler 1",
        20, 20, 10, 100,
        '#FFFFFF'
    );
    player2 = new Player(
        context,
        "Spieler 2",
        600, 20, 10, 100,
        '#FFFFFF'
    );

    // intialize the ball
    ball = new Ball(
        context,
        400, 100, 10,
        '#FFFFFF',
        -10, 10,
        player1, player2
    );

    // TODO: how to put this into the constructor of the player-class?
    document.addEventListener('keydown', function (evt) {
        switch (evt.code) {
            case 'KeyS':
                if (player1.y < canvas.height - player1.height) {
                    player1.y += shiftAmount;
                }
                break;

            case 'KeyW':
                if (player1.y > 0) {
                    player1.y -= shiftAmount;
                }
                break

            case 'ArrowDown':
                if (player2.y < canvas.height - player2.height) {
                    player2.y += shiftAmount;
                }
                break;

            case 'ArrowUp':
                if (player2.y > 0) {
                    player2.y -= shiftAmount;
                }
                break

        }
    });
    // TODO: how to put this into the constructor of the player-class?

    player1.resetPosition(true);
    player2.resetPosition(false);
    ball.resetPosition();

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);

        // Don't do anything if the game has been paused
        if(!Utils.option_togglePause){
            if (Utils.option_ctrlPlayer1) {
                player1.y = mousePos.y - (player1.height / 2);
            }

            if (Utils.option_ctrlPlayer2) {
                player2.y = mousePos.y - (player2.height / 2);
            }
        }

    }, false);


    canvas.addEventListener('click', function (event) {
        if (
            event.x > restartButtonX &&
            event.x < restartButtonX + restartButtonWidth &&
            event.y > restartButtonY &&
            event.y < restartButtonY + restartButtonHeight
        ) {
            // As soon as the user clicks within the restart-button, restart the game
            restart();
        }
    });

    restart();
}

/**
 * Helper-Method which is used to restart the game
 */
function restart() {
    winner = null;
    player1.reset(true);
    player2.reset(false);
    ball.resetRound();
}

/**
 * Helper method which is used to get the current mouse-position
 * @param canvas - the canvas from which the mouse-position gets reported
 * @param evt - the event which gets fired by clicking the canvas
 * @returns The x- and y-position of the mouse
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

/**
 * Helper-Method which is used to show the winner of the game at the end of the round.
 */
function showWinnerScreen() {
    // overall styling a positioning
    context.font = "40px Arial";
    context.fillStyle = '#FFFFFF';
    targetText = (winner.name + " gewinnt das Spiel!");
    context.fillText
    (
        targetText,
        (canvas.width / 2) - (context.measureText(targetText).width) / 2,
        (canvas.height / 2),
    );

    // center the button within the canvas
    restartButtonX = (canvas.width / 2) - restartButtonWidth / 2;
    restartButtonY = (canvas.height / 2) + restartButtonHeight;

    // draw the background of the button
    context.font = "20px Arial";
    context.fillStyle = '#FFFFFF';
    context.fillRect(restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight);

    // draw the text withint the button
    context.fillStyle = '#000000';
    context.fillText(
        "Neustart",
        restartButtonX + (context.measureText(restartButtonWidth).width * 1.7),
        restartButtonY + (restartButtonHeight / 2) + 6
    );
}

/**
* This is the main loop which renders the user-interface and the various elements of the page
* This is realised by executing #window.setTimeout(..) within the function itself
*
* See:
*  - https://developer.mozilla.org/de/docs/Web/API/WindowTimers/setTimeout
*/
function update() {
    clearCanvas();

    // check for a winner
    if (winner == null && player1.highscore === targetHighScore) setWinner(player1);
    if (winner == null && player2.highscore === targetHighScore) setWinner(player2);

    if (winner == null) {
        player1.update();
        player2.update();
        ball.update();
        updateUI();
    } else {
        showWinnerScreen();
    }

    // re-enter the update method, defined by updateSpeed
    window.setTimeout('update()', updateSpeed);
}

/**
 * Set the @param player as the winner of the current round.
 */
function setWinner(player){
    winner = player;

    // check if there are any stored highscores yet
    var highscores = localStorage[storageKey];

    var stringToPersist = winner.name + " - " + new Date().toLocaleString();

    if(highscores == null){
        // we don't have any highscores saved yet ...
        highscores = [];
        highscores[0] = stringToPersist;
        localStorage[storageKey] = JSON.stringify(highscores);
    } else {
        // there are highscores saved already
        highscores = JSON.parse(localStorage[storageKey]);
        highscores[highscores.length] = stringToPersist;
        localStorage[storageKey] = JSON.stringify(highscores);
    }
}

/**
 * Update (calculate, draw) the overall UI (highscore)
 */
function updateUI() {
    // draw the highscore of the players
    context.font = "40px Arial";
    context.fillText(player1.highscore,
        (canvas.width / 2) - (context.measureText(player1.highscore).width) - highScoreOffsetFromCenter,
        highScoreYPosition
    );

    context.fillText(player2.highscore,
        (canvas.width / 2) - (context.measureText(player2.highscore).width / 2) + highScoreOffsetFromCenter,
        highScoreYPosition
    )


    var lineParam = 10;
    var lineWidth = 5;
    var lineYPos = 5;
    // draw the dotted line in the middle of the canvas
    context.strokeStyle = '#FFFFFF';
    context.lineWidth = lineWidth;
    context.setLineDash([lineParam, lineParam]);
    /*dashes are 5px and spaces are 3px*/
    context.beginPath();
    context.moveTo((canvas.width / 2) - (lineParam / 2), lineYPos);
    context.lineTo((canvas.width / 2) - (lineParam / 2), canvas.height);
    context.stroke();
}

// clears the canvas
function clearCanvas() {
    canvas.width = canvas.width;
}