export type TemperatureType = 'K' | 'C' | 'F'

export interface City {
    name: string
    picture: string
}

export interface WeatherDataDTO {
    date: string
    city: City
    tempType: TemperatureType
    temp: number
}

export interface WeatherCard {
    date: Date
    city: City
    tempType: 'C'
    temp: number
}
