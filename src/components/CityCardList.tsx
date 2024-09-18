import React from 'react'
import CityCard from '@/components/CityCard'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { City } from '@/service/types'
import { translate } from '@/localization'

const CityCardList = ({ cities }: { cities: City[] }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {translate('exploreTheWeather')}
                </Text>
            </View>
            <View>
                {cities.map((c, idx) => (
                    <View key={idx}>
                        <CityCard city={c} />
                        {/* add separator except the last item */}
                        {idx !== cities.length - 1 && (
                            <View style={styles.separator}></View>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 64,
        paddingBottom: 48,
        gap: 20
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
    separator: {
        marginBottom: 32,
    },
})

export default CityCardList
