import React, { useState, useEffect } from 'react'
import s from './Info.module.scss'
// import { GlobalSvgSelector } from '../../assets/icons/Global/GlobalSvgSelector.'

const getFormattedTime = () => {
	const date = new Date()
	return {
		hours: date.getHours().toString().padStart(2, '0'),
		minutes: date.getMinutes().toString().padStart(2, '0'),
	}
}

export default function Info({ weatherData, icon }) {
	const [time, setTime] = useState(getFormattedTime())

	useEffect(() => {
		if (!icon || !weatherData) {
			return
		}

		const interval = setInterval(() => {
			setTime(getFormattedTime())
		}, 60000)

		return () => clearInterval(interval)
		компонента
	}, [icon, weatherData])

	if (!icon) {
		return <div>Loading...</div>
	}

	if (!weatherData) {
		return <p>Loading weather data...</p>
	}

	return (
		<div className={s.info}>
			<div className={s.header}>
				<h1 className={s.title}>
					{Math.floor(weatherData.list[0].main.temp) + '°C'}
				</h1>
			</div>
			<div className={s.footer}>
				<p className={s.subtitle}>Today</p>
				<p className={s.time}>{`${time.hours}:${time.minutes}`}</p>
				<p className={s.city}>
					{weatherData.city.name}, {weatherData.city.country}
				</p>
			</div>
		</div>
	)
}
