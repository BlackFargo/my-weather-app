import React, { useEffect, useState } from 'react'
import s from './HourlyForecast.module.scss'
import HourlyForecastCard from '../../Cards/HourlyForecastCard/HourlyForecastCard'
import Loading from '../../Loading/Loading'

export default function HourlyForecast({ weatherData, delay }) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true)
		}, delay)
		return () => clearTimeout(timer)
	})

	if (!weatherData) return <Loading />

	const hourlyForecast = weatherData.list.filter((_, i) => i < 40)

	return (
		<div className={`${s.hourlyForecast} ${show ? s.show : ''}`}>
			<div className={s.slider}>
				{hourlyForecast.map((item, index) => {
					return (
						<HourlyForecastCard
							key={index}
							date={String(new Date(item.dt * 1000).getDate()).padStart(2, '0')}
							time={new Date(item.dt * 1000).toLocaleTimeString('en-US', {
								hour12: false,
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
