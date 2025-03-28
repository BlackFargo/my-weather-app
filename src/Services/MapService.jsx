import React from 'react'

const APIKEY = '957874ee6bf76fa3c2b7cc881a13a2fb'

export async function getMap(params) {
	try {
		const response = await fetch(
			`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${APIKEY}`
		)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const imageBlob = await response.blob()
		const imageUrl = URL.createObjectURL(imageBlob)
		return imageUrl
	} catch (e) {
		console.error(`Error: ${e}`)
	}
}
