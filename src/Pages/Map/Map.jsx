import React, { useEffect, useState } from 'react'
import WeatherMap from './Map/WeatherMap'

export default function Map() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setShow(true)
		}, 200)
	}, [])
	return (
		<>
			<WeatherMap show={show} />
		</>
	)
}
