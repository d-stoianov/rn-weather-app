import { RootStackParamList } from '@/App'
import Layout from '@/components/Layout'
import WeatherCard from '@/components/WeatherCard'
import { CityWeatherDetails } from '@/service/types'
import {
    WeatherApi,
    WeatherCache,
    WeatherService,
} from '@/service/WeatherService'
import { formatDate } from '@/utils/format'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>

const service = new WeatherService(new WeatherApi(), new WeatherCache())

const DetailsScreen = () => {
    const { goBack } = useNavigation()
    const route = useRoute<DetailsScreenRouteProp>()

    const { city } = route.params

    const [detailsData, setDetailsData] = useState<CityWeatherDetails>([])

    useEffect(() => {
        async function fetchData() {
            const data = await service.getDetails(city)
            setDetailsData(data)
        }
        fetchData()
    }, [])

    console.log('detailsData', detailsData)

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>{city}</Text>
                        <Text style={styles.subHeading}>
                            {detailsData[0] && formatDate(detailsData[0]?.date)}
                        </Text>
                    </View>
                    <View style={styles.cardContainer}>
                        {detailsData.map((el) => (
                            <WeatherCard weather={el} />
                        ))}
                    </View>
                </View>
                <Button title="Go to Home" onPress={goBack} />
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 64,
        paddingBottom: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subContainer: {
        width: '100%',
        display: 'flex',
        gap: 36,
    },
    header: {
        display: 'flex',
        gap: 8,
    },
    cardContainer: {
        display: 'flex',
        gap: 16,
    },
    heading: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
    },
    subHeading: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
})

export default DetailsScreen
