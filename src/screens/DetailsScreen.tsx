import { RootStackParamList } from '@/App'
import Layout from '@/components/Layout'
import { CityWeatherDetails } from '@/service/types'
import {
    WeatherApi,
    WeatherCache,
    WeatherService,
} from '@/service/WeatherService'
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
                <Text style={styles.text}>{city}</Text>
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
    text: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
    },
})

export default DetailsScreen
