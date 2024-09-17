import React from 'react'
import Card from '@/components/Card'
import { ScrollView, StyleSheet, View } from 'react-native'
import { WeatherCard } from '@/service/types'

const CardList = ({ cards }: { cards: WeatherCard[] }) => {
    const sortedCards = sortCards(cards)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {sortedCards.map((c, idx) => (
                <View key={idx}>
                    <Card card={c} />
                    {/* add separator except the last item */}
                    {idx !== cards.length - 1 && (
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

function sortCards(cards: WeatherCard[]): WeatherCard[] {
    return cards.sort((a, b) => {
        // convert to one case
        const cityA = a.city.name.toUpperCase()
        const cityB = b.city.name.toUpperCase()

        if (cityA < cityB) {
            return -1
        }
        if (cityA > cityB) {
            return 1
        }

        // if city names are equal, sort by date
        if (a.date < b.date) {
            return -1
        }
        if (a.date > b.date) {
            return 1
        }

        return 0
    })
}

export default CardList
