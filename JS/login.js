        function Login() {

            var email = document.querySelector('#email').value;
            var password = document.querySelector('#pwd').value;


            var json = JSON.stringify(email, password);

            //Validation
            var valEmail = document.forms["loginForm"]["email"].value;
            var valPwd = document.forms["loginForm"]["pwd"].value;
            var text = document.getElementById("validationInfo");

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
                console.log (userData)
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.log ('Success')
                    sessionStorage.setItem("UserID", userData);
                    //document.getElementById("tester").innerHTML = sessionStorage.getItem("UserID");
                    window.location.href = "./user.html";
                    text.innerHTML = "Succesfully login!";


                    document.getElementById("loginForm").reset();

                } else {
                    text.innerHTML = "Email or password is incorrect, please try again";
                }
            }
            xhr.send(json);
        
        }