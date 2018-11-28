//Check if the URL you are trying to get is OK
function sendReq(url, callbackFunction) {
    var xmlhttp

    if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == '200') {
            if (callbackFunction) callbackFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//GET all events
sendReq("http://localhost:55825/Api/Events", function processResponse(response) {
    var eventList = document.getElementById('eventList');
    eventList.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(events => {
        //makes a new 'a' tag for every event (like this: <a class="card" href="#"> </a>)
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', events.ID);
        card.setAttribute('href', './singleEvent.html#' + events.ID)

        //makes a new 'img' tag for the image of the event
        var image = document.createElement('img');
        image.setAttribute('src', events.EventImg);
        image.setAttribute('class', 'image');

        //makes a new 'h3' tag for the title of the event
        var eventTitle = document.createElement('h3');
        eventTitle.textContent = events.EventTitle;

        //makes a new 'p' tag for the description of the event
        var eventDescription = document.createElement('p');
        eventDescription.textContent = events.EventDesc;

        //adds the 'a' tag to the 'eventList' div
        eventList.appendChild(card);

        //adds the information about the event in to the 'a' tag
        card.appendChild(image);
        card.appendChild(eventTitle);
        card.appendChild(eventDescription);
    });
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 18);

//GET single event by the current ID
sendReq(`http://localhost:55825/Api/Events/${CurrentID}`, function processResponse(response) {
    var singleEvent = document.getElementById("singleEvent");
    singleEvent.innerHTML = "";

    var data = JSON.parse(response);

    var eventTitle = document.createElement('h3');
    eventTitle.textContent = data.EventTitle;

    var eventDescription = document.createElement('p');
    eventDescription.textContent = data.EventDesc;

    singleEvent.appendChild(eventTitle);
    singleEvent.appendChild(eventDescription);
});