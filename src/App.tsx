import React, { useEffect, useState } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import {
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import CityCardList from '@/components/CityCardList'
import { CityOverview } from '@/service/types'
import {
    WeatherApi,
    WeatherCache,
    WeatherService,
} from '@/service/WeatherService'

const service = new WeatherService(new WeatherApi(), new WeatherCache())

const App = () => {
    const [overviewData, setOverviewData] = useState<CityOverview>([])

    useEffect(() => {
        async function fetchData() {
            const data = await service.getOverview()
            setOverviewData(data)
        }
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <ExpoStatusBar style="light" />
            <ImageBackground
                source={require('./assets/gradient.jpg')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <CityCardList cities={overviewData} />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
    },
})

export default App
