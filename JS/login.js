
/*Here is a complete solution with application-json:

// Input values will be grabbed by ID
<input id="loginEmail" type="text" name="email" placeholder="Email">
<input id="loginPassword" type="password" name="password" placeholder="Password">

// return stops normal action and runs login()
<button onclick="return login()">Submit</button>

<script>*/

function login() {
    // Form fields, see IDs above
    const params = {
        email: document.querySelector('#loginEmail').value,
        password: document.querySelector('#loginPassword').value
    }

    const http = new XMLHttpRequest()
    http.open('POST', '/login')
    http.setRequestHeader('Content-type', 'application/json')
    http.send(JSON.stringify(params)) // Make sure to stringify
    http.onload = function () {
        // Do whatever with response
        alert(http.responseText)
    }
}

//</script>