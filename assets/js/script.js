window.addEventListener("load", () => {

    // User's location
    var long;
    var lat;

    // Current day statistics
    var location = document.querySelector(".location-timezone");
    var degree = document.querySelector(".location-degree");
    var rainProbability = document.querySelector(".rain-probability")
    var humidityLevel = document.querySelector(".humidity")
    var pressureLevel = document.querySelector(".pressure")
    var windSpeedLevel = document.querySelector(".wind-speed")
    var uvIndexLevel = document.querySelector(".uv-index")

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toPrecision(4);
            lat = position.coords.latitude.toPrecision(4);

            // Proxy notice    
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/81bd9bfc27e0a863848c0d003dda4468/${lat},${long}?units=si`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { temperature,
                        apparentTemperature,
                        precipProbability,
                        humidity,
                        pressure,
                        windSpeed,
                        uvIndex } = data.currently;

                    location.innerHTML = data.timezone;
                    degree.innerHTML = "Temperature: " + Math.round(temperature) + " °C // Real feel: " + Math.round(apparentTemperature) + " °C";
                    rainProbability.innerHTML = "Chance of rain: " + (precipProbability) * 100 + " %";
                    humidityLevel.innerHTML = "Humidity: " + (humidity) * 100 + "%";
                    pressureLevel.innerHTML = "Pressure: " + pressure + " kPa";
                    windSpeedLevel.innerHTML = "Wind speed: " + windSpeed + " km/h";
                    uvIndexLevel.innerHTML = "UV index: " + uvIndex;

                    // This section creates for next 6days forecast (Total of 7days)
                    for (i = 0; i < 6; i++) {
                        const { summary,
                            temperatureHigh,
                            temperatureLow } = data.daily.data[i];

                        console.log(data.daily.data[i])

                        var div = document.createElement("div");
                        div.setAttribute('id' , id=["newday" + i] )
                        div.setAttribute('class', 'col-2 new-day');
                        div.innerText = summary + " Temperature <br> Max: " + Math.round(temperatureHigh) + "  °C <br> Min: " + Math.round(temperatureLow) + " °C";
                        document.getElementById("nextday").appendChild(div);
                            
                    };
                });

        })
    } else {
        console.log("Geolocation denied!")
    }
});