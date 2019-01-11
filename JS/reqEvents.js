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

    //convert the JSON data to JavaScript object
    var data = JSON.parse(response);

    data.forEach(events => {
        //makes a new 'a' tag for every event (like this: <a class="card" id="events.ID" href="#"> </a>)
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
        eventStart.textContent = "Event start: " + dateConvert(new Date(events.EventStart), "DD-MMM-YYYY HH:MM");

        //makes a new 'p' tag for the end time of the event
        var eventEnd = document.createElement('p');
        eventEnd.textContent = "Event end: " + dateConvert(new Date(events.EventEnd), "DD-MMM-YYYY HH:MM");

        //read more button
        var readMore = document.createElement('button');
        readMore.textContent = "Read more ";
        readMore.setAttribute('class', 'readMoreButton');


        //adds the 'a' tag to the 'eventList' div
        eventList.appendChild(card);

        //adds the information about the event in to the 'a' tag
        card.appendChild(image);
        card.appendChild(eventTitle);
        card.appendChild(eventStart);
        card.appendChild(eventEnd);
        card.appendChild(readMore);
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

    var eventTitle = document.createElement('h1');
    eventTitle.textContent = data.EventTitle;

    var eventDescription = document.createElement('p');
    eventDescription.textContent = data.EventDesc;

    var eventStart = document.createElement('p');
    eventStart.textContent = "Event starts at: " + dateConvert(new Date(data.EventStart), "DD-MMM-YYYY HH:MM");

    var eventEnd = document.createElement('p');
    eventEnd.textContent = "Event ends at: " + dateConvert(new Date(data.EventEnd), "DD-MMM-YYYY HH:MM");

    singleEventImg.appendChild(image);
    singleEvent.appendChild(eventTitle);
    singleEvent.appendChild(eventDescription);
    singleEvent.appendChild(eventStart);
    singleEvent.appendChild(eventEnd);
});

//Formats the SQL DATETIME to a much more readable format
function dateConvert(dateobj, format) {
    var year = dateobj.getFullYear();
    var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
    var date = ("0" + dateobj.getDate()).slice(-2);
    var hours = ("0" + dateobj.getHours()).slice(-2);
    var minutes = ("0" + dateobj.getMinutes()).slice(-2);
    var seconds = ("0" + dateobj.getSeconds()).slice(-2);
    var day = dateobj.getDay();
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var dates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var converted_date = "";

    switch (format) {
        case "YYYY-MM-DD":
            converted_date = year + "-" + month + "-" + date;
            break;
        case "DD-MMM-YYYY HH:MM":
            converted_date = date + " " + months[parseInt(month) - 1] + " " + year + " kl. " + hours + ":" + minutes;
            break;
    }
    return converted_date;
}