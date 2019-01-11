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

function redeemVoucher() {

    //Tell the user the success or error message
    var text = document.getElementById("voucherInfo");
    var redeemBtn = document.getElementById("redeem");
    //Finds the current ID of the URL
    var pageURL = window.location.href;
    var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 20);

    //The ID of the user and the voucher
    var userID = sessionStorage.getItem("UserID");
    var voucherID = CurrentID;

    var json = JSON.stringify(userID + voucherID);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:55825/Api/Vouchers/RedeemVoucher/${userID}/${voucherID}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            text.classList.add("voucherSuccess");
            redeemBtn.classList.add("voucherBtnSuccess");

            setInterval(1000)
            var counter = 15;
            setInterval(function(){
            redeemBtn.textContent = "Voucher will expire in: " + counter + " seconds";
            counter--
            if (counter === 0) {
            window.location.href = "./user.html";
             }
            }, 1000);
        } else {
            text.classList.add("voucherError");

            text.innerHTML = "I'm affraid you can't afford this item";
            redeemBtn.classList.add("voucherBtnError");

        }
    }
    xhr.send(json);
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
    image.setAttribute('alt', 'Image of: ' + data.VoucherTitle);

    var voucherTitle = document.createElement('h1');
    voucherTitle.textContent = data.VoucherTitle;

    var voucherDescription = document.createElement('p');
    voucherDescription.textContent = data.VoucherDesc;

    var voucherPoints = document.createElement('p');
    voucherPoints.textContent = "Points: " + data.VoucherCredit + "p";

        //makes a new 'p' tag for the expiration on a voucher
        var validUntiltext = document.createElement('p');

        //Countdown to when the voucher expires
        var deadline = new Date(data.VoucherEnd).getTime();
        var x = setInterval(function () {
            var now = new Date().getTime();
            var t = deadline - now;
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((t % (1000 * 60)) / 1000);

            //adds the countdown to the 'p' tag
            validUntiltext.innerHTML = "Voucher expires in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s "
            validUntiltext.setAttribute('id', 'valid')

            //change the conutdown to "EXPIRED" when the voucher expires
            if (t < 0) {
                clearInterval(x);
                document.getElementById("valid").innerHTML = "EXPIRED";
            }
        }, 1000); //update the time every second
    

    singleVoucherImg.appendChild(image);
    singleVoucher.appendChild(voucherTitle);
    singleVoucher.appendChild(voucherDescription);
    singleVoucher.appendChild(voucherPoints);
    singleVoucher.appendChild(validUntiltext);
});

