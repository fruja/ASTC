/*function Update() {
    //The ID's of the imputs in th form from 'signUp.html'
    var customer = {
        FName: document.querySelector('#fname').value,
        LName: document.querySelector('#lname').value,
        Email: document.querySelector('#email').value,
        Pass: document.querySelector('#pwd').value,
    }

    //Convert the email and password to JSON
    var json = JSON.stringify(customer);

    //Validation
    var fname = document.forms["registerForm"]["fname"].value;
    var lname = document.forms["registerForm"]["lname"].value;
    var email = document.forms["registerForm"]["email"].value;
    var pwd = document.forms["registerForm"]["pwd"].value;

    //Tell the user that something went wrong
    var text = document.getElementById("validationInfo");

    //check if the values are empty
    if (fname == "") {
        text.innerHTML = "First name must be filled out";
        return false;
    } else if (lname == "") {
        text.innerHTML = "Last name must be filled out";
        return false;
    } else if (email == "") {
        text.innerHTML = "Email must be filled out";
        return false;
    } else if (pwd == "") {
        text.innerHTML = "Password must be filled out";
        return false;
    } else {
        text.innerHTML = "Successfully Updated";
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:55825/Api/Customers/UpdateCustomer", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            sessionStorage.setItem("UserID", users);
            window.location.href = "./user.html";
            document.getElementById("registerForm").reset();
        } else {
            console.log("Update user error");
        }
    }
    xhr.send(json);

}*/

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

sendReq(`http://localhost:55825/Api/Customers/${CurrentID}`, function processResponse(response) {
    var getData = JSON.parse(response);

document.getElementById("fname").value = getData.Fname;
document.getElementById("lname").value = getData.Lname;
document.getElementById("email").value = getData.Email;
document.getElementById("pwd").value = getData.Pass;
});


//Updates User
function updateUser() {
    sendReq(`http://localhost:55825/Api/Customers/${CurrentID}`, function processResponse(response) {
    var getData = JSON.parse(response);

    // Update a user
    var data = {};
    data.ID = CurrentID;
    data.FName = document.querySelector('#fname').value;
    data.LName = document.querySelector('#lname').value;
    data.Email = document.querySelector('#email').value;
    data.Pass = document.querySelector('#pwd').value;
    data.Credit = getData.Credit;
    data.Barcode = getData.Barcode;

    //Validation
    var fname = document.forms["updateForm"]["fname"].value;
    var lname = document.forms["updateForm"]["lname"].value;
    var email = document.forms["updateForm"]["email"].value;
    var pwd = document.forms["updateForm"]["pwd"].value;

    //Tell the user that something went wrong
    var text = document.getElementById("validationInformation");

    //check if the values are empty
    if (fname == "") {
        text.innerHTML = "First name must be filled out";
        return false;
    } else if (lname == "") {
        text.innerHTML = "Last name must be filled out";
        return false;
    } else if (email == "") {
        text.innerHTML = "Email must be filled out";
        return false;
    } else if (pwd == "") {
        text.innerHTML = "Password must be filled out";
        return false;
    } else {
        text.innerHTML = "Successfully updated";
    }
    
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://localhost:55825/Api/Customers/${CurrentID}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {

        if (xhr.readyState == 4 && xhr.status == "204") {
            console.log("Success");
           // console.table(users);
        } else {
            console.log("Error");
           // console.error(users);
        }   
    }
    xhr.send(json);
});
}