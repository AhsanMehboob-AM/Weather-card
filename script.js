document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', getWeather);
});

const getWeather = async () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = "7fb67ad64f374b0a9b045815240409"; // New API key from WeatherAPI
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Update DOM with weather data
        document.getElementById('cityName').innerText = data.location.name;
        document.getElementById('temperature').innerText = `${data.current.temp_c}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity}%`;
        document.getElementById('windSpeed').innerText = `Wind: ${data.current.wind_kph} km/h`;

        // Map weather condition to local icon
        const condition = data.current.condition.text.toLowerCase();
        const iconMapping = {
            'clear': 'clear.png',
            'clouds': 'clouds.png',
            'drizzle': 'drizzle.png',
            'mist': 'mist.png',
            'rain': 'rain.png',
            'snow': 'snow.png'
        };

        // Use default icon if condition is not found
        const iconFile = iconMapping[condition] || 'clear.png';
        document.getElementById('weatherIcon').src = `/images/${iconFile}`;

        document.querySelector('.weather-info').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}
