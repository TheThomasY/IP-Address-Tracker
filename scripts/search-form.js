//  Search bar
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

// HTML to show results
const resultIP = document.getElementById('result-IP');
const resultLocal = document.getElementById('result-local');
const resultTimezone = document.getElementById('result-timezone');
const resultISP = document.getElementById('result-ISP');

// Functions
const formatIP = (strIP) => {
  const regexIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (regexIP.test(strIP)) {
    return true;
  } else {
    console.log('Invalid IP');
  }
};

// Map
const generateMap = (lat, lng) => {
  const mapOptions = {
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    scrollWheelZoom: false,
    attributionControl: false,
    dragging: false,
  };

  let map = L.map('map', mapOptions).setView([lat, lng], 13);

  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1Ijoid2hhdGF0b20iLCJhIjoiY2t1NzF6ajdyMW9xYTJwbzZsNmR0dHFmYiJ9.CJq2eJhMFv8Ob5yLHEBdow',
    }
  ).addTo(map);
};

window.addEventListener('load', () => {
  generateMap(51.509865, -0.118092);
});

const submitted = (event) => {
  event.preventDefault();
  let input = searchInput.value;

  if (formatIP(input)) {
    let apiURL = `https://geo.ipify.org/api/v1?apiKey=at_aaIVZI654NlCdUC3118MHLwSchGu9&ipAddress=${input}`;

    fetch(apiURL)
      .then((response) => {
        return response.json();
      })
      .then((dataCurrent) => {
        // console.log(dataCurrent);
        if (dataCurrent.hasOwnProperty('code')) {
          console.log('Invalid IP Address');
        } else {
          // Extract data
          const { isp } = dataCurrent;
          const { city, country, lat, lng, region, timezone } =
            dataCurrent.location;
          resultIP.innerHTML = input;
          resultLocal.innerHTML = city + ', ' + region;
          resultTimezone.innerHTML = timezone;
          resultISP.innerHTML = isp;

          generateMap(lat, lng);
        }
      });
  }
};

searchForm.addEventListener('submit', submitted);
