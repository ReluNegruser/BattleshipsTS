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
                    var _this = this;
                    var currentPlayer = player;
                    var _loop_1 = function(i) {
                        _.forEach(this_1.ships[i], function () {
                            for (var j = 0; j < locations.length; j++) {
                                if (intersection(_this.ships[i], locations, j)) {
                                    return true;
                                }
                            }
                        });
                    };
                    var this_1 = this;
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
                    return Math.floor(Math.random() * (currentPlayer.boardSize - this.ships[shipIndex].locations.length + 1));
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
                        var tempLocations;
                        if (currentPlayer.playerNo === 1) {
                            _.forEach(this.ships[shipIndex].locations, function (value, i) {
                                if (direction === 1) {
                                    tempLocations.push(row + "" + (col + i));
                                }
                                else {
                                    tempLocations.push((row + i) + "" + col);
                                }
                            });
                        }
                        else {
                            _.forEach(this.ships[shipIndex].locations, function (value, i) {
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
//# sourceMappingURL=board.js.map