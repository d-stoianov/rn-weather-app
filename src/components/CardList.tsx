import React from 'react'
import Card from '@/components/Card'
import { ScrollView, StyleSheet, View } from 'react-native'

const CardList = ({ cards }: { cards: any[] }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {cards.map((_c, idx) => (
                <View key={idx}>
                    <Card />
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

export default CardList
