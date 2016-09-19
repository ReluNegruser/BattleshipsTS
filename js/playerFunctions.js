"use strict";
var _ = require('lodash');
var enums_1 = require('./enums');
function fire(guess, player) {
    var currentPlayer = player;
    for (var i = 0; i < currentPlayer.numShips; i++) {
        var ship = currentPlayer.ships[i];
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
}
function checkSecondClick(ship, index, cell) {
    return ship.hits[index] === "hit" || cell.className === "miss";
}
function isHit(index) {
    return index >= 0;
}
function isSunk(ship) {
    return !(_.indexOf(ship.hits, " ") + 1);
}
function collision(locations, player) {
    var currentPlayer = player;
    var _loop_1 = function(i) {
        _.forEach(player.ships[i], function () {
            for (var j = 0; j < locations.length; j++) {
                if (intersection(player.ships[i], locations, j)) {
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
function generateAllShipLocations(player) {
    var currentPlayer = player;
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
        function computeDirection() {
            return Math.floor(Math.random() * 2);
        }
        function computeRowHorizontalOrColVertical() {
            return Math.floor(Math.random() * currentPlayer.boardSize);
        }
        function computeColHorizontalOrRowVertical() {
            return Math.floor(Math.random() * (currentPlayer.boardSize - currentPlayer.ships[shipIndex].locations.length + 1));
        }
        function computeFirstCell(direction) {
            var row, col;
            if (direction == enums_1.default.horizontal) {
                row = computeRowHorizontalOrColVertical();
                col = computeColHorizontalOrRowVertical();
            }
            else if (direction = enums_1.default.vertical) {
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
                var tempLocations;
                if (currentPlayer.playerNo === 1) {
                    _.forEach(currentPlayer.ships[shipIndex].locations, function (value, i) {
                        if (direction === 1) {
                            tempLocations.push(row + "" + (col + i));
                        }
                        else {
                            tempLocations.push((row + i) + "" + col);
                        }
                    });
                }
                else {
                    _.forEach(currentPlayer.ships[shipIndex].locations, function (value, i) {
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
}
//# sourceMappingURL=playerFunctions.js.map