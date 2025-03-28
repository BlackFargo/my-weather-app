import React, { useEffect, useState } from 'react'
import { getMap } from '../../Services/MapService'
import s from './WeatherMap.module.scss'

export default function WeatherMap() {
	const [weatherMap, setWeatherMap] = useState(null)

	useEffect(() => {
		try {
			const fetchMap = async () => {
				const map = await getMap()
				setWeatherMap(map)
			}

			fetchMap()
		} catch (e) {}
	}, [])

	if (weatherMap) {
		console.log(weatherMap)
	}

	return (
		<div className={s.weather_map}>
			<h1 className={s.title}>123</h1>
			<iframe
				className={s.iframe_map}
				src='https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=36.4554&lon=70.8398&zoom=3'
				width='100%'
				height='100%'
				title='Weather Map'
				frameBorder='0'
			></iframe>
		</div>
	)
}
