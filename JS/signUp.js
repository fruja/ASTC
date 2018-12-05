function Register() {
    var url = "http://localhost:55825/Api/Customers/CreateCustomerMember";

    //The ID's of the imputs in th form from 'signUp.html'
    var customer = {
        FName: document.querySelector('#fname').value,
        LName: document.querySelector('#lname').value,
        Email: document.querySelector('#email').value,
        Pass: document.querySelector('#pwd').value,
        Credit: 500
    }

    var json = JSON.stringify(customer);

    //Validation
    var fname = document.forms["registerForm"]["fname"].value;
    var lname = document.forms["registerForm"]["lname"].value;
    var email = document.forms["registerForm"]["email"].value;
    var pwd = document.forms["registerForm"]["pwd"].value;

    if (fname == "") {
        alert("First name must be filled out");
        return false;
    } else if (lname == "") {
        alert("Name must be filled out");
        return false;
    } else if (email == "") {
        alert("Email must be filled out");
        return false;
    } else if (pwd == "") {
        alert("Password must be filled out");
        return false;
    } else {
        console.log("Successfully registered");
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(users);
            window.location.href = "./user.html";
        } else {
            console.error(users);
        }
    }
    xhr.send(json);
}