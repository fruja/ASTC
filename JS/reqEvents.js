function sendReq(url, callbackFunction) {
    var xmlhttp

    //ActiveXObject is for Internet Explorer only
    if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //If any other browser is used, use XMLHttpRequest
    else if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }

    //4 means that the operation is complete and 200 means that the request was successfull
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
    //get the eventList element from events.html
    var eventList = document.getElementById('eventList');
    eventList.innerHTML = "";

    //convert the JSON data to a JavaScript object
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
        image.setAttribute('alt', 'Image of: ' + events.EventTitle);
        image.setAttribute('class', 'image');

        //makes a new 'h3' tag for the title of the event
        var eventTitle = document.createElement('h3');
        eventTitle.textContent = events.EventTitle;

        //makes a new 'p' tag for the start time of the event
        var eventStart = document.createElement('p');
        eventStart.textContent = "Event start: " + events.EventStart;

        //makes a new 'p' tag for the end time of the event
        var eventEnd = document.createElement('p');
        eventEnd.textContent = "Event end: " + events.EventEnd;

        //adds the 'a' tag to the 'eventList' div
        eventList.appendChild(card);

        //adds the information about the event in to the 'a' tag
        card.appendChild(image);
        card.appendChild(eventTitle);
        card.appendChild(eventStart);
        card.appendChild(eventEnd);
    });
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 18);

//GET single event by the current ID
sendReq(`http://localhost:55825/Api/Events/${CurrentID}`, function processResponse(response) {
    var singleEvent = document.getElementById("singleEvent");
    singleEvent.innerHTML = "";
    var singleEventImg = document.getElementById("singleEventImg");
    singleEventImg.innerHTML = "";

    var data = JSON.parse(response);

    var image = document.createElement('img');
    image.setAttribute('src', data.EventImg);
    image.setAttribute('class', 'image');
    image.setAttribute('alt', 'Image of: ' + data.EventTitle);

    var eventTitle = document.createElement('h3');
    eventTitle.textContent = data.EventTitle;

    var eventDescription = document.createElement('p');
    eventDescription.textContent = data.EventDesc;

    var eventStart = document.createElement('p');
    eventStart.textContent = "Event starts at: " + data.EventStart;

    var eventEnd = document.createElement('p');
    eventEnd.textContent = "Event ends at: " + data.EventEnd;

    singleEventImg.appendChild(image);
    singleEvent.appendChild(eventTitle);
    singleEvent.appendChild(eventDescription);
    singleEvent.appendChild(eventStart);
    singleEvent.appendChild(eventEnd);
});

