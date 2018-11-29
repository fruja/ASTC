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
        card.setAttribute('href', './singleShop.html#' + shops.ID)

        //makes a new 'img' tag for the image of the shop
        var image = document.createElement('img');
        image.setAttribute('src', shops.ShopImg);
        image.setAttribute('alt', shops.ShopName + ' logo');
        image.setAttribute('class', 'image')

        //adds the 'a' tag to the 'shopList' div
        shopList.appendChild(card);

        //adds the information about the shop in to the 'a' tag
        card.appendChild(image);
    });
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 17);

//GET single shop by the current ID
sendReq(`http://localhost:55825/Api/Shops/${CurrentID}`, function processResponse(response) {
    var singleShop = document.getElementById("singleShop");
    singleShop.innerHTML = "";

    var data = JSON.parse(response);

    var shopTitle = document.createElement('h3');
    shopTitle.textContent = data.ShopName;

    var shopDescription = document.createElement('p');
    shopDescription.textContent = data.ShopDesc;

    //Get offers for the specific shop
    /*var offerName = document.createElement('p');
    offerName.textContent = "Offers: " + data.Offer.ShopName;*/

    singleShop.appendChild(shopTitle);
    singleShop.appendChild(shopDescription);
    //singleShop.appendChild(offerName);
});