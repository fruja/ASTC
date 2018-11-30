var now = new Date();
var weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

var checkTime = function () {
    var today = weekday[now.getDay()-1];
    var timeDiv = document.getElementById('timeDiv');
    var dayOfWeek = now.getDay();
    var hour = now.getHours();
    var minutes = now.getMinutes();

    // add 0 to one digit minutes
    if (minutes < 10) {
        minutes = "0" + minutes
    };

    if ((dayOfWeek == 0 || dayOfWeek == 1 || dayOfWeek == 2 || dayOfWeek == 3 || dayOfWeek == 4 || dayOfWeek == 5) && hour >= 10 && hour <= 19) {
        timeDiv.innerHTML = 'it\'s ' + today + ' ' + hour + ':' + minutes + ' - we\'re open!';
        timeDiv.className = 'open';
    }

    else if ((dayOfWeek == 6) && hour >= 10 && hour <= 17) {
        timeDiv.innerHTML = 'it\'s ' + today + ' ' + hour + ':' + minutes + ' - we\'re open!';
        timeDiv.className = 'open';
    }

    else {
        timeDiv.innerHTML = 'It\'s ' + today + ' ' + hour + ':' + minutes + ' - we\'re closed!';
        timeDiv.className = 'closed';
    }
};

var currentDay = weekday[now.getDay()-1];
var currentDayID = currentDay; //gets todays weekday and turns it into id
document.getElementById(currentDayID).classList.toggle("today"); //hightlights today in the view hours modal popup

setInterval(checkTime, 1000);
checkTime();