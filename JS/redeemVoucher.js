function redeemVoucher() {

   
//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 20);
    //The ID's of the imputs in th form from 'signUp.html'

        var userID = sessionStorage.getItem("UserID");
        var voucherID = CurrentID;

    
    

    var json = JSON.stringify(voucherData);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:55825/Api/Vouchers/RedeemVoucher${userID}/${voucherID}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var redeem = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {            
            console.table(redeem);
            
        } else {
            console.error(redeem);
        }
    }
    xhr.send(json);

}