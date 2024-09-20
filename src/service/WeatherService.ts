import { Weather, WeatherCacheData } from './types'
import {
    CityOverview,
    TemperatureType,
    CityWeatherDetails,
    WeatherDTO,
} from '@/service/types'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    private DATAKEY = 'weather'

    // fresh > 12 hours
    public static isFresh(date: Date): boolean {
        const now = new Date()
        const cacheLifeTime = 12 * 60 * 60 * 1000 // 12 hours
        const difference = now.getTime() - date.getTime()
        return difference <= cacheLifeTime
    }

    public async saveWeather(weather: WeatherDTO[]): Promise<void> {
        try {
            const data = {
                weather: weather,
                updatedDate: new Date().toUTCString(),
            }
            await AsyncStorage.setItem(this.DATAKEY, JSON.stringify(data))
        } catch (e) {
            console.error('Failed to save data to AsyncStorage', e)
        }
    }

    public async getWeather(): Promise<WeatherCacheData | undefined> {
        try {
            const value = await AsyncStorage.getItem(this.DATAKEY)
            if (value !== null) {
                const parsedValue = JSON.parse(value)
                return {
                    weather: parsedValue.weather,
                    updatedDate: new Date(parsedValue.updatedDate),
                } as WeatherCacheData
            }
        } catch (e) {
            console.error('Failed to fetch data from AsyncStorage', e)
        }
    }

    public async clearWeather(): Promise<void> {
        try {
            await AsyncStorage.setItem(this.DATAKEY, '')
        } catch (e) {
            console.error('Failed to delete data from AsyncStorage', e)
        }
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

    public static convertTmpTypeToCelsius(
        tmpType: TemperatureType,
        tmpValue: number
    ): number {
        switch (tmpType) {
            case 'F': {
                const F_MOD = 32
                const F_COEF = 1.8

                return (tmpValue - F_MOD) / F_COEF
            }
            case 'K': {
                const K_MOD = 273.15

                return tmpValue - K_MOD
            }
            default:
                return tmpValue
        }
    }

    public async getOverview(
        forceRefresh: boolean = false
    ): Promise<CityOverview> {
        const cachedData = await this.cache.getWeather()

        if (
            cachedData &&
            WeatherCache.isFresh(cachedData.updatedDate) &&
            !forceRefresh
        ) {
            return this.createOverview(cachedData.weather)
        } else {
            try {
                const rawData = await this.api.getWeather()
                this.cache.saveWeather(rawData)
                return this.createOverview(rawData)
            } catch (error) {
                if (cachedData) {
                    // if no internet or error from server, take an old data
                    return this.createOverview(cachedData.weather)
                } else {
                    // if no data from the cache, throw error
                    throw new Error('No data in the cache and request failed')
                }
            }
        }
    }

    public async getDetails(
        city: string,
        forceRefresh: boolean = false
    ): Promise<CityWeatherDetails> {
        const cachedData = await this.cache.getWeather()

        if (
            cachedData &&
            WeatherCache.isFresh(cachedData.updatedDate) &&
            !forceRefresh
        ) {
            return this.createCityDetails(cachedData.weather, city)
        } else {
            try {
                const rawData = await this.api.getWeather()
                this.cache.saveWeather(rawData)
                return this.createCityDetails(rawData, city)
            } catch (error) {
                if (cachedData) {
                    // if no internet or error from server, take an old data
                    return this.createCityDetails(cachedData.weather, city)
                } else {
                    // if no data from the cache, throw error
                    throw new Error('No data in the cache and request failed')
                }
            }
        }
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
        const weatherObjects: Weather[] = filteredDtos.map((dto) => {
            return {
                date: new Date(dto.date),
                city: dto.city,
                tempType: 'C',
                temp: WeatherService.convertTmpTypeToCelsius(
                    dto.tempType,
                    dto.temp
                ),
            }
        })

        // sort weather objects by date
        return weatherObjects.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        )
    }
}
