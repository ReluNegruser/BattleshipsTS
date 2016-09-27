//export { Ship, Cell } 
//import * as I from './interfaces'
//import Board from './board'
//import * as _ from 'lodash'
/// <reference path="./board.ts" />
var playerState;
(function (playerState) {
    var Player = (function () {
        function Player(playerNo, boardSize, numShips, shipsSunk) {
            this.playerNo = playerNo;
            this.boardSize = boardSize;
            this.numShips = numShips;
            this.shipsSunk = shipsSunk;
            this.boardSize = boardSize;
            this.numShips = numShips;
            this.shipsSunk = shipsSunk;
            this.playerNo = playerNo;
            this.board = new board.Board();
        }
        Player.prototype.fire = function (guess) {
            for (var i = 0; i < this.numShips; i++) {
                var ship = this.board.ships[i];
                var index = _.indexOf(ship.locations, guess);
                var cell = document.getElementById(guess);
                var hitResult = {
                    ship: ship,
                    guessIndex: index,
                    isHit: false,
                    alreadyFired: false
                };
                if (checkSecondClick(ship, index, cell)) {
                    hitResult.alreadyFired = true;
                    return hitResult;
                }
                else if (isHit(index)) {
                    hitResult.isHit = true;
                    return hitResult;
                }
            }
            return hitResult;
            function checkSecondClick(ship, index, cell) {
                return ship.hits[index] === "hit" || cell.className === "miss";
            }
            function isHit(index) {
                return index >= 0;
            }
        };
        Player.prototype.isSunk = function (ship) {
            return !(_.indexOf(ship.hits, " ") + 1);
        };
        return Player;
    }());
    playerState.Player = Player;
})(playerState || (playerState = {}));
//export default Player; 
var enums;
(function (enums) {
    (function (Direction) {
        Direction[Direction["vertical"] = 0] = "vertical";
        Direction[Direction["horizontal"] = 1] = "horizontal";
    })(enums.Direction || (enums.Direction = {}));
    var Direction = enums.Direction;
})(enums || (enums = {}));
// export default Direction 
//import * as _ from 'lodash'
//import * as I from './interfaces'
//import Player from './playerState'
//import Direction from './enums'
/// <reference path="./interfaces.ts" />
/// <reference path="./playerState.ts" />
/// <reference path="./enums.ts" />
var board;
(function (board) {
    var Board = (function () {
        function Board() {
            this.ships = [
                { locations: ['0', '0'], hits: [" ", " "] },
                { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
                { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
                { locations: ['0', '0', '0', '0'], hits: [" ", " ", " ", " "] },
                { locations: ['0', '0', '0', '0', '0'], hits: [" ", " ", " ", " ", " "] }
            ];
        }
        Board.prototype.generateAllShipLocations = function (player) {
            var currentPlayer = player;
            var thisBoard = this;
            for (var shipIndex = 0; shipIndex < currentPlayer.numShips; shipIndex++) {
                this.ships[shipIndex].locations = generateSingleShipLocations(shipIndex);
            }
            function generateSingleShipLocations(shipIndex) {
                var direction;
                var firstCell;
                var newShipLocations;
                do {
                    direction = computeDirection();
                    firstCell = computeFirstCell(direction);
                    newShipLocations = buildShipLocations(firstCell, direction);
                } while (collision(newShipLocations, currentPlayer));
                return newShipLocations;
                function collision(locations, player) {
                    var currentPlayer = player;
                    var _loop_1 = function(i) {
                        _.forEach(thisBoard.ships[i], function () {
                            for (var j = 0; j < locations.length; j++) {
                                if (intersection(thisBoard.ships[i], locations, j)) {
                                    return true;
                                }
                            }
                        });
                    };
                    for (var i = 0; i < currentPlayer.numShips; i++) {
                        _loop_1(i);
                    }
                    return false;
                    function intersection(ship, locations, j) {
                        return (_.indexOf(ship.locations, locations[j]) >= 0);
                    }
                }
                function computeDirection() {
                    return Math.floor(Math.random() * 2);
                }
                function computeRowHorizontalOrColVertical() {
                    return Math.floor(Math.random() * currentPlayer.boardSize);
                }
                function computeColHorizontalOrRowVertical() {
                    return Math.floor(Math.random() * (currentPlayer.boardSize - currentPlayer.board.ships[shipIndex].locations.length + 1));
                }
                function computeFirstCell(direction) {
                    var row, col;
                    if (direction == enums.Direction.horizontal) {
                        row = computeRowHorizontalOrColVertical();
                        col = computeColHorizontalOrRowVertical();
                    }
                    else if (direction = enums.Direction.vertical) {
                        row = computeColHorizontalOrRowVertical();
                        col = computeRowHorizontalOrColVertical();
                    }
                    return {
                        row: row, col: col
                    };
                }
                function buildShipLocations(firstCell, direction) {
                    var row = firstCell.row;
                    var col = firstCell.col;
                    var newShipLocations = recreateCellID(currentPlayer);
                    return newShipLocations;
                    function recreateCellID(player) {
                        var tempLocations = [];
                        if (currentPlayer.playerNo === 1) {
                            _.forEach(thisBoard.ships[shipIndex].locations, function (value, i) {
                                if (direction === 1) {
                                    tempLocations.push(row + "" + (col + i));
                                }
                                else {
                                    tempLocations.push((row + i) + "" + col);
                                }
                            });
                        }
                        else {
                            _.forEach(thisBoard.ships[shipIndex].locations, function (value, i) {
                                if (direction === 1) {
                                    tempLocations.push("0" + row + "" + (col + i));
                                }
                                else {
                                    tempLocations.push("0" + (row + i) + "" + col);
                                }
                            });
                        }
                        return tempLocations;
                    }
                }
            }
        };
        return Board;
    }());
    board.Board = Board;
})(board || (board = {}));
//export default Board
var view;
(function (view) {
    function displayMessage(title, msg, spanId) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = "<h2> " + title + " </h2> <h3><span id = " + spanId + ">&nbsp;&nbsp;&nbsp;&nbsp;</span> " + msg + " </h3>";
    }
    view.displayMessage = displayMessage;
    function displayHit(location) {
        //var cell = document.getElementById(location);
        document.getElementById(location).setAttribute("class", "hit");
    }
    view.displayHit = displayHit;
    function displayMiss(location) {
        //var cell = document.getElementById(location);
        document.getElementById(location).setAttribute("class", "miss");
    }
    view.displayMiss = displayMiss;
})(view || (view = {}));
//export { displayMessage, displayHit, displayMiss }
//import * as view from './view'
//import * as I from './interfaces'
//import Player from './playerState'
/// <reference path="./playerState.ts" />
/// <reference path="./view.ts" />
var controller;
(function (controller) {
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
    controller.processGuess = processGuess;
})(controller || (controller = {}));
//export { processGuess } 
//import Player from './playerState'
//import * as controller from './controller'
/// <reference path="./playerState.ts" />
/// <reference path="./board.ts" />
/// <reference path="./view.ts" />
/// <reference path="./controller.ts" />
window.onload = init;
var player1 = new playerState.Player(1, 10, 5, 0);
var player2 = new playerState.Player(2, 10, 5, 0);
function init() {
    function cellClickHandler1(e) {
        var guess = e.target.id;
        controller.processGuess(player1, guess);
    }
    function cellClickHandler2(e) {
        var guess = e.target.id;
        controller.processGuess(player2, guess);
    }
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < (cells.length / 2); i++) {
        cells[i].onclick = cellClickHandler1;
    }
    for (var j = cells.length / 2; j < cells.length; j++) {
        cells[j].onclick = cellClickHandler2;
    }
    var table = document.getElementsByTagName("table");
    for (var i = 0; i < table.length; i++) {
        table[i].onclick = function () {
            var toggle = document.getElementById("messageAreaContainer");
            if (toggle.style.display === "none") {
                toggle.style.display = "";
            }
        };
    }
    var toggle = document.getElementById("messageAreaContainer").style.display = "none";
    player1.board.generateAllShipLocations(player1);
    player2.board.generateAllShipLocations(player2);
}
//# sourceMappingURL=bootstrapper.js.map