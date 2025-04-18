export const getFormattedTime = () => {
	const date = new Date()
	return {
		hours: date.getHours().toString().padStart(2, '0'),
		minutes: date.getMinutes().toString().padStart(2, '0'),
	}
}
