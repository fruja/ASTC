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

sendReq("http://localhost:55825/Api/Events", function processResponse(response) {
    var eventList = document.getElementById('el');
    eventList.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(events => {
        //makes a new 'a' tag for every event (like this: <a class="card" href="#"> </a>)
        const card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('href', `./singleEvent.html`);
        card.setAttribute('onclick', getOneEvent(events.ID));
        //`event/${events.ID}`

        var image = document.createElement('img');
        image.setAttribute('src', events.EventImg);
        image.setAttribute('class', 'eventImg');

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

getOneEvent = (id) => {
    sendReq(`http://localhost:55825/Api/Events/${id}`, function processResponse(response) {
        document.getElementById("el1").innerHTML = "";
        document.getElementById("el1").innerHTML = response;
    });
}
