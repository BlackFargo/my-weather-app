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
				<div className='wrapper container'>
					<Aside
						icon={
							weatherData ? weatherData.weather.list[0].weather[0].icon : null
						}
					/>

					<main className='main'>
						<Header updateWeatherData={updateWeatherData} />
						<Info
							weatherData={weatherData ? weatherData.currentWeather : null}
							icon={
								weatherData ? weatherData.currentWeather.weather[0].icon : null
							}
						/>
						<HourlyForecast
							weatherData={weatherData ? weatherData.weather : null}
						/>
						<DailyForecast
							weatherData={weatherData ? weatherData.weather : null}
						/>
						<Cities weatherData={weatherData ? weatherData.weather : null} />
					</main>
				</div>
				<Routes>
					{/* <Route path='/' element={} /> */}
					<Route path='/weatherMap' element={<WeatherMap />} />
				</Routes>
			</CityProvider>
		</BrowserRouter>
	)
}
