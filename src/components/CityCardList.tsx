import React from 'react'
import CityCard from '@/components/CityCard'
import { ScrollView, StyleSheet, View } from 'react-native'
import { City } from '@/service/types'

const CityCardList = ({ cities }: { cities: City[] }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {cities.map((c, idx) => (
                <View key={idx}>
                    <CityCard city={c} />
                    {/* add separator except the last item */}
                    {idx !== cities.length - 1 && (
                        <View style={styles.separator}></View>
                    )}
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 56,
    },
    separator: {
        marginBottom: 32,
    },
})

export default CityCardList
