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
        }
      });
  }
};

searchForm.addEventListener('submit', submitted);
