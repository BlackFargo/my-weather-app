import React from 'react'
import s from './HourlyForecastCard.module.scss'

export default function HourlyForecastCard({time, img, temp}) {
	return (
		<div className={s.hourlyForecastCard}>
			<ul className={s.list}>
				<li className={s.time}>{time}</li>
				<li><img className={s.img} src={img}/></li>
				<li className={s.temp}>{temp}</li>
			</ul>
		</div>
	)
}
