//import * as view from './view'
//import * as I from './interfaces'
//import Player from './playerState'
"use strict";
function processGuess(player, guess) {
    var guessLocation = guess;
    var hitResult = player.fire(guessLocation);
    if (hitResult.isHit) {
        markHit(hitResult.ship, hitResult.guessIndex);
        view.displayHit(guessLocation);
        if (player.playerNo === 1) {
            view.displayMessage('Player: 1', ' A mighty hit! Keep going!', 'hitTarget');
        }
        else {
            view.displayMessage('Player: 2', ' A mighty hit! Keep going!', 'hitTarget');
        }
        if (player.isSunk(hitResult.ship)) {
            if (player.playerNo === 1) {
                view.displayMessage('Player: 1', ' You sank a battleship! Don\'t let them catch their breath!', 'sinkTarget');
            }
            else {
                view.displayMessage('Player: 2', ' You sank a battleship! Don\'t let them catch their breath!', 'sinkTarget');
            }
            markSunk(hitResult.ship);
        }
    }
    if (hitResult.isHit && player.shipsSunk === player.numShips) {
        if (player.playerNo === 1) {
            alert('Player 1 wins!! Contgrats!');
        }
        else {
            alert('Player 2 wins!! Contgrats!');
        }
        window.location.reload(false);
        return;
    }
    if (hitResult.alreadyFired) {
        alert('You have already fired there!');
        return;
    }
    if (!hitResult.isHit) {
        view.displayMiss(guess);
        if (player.playerNo === 1) {
            view.displayMessage("Player: 1", " Aww.. Maybe next time!", "missTarget");
        }
        else {
            view.displayMessage("Player: 2", " Aww.. Maybe next time!", "missTarget");
        }
        if (player.playerNo === 2) {
            window.setTimeout(changeToPlayer1, 250);
        }
        else {
            window.setTimeout(changeToPlayer2, 250);
        }
        return;
    }
    function markHit(ship, index) {
        ship.hits[index] = "hit";
    }
    function markSunk(ship) {
        for (var j = 0; j < ship.locations.length; j++) {
            var cell = document.getElementById(ship.locations[j]);
            cell.setAttribute("class", "sunk");
        }
        player.shipsSunk++;
    }
    function changeToPlayer1() {
        var board1 = document.getElementById("board1");
        var board2 = document.getElementById("board2");
        var gif = document.getElementById("gifContainer");
        board2.setAttribute("class", "hidden");
        window.setTimeout(showboard1, 2000);
        window.setTimeout(sayPlayer1, 2000);
    }
    function changeToPlayer2() {
        var board1 = document.getElementById("board1");
        var board2 = document.getElementById("board2");
        var gif = document.getElementById("gifContainer");
        board1.setAttribute("class", "hidden");
        window.setTimeout(showboard2, 2000);
        window.setTimeout(sayPlayer2, 2000);
    }
    function showboard1() {
        var board1 = document.getElementById("board1");
        board1.setAttribute("class", "show");
    }
    function showboard2() {
        var board2 = document.getElementById("board2");
        board2.setAttribute("class", "show");
    }
    function sayPlayer1() {
        view.displayMessage("Player 1's turn!", "Don't give up!");
    }
    function sayPlayer2() {
        view.displayMessage("Player 2's turn!", "Go get 'em!");
    }
}
exports.processGuess = processGuess;
//# sourceMappingURL=controller.js.map