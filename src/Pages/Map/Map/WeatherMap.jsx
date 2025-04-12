import React, { useEffect, useState } from 'react'
import s from './WeatherMap.module.scss'

export default function WeatherMap({ show }) {
	return (
		<div className={`${s.weather_map} ${show ? s.show : ''}`}>
			<iframe
				className={s.iframe_map}
				src='https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=36.4554&lon=70.8398&zoom=3'
				title='Weather Map'
				frameBorder='0'
				aria-label='weather-map'
			></iframe>
		</div>
	)
}
