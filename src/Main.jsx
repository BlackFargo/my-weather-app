import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Aside from './Components/Aside/Aside'
import Header from './Components/Header/Header'
import Info from './Components/Info/Info'
import DailyForecast from './Components/Forecast/Daily Forecast/DailyForecast'
import Cities from './Components/Cities/Cities'
import HourlyForecast from './Components/Forecast/Hourly Forecast/HourlyForecast'
import { CityProvider } from './Context/CityContext'
import WeatherMap from './Components/Map/WeatherMap'
import Layout from './Components/Layout'
// import AnimatedWrapper from './Components/AnimatedWrapper'
const delay = 200

export default function Main() {
	const [weatherData, setWeatherData] = useState(null)

	const updateWeatherData = data => {
		setWeatherData(data)
	}

	useEffect(() => {
		console.log(weatherData)
	}, [weatherData])

	return (
		<BrowserRouter>
			<CityProvider>
				<Routes>
					<Route
						path='/'
						element={
							<Layout
								icon={
									weatherData
										? weatherData.weather.list[0].weather[0].icon
										: null
								}
							/>
						}
					>
						<Route
							index
							element={
								<>
									<Header updateWeatherData={updateWeatherData} delay={delay} />

									<Info
										weatherData={
											weatherData ? weatherData.currentWeather : null
										}
										icon={
											weatherData
												? weatherData.currentWeather.weather[0].icon
												: null
										}
										delay={delay}
									/>
									<HourlyForecast
										weatherData={weatherData ? weatherData.weather : null}
										delay={delay}
									/>
									<DailyForecast
										weatherData={weatherData ? weatherData.weather : null}
										delay={delay}
									/>
									<Cities
										weatherData={weatherData ? weatherData.weather : null}
										delay={delay}
									/>
								</>
							}
						/>
						<Route path='weather-map' element={<WeatherMap />} />
					</Route>
				</Routes>
			</CityProvider>
		</BrowserRouter>
	)
}
