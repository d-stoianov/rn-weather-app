import { TemperatureType, WeatherCard, WeatherDataDTO } from '@/service/types'
import { API_URL } from '@env'

export async function getWeatherData(): Promise<WeatherCard[]> {
    try {
        const response = await fetch(API_URL)
        const data: WeatherDataDTO[] = await response.json()

        const convertedData = data.map((dto: WeatherDataDTO) =>
            convertDtoToWeatherCard(dto)
        )
        return convertedData
    } catch (error) {
        throw new Error('Error occured')
    }
}

function convertDtoToWeatherCard(DTO: WeatherDataDTO): WeatherCard {
    return {
        date: new Date(DTO.date),
        city: DTO.city,
        tempType: 'C',
        temp: convertTmpTypeToCelsius(DTO.tempType, DTO.temp),
    }
}

function convertTmpTypeToCelsius(
    tmpType: TemperatureType,
    tmpValue: number
): number {
    switch (tmpType) {
        case 'F':
            return (tmpValue - 32) / 1.8
        case 'K':
            return tmpValue - 273.15
        default:
            return tmpValue
    }
}
