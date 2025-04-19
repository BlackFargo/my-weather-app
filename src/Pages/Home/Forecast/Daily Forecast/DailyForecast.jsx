import React, { useState, useEffect } from 'react'
import s from './DailyForecast.module.scss'
import ForecastCard from './../../../../Components/Cards/DailyForecastCard/DailyForecastCard'
import Loading from '../../../../Components/Loading/Loading'

export default function DailyForecast({ weatherData }) {
	if (!weatherData) return <Loading />
	const [show, setShow] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true)
		}, 200)
		return () => clearTimeout(timer)
	})

	const dailyForecast =
		weatherData.list.filter((_, index) => index % 8 === 0) || null

	return (
		<div className={`${s.globals} ${show ? s.show : ''}`}>
			{dailyForecast.map((item, index) => {
				return (
					<ForecastCard
						key={index}
						day={new Date(item.dt * 1000).toLocaleDateString('en-US', {
							weekday: 'long',
						})}
						temp={`${Math.round(item.main.temp)}°C`}
						img={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
						averageTemp={`Avg temp: ${Math.round(item.main.feels_like)}°C`}
						weather={item.weather[0].description}
					/>
				)
			})}
		</div>
	)
}
