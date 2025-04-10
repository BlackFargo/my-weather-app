import React from 'react'
import s from './Loading.module.scss'

export default function Loading() {
	return (
		<div className={s.loading_container}>
			<div className={s.spinner}></div>
			Loading...
		</div>
	)
}
