import React, { useState, useEffect } from 'react'
import s from './Info.module.scss'
import Loading from '../Loading/Loading'
// import { GlobalSvgSelector } from '../../assets/icons/Global/GlobalSvgSelector.'

const getFormattedTime = () => {
	const date = new Date()
	return {
		hours: date.getHours().toString().padStart(2, '0'),
		minutes: date.getMinutes().toString().padStart(2, '0'),
	}
}

export default function Info({ weatherData, icon, delay }) {
	const [time, setTime] = useState(getFormattedTime())

	const [show, setShow] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true)
		}, delay)
		return () => clearTimeout(timer)
	})

	useEffect(() => {
		if (!icon || !weatherData) {
			return
		}

		const interval = setInterval(() => {
			setTime(getFormattedTime())
		}, 60000)

		return () => clearInterval(interval)
	}, [icon, weatherData])

	if (!icon) {
		return <Loading />
	}

	if (!weatherData) {
		return <Loading />
	}

	return (
		<div className={`${s.info} ${show ? s.show : ''}`}>
			<div className={s.header}>
				<h1 className={s.title}>{Math.floor(weatherData.main.temp) + '°C'}</h1>
			</div>
			<div className={s.footer}>
				<p className={s.subtitle}>Today</p>
				<p className={s.time}>{`${time.hours}:${time.minutes}`}</p>
				<p className={s.city}>
					{weatherData.name}, {weatherData.sys.country}
				</p>
			</div>
		</div>
	)
}
