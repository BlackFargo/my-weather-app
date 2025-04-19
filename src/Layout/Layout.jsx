import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Aside from '../Components/Aside/Aside'
import './Layout.scss'

export default function Layout({ icon }) {
	const location = useLocation()
	const isMapPage = location.pathname === '/weather-map'
	return (
		<div className='wrapper container'>
			<Aside icon={icon} />
			<main className={`main ${isMapPage ? 'map-page' : ''}`}>
				<Outlet />
			</main>
		</div>
	)
}
