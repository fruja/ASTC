function Register() {
    //The ID's of the imputs in th form from 'signUp.html'
    var customer = {
        FName: document.querySelector('#fname').value,
        LName: document.querySelector('#lname').value,
        Email: document.querySelector('#email').value,
        Pass: document.querySelector('#pwd').value,
        Credit: 500
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
        text.innerHTML = "Successfully registered";
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:55825/Api/Customers/CreateCustomerMember", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            sessionStorage.setItem("UserID", users); //Gets the data of the person who signed up (ID)
            window.location.href = "./user.html"; //Sends the user to the user page
            document.getElementById("registerForm").reset(); //reset the inputs
        } else {
            console.log("Sign up error");
        }
    }
    xhr.send(json);
}