import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside/Aside'

export default function Layout({ icon }) {
	return (
		<div className='wrapper container'>
			<Aside icon={icon} />
			<main className='main'>
				<Outlet />
			</main>
		</div>
	)
}
