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

//GET all shops
sendReq("http://localhost:55825/Api/Shops", function processResponse(response) {
    var shopList = document.getElementById('shopList');
    shopList.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(shops => {
        //makes a new 'a' tag for every offer (like this: <a class="card" href="#"> </a>)
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', shops.ID);
        card.setAttribute('href', './singleshop.html#' + shops.ID)

        //makes a new 'img' tag for the image of the offer
        var image = document.createElement('img');
        image.setAttribute('src', shops.ShopImg);
        image.setAttribute('class', 'image');

        //adds the 'a' tag to the 'shopList' div
        shopList.appendChild(card);

        //adds the information about the offer in to the 'a' tag
        card.appendChild(image);
        card.appendChild(shopName);
    });
});

//Finds the current ID of the URL
/*var pageURL = window.location.href;
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

    var shopName = document.createElement('p');
    shopName.textContent = "Shop: " + data.Shop.ShopName;

    singleOffer.appendChild(offerTitle);
    singleOffer.appendChild(offerDescription);
    singleOffer.appendChild(shopName);
});*/