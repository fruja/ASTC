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
        //card.setAttribute('href', `./singleEvent.html`);
        card.setAttribute('href', post(`./singleEvent.html`, events.EventTitle, 'POST'));
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

/**
* sends a request to the specified url from a form. this will change the window location.
* @param {string} path the path to send the post request to
* @param {object} params the paramiters to add to the url
* @param {string} [method=post] the method to use on the form
*/

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
    console.log('sdg');
}

getOneEvent = (id) => {
    sendReq(`http://localhost:55825/Api/Events/${id}`, function processResponse(response) {
        document.getElementById("el1").innerHTML = "";
        document.getElementById("el1").innerHTML = response;
    });
}
