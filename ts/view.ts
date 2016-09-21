function displayMessage(title: string, msg: string, spanId?: string) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML =  `<h2> ${title} </h2> <h3><span id = ${spanId}>&nbsp;&nbsp;&nbsp;&nbsp;</span> ${msg} </h3>`;
}

function displayHit(location: string) {
    //var cell = document.getElementById(location);
    document.getElementById(location).setAttribute("class", "hit");
}

function displayMiss(location: string) {
    //var cell = document.getElementById(location);
    document.getElementById(location).setAttribute("class", "miss");
}

export { displayMessage, displayHit, displayMiss }
