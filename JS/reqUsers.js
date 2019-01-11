//Start by checking if the user is logged in. If not, he gets the login page when clicking the user icon
if (sessionStorage.getItem("UserID") == null) {
    window.location.href = "./userLogin.html";
}

function logOut() {
    //Forget the user and redirect to the index page, if the user logges out
    sessionStorage.removeItem('UserID');
    window.location.href = "./index.html";
}


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

//Gets the ID of the user that is logged in
var CurrentID = sessionStorage.getItem("UserID");

//GET customer by the current ID
sendReq(`http://localhost:55825/Api/Customers/${CurrentID}`, function processResponse(response) {
    var singleUser = document.getElementById("singleUser");
    singleUser.innerHTML = "";

    var data = JSON.parse(response);

    var UserName = document.createElement('p');
    UserName.setAttribute('class', 'userName');
    UserName.textContent = 'Hey ' + data.Fname + '!'; //Welcome the user

    var Points = document.createElement('p');
    Points.setAttribute('class', 'userPoints animated zoomIn');
    Points.textContent = data.Credit + ' Points';

    singleUser.appendChild(UserName);
    singleUser.appendChild(Points);
});

function goToUpdate () {
    window.location.href = "./updateUser.html";
}


// DELETE USER
function deleteUser() {

    // Delete a user

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:55825/Api/Customers/${CurrentID}`, true);
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.log("Deleted");
            sessionStorage.removeItem('UserID');
            window.location.href = "./index.html";

        } else {
            console.log("Not Deleted");
        }
    }
    xhr.send(null);

}

//GET all vouchers
sendReq(`http://localhost:55825/Api/Vouchers/`, function processResponse(response) {
    var voucherList = document.getElementById('singleUserVouchers');
    voucherList.innerHTML = "";

    var data = JSON.parse(response);

    data.forEach(vouchers => {
        //makes a new 'a' tag for every voucher
        card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('id', vouchers.ID);
        card.setAttribute('href', './singleVoucher.html#' + vouchers.ID)

        //Makes a container for the logo of the shop, on top of a voucher
        var listLogoContainer = document.createElement('div');
        listLogoContainer.setAttribute('class', 'listLogoContainer');

        //Small image of the shops logo on top of a voucher
        var voucherLogo = document.createElement('img');
        voucherLogo.setAttribute('src', vouchers.Shop.ShopImg);
        voucherLogo.setAttribute('class', 'image');

        //makes a new 'img' tag for the image of the voucher
        var image = document.createElement('img');
        image.setAttribute('src', vouchers.VoucherImg);
        image.setAttribute('alt', 'Billede af:' + vouchers.VoucherTitle);
        image.setAttribute('class', 'image')

        //makes a new 'h3' tag for the title of the voucher
        var voucherTitle = document.createElement('h3');
        voucherTitle.textContent = vouchers.VoucherTitle;

        //makes a new 'p' tag for the description of the voucher
        var voucherDescription = document.createElement('p');
        voucherDescription.textContent = vouchers.VoucherDesc;

        //makes a new 'p' tag for the expiration on a voucher
        var validUntiltext = document.createElement('p');

        //Countdown to when the voucher expires
        var deadline = new Date(vouchers.VoucherEnd).getTime();
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

                //read more button
                var readMore = document.createElement('button');
                readMore.textContent = "Read more ";
                readMore.setAttribute('class', 'readMoreButton');

        listLogoContainer.appendChild(voucherLogo); //adds the logo to the logo container
        //adds the information about the voucher in to the 'a' tag
        card.appendChild(listLogoContainer);
        card.appendChild(image);
        card.appendChild(voucherTitle);
        card.appendChild(voucherDescription);
        card.appendChild(validUntiltext);
        voucherList.appendChild(card); //adds the cards to the list of vouchers
        card.appendChild(readMore);
    });
});