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
    RefreshControl,
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
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const [isError, setIsError] = useState<boolean>(false)

    // pull to refresh
    async function onRefresh() {
        try {
            setIsRefreshing(true)
            setIsLoading(true)
            setIsError(false)

            const data = await service.getOverview(true)
            setOverviewData(data)
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }

    // when component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                setIsError(false)
                const data = await service.getOverview()
                setOverviewData(data)
            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {translate('exploreTheWeather')}
                    </Text>
                </View>
                {isLoading ? (
                    <ActivityIndicator color={'white'} />
                ) : isError ? (
                    <Text style={styles.errorText}>
                        {translate('somethingWentWrong')}
                    </Text>
                ) : (
                    <>
                        {overviewData.map((c, idx) => (
                            <View key={idx}>
                                <CityCard city={c} />
                                {/* add separator except the last item */}
                                {idx !== overviewData.length - 1 && (
                                    <View style={styles.separator}></View>
                                )}
                            </View>
                        ))}
                    </>
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
    errorText: {
        fontSize: 16,
        color: 'red',
        width: 300,
    },
    separator: {
        marginBottom: 32,
    },
})

export default HomeScreen
