//Check if the URL you are trying to get is OK
function sendReq(url, callbackFunction) {
	var xmlhttp

	if (window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}

	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == '200') {
			if (callbackFunction) callbackFunction(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

//GET all shops
sendReq("http://localhost:55825/Api/Shops", function processResponse(response) {
	var shopList = document.getElementById('shopList');
	shopList.innerHTML = "";

	var data = JSON.parse(response);

	data.forEach(shops => {
		//makes a new 'a' tag for every shop)
		card = document.createElement('a');
		card.setAttribute('class', 'shopCard ' + shops.Cat.CategoryName + ' show');
		card.setAttribute('id', shops.ID);
		card.setAttribute('href', './singleShop.html#' + shops.ID);

		//makes a new 'img' tag for the image of the shop
		var image = document.createElement('img');
		image.setAttribute('src', shops.ShopImg);
		image.setAttribute('alt', shops.ShopName + ' logo');
		image.setAttribute('class', 'image')

		//adds the 'a' tag to the 'shopList' div
		shopList.appendChild(card);

		//adds the information about the shop in to the 'a' tag
		card.appendChild(image);
	});
});

//Finds the current ID of the URL
var pageURL = window.location.href;
var CurrentID = pageURL.substr(pageURL.lastIndexOf('/') + 17);

//GET single shop by the current ID
sendReq(`http://localhost:55825/Api/Shops/${CurrentID}`, function processResponse(response) {
	var singleShop = document.getElementById("singleShop");
	singleShop.innerHTML = "";
	var singleShopImg = document.getElementById("singleShopImg");
	singleShopImg.innerHTML = "";

	var data = JSON.parse(response);

	var image = document.createElement('img');
	image.setAttribute('src', data.ShopImg);
	image.setAttribute('class', 'image');
	image.setAttribute('alt', 'Image of: ' + data.ShopName + ' logo');

	var shopTitle = document.createElement('h1');
	shopTitle.textContent = data.ShopName;

	var shopDescription = document.createElement('p');
	shopDescription.textContent = data.ShopDesc;

	var shopPhone = document.createElement('p');
	shopPhone.textContent = "Phone: " + data.ShopPhone;

	var shopWeb = document.createElement('p');
	shopWeb.textContent = "Webside: " + data.ShopWeb;

	singleShopImg.appendChild(image);
	singleShop.appendChild(shopTitle);
	singleShop.appendChild(shopDescription);
	singleShop.appendChild(shopPhone);
	singleShop.appendChild(shopWeb);
});

//GET offers from a specific shop
sendReq(`http://localhost:55825/Api/Offers/Shops/${CurrentID}`, function processResponse(response) {
	var offerFromShop = document.getElementById("offerFromShopID");
	offerFromShop.innerHTML = "";

	var data = JSON.parse(response);

	var offersFromShopHeader = document.createElement('h2');
	offersFromShopHeader.textContent = "Offers from shop:";
	offerFromShop.appendChild(offersFromShopHeader);

	data.forEach(offers => {
		//makes a new 'a' tag for every offer (like this: <a class="card" href="#"> </a>)
		card = document.createElement('a');
		card.setAttribute('class', 'card');
		card.setAttribute('id', offers.ID);
		card.setAttribute('href', './singleOffer.html#' + offers.ID)

		//Small image of the shops logo on top of a offer
		var offerLogo = document.createElement('img');
		offerLogo.setAttribute('src', offers.Shop.ShopImg);
		offerLogo.setAttribute('class', 'image');

		//makes a new 'img' tag for the image of the offer
		var image = document.createElement('img');
		image.setAttribute('src', offers.OfferImg);
		image.setAttribute('alt', 'Image of: ' + offers.OfferTitle);
		image.setAttribute('class', 'image');

		//makes a new 'h3' tag for the title of the offer
		var offerTitle = document.createElement('h3');
		offerTitle.textContent = offers.OfferTitle;

		//makes a new 'p' tag for the expiration date of the offer
		var validUntil = document.createElement('p');
		validUntil.textContent = "Valid until: " + dateConvert(new Date(offers.OfferEnd), "DD-MMM-YYYY HH:MM");

		//adds the header and the card to the 'offerFromShop' div
		offerFromShop.appendChild(card);

		//adds the information about the offer in to the 'a' tag
		card.appendChild(image);
		card.appendChild(offerTitle);
		card.appendChild(validUntil);
	});
});


//Filter shops by category
filterSelection("all") //Start by showing all shops
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("shopCard"); //get all the cards
	if (c == "all") c = ""; //Clear the filter, so that every shop is shown
	// Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
	for (i = 0; i < x.length; i++) {
		removeClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
	}
}

// Show filtered elements
function addClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" "); //Splits the string of class names into an array of substrings (e.g. shopCard,show)
	arr2 = name.split(" "); //Split the string of name into an array of substrings (e.g. show)
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) { //indexOf() searches the array for an element and returns its position
			element.className += " " + arr2[i]; //add a new class and keep the existing class
		}
	}
}

// Hide elements that are not selected
function removeClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" "); //Splits the string of class names into an array of substrings (e.g. shopCard,show)
	arr2 = name.split(" "); //Split the string of name into an array of substrings (e.g. show)
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) { //indexOf() searches the array for an element and returns its position
			arr1.splice(arr1.indexOf(arr2[i]), 1); //at position arr1.indexOf(arr2[i]) remove one item
		}
	}
	element.className = arr1.join(" ");
}

//Formats the SQL DATETIME to a much more readable format
function dateConvert(dateobj, format) {
    var year = dateobj.getFullYear();
    var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
    var date = ("0" + dateobj.getDate()).slice(-2);
    var hours = ("0" + dateobj.getHours()).slice(-2);
    var minutes = ("0" + dateobj.getMinutes()).slice(-2);
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var converted_date = "";

    switch (format) {
        case "YYYY-MM-DD":
            converted_date = year + "-" + month + "-" + date;
            break;
        case "DD-MMM-YYYY HH:MM":
            converted_date = date + " " + months[parseInt(month) - 1] + " " + year + " kl. " + hours + ":" + minutes;
            break;
    }
    return converted_date;
}