async function fetchWeather() {
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "Here goes your API";

    if (searchInput == "") {
        weatherDataSection.innerHTML = `
        <div>
          <h2>Empty Input!</h2>
          <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `;
        return;
    }

    async function getLonAndLat() {
        const countryCode = 52; // Country Code Mex is 52
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);

        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        const data = await response.json();
        if (data.length == 0) {
            console.log("Something went wrong here.");
            weatherDataSection.innerHTML = `
            <div>
              <h2>Invalid Input: "${searchInput}"</h2>
              <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
            return;
        } else {
            return data[0];
        }

    }

    async function getWeatherData(lon, lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);

        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        const data = await response.json();
        weatherDataSection.style.display = "block";
        weatherDataSection.innerHTML = `
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
<div>
<h2>${data.name}</h2>
<p><strong>Temperature:</strong> ${Math.floor(data.main.temp - 273.15)}°C</p>
<p><strong>Max:</strong> ${Math.floor(data.main.temp_max - 273.15)}°C <strong>Min:</strong> ${Math.floor(data.main.temp_min - 273.15)}°C</p>
<p><strong>Description:</strong> ${data.weather[0].description}</p>
<p><strong>Humidity:</strong> ${data.main.humidity}%</p>
</div>
`;
    }

    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);

}

const search = document.getElementById('search');
search.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submit").click();
        let x = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        let y = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        const theColor = `linear-gradient(-20deg, ${x} 0%, ${y} 100%)`
        document.body.style.backgroundImage = theColor;
    }
});

const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("submit").click();
    let x = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    let y = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    const theColor = `linear-gradient(-20deg, ${x} 0%, ${y} 100%)`
    document.body.style.backgroundImage = theColor;
});

