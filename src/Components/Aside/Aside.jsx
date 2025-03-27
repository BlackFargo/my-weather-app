import React from 'react'
import { Link } from 'react-router-dom'
import s from './Aside.module.scss'

const weatherIcons = {
	'01d': 'clear-day',
	'01n': 'clear-night',
	'02d': 'partly-cloudy-day',
	'02n': 'partly-cloudy-night',
	'03d': 'cloudy',
	'03n': 'cloudy',
	'04d': 'overcast',
	'04n': 'overcast',
	'09d': 'rain',
	'09n': 'rain',
	'10d': 'rain',
	'10n': 'rain',
	'11d': 'thunderstorms',
	'11n': 'thunderstorms',
	'13d': 'snow',
	'13n': 'snow',
	'50d': 'fog',
	'50n': 'fog',
}

export default function Aside({ icon }) {
	if (!icon) {
		return <div>Loading...</div>
	}

	const weatherIcon = weatherIcons[icon]

	return (
		<aside className={s.aside}>
			<div className={s.header}>
				<img
					className={s.icon}
					src={`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/${weatherIcon}.svg`}
					alt='Weather Icon'
				/>
			</div>
			<div className={s.main}>
				<ul className={s.list}>
					<li className={s.list_item}>
						<Link to='/'>Home</Link>
					</li>
					<li className={s.list_item}>
						<Link to='/weatherMap'>Map</Link>
					</li>
				</ul>
			</div>
			<div className={s.footer}>
				<p>Change theme</p>
			</div>
		</aside>
	)
}
