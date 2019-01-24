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
        //makes a new 'a' tag for every offer
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', offers.ID);
        card.setAttribute('href', './singleOffer.html#' + offers.ID)

        var offerLogoContainer = document.createElement('div');
        offerLogoContainer.setAttribute('class', 'listLogoContainer');

        //Small image of the shops logo on top of a offer
        var offerLogo = document.createElement('img');
        offerLogo.setAttribute('src', offers.Shop.ShopImg);
        offerLogo.setAttribute('class', 'image');

        //makes a new 'img' tag for the image of the offer
        var image = document.createElement('img');
        image.setAttribute('src', offers.OfferImg);
        image.setAttribute('alt', 'Image of: ' + offers.OfferTitle);
        image.setAttribute('class', 'image');

        //makes a new 'h3' tag for the title of the offer
        var offerTitle = document.createElement('h3');
        offerTitle.textContent = offers.OfferTitle;

        //makes a new 'p' tag for the expiration of the offer
        var validUntil = document.createElement('p');
        validUntil.textContent = "Valid until: " + dateConvert(new Date(offers.OfferEnd), "DD-MMM-YYYY HH:MM");
        
        //read more button
        var readMore = document.createElement('button');
        readMore.textContent = "Read more ";
        readMore.setAttribute('class', 'readMoreButton');

        offerLogoContainer.appendChild(offerLogo); //adds the logo to the logo container
        //adds the information about the offer in to the 'a' tag
        card.appendChild(offerLogoContainer);
        card.appendChild(image);
        card.appendChild(offerTitle);
        card.appendChild(validUntil);
        card.appendChild(readMore);
        offerList.appendChild(card); //adds the cards to the list of offers
    });
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 18);

//GET single offer by the current ID
sendReq(`http://localhost:55825/Api/Offers/${CurrentID}`, function processResponse(response) {
    var singleOffer = document.getElementById("singleOffer");
    singleOffer.innerHTML = "";
    var singleOfferImg = document.getElementById("singleOfferImg");
    singleOfferImg.innerHTML = "";

    var data = JSON.parse(response);

    var image = document.createElement('img');
    image.setAttribute('src', data.OfferImg);
    image.setAttribute('class', 'image');
    image.setAttribute('alt', 'Image of: ' + data.OfferTitle);

    var offerTitle = document.createElement('h1');
    offerTitle.textContent = data.OfferTitle;

    var offerDescription = document.createElement('p');
    offerDescription.textContent = data.OfferDesc;

    var offerEnds = document.createElement('p');
    offerEnds.textContent = "Valid until: " + dateConvert(new Date(data.OfferEnd), "DD-MMM-YYYY HH:MM");

    var shopName = document.createElement('p');
    shopName.textContent = "Shop: " + data.Shop.ShopName;

    singleOfferImg.appendChild(image);
    singleOffer.appendChild(offerTitle);
    singleOffer.appendChild(offerDescription);
    singleOffer.appendChild(offerEnds);
    singleOffer.appendChild(shopName);
});

//Formats the SQL DATETIME to a much more readable format
function dateConvert(dateobj, format) {
    var year = dateobj.getFullYear();
    var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
    var date = ("0" + dateobj.getDate()).slice(-2);
    var hours = ("0" + dateobj.getHours()).slice(-2);
    var minutes = ("0" + dateobj.getMinutes()).slice(-2);
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
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