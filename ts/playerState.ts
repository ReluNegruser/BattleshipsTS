//import * as I from './interfaces'
//import Board from './board'
//import * as _ from 'lodash'

/// <reference path="./board.ts" />

	namespace playerState {
	export class Player {

		public board: board.Board;
		constructor (public playerNo: number, public boardSize: number, public numShips: number, public shipsSunk: number) {

			this.boardSize = boardSize;
			this.numShips = numShips;
			this.shipsSunk = shipsSunk;
			this.playerNo = playerNo;
			this.board = new board.Board();
		}
		
		fire (guess: string) {

			for( var i = 0; i < this.numShips; i++) {
				let ship: I.Ship = this.board.ships[i];
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
}

//export default Player;