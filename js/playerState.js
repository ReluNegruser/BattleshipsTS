/// <reference path="../lodash.d.ts" />
"use strict";
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
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=playerState.js.map