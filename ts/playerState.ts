import * as I from './interfaces'

class Player {

    public ships: Array<I.Ship>;

    constructor (public playerNo: number, public boardSize: number, public numShips: number, public shipsSunk: number) {

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
			let ship: I.Ship = this.ships[i];
			let index: number = _.indexOf(ship.locations, guess);
			let cell:HTMLTableCellElement = <HTMLTableCellElement>document.getElementById(guess);
			var hitResult = {
				ship: ship,
				guessIndex: index,
				isHit: false,
				alreadyFired: false
			};

			if(checkSecondClick(ship, index, cell)) {
				
				hitResult.alreadyFired = true;
				return hitResult;
				
			} else if (isHit(index)){
				
				hitResult.isHit = true;
				return hitResult;
			}
		}
    	return hitResult;


		function checkSecondClick(ship: I.Ship, index: number, cell: HTMLTableCellElement) {
			return ship.hits[index] === "hit" || cell.className === "miss";
		}

		function isHit(index: number) {
			return index >= 0;
		}

	}

	isSunk(ship: I.Ship) {
		return !(_.indexOf(ship.hits, " ") + 1);
	}

}

export default Player;