var request = new XMLHttpRequest();

request.open('GET', 'http://localhost:55825/Api/Events', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    //gets the 'div' element
    var eventList = document.getElementById('eventList');

    if (request.status >= 200 && request.status < 400) {
        data.forEach(events => {
            //makes a new 'a' tag for every event (like this: <a class="card" href="#"> </a>)
            const card = document.createElement('a');
            card.setAttribute('class', 'card');
            card.setAttribute('href', '#');

            var image = document.createElement('img');
            image.setAttribute('src', './img/shops/matas.jpg');
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
    } else {
        console.log('error');
    }
}

request.send();
