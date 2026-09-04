# 🌤️ Weather App

A modern and responsive weather application built with React. The application provides real-time weather information with a clean and attractive user interface.

## 🌐 Live Demo

weatherapp-drab-five.vercel.app

## ✨ Features

- 🌡️ Display current temperature
- ☁️ Display current weather condition
- 📉 Display minimum temperature
- 📈 Display maximum temperature
- 🕒 Real-time date and clock
- 🌍 Arabic language support
- 📍 Weather information for Latakia, Syria
- 🔄 Fetch real-time weather data
- 🎨 Modern and responsive user interface
- 📱 Responsive design
- 🌤️ Dynamic weather icons

## 🛠️ Technologies Used

This project was built using:

- React
- Vite
- Material UI
- Axios
- Moment.js
- OpenWeatherMap API
- CSS

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/mohanad-hasan/Weather-App.git
```

Navigate to the project directory:

```bash
cd Weather-App
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

## 🔑 API Configuration

This project uses the OpenWeatherMap API to fetch weather data.

To use the project, create your own API key from OpenWeatherMap.

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=YOUR_API_KEY
```

Then use it in your project:

```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

Example API request:

```javascript
const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?lat=35.5317&lon=35.7901&units=metric&appid=${API_KEY}`
);
```

## 📍 Current Location

The application currently displays weather information for:

**Latakia, Syria 🇸🇾**

- Latitude: `35.5317`
- Longitude: `35.7901`

## 🎯 Future Improvements

- [ ] Add city search functionality
- [ ] Add 5-day weather forecast
- [ ] Add hourly weather forecast
- [ ] Automatically detect user location
- [ ] Add dark/light mode
- [ ] Improve weather animations
- [ ] Add more detailed weather information

## 👨‍💻 Author

**Mohanad Hasan**

GitHub: https://github.com/mohanad-hasan

---

⭐ If you like this project, don't forget to give it a star!
