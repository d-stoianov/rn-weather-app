import {
    CityOverview,
    TemperatureType,
    CityWeatherDetails,
    WeatherDTO,
} from '@/service/types'
import { API_URL } from '@env'

export class WeatherApi {
    // class for getting data from the api

    public async getWeather(): Promise<WeatherDTO[]> {
        try {
            const response = await fetch(API_URL)
            const data: WeatherDTO[] = await response.json()
            return data
        } catch (error) {
            throw new Error('Error occured')
        }
    }
}

export class WeatherCache {
    // class for saving and retrieving data from cache

    getWeather() {
        // get data from asyncstorage
    }
}

export class WeatherService {
    // class for business logic, data aggregation

    private api: WeatherApi
    private cache: WeatherCache

    constructor(api: WeatherApi, cache: WeatherCache) {
        this.api = api
        this.cache = cache
    }

    public async getOverview(
        forceRefresh: boolean = false
    ): Promise<CityOverview> {
        // TODO: save to cache, error handling
        const rawData = await this.api.getWeather()

        return this.createOverview(rawData)
    }

    public async getDetails(
        city: string,
        forceRefresh: boolean = false
    ): Promise<CityWeatherDetails> {
        // TODO: save to cache, error handling
        const rawData = await this.api.getWeather()

        return this.createCityDetails(rawData, city)
    }

    private createOverview(weatherData: WeatherDTO[]): CityOverview {
        // get unique cities
        const uniqueCities = Array.from(
            new Map(
                weatherData.map((dto) => [dto.city.name, dto.city])
            ).values()
        )

        // sort alphabetically
        return uniqueCities.sort((a, b) => a.name.localeCompare(b.name))
    }

    private createCityDetails(
        weatherData: WeatherDTO[],
        city: string
    ): CityWeatherDetails {
        // filter weather dtos by city name
        const filteredDtos = weatherData.filter((dto) => dto.city.name === city)

        // convert dtos to weather objects
        return filteredDtos.map((dto) => {
            return {
                date: new Date(dto.date),
                city: dto.city,
                tempType: 'C',
                temp: this.convertTmpTypeToCelsius(dto.tempType, dto.temp),
            }
        })
    }

    private convertTmpTypeToCelsius(
        tmpType: TemperatureType,
        tmpValue: number
    ): number {
        switch (tmpType) {
            case 'F':
                const F_MOD = 32
                const F_COEF = 1.8

                return (tmpValue - F_MOD) / F_COEF
            case 'K':
                const K_MOD = 273.15

                return tmpValue - K_MOD
            default:
                return tmpValue
        }
    }
}
