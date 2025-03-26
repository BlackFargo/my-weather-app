import React, { useEffect, useState } from 'react'
import Aside from './Components/Aside/Aside'
import Header from './Components/Header/Header'
import Info from './Components/Info/Info'
import DailyForecast from './Components/Forecast/Daily Forecast/DailyForecast'
import Cities from './Components/Cities/Cities'
import HourlyForecast from './Components/Forecast/Hourly Forecast/HourlyForecast'
import { CityProvider } from './Context/CityContext'

export default function Main() {
	const [weatherData, setWeatherData] = useState(null)

	const updateWeatherData = data => {
		setWeatherData(data)
	}

	useEffect(() => {
		console.log(weatherData)
	}, [weatherData])

	return (
		<CityProvider>
			<div className='wrapper container'>
				<Aside
					icon={weatherData ? weatherData.list[0].weather[0].icon : null}
				/>

				<main className='main'>
					<Header updateWeatherData={updateWeatherData} />
					<Info
						weatherData={weatherData ? weatherData : null}
						icon={weatherData ? weatherData.list[0].weather[0].icon : null}
					/>
					<HourlyForecast weatherData={weatherData} />
					<DailyForecast weatherData={weatherData} />
					<Cities weatherData={weatherData} />
				</main>
			</div>
		</CityProvider>
	)
}
