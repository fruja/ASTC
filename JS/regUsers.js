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

//Finds the current ID of the URL
// var pageURL = window.location.href;
var CurrentID = 1;

//GET single shop by the current ID
sendReq(`http://localhost:55825/Api/Customers/${CurrentID}`, function processResponse(response) {
    var singleUser = document.getElementById("singleUser");
    singleUser.innerHTML = "";
    var singleUserBarcode = document.getElementById("singleUserBarcode");
    singleUserBarcode.innerHTML = "";

    var data = JSON.parse(response);

    var image = document.createElement('img');
    image.setAttribute('src', data.Barcode);
    image.setAttribute('class', 'image');

    var UserName = document.createElement('h3');
    UserName.textContent = data.Fname;

    //Get offers for the specific shop
    /*var offerName = document.createElement('p');
    offerName.textContent = "Offers: " + data.Offer.ShopName;*/

    singleUserBarcode.appendChild(image);
    singleUser.appendChild(UserName);

});