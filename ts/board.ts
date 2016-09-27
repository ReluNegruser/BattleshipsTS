//import * as _ from 'lodash'
//import * as I from './interfaces'
//import Player from './playerState'
//import Direction from './enums'

/// <reference path="./interfaces.ts" />
/// <reference path="./playerState.ts" />
/// <reference path="./enums.ts" />


namespace board {
    export class Board {

        public ships: Array<I.Ship>

        constructor () {
            this.ships = [
                { locations: ['0', '0'], hits: [" ", " "] },
                { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
                { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
                { locations: ['0', '0', '0', '0'], hits: [" ", " ", " ", " "] },
                { locations: ['0', '0', '0', '0', '0'], hits: [" ", " ", " ", " "," "] }
            ];	
        }


        generateAllShipLocations (player: playerState.Player) {
            let currentPlayer: playerState.Player = player;
            let thisBoard = this;

            for (var shipIndex = 0; shipIndex < currentPlayer.numShips; shipIndex++) {
                this.ships[shipIndex].locations = generateSingleShipLocations(shipIndex);
            }

            function generateSingleShipLocations(shipIndex: number) {
                let direction: enums.Direction;
                let firstCell: I.Cell;
                let newShipLocations: Array<string>;

                do {
                    direction = computeDirection();
                    firstCell = computeFirstCell(direction);
                    newShipLocations = buildShipLocations(firstCell, direction);
                } while(collision(newShipLocations, currentPlayer))
                
                return newShipLocations;

                function collision(locations: Array<string>, player: playerState.Player) {
                    let currentPlayer: playerState.Player = player;

                    for (let i = 0; i < currentPlayer.numShips; i++) {
                        _.forEach(thisBoard.ships[i], () => {
                            for (let j = 0; j < locations.length; j++) {
                                if (intersection(thisBoard.ships[i] ,locations, j)) {
                                    return true;
                                }
                            }
                        } )
                    }
                return false;

                function intersection(ship: I.Ship, locations: Array<string>, j: number) {
                    return (_.indexOf(ship.locations, locations[j]) >= 0);
                }
                }

                function computeDirection() {
                    return Math.floor(Math.random() * 2);
                }

                function computeRowHorizontalOrColVertical () {
                    return Math.floor(Math.random() * currentPlayer.boardSize);
                }
                        
                function computeColHorizontalOrRowVertical() {
                    return Math.floor(Math.random() * (currentPlayer.boardSize - currentPlayer.board.ships[shipIndex].locations.length + 1)); 
                }

                function computeFirstCell(direction: enums.Direction) {
                    let row, col;
                    if(direction == enums.Direction.horizontal) {
                        row = computeRowHorizontalOrColVertical();
                        col = computeColHorizontalOrRowVertical();
                    } else if (direction = enums.Direction.vertical) {
                        row = computeColHorizontalOrRowVertical();
                        col = computeRowHorizontalOrColVertical();
                    }
                    return {
                        row, col
                    }
                }

                function buildShipLocations (firstCell: I.Cell, direction: enums.Direction) {
                    let row: string = firstCell.row;
                    let col: string = firstCell.col;
                    let newShipLocations: Array<string> = recreateCellID(currentPlayer);
                    
                    return newShipLocations;

                    function recreateCellID(player: playerState.Player) {
                        var tempLocations: Array<string> = [];
                        if(currentPlayer.playerNo === 1){
                            _.forEach(thisBoard.ships[shipIndex].locations, function (value, i) {
                                if (direction === 1) {
                                    tempLocations.push(row + "" + (col + i));
                                } else {
                                    tempLocations.push((row + i) + "" + col);
                                }
                            })
                        } else {
                            _.forEach(thisBoard.ships[shipIndex].locations, function (value, i) {
                                if (direction === 1) {
                                    tempLocations.push("0" + row + "" + (col + i));
                                } else {
                                    tempLocations.push("0" + (row + i) + "" + col);
                                }
                            })
                        }

                        return tempLocations;
                    }
                }
            }
        }
    }
}

//export default Board
