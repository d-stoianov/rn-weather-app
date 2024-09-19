// components/Layout.tsx

import { LinearGradient } from 'expo-linear-gradient'
import React, { ReactNode } from 'react'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0055D3', '#4D86E4', '#B0C6FF']}
                style={styles.gradient}
            >
                <ExpoStatusBar style="light" />
                {children}
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Layout
