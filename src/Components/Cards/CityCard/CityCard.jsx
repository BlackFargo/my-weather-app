import React from 'react'
import s from './CityCard.module.scss'

export default function CityCard({ city, img, temp, onClick }) {
	return (
		<div className={s.city_card}>
			<h3 className={s.title} onClick={onClick}>
				{city}
			</h3>
			<img className={s.img} src={img} />
			<p className={s.temp}>{temp}°C</p>
		</div>
	)
}
