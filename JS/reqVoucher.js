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
    var text = document.getElementById("voucherInfo"); //The voucherInfo tells the user if he can't affort it
    var redeemBtn = document.getElementById("redeem"); //The redeem button

    //Finds the current ID of the URL (the voucherID)
    var pageURL = window.location.href;
    var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 20);

    //The ID of the user and the voucher
    var userID = sessionStorage.getItem("UserID");
    var voucherID = CurrentID;

    var json = JSON.stringify(userID + voucherID); //The information we want to send to the backend
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:55825/Api/Vouchers/RedeemVoucher/${userID}/${voucherID}`, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            redeemBtn.classList.add("voucherBtnSuccess"); //makes the button green

            var counter = 15; //count down from 15 seconds
            setInterval(function () {
                redeemBtn.textContent = "Voucher will expire in: " + counter + " seconds"; //changes the text on the button
                counter-- //decrease the number
                if (counter === 0) {
                    window.location.href = "./user.html"; //return to user page when the counter reaches 0
                }
            }, 1000); //execute the function every second
        } else {
            redeemBtn.classList.add("voucherBtnError"); //makes the button red
            text.innerHTML = "I'm affraid you can't afford this item"; //error text under button
            text.classList.add("voucherError"); //makes the error text red
        }
    }
    xhr.send(json);
}

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 20);

//GET single voucher by the current ID
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
    var deadline = new Date(data.VoucherEnd).getTime(); //this gives us milliseconds from midnight 1 january 1970 until the voucher expires
    var x = setInterval(function () {
        var now = new Date().getTime(); //this gives us milliseconds since midnight 1 january 1970 (standard)
        var t = deadline - now; //calculates how many milliseconds are between the two given times
        var days = Math.floor(t / (1000 * 60 * 60 * 24)); //'t' divided by the number of milliseconds in a day (1000 x 60 seconds x 60 minutes x 24 hours)
        var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);

        //adds the countdown to the 'p' tag
        validUntiltext.innerHTML = "Voucher expires in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s "
        validUntiltext.setAttribute('id', 'valid') //adds id=valid on the p-element

        //change the conutdown to "EXPIRED" when the voucher expires
        if (t < 0) {
            clearInterval(x); //stops the interval
            document.getElementById("valid").innerHTML = "EXPIRED"; //change the countdown to 'EXPIRED'
        }
    }, 1000); //update the time every second

    singleVoucherImg.appendChild(image);
    singleVoucher.appendChild(voucherTitle);
    singleVoucher.appendChild(voucherDescription);
    singleVoucher.appendChild(voucherPoints);
    singleVoucher.appendChild(validUntiltext);
});

