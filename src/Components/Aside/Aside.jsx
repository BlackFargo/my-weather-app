import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Aside.module.scss'
import Loading from '../Loading/Loading'

const weatherIcons = {
	'01d': 'clear-day',
	'01n': 'clear-night',
	'02d': 'partly-cloudy-day',
	'02n': 'partly-cloudy-night',
	'03d': 'cloudy',
	'03n': 'cloudy',
	'04d': 'overcast',
	'04n': 'overcast',
	'09d': 'rain',
	'09n': 'rain',
	'10d': 'rain',
	'10n': 'rain',
	'11d': 'thunderstorms',
	'11n': 'thunderstorms',
	'13d': 'snow',
	'13n': 'snow',
	'50d': 'fog',
	'50n': 'fog',
}

const setActive = ({ isActive }) => (isActive ? 'active-link' : '')

export default function Aside({ icon }) {
	const [showAside, setShowAside] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowAside(true)
		}, 200)

		return () => clearTimeout(timer)
	}, [])

	const [theme, setTheme] = useState(false)

	useEffect(() => {
		const themeLocal = JSON.parse(localStorage.getItem('theme')) ?? false
		setTheme(themeLocal)
		const checkedTheme = JSON.parse(localStorage.getItem('checked')) ?? false
	}, [])

	useEffect(() => {
		if (theme) {
			document.body.classList.add('black-theme')
			localStorage.setItem('theme', true)
			localStorage.setItem('checked', true)
		} else {
			document.body.classList.remove('black-theme')
			localStorage.setItem('theme', false)
			localStorage.setItem('checked', false)
		}
	}, [theme])

	if (!icon) {
		return <Loading />
	}

	const switchTheme = () => {
		setTheme(prev => !prev)
	}

	const weatherIcon = weatherIcons[icon]

	return (
		<aside className={`${s.aside} ${showAside ? s.show : ''}`}>
			<div className={s.header}>
				<img
					className={s.icon}
					src={`https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/${weatherIcon}.svg`}
					alt='Weather Icon'
				/>
			</div>
			<div className={s.main}>
				<ul className={s.list}>
					<li className={s.list_item}>
						<NavLink to='/' className={setActive}>
							Home
						</NavLink>
					</li>
					<li className={s.list_item}>
						<NavLink to='/weather-map' className={setActive}>
							Map
						</NavLink>
					</li>
				</ul>
			</div>
			<div className={s.footer}>
				<input
					defaultChecked={theme}
					type='checkbox'
					className={s.theme_switcher}
					id='switcher'
				/>
				<label
					htmlFor='switcher'
					className={s.switch_label}
					onClick={switchTheme}
				></label>
			</div>
		</aside>
	)
}
