/* Toggle between adding and removing the "responsive" class (the menu icon) to topnav when the user clicks on the icon */
function navbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}