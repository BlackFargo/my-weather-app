import React, { useEffect, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Aside from './Components/Aside/Aside'
import { getWeather, getCurrentWeather } from './Services/WeatherService'
import { CityProvider } from './Context/CityContext'
import WeatherMap from './Pages/Map/Map/WeatherMap'
import Layout from './Layout/Layout'
import Home from './Pages/Home/Home'
import Map from './Pages/Map/Map'
import { getFormattedTime } from './helpers/getFormattedTime'

const delay = 200

export default function Main() {
	const [error, setError] = useState('')
	const [time, setTime] = useState(getFormattedTime())
	const [weatherData, setWeatherData] = useState(null)
	const [searchCity, setSearchCity] = useState('')

	const getCitySearch = data => {
		setSearchCity(data)
	}

	const fetchWeather = useCallback(async city => {
		try {
			const [weather, currentWeather] = await Promise.all([
				getWeather(city),
				getCurrentWeather(city),
			])
			if (weather && currentWeather) {
				setWeatherData({ weather, currentWeather })

				sessionStorage.setItem(
					'weather',
					JSON.stringify({ weather, currentWeather })
				)
			}
		} catch (e) {
			setError('City was not found')
			console.error('Failed to fetch weather:', e)
		}
	}, [])

	useEffect(() => {
		try {
			const storedWeather = JSON.parse(sessionStorage.getItem('weather'))

			if (storedWeather?.currentWeather?.name) {
				fetchWeather(storedWeather.currentWeather.name)
			} else {
				fetchWeather('Kiev')
			}
		} catch (e) {
			console.log(e)
		}

		const interval = setInterval(() => setTime(getFormattedTime()), 60000)
		return () => clearInterval(interval)
	}, [fetchWeather])

	useEffect(() => {
		if (searchCity.trim()) {
			fetchWeather(searchCity)
		}
	}, [searchCity])

	const icon = weatherData?.weather?.list?.[0]?.weather?.[0]?.icon || null

	return (
		<BrowserRouter>
			<CityProvider>
				<Routes>
					<Route path='/' element={<Layout icon={icon} />}>
						<Route
							index
							element={
								<>
									<Home
										weatherData={weatherData}
										delay={delay}
										updateWeatherData={weatherData}
										getCitySearch={getCitySearch}
									/>
								</>
							}
						/>
						<Route path='weather-map' element={<Map />} />
					</Route>
				</Routes>
			</CityProvider>
		</BrowserRouter>
	)
}
