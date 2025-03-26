	import React from 'react'
	import s from './DailyForecast.module.scss'
	import ForecastCard from '../../Cards/DailyForecastCard/DailyForecastCard'

	export default function DailyForecast({weatherData}) {
		if(!weatherData) return <p>Loading...</p>

		const dailyForecast = weatherData.list.filter((_, index) => index % 8 === 0)

		return (
			<div className={s.globals}>
				{dailyForecast.map((item,index) => {
				return <ForecastCard key={index}
					day={new Date(item.dt * 1000).toLocaleDateString('en-US', {weekday: 'long'})}
					temp={`${Math.round(item.main.temp)}°C`}
					img={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
					averageTemp={`Avg temp: ${Math.round(item.main.feels_like)}°C`}
					weather={item.weather[0].description}
					/>
				})}
			</div>
		)
	}
