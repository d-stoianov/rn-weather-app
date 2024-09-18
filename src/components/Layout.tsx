// components/Layout.tsx

import React, { ReactNode } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import {
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <View style={styles.container}>
            <ExpoStatusBar style="light" />
            <ImageBackground
                source={require('../assets/gradient.jpg')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                {children}
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
    },
})

export default Layout
