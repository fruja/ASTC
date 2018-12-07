function Login() {
    //Get the value from the email and password input
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#pwd').value;

    //Convert the email and password to JSON
    var json = JSON.stringify(email, password);

    //Validate email and password
    var valEmail = document.forms["loginForm"]["email"].value;
    var valPwd = document.forms["loginForm"]["pwd"].value;

    //Tell the user the validation infotmation
    var text = document.getElementById("validationInfo");

    //check if the values are empty
    if (valEmail == "") {
        text.innerHTML = "Email must be filled out";
        return false;
    } else if (valPwd == "") {
        text.innerHTML = "Password must be filled out";
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:55825/api/Customers/LoginCheck/${email}/${password}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var userData = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            sessionStorage.setItem("UserID", userData); //Gets the data of the person who logged in (ID)
            window.location.href = "./user.html"; //Sends the user to the user page

            text.innerHTML = "Succesfully login!";
            document.getElementById("loginForm").reset(); //reset the inputs

        } else {
            text.innerHTML = "Email or password is incorrect, please try again";
        }
    }
    xhr.send(json);
}