import React, { useRef } from 'react'
import s from './HourlyForecast.module.scss'
import HourlyForecastCard from '../../Cards/HourlyForecastCard/HourlyForecastCard'

export default function HourlyForecast({ weatherData }) {
	if (!weatherData) return <p>Loading...</p>

	const barRef = useRef('')

	const hourlyForecast = weatherData.list.filter((_, i) => i < 24)

	return (
		<div className={s.hourlyForecast}>
			<div className={s.slider}>
				{hourlyForecast.map((item, index) => {
					return (
						<HourlyForecastCard
							key={index}
							time={new Date(item.dt * 1000).toLocaleTimeString('en-US', {
								hour: '2-digit',
								minute: '2-digit',
							})}
							img={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
							temp={`${Math.round(item.main.temp)}°C`}
						/>
					)
				})}
			</div>
		</div>
	)
}
