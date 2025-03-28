import React, { useEffect, useState } from 'react'
import s from './Cities.module.scss'
import CityCard from '../Cards/CityCard/CityCard'
import { getCurrentWeather } from '../../Services/WeatherService'
import { useCity } from '../../Context/CityContext'

const capitals = [
	{ name: 'Washington, D.C.' },
	{ name: 'London' },
	{ name: 'Paris' },
	{ name: 'Berlin' },
	{ name: 'Rome' },
	{ name: 'Madrid' },
	{ name: 'Amsterdam' },
	{ name: 'Brussels' },
	{ name: 'Ottawa' },
	{ name: 'Moscow' },
	{ name: 'Beijing' },
	{ name: 'Tokyo' },
	{ name: 'Seoul' },
	{ name: 'New Delhi' },
	{ name: 'Ankara' },
	{ name: 'Cairo' },
	{ name: 'Brasilia' },
	{ name: 'Mexico City' },
	{ name: 'Bangkok' },
	{ name: 'Sydney' },
	{ name: 'Buenos Aires' },
]

export default function Cities() {
	const { setSelectedCity } = useCity()
	const lastPage = Math.ceil(capitals.length / 3) - 1
	let [page, setPage] = useState(0)

	const [city, setCity] = useState('')

	const handleCitySelect = city => {
		setCity(city.city)
	}

	useEffect(() => {
		setSelectedCity(city)
	}, [city])

	const newCapitals = capitals.slice(page * 3, page * 3 + 3)
	useEffect(() => {
		console.log(page)
	}, [page])
	const [cities, setCities] = useState(null)

	useEffect(() => {
		async function fetchData() {
			if (page < 0) {
				setPage(0)
				return
			}
			if (page > lastPage) {
				setPage(lastPage)
				return
			}
			if (page > lastPage) return
			try {
				const WeatherData = await Promise.all(
					newCapitals.map(async city => {
						const data = await getCurrentWeather(city.name)
						return {
							city: city.name,
							...data,
						}
					})
				)
				setCities(WeatherData)
			} catch (e) {
				console.log(`Error: ${e}`)
			}
		}
		fetchData()
	}, [page])

	useEffect(() => {
		console.log(cities)
	}, [cities])

	if (!cities) return <p>Loading...</p>

	return (
		<div className={s.cities}>
			{cities.map(city => {
				return (
					<CityCard
						onClick={() => handleCitySelect(city)}
						key={city.name}
						city={city.name}
						temp={Math.round(city.main.temp)}
						img={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
					/>
				)
			})}
			<div className={s.actions}>
				<button
					className={`${s.prev_btn} ${s.btn}`}
					onClick={() => setPage(prev => prev - 1)}
				>
					Prev
				</button>
				<button
					className={`${s.next_btn} ${s.btn}`}
					onClick={() => setPage(prev => prev + 1)}
				>
					Next
				</button>
			</div>
		</div>
	)
}
