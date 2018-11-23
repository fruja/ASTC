/*var request = new XMLHttpRequest();

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      console.log(movie.title);
    });
  } else {
    console.log('error');
  }
}

request.send();

const app = document.getElementById('root');*/




const app = document.getElementById('root');

/*const logo = document.createElement('img');
logo.src = 'logo.png';*/

const container = document.createElement('div');
container.setAttribute('class', 'container');

/*app.appendChild(logo);*/
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:55825/Api/Events', true);

request.setRequestHeader('Access-Control-Allow-Headers', '*');
request.setRequestHeader('Content-type', 'application/json');
request.setRequestHeader('Access-Control-Allow-Origin', '*');
request.setRequestHeader('Access-Control-Allow-Methods', '*');
request.setRequestHeader('Access-Control-Allow-Credentials', '*');
console.log('ok'); 

request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(event => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = event.EventTitle;

      const p = document.createElement('p');
      event.EventDesc = event.EventDesc.substring(0, 300);
      p.textContent = `${event.EventDesc}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();