export function formatCelsiusValue(value: number): string {
    return Math.ceil(value).toString()
}

export function formatDate(value: Date): string {
    return value.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        hour12: true,
    })
}
