/// <reference path="../lodash.d.ts" />
"use strict";
var Direction;
(function (Direction) {
    Direction[Direction["vertical"] = 0] = "vertical";
    Direction[Direction["horizontal"] = 1] = "horizontal";
})(Direction || (Direction = {}));
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
        this.ships = [
            { locations: ['0', '0'], hits: [" ", " "] },
            { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
            { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
            { locations: ['0', '0', '0', '0'], hits: [" ", " ", " ", " "] },
            { locations: ['0', '0', '0', '0', '0'], hits: [" ", " ", " ", " ", " "] }
        ];
    }
    Player.prototype.fire = function (guess) {
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
    Player.prototype.checkSecondClick = function (ship, index, cell) {
        return ship.hits[index] === "hit" || cell.className === "miss";
    };
    Player.prototype.isHit = function (index) {
        return index >= 0;
    };
    Player.prototype.isSunk = function (ship) {
        return !(_.indexOf(ship.hits, " ") + 1);
    };
    Player.prototype.generateAllShipLocations = function () {
        var that = this;
        for (var shipIndex = 0; shipIndex < this.numShips; shipIndex++) {
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
            } while (that.collision(newShipLocations));
            return newShipLocations;
            function buildShipLocations(firstCell, direction) {
                var newShipLocations = [];
                if (that.playerNo === Direction.horizontal) {
                    _.forEach(that.ships[shipIndex].locations, function (value, i) {
                        console.log("iterating through positions while vreating ships" + value + i);
                        if (direction === Direction.horizontal) {
                            newShipLocations.push(firstCell.row + "" + (firstCell.col + i));
                        }
                        else {
                            newShipLocations.push((firstCell.row + i) + "" + firstCell.col);
                        }
                    });
                }
                else {
                    _.forEach(that.ships[shipIndex].locations, function (value, i) {
                        if (direction === 1) {
                            newShipLocations.push("0" + firstCell.row + "" + (firstCell.col + i));
                        }
                        else {
                            newShipLocations.push("0" + (firstCell.row + i) + "" + firstCell.col);
                        }
                    });
                }
                return newShipLocations;
            }
            ;
            function computeFirstCell(direction) {
                var row, col;
                if (direction === Direction.horizontal) {
                    row = computeRowHorizontalOrColVertical();
                    col = computeColHorizontalOrRowVertical();
                }
                else if (direction === Direction.vertical) {
                    row = computeColHorizontalOrRowVertical();
                    col = computeRowHorizontalOrColVertical();
                }
                return {
                    row: row, col: col
                };
            }
            function computeRowHorizontalOrColVertical() {
                return Math.floor(Math.random() * that.boardSize);
            }
            ;
            function computeColHorizontalOrRowVertical() {
                return Math.floor(Math.random() * (that.boardSize - that.ships[shipIndex].locations.length + 1));
            }
            ;
            function computeDirection() {
                return Math.floor(Math.random() * 2);
            }
            ;
        }
    };
    Player.prototype.collision = function (locations) {
        for (var i = 0; i < this.numShips; i++) {
            for (var j = 0; j < locations.length; j++) {
                if (intersection(this.ships[i], locations)) {
                    return true;
                }
            }
        }
        return false;
        function intersection(ship, locations) {
            return (ship.locations.indexOf(locations[j]) >= 0);
        }
    };
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=player.js.map