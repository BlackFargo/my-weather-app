import React, { useEffect, useState } from 'react'
import s from './Cities.module.scss'
import CityCard from '../../../Components/Cards/CityCard/CityCard'
import { getCurrentWeather } from '../../../Services/WeatherService'
import { useCity } from '../../../Context/CityContext'
import Loading from '../../../Components/Loading/Loading'

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

export default function Cities({ delay }) {
	const { setSelectedCity } = useCity()
	const lastPage = Math.ceil(capitals.length / 3) - 1
	let [page, setPage] = useState(0)
	const [show, setShow] = useState(false)

	const [city, setCity] = useState('')

	const handleCitySelect = city => {
		setCity(city.city)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true)
		}, delay)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		setSelectedCity(city)
	}, [city])

	const newCapitals = capitals.slice(page * 3, page * 3 + 3)
	useEffect(() => {}, [page])
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

	if (!cities) return <Loading />

	return (
		<div className={`${s.cities} ${show ? s.show : ''}`}>
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
