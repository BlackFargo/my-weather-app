import { CityContext } from '../Context/CityContext'
import { useContext } from 'react'

export const useCity = () => useContext(CityContext)
