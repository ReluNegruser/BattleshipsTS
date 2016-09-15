/// <reference path="../lodash.d.ts" />

import * as I from './interfaces'


export default class {

    protected ships: Array<I.ship>;

    constructor(protected playerNo: number, protected boardSize: number, protected numShips: number, protected shipsSunk: number) {
        this.boardSize = boardSize;
		this.numShips = numShips;
		this.shipsSunk = shipsSunk;
		this.playerNo = playerNo;
		this.ships = [
            { locations: ['0', '0'], hits: [" ", " "] },
            { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
            { locations: ['0', '0', '0'], hits: [" ", " ", " "] },
            { locations: ['0', '0', '0', '0'], hits: [" ", " ", " ", " "] },
            { locations: ['0', '0', '0', '0', '0'], hits: [" ", " ", " ", " "," "] }
		];
    }

    fire (guess: string) {
        
		for( var i = 0; i < this.numShips; i++) {
			var ship: I.ship = this.ships[i];
			var index: number = _.indexOf(ship.locations, guess);      //ship.locations.indexOf(guess)
			var cell = document.getElementById(guess);
			var hitResult: I.resultObject = {
				ship: ship,
				guessIndex: index,
				isHit: false,
				alreadyFired: false
			};

			if(this.checkSecondClick(ship, index, cell)) {
				hitResult.alreadyFired = true;

				return hitResult;
			} else if (this.isHit(index)){
				hitResult.isHit = true;

				return hitResult;
			}
		}
			
		return hitResult;
	}

    checkSecondClick(ship: I.ship, index: number, cell) {
		return ship.hits[index] === "hit" || cell.className === "miss";
	}


	isHit(index: number) {
		return index >= 0;
	}

	isSunk(ship: I.ship) {
		return !(_.indexOf(ship.hits, " ") + 1);
	}

}