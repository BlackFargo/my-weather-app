import React from 'react'
import Header from './Header/Header'
import HourlyForecast from './Forecast/Hourly Forecast/HourlyForecast'
import Info from './Info/Info'
import DailyForecast from './Forecast/Daily Forecast/DailyForecast'
import Cities from './Cities/Cities'

export default function Home({ weatherData, delay, updateWeatherData }) {
	return (
		<>
			<Header updateWeatherData={updateWeatherData} delay={delay} />
			<Info
				weatherData={weatherData ? weatherData.currentWeather : null}
				icon={weatherData ? weatherData.currentWeather.weather[0].icon : null}
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
	)
}
