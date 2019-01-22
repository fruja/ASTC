//The files to cache (all the files of the web app are added)
var filesToCache = [
  './events.html',
  './index.html',
  './map.html',
  './offers.html',
  './shops.html',
  './signUp.html',
  './singleEvent.html',
  './singleOffer.html',
  './singleShop.html',
  './singleVoucher.html',
  './updateUser.html',
  './user.html',
  './userLogin.html',
  './CSS/openingHours.css',
  './CSS/style.css',
  './img/astc_logo.png',
  './img/astc_logo_s.jpg',
  './img/astc_logo_white.png',
  './img/barcode.png/',
  './img/map.jpg',
  './img/events/gurli.jpg',
  './img/events/gurli2.jpg',
  './img/events/jul.png',
  './img/events/pyrus.jpg',
  './img/offers/offer1.jpg',
  './img/offers/offer2.jpg',
  './img/offers/offer3.jpg',
  './img/offers/offer4.png',
  './img/shops/3.jpg',
  './img/shops/bilka.jpg',
  './img/shops/bodyshop.jpg',
  './img/shops/br.jpg',
  './img/shops/hm.jpg',
  './img/shops/humac.jpg',
  './img/shops/matas.jpg',
  './img/shops/nameit.jpg',
  './img/shops/starbucks.jpg',
  './img/shops/sunset.jpg',
  './img/slider/Slider1.png',
  './img/slider/Slider1mobile.png',
  './img/slider/Slider2.png',
  './img/slider/Slider2mobile.png',
  './img/slider/Slider3.png',
  './img/slider/Slider3mobile.png',
  './img/vouchers/voucher01.jpg',
  './img/vouchers/voucher02.jpg',
  './img/vouchers/voucher03.png',
  './img/vouchers/voucher04.jpg',
  './JS/login.js',
  './JS/navbar.js',
  './JS/openingHours.js',
  './JS/reqEvents.js',
  './JS/reqOffers.js',
  './JS/reqShops.js',
  './JS/reqUsers.js',
  './JS/reqVoucher.js',
  './JS/signUp.js',
  './JS/updateCustomer.js'
]

//Create the cache with all the files above
//This does that the web app can work in an offline mode
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('sw-cache').then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
   
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });