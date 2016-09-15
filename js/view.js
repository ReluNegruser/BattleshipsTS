"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    displayMessage: function (title, msg, spanId) {
        document.getElementById("messageArea").innerHTML = "\n            <h2>" + title + "</h2>\n            <h3>\n                <span id=" + spanId + ">&nbsp;&nbsp;&nbsp;&nbsp;</span>\n                " + msg + "\n            </h3>"; //"<h2>"+ title + "</h2>" + "<h3><span id='" + spanId + "'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"   + msg + "</h3>";
    },
    displayHit: function (location) {
        document.getElementById(location).setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        document.getElementById(location).setAttribute("class", "miss");
    }
};
//# sourceMappingURL=view.js.map