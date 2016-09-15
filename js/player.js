/// <reference path="../lodash.d.ts" />
"use strict";
var default_1 = (function () {
    function default_1(playerNo, boardSize, numShips, shipsSunk) {
        this.playerNo = playerNo;
        this.boardSize = boardSize;
        this.numShips = numShips;
        this.shipsSunk = shipsSunk;
        this.boardSize = boardSize;
        this.numShips = numShips;
        this.shipsSunk = shipsSunk;
        this.playerNo = playerNo;
        this.ships = [
            { locations: ['0', '0'], hits: [" ", " "] },
            { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
            { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
            { locations: ['0', '0', '0', '0'], hits: [" ", " ", " ", " "] },
            { locations: ['0', '0', '0', '0', '0'], hits: [" ", " ", " ", " ", " "] }
        ];
    }
    default_1.prototype.fire = function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = _.indexOf(ship.locations, guess); //ship.locations.indexOf(guess)
            var cell = document.getElementById(guess);
            var hitResult = {
                ship: ship,
                guessIndex: index,
                isHit: false,
                alreadyFired: false
            };
            if (this.checkSecondClick(ship, index, cell)) {
                hitResult.alreadyFired = true;
                return hitResult;
            }
            else if (this.isHit(index)) {
                hitResult.isHit = true;
                return hitResult;
            }
        }
        return hitResult;
    };
    default_1.prototype.checkSecondClick = function (ship, index, cell) {
        return ship.hits[index] === "hit" || cell.className === "miss";
    };
    default_1.prototype.isHit = function (index) {
        return index >= 0;
    };
    default_1.prototype.isSunk = function (ship) {
        return !(_.indexOf(ship.hits, " ") + 1);
    };
    return default_1;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=player.js.map