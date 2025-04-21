import React from 'react'
import axios from 'axios'

const APIKEY = import.meta.env.VITE_API_KEY

export async function getWeather(city = 'Kiev') {
	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKEY}`
		)
		const data = response.data

		return data
	} catch (e) {
		console.log(`Error: ${e}`)
		throw e
	}
}

export async function getCurrentWeather(city = 'Kiev') {
	try {
		const response = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
		)
		const data = response.data

		return data
	} catch (e) {
		console.log(`Error: ${e}`)
		throw e
	}
}
