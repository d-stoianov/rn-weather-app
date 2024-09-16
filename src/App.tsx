import React from 'react'
import CardList from '@/components/CardList'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import {
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'

const App = () => {
    return (
        <View style={styles.container}>
            <ExpoStatusBar style="light" />
            <ImageBackground
                source={require('./assets/gradient.jpg')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <CardList cards={new Array(10).fill(null)} />
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
