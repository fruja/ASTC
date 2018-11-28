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

//GET all offers
sendReq("http://localhost:55825/Api/Offers", function processResponse(response) {
    var offerList = document.getElementById('offerList');
    offerList.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(offers => {
        //makes a new 'a' tag for every offer (like this: <a class="card" href="#"> </a>)
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', offers.ID);
        card.setAttribute('href', './singleOffer.html#' + offers.ID)

        //makes a new 'img' tag for the image of the offer
        var image = document.createElement('img');
        image.setAttribute('src', offers.OfferImg);
        image.setAttribute('class', 'offerImg');

        //makes a new 'h3' tag for the title of the offer
        var offerTitle = document.createElement('h3');
        offerTitle.textContent = offers.OfferTitle;

        //makes a new 'p' tag for the description of the offer
        var offerDescription = document.createElement('p');
        offerDescription.textContent = offers.OfferDesc;

        //adds the 'a' tag to the 'offerList' div
        offerList.appendChild(card);
        
        //adds the information about the offer in to the 'a' tag
        card.appendChild(image);
        card.appendChild(offerTitle);
        card.appendChild(offerDescription);
    });
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 18);

//GET single offer by the current ID
sendReq(`http://localhost:55825/Api/Offers/${CurrentID}`, function processResponse(response) {
    var singleOffer = document.getElementById("singleOffer");
    singleOffer.innerHTML = "";

    var data = JSON.parse(response);

    var offerTitle = document.createElement('h3');
    offerTitle.textContent = data.OfferTitle;

    var offerDescription = document.createElement('p');
    offerDescription.textContent = data.OfferDesc;

    singleOffer.appendChild(offerTitle);
    singleOffer.appendChild(offerDescription);
});