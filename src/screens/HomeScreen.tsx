import React, { useEffect, useState } from 'react'
import CityCardList from '@/components/CityCardList'
import { CityOverview } from '@/service/types'
import {
    WeatherApi,
    WeatherCache,
    WeatherService,
} from '@/service/WeatherService'
import Layout from '@/components/Layout'

const service = new WeatherService(new WeatherApi(), new WeatherCache())

const HomeScreen = () => {
    const [overviewData, setOverviewData] = useState<CityOverview>([])

    useEffect(() => {
        async function fetchData() {
            const data = await service.getOverview()
            setOverviewData(data)
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <CityCardList cities={overviewData} />
        </Layout>
    )
}

export default HomeScreen
