"use strict";
function displayMessage(title, msg, spanId) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = "<h2> " + title + " </h2> <h3><span id = " + spanId + ">&nbsp;&nbsp;&nbsp;&nbsp;</span> " + msg + " </h3>";
}
exports.displayMessage = displayMessage;
function displayHit(location) {
    //var cell = document.getElementById(location);
    document.getElementById(location).setAttribute("class", "hit");
}
exports.displayHit = displayHit;
function displayMiss(location) {
    //var cell = document.getElementById(location);
    document.getElementById(location).setAttribute("class", "miss");
}
exports.displayMiss = displayMiss;
//# sourceMappingURL=view.js.map