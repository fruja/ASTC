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
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 20);

//GET single event by the current ID
sendReq(`http://localhost:55825/Api/Vouchers/${CurrentID}`, function processResponse(response) {
    var singleVoucher = document.getElementById("singleVoucher");
    singleVoucher.innerHTML = "";
    var singleVoucherImg = document.getElementById("singleVoucherImg");
    singleVoucherImg.innerHTML = "";

    var data = JSON.parse(response);

    var image = document.createElement('img');
    image.setAttribute('src', data.VoucherImg);
    image.setAttribute('class', 'image');

    var voucherTitle = document.createElement('h3');
    voucherTitle.textContent = data.VoucherTitle;

    var voucherDescription = document.createElement('p');
    voucherDescription.textContent = data.VoucherDesc;

    var voucherPoints = document.createElement('p');
    voucherPoints.textContent = "Points: " + data.VoucherCredit + "p";

    var validUntil = document.createElement('p');
    validUntil.textContent = "Valid until: " + data.VoucherEnd;
 
    var redeemVoucher = document.createElement('button');
    redeemVoucher.textContent = "Buy";
    redeemVoucher.setAttribute('id', data.VoucherID);
    redeemVoucher.setAttribute('onclick', redeemVoucher());


    singleVoucherImg.appendChild(image);
    singleVoucher.appendChild(voucherTitle);
    singleVoucher.appendChild(voucherDescription);
    singleVoucher.appendChild(voucherPoints);
    singleVoucher.appendChild(validUntil);
    singleVoucher.appendChild(redeemVoucher);
});