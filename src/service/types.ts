export type TemperatureType = 'K' | 'C' | 'F'

export interface City {
    name: string
    picture: string
}

export interface WeatherDTO {
    date: string
    city: City
    tempType: TemperatureType
    temp: number
}

export type CityOverview = City[]
