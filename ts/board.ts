import * as _ from 'lodash'
import * as I from './interfaces'
import Player from './playerState'
import Direction from './enums'

class Board {

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



    generateAllShipLocations (player: Player) {
        let currentPlayer: Player = player;

        for (var shipIndex = 0; shipIndex < currentPlayer.numShips; shipIndex++) {
            this.ships[shipIndex].locations = generateSingleShipLocations(shipIndex);
        }

        function generateSingleShipLocations(shipIndex: number) {
            let direction: Direction;
            let firstCell: I.Cell;
            let newShipLocations: Array<string>;

            do {
                direction = computeDirection();
                firstCell = computeFirstCell(direction);
                newShipLocations = buildShipLocations(firstCell, direction);
            } while(collision(newShipLocations, currentPlayer))
            
            return newShipLocations;

            function collision(locations: Array<string>, player: Player) {
                let currentPlayer: Player = player;

                for (let i = 0; i < currentPlayer.numShips; i++) {
                    _.forEach(this.ships[i], () => {
                        for (let j = 0; j < locations.length; j++) {
                            if (intersection(this.ships[i] ,locations, j)) {
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
                return Math.floor(Math.random() * (currentPlayer.boardSize - this.ships[shipIndex].locations.length + 1)); 
            }

            function computeFirstCell(direction: Direction) {
                let row, col;
                if(direction == Direction.horizontal) {
                    row = computeRowHorizontalOrColVertical();
                    col = computeColHorizontalOrRowVertical();
                } else if (direction = Direction.vertical) {
                    row = computeColHorizontalOrRowVertical();
                    col = computeRowHorizontalOrColVertical();
                }
                return {
                    row, col
                }
            }

            function buildShipLocations (firstCell: I.Cell, direction: Direction) {
                let row: string = firstCell.row;
                let col: string = firstCell.col;
                let newShipLocations: Array<string> = recreateCellID(currentPlayer);
                
                return newShipLocations;

                function recreateCellID(player: Player) {
                    let tempLocations: Array<string>;
                    if(currentPlayer.playerNo === 1){
                        _.forEach(this.ships[shipIndex].locations, function (value, i) {
                            if (direction === 1) {
                                tempLocations.push(row + "" + (col + i));
                            } else {
                                tempLocations.push((row + i) + "" + col);
                            }
                        })
                    } else {
                        _.forEach(this.ships[shipIndex].locations, function (value, i) {
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

export default Board





// function fire (guess: string, player: Player) {
//     let currentPlayer: Player = player;
//     for( var i = 0; i < currentPlayer.numShips; i++) {
//         let ship: I.Ship = currentPlayer.ships[i];
//         let index: number = _.indexOf(ship.locations, guess);
//         let cell:HTMLTableCellElement = <HTMLTableCellElement>document.getElementById(guess);
//         var hitResult = {
//             ship: ship,
//             guessIndex: index,
//             isHit: false,
//             alreadyFired: false
//         };

//         if(checkSecondClick(ship, index, cell)) {
            
//             hitResult.alreadyFired = true;
//             return hitResult;
            
//         } else if (isHit(index)){
            
//             hitResult.isHit = true;
//             return hitResult;
//         }
//     }
//     return hitResult;
// }

// function checkSecondClick(ship: I.Ship, index: number, cell: HTMLTableCellElement) {
// 		return ship.hits[index] === "hit" || cell.className === "miss";
// }

// function isHit(index: number) {
// 	return index >= 0;
// }

// function isSunk(ship: I.Ship) {
// 	return !(_.indexOf(ship.hits, " ") + 1);
// }