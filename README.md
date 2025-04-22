# 🌤️ Weather App

A modern weather app with a beautiful interface, dark/light theme, and real-time weather updates.

## 📸 Screenshot

![image](https://github.com/user-attachments/assets/bb5f0714-9f3f-4f7d-9d18-b198320d696f)

## 🚀 Demo

Open the site: https://blackfargo.github.io/my-weather-app/

## ⚙️ Technologies Used

- ⚛️ React (Vite)
- 🧠 Context API — global state (themization)
- 🎨 SCSS + CSS Variables — styling and dark/light theme
- 🌐 OpenWeatherMap API
- 🔀 React Router DOM — multi-page functionality
- 📱 Responsive design
- 📦 Project structure: components, context, services, pages, layout

## ✨ Functions

-🌡️ Current weather and hourly forecast
-📅 5-day forecast
-🔍 City search
-🌓 Themization (persists across reloads)
-🗺️ Map page (via iframe)
-⏰ Current local time
-📱 Fully responsive design

---


## Project Structure
src/ ├── assets/

Icons and images
├── components/

Components
├── context/

ThemeContext
├── hooks/

Custom hooks
├── layout/

General layout
├── pages/

Home / Map
├── services/

Working with API
├── styles/

Global styles
├── App.jsx

Routing
└── main.jsx

Entry point

## How to Run the Project
1. Clone the repository
git clone https://github.com/BlackFargo/my-weather-app.git
cd my-weather-app

2. Install dependencies
npm install

3. Create a .env file in the root of the project and add your OpenWeatherMap API key:
VITE_WEATHER_API_KEY=your_api_key_here

4. Run the project in development mode:
5. Open in the browser at http://localhost:5173 or the port specified in the terminal.
Important: Initially, the project was developed with a focus on the desktop version, so mobile responsiveness may not be perfect. However, plans to improve responsiveness are underway.

Important: Initially, the project was developed with a focus on the desktop version, so mobile responsiveness may not be perfect. However, improvements to the responsiveness are planned for the future.

