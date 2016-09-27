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
//# sourceMappingURL=playerState.js.map