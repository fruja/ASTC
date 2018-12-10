var now = new Date();
var weekday = new Array(7); // make an array of the weekdays
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

var checkTime = function () {
    var today = weekday[now.getDay()-1]; // -1 because getDay starts with sunday, and we want monday to be the first day
    var timeDiv = document.getElementById('timeDiv');
    var dayOfWeek = now.getDay();
    var hour = now.getHours();
    var minutes = now.getMinutes();

    // add 0 to one digit minutes
    if (minutes < 10) {
        minutes = "0" + minutes
    };

    // open from 10 - 19 monday to friday. Tell the user that it's open in that time space
    if ((dayOfWeek == 0 || dayOfWeek == 1 || dayOfWeek == 2 || dayOfWeek == 3 || dayOfWeek == 4) && hour >= 10 && hour <= 19) {
        timeDiv.innerHTML = 'it\'s ' + today + ' ' + hour + ':' + minutes + ' - we\'re open!';
        timeDiv.className = 'open';
    }

    // open from 10 - 17 saturday and sunday. Tell the user that it's open in that time space
    else if ((dayOfWeek == 5 || dayOfWeek == 6) && hour >= 10 && hour <= 17) {
        timeDiv.innerHTML = 'it\'s ' + today + ' ' + hour + ':' + minutes + ' - we\'re open!';
        timeDiv.className = 'open';
    }

    // inform the user that ASTC is closed
    else {
        timeDiv.innerHTML = 'It\'s ' + today + ' ' + hour + ':' + minutes + ' - we\'re closed!';
        timeDiv.className = 'closed';
    }
};

var currentDay = weekday[now.getDay()-1];
var currentDayID = currentDay; //gets todays weekday and turns it into id
document.getElementById(currentDayID).classList.toggle("today"); //hightlights today in the 'view hours modal'

setInterval(checkTime, 1000); // check the time every second
checkTime();