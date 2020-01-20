

window.addEventListener("load", () => {
    var long;
    var lat;
    var location = document.querySelector(".location-timezone");
    var degree = document.querySelector(".location-degree");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toPrecision(4);
            lat = position.coords.latitude.toPrecision(4);

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/81bd9bfc27e0a863848c0d003dda4468/${lat},${long}?units=si`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { temperature } = data.currently;

                    location.innerHTML = data.timezone;
                    degree.innerHTML = Math.round(temperature) + " °C";

                });

        })
    }
});