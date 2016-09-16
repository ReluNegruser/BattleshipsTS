/// <reference path="../lodash.d.ts" />

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
}

export default Player;