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
        //makes a new 'a' tag for every shop (like this: <a class="card" href="#"> </a>)
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', shops.ID);
        card.setAttribute('href', './singleShop.html#' + shops.ID);

        var p = document.createElement('p');
        p.textContent = 'Category: ' + shops.Cat.CategoryName;

        //makes a new 'img' tag for the image of the shop
        var image = document.createElement('img');
        image.setAttribute('src', shops.ShopImg);
        image.setAttribute('alt', shops.ShopName + ' logo');
        image.setAttribute('class', 'image')

        //adds the 'a' tag to the 'shopList' div
        shopList.appendChild(card);

        //adds the information about the shop in to the 'a' tag
        card.appendChild(image);
        card.appendChild(p);
    });
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 17);

//GET single shop by the current ID
sendReq(`http://localhost:55825/Api/Shops/${CurrentID}`, function processResponse(response) {
    var singleShop = document.getElementById("singleShop");
    singleShop.innerHTML = "";
    var singleShopImg = document.getElementById("singleShopImg");
    singleShopImg.innerHTML = "";

    var data = JSON.parse(response);

    var image = document.createElement('img');
    image.setAttribute('src', data.ShopImg);
    image.setAttribute('class', 'image');

    var shopTitle = document.createElement('h3');
    shopTitle.textContent = data.ShopName;

    var shopDescription = document.createElement('p');
    shopDescription.textContent = data.ShopDesc;

    var shopPhone = document.createElement('p');
    shopPhone.textContent = "Phone: " + data.ShopPhone;

    var shopWeb = document.createElement('p');
    shopWeb.textContent = "Webside: " + data.ShopWeb;

    singleShopImg.appendChild(image);
    singleShop.appendChild(shopTitle);
    singleShop.appendChild(shopDescription);
    singleShop.appendChild(shopPhone);
    singleShop.appendChild(shopWeb);
});

//GET offers from the specific shop
sendReq(`http://localhost:55825/Api/Offers/Shops/${CurrentID}`, function processResponse(response) {
    var offerFromShop = document.getElementById("offerFromShopID");
    offerFromShop.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(offers => {
        var header = document.createElement('h3');
        header.textContent = "Offers from " + offers.Shop.ShopName + ":";

        //makes a new 'a' tag for every offer (like this: <a class="card" href="#"> </a>)
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', offers.ID);
        card.setAttribute('href', './singleOffer.html#' + offers.ID)

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

        var validUntil = document.createElement('p');
        validUntil.textContent = "Valid until: " + offers.OfferEnd;

        //adds the 'a' tag to the 'offerFromShop' div
        offerFromShop.appendChild(header);
        offerFromShop.appendChild(card);

        //adds the information about the offer in to the 'a' tag
        card.appendChild(image);
        card.appendChild(offerTitle);
        card.appendChild(validUntil);
    });
});