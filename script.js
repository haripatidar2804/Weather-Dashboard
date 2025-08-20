 const API_KEY = 'e6acfada4ee4daef0b652b897b2139e7';

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = `<div class="alert alert-warning">Please enter a city name.</div>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    // conslole checking 
    console.log(response);
    const data = response.data;

    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    resultDiv.innerHTML = `
      <h4>${name}</h4>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p class="mb-1">🌡️ Temperature: <strong>${temp}°C</strong></p>
      <p class="mb-1">💧 Humidity: <strong>${humidity}%</strong></p>
      <p class="mb-1">🌬️ Wind Speed: <strong>${speed} m/s</strong></p>
      <p class="text-capitalize">📌 ${description}</p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<div class="alert alert-danger">City not found. Please try again.</div>`;
  }
}
