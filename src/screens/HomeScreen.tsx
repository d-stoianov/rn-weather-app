import React, { useEffect, useState } from 'react'
import { CityOverview } from '@/service/types'
import {
    WeatherApi,
    WeatherCache,
    WeatherService,
} from '@/service/WeatherService'
import Layout from '@/components/Layout'
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { translate } from '@/localization'
import CityCard from '@/components/CityCard'

const service = new WeatherService(new WeatherApi(), new WeatherCache())

const HomeScreen = () => {
    const [overviewData, setOverviewData] = useState<CityOverview>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const data = await service.getOverview()
            setOverviewData(data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {translate('exploreTheWeather')}
                    </Text>
                </View>
                {isLoading ? (
                    <ActivityIndicator color={'white'} />
                ) : (
                    <View>
                        {overviewData.map((c, idx) => (
                            <View key={idx}>
                                <CityCard city={c} />
                                {/* add separator except the last item */}
                                {idx !== overviewData.length - 1 && (
                                    <View style={styles.separator}></View>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 64,
        paddingBottom: 48,
        gap: 20,
    },
    textContainer: {
        width: '100%',
        paddingBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        width: 250,
    },
    separator: {
        marginBottom: 32,
    },
})

export default HomeScreen
