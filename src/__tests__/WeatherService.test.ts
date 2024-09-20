import { WeatherCache, WeatherService } from '@/service/WeatherService'

describe('WeatherService convertTmpTypeToCelsius', () => {
    it('should convert Fahrenheit to Celsius', () => {
        const result = WeatherService.convertTmpTypeToCelsius('F', 68)
        expect(result).toBeCloseTo(20)
    })

    it('should convert Kelvin to Celsius', () => {
        const result = WeatherService.convertTmpTypeToCelsius('K', 300)
        expect(result).toBeCloseTo(26.85, 2)
    })

    it('should return Celsius value as it is', () => {
        const result = WeatherService.convertTmpTypeToCelsius('C', 25)
        expect(result).toBe(25)
    })
})

describe('WeatherCache isFresh', () => {
    it('should return true for a date within 12 hours', () => {
        const now = new Date()
        const within12Hours = new Date(now.getTime() - 6 * 60 * 60 * 1000) // 6 hours ago
        expect(WeatherCache.isFresh(within12Hours)).toBe(true)
    })

    it('should return false for a date older than 12 hours', () => {
        const now = new Date()
        const olderThan12Hours = new Date(now.getTime() - 13 * 60 * 60 * 1000) // 13 hours ago
        expect(WeatherCache.isFresh(olderThan12Hours)).toBe(false)
    })

    it('should return true for a date exactly 12 hours ago', () => {
        const now = new Date()
        const exactly12Hours = new Date(now.getTime() - 12 * 60 * 60 * 1000) // exactly 12 hours ago
        expect(WeatherCache.isFresh(exactly12Hours)).toBe(true)
    })
})
