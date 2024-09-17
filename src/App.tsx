import React, { useEffect, useState } from 'react'
import CardList from '@/components/CardList'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import {
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import { getWeatherData } from '@/service/WeatherService'
import { WeatherCard } from '@/service/types'

const App = () => {
    const [weatherData, setWeatherData] = useState<WeatherCard[]>([])

    useEffect(() => {
        async function fetchData() {
            const data = await getWeatherData()
            setWeatherData(data)
        }
        fetchData()
    }, [])

    console.log('weatherData', weatherData)

    return (
        <View style={styles.container}>
            <ExpoStatusBar style="light" />
            <ImageBackground
                source={require('./assets/gradient.jpg')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <CardList cards={weatherData} />
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
