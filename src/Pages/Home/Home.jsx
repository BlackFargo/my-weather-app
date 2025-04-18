import React from 'react'
import Header from './Header/Header'
import HourlyForecast from './Forecast/Hourly Forecast/HourlyForecast'
import Info from './Info/Info'
import DailyForecast from './Forecast/Daily Forecast/DailyForecast'
import Cities from './Cities/Cities'

export default function Home({ weatherData, delay, getCitySearch }) {
	const icon = weatherData?.weather?.list?.[0]?.weather?.[0]?.icon || null
	return (
		<>
			<Header
				weatherData={weatherData}
				delay={delay}
				getCitySearch={getCitySearch}
			/>
			<Info
				weatherData={weatherData ? weatherData.currentWeather : null}
				icon={icon}
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
