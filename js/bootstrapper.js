//import Player from './playerState'
//import * as controller from './controller'
window.onload = init;
var player1 = new Player(1, 10, 5, 0);
var player2 = new Player(2, 10, 5, 0);
function init() {
    function cellClickHandler1(e) {
        var guess = e.target.id;
        controller.processGuess(player1, guess);
    }
    function cellClickHandler2(e) {
        var guess = e.target.id;
        controller.processGuess(player2, guess);
    }
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < (cells.length / 2); i++) {
        cells[i].onclick = cellClickHandler1;
    }
    for (var j = cells.length / 2; j < cells.length; j++) {
        cells[j].onclick = cellClickHandler2;
    }
    var table = document.getElementsByTagName("table");
    for (var i = 0; i < table.length; i++) {
        table[i].onclick = function () {
            var toggle = document.getElementById("messageAreaContainer");
            if (toggle.style.display === "none") {
                toggle.style.display = "";
            }
        };
    }
    var toggle = document.getElementById("messageAreaContainer").style.display = "none";
    player1.board.generateAllShipLocations(player1);
    player2.board.generateAllShipLocations(player2);
}
//# sourceMappingURL=bootstrapper.js.map