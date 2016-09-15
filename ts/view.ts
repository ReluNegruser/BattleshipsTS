export default {

	displayMessage: function(title: string, msg: string, spanId: string) {
		document.getElementById("messageArea").innerHTML = `
            <h2>${title}</h2>
            <h3>
                <span id=${spanId}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                ${msg}
            </h3>`; //"<h2>"+ title + "</h2>" + "<h3><span id='" + spanId + "'>&nbsp;&nbsp;&nbsp;&nbsp;</span>"   + msg + "</h3>";
	},

	displayHit: function(location: string) {
		document.getElementById(location).setAttribute("class", "hit");
	},

    displayMiss: function(location: string) {
		document.getElementById(location).setAttribute("class", "miss");
	}
    
}
