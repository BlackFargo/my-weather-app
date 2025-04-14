import React, { useEffect, useState, useCallback, useRef } from 'react'
import s from './Header.module.scss'
import { getWeather } from '../../../Services/WeatherService'
import { useCity } from '../../../Context/CityContext'
import { getCurrentWeather } from '../../../Services/WeatherService'
import Loading from '../../../Components/Loading/Loading'

const getFormattedTime = () => {
	const date = new Date()
	return {
		hours: date.getHours().toString().padStart(2, '0'),
		minutes: date.getMinutes().toString().padStart(2, '0'),
	}
}

export default function Header({ weatherData, delay, getCitySearch }) {
	const inpRef = useRef()

	const inpFocusHandler = () => {
		inpRef.current.focus()
	}

	const { selectedCity } = useCity()
	useEffect(() => {
		getCitySearch(selectedCity)
	}, [selectedCity])
	const [tip, setTip] = useState(false)

	const [inpValue, setInpValue] = useState('')

	const [error, setError] = useState('')

	const [show, setShow] = useState(false)

	const [cities, setCities] = useState([])

	const [filteredCities, setFilteredCities] = useState([])

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(true)
		}, delay)

		return () => clearTimeout(timer)
	}, [])

	const SubmitHandler = e => {
		e.preventDefault()

		if (inpValue.trim()) {
			getCitySearch(inpValue)
			setInpValue('')
			setError(null)
		}
		if (inpValue.trim().length == 0) {
			return
		}
	}

	useEffect(() => {
		if (!inpValue) {
			setFilteredCities([])
			return
		}
		const filtred = cities
			.filter(city =>
				city.toLocaleLowerCase().includes(inpValue.toLocaleLowerCase())
			)
			.slice(0, 4)

		setFilteredCities(filtred)
	}, [inpValue])

	useEffect(() => {
		fetch('./Cities.json')
			.then(data => data.json())
			.then(data => {
				console.log(
					data.forEach(city => {
						setCities(prev => [...prev, city.name])
					})
				)
			})
			.catch(e => console.error(`Error: ${e}`))
	}, [])

	if (!weatherData) {
		return <Loading />
	}

	return (
		<header className={`${s.header} ${show ? s.show : ''}`}>
			<div className='location'>
				<p className={s.city}>
					{weatherData.currentWeather.name},{' '}
					{weatherData.currentWeather.sys.country}
				</p>
			</div>
			<div className='search'>
				<form className={s.searchForm} onSubmit={SubmitHandler}>
					<input
						ref={inpRef}
						type='search'
						className={s.searchInput}
						placeholder='Search...'
						onChange={e => setInpValue(e.target.value)}
						value={inpValue}
					/>
					<button type='submit' className={s.searchButton}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className={s.searchIcon}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
							/>
						</svg>
					</button>
				</form>
			</div>
			<div className={s.cities}>
				<ul className={s.cityList}>
					{filteredCities.map(city => {
						return (
							<li
								className={s.cityList_item}
								onClick={() => getCitySearch(city)}
							>
								{city}
							</li>
						)
					})}
				</ul>
			</div>
			{error ? error : null}

			<div
				className={s.notification}
				onMouseEnter={() => setTip(true)}
				onMouseLeave={() => setTip(false)}
			>
				<svg
					width={50}
					height={50}
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='size-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
					/>
				</svg>
				<div
					className={`${s.notification_block} ${tip ? s.show : ''}`}
					onClick={inpFocusHandler}
				>
					<p>Type a city name, or pick one from the list</p>
				</div>
			</div>
		</header>
	)
}
