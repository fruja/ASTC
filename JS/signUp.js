function Register() {

    //The ID's of the imputs in th form from 'signUp.html'
    const customer = {
        FName: document.querySelector('#fname').value,
        LName: document.querySelector('#lname').value,
        Email: document.querySelector('#email').value,
        Pass: document.querySelector('#pwd').value
    }

    const http = new XMLHttpRequest()
    http.open('POST', 'http://localhost:55825/Api/Customers/CreateCustomerMember', true)
    http.setRequestHeader('Content-type', 'application/json')
    http.send(JSON.stringify(customer)) // Make sure to stringify
}

//Validate the input data
function validateForm() {
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
}