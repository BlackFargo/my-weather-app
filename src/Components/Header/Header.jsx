import React, { useEffect, useState, useCallback } from 'react'
import s from './Header.module.scss'
import { getWeather } from '../../Services/WeatherService'
import { useCity } from '../../Context/CityContext'
import { getCurrentWeather } from '../../Services/WeatherService'

const getFormattedTime = () => {
	const date = new Date()
	return {
		hours: date.getHours().toString().padStart(2, '0'),
		minutes: date.getMinutes().toString().padStart(2, '0'),
	}
}

export default function Header({ updateWeatherData }) {
	const { selectedCity } = useCity()
	const [time, setTime] = useState(getFormattedTime())
	const [inpValue, setInpValue] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [error, setError] = useState('')

	const fetchWeather = useCallback(async city => {
		try {
			const [weather, currentWeather] = await Promise.all([
				getWeather(city),
				getCurrentWeather(city),
			])
			if (weather && currentWeather) {
				setWeatherData({ weather, currentWeather })
				updateWeatherData({ weather, currentWeather })
			}
		} catch (e) {
			setError('City was not found')
			console.error('Failed to fetch weather:', e)
		}
	}, [])

	useEffect(() => {
		if (selectedCity) {
			fetchWeather(selectedCity)
		}
	}, [selectedCity])

	const SubmitHandler = e => {
		e.preventDefault()

		if (inpValue.trim()) {
			fetchWeather(inpValue)
			setInpValue('')
			setError(null)
		}
		if (inpValue.trim().length == 0) {
			return
		}
	}

	useEffect(() => {
		fetchWeather('Kiev')
		const interval = setInterval(() => setTime(getFormattedTime()), 60000)
		return () => clearInterval(interval)
	}, [fetchWeather])

	if (!weatherData) {
		return <div>Loading...</div>
	}

	return (
		<header className={s.header}>
			<div className='location'>
				<p className={s.city}>
					{weatherData.currentWeather.name},{' '}
					{weatherData.currentWeather.sys.country}
				</p>
			</div>
			<div className='search'>
				<form className={s.searchForm} onSubmit={SubmitHandler}>
					<input
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
			{error ? error : null}

			<div className={s.notification}>
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
			</div>
		</header>
	)
}
