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

    var data = JSON.parse(response);

    var UserName = document.createElement('p');
    UserName.textContent = 'Hej ' + data.Fname + '!';

    var Points = document.createElement('p');
    Points.textContent =  data.Credit + 'Points';

    //Get offers for the specific shop
    /*var offerName = document.createElement('p');
    offerName.textContent = "Offers: " + data.Offer.ShopName;*/

    singleUser.appendChild(UserName);
    singleUser.appendChild(Points);

});

sendReq(`http://localhost:55825/Api/Vouchers/`, function processResponse(response) {
    var voucherList = document.getElementById('singleUserVouchers');
    voucherList.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(vouchers => {
        //makes a new 'a' tag for every shop (like this: <a class="card" href="#"> </a>)
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', vouchers.ID);
        card.setAttribute('href', './singleVoucher.html#' + vouchers.ID)

        var listLogoContainer = document.createElement('div');
        listLogoContainer.setAttribute('class', 'listLogoContainer');
 
        //Small image of the shops logo on top of a offer
        var voucherLogo = document.createElement('img');
        voucherLogo.setAttribute('src', vouchers.Shop.ShopImg);
        voucherLogo.setAttribute('class', 'image');

        //makes a new 'img' tag for the image of the shop
        var image = document.createElement('img');
        image.setAttribute('src', vouchers.VoucherImg);
        image.setAttribute('alt', 'Billede af:' + vouchers.VoucherTitle);
        image.setAttribute('class', 'image')

                //makes a new 'h3' tag for the title of the offer
        var voucherTitle = document.createElement('h3');
        voucherTitle.textContent = vouchers.VoucherTitle;

        //makes a new 'p' tag for the description of the offer
        var voucherDescription = document.createElement('p');
        voucherDescription.textContent = vouchers.VoucherDesc;

        var validUntil = document.createElement('p');
        validUntil.textContent = "Valid until: " + vouchers.VoucherEnd;

        voucherList.appendChild(card);

        //adds the information about the offer in to the 'a' tag
        card.appendChild(listLogoContainer);
        listLogoContainer.appendChild(voucherLogo);
        card.appendChild(image);
        card.appendChild(voucherTitle);
        card.appendChild(voucherDescription);
        card.appendChild(validUntil);
    });

});