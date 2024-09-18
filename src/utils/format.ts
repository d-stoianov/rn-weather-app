export function formatCelsiusValue(value: number): string {
    return Math.ceil(value).toString()
}

export function formatDate(value: Date): string {
    return value.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })
}

// get am/pm values
export function formatTime(value: Date): string {
    let hours = value.getHours()
    const minutes = value.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12

    return minutes === 0
        ? `${hours} ${ampm}`
        : `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
}
