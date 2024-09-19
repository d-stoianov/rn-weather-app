import { RootStackParamList } from '@/App'
import Layout from '@/components/Layout'
import WeatherCard from '@/components/WeatherCard'
import { translate } from '@/localization'
import { CityWeatherDetails } from '@/service/types'
import {
    WeatherApi,
    WeatherCache,
    WeatherService,
} from '@/service/WeatherService'
import { formatDate } from '@/utils/format'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Button,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>

const service = new WeatherService(new WeatherApi(), new WeatherCache())

const DetailsScreen = () => {
    const { goBack } = useNavigation()
    const route = useRoute<DetailsScreenRouteProp>()

    const { city } = route.params

    const [detailsData, setDetailsData] = useState<CityWeatherDetails>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

    const [isError, setIsError] = useState<boolean>(false)

    // pull to refresh
    async function onRefresh() {
        try {
            setIsRefreshing(true)
            setIsLoading(true)
            setIsError(false)
            const data = await service.getDetails(city, true)
            setDetailsData(data)
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
                const data = await service.getDetails(city)
                setDetailsData(data)
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.subContainer}>
                    {isLoading ? (
                        <ActivityIndicator color={'white'} />
                    ) : isError ? (
                        <Text style={styles.errorText}>
                            {translate('somethingWentWrong')}
                        </Text>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.heading}>{city}</Text>
                                <Text style={styles.subHeading}>
                                    {detailsData[0] &&
                                        formatDate(detailsData[0]?.date)}
                                </Text>
                            </View>
                            <View style={styles.cardContainer}>
                                {detailsData.map((el, idx) => (
                                    <WeatherCard key={idx} weather={el} />
                                ))}
                            </View>
                        </>
                    )}
                </View>
                <Button title="Go to Home" onPress={goBack} />
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 64,
        paddingBottom: 32,
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
    },
    subContainer: {
        flex: 1,
        gap: 48,
    },
    cardContainer: {
        display: 'flex',
        gap: 16,
    },
    header: {
        gap: 8,
    },
    heading: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        width: 300,
    },
    subHeading: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default DetailsScreen
