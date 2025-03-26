import React from 'react'
import s from './DailyForecastCard.module.scss'

export default function ForecastCard({day, temp, img, averageTemp, weather}) {
	return (
		<div className={s.card}>
			<ul>
				<li className={s.day}>{day}</li>
				<li className={s.averageTemp}>{averageTemp}</li>
				<li><img src={img} className={s.img}/></li>
				<li className={s.temp}>{temp}</li>
				<li className={s.weather}>{weather}</li>
			</ul>
			
		</div>
	)
}
