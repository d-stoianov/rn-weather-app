import { StatusBar } from 'expo-status-bar'
import { ImageBackground, StyleSheet, View } from 'react-native'

const App = () => {
    return (
        <View style={styles.fullscreen}>
            <StatusBar style="light" />
            <ImageBackground
                source={require('./assets/gradient.jpg')}
                resizeMode="cover"
                style={styles.fullscreen}
            ></ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
    },
})

export default App
