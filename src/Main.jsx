import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Aside from './Components/Aside/Aside'

import { CityProvider } from './Context/CityContext'
import WeatherMap from './Pages/Map/Map/WeatherMap'
import Layout from './Layout/Layout'
import Home from './Pages/Home/Home'
import Map from './Pages/Map/Map'

// import AnimatedWrapper from './Components/AnimatedWrapper'
const delay = 200

export default function Main() {
	const [weatherData, setWeatherData] = useState(null)

	const updateWeatherData = data => {
		setWeatherData(data)
	}

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
									<Home
										weatherData={weatherData}
										delay={delay}
										updateWeatherData={updateWeatherData}
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
