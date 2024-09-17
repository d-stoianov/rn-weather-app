import { WeatherCard } from '@/service/types'
import { formatCelsiusValue, formatDate } from '@/utils/format'
import { StyleSheet, Text, View } from 'react-native'

const Card = ({ card }: { card: WeatherCard }) => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.cityText}>{card.city.name}</Text>
                <Text style={styles.timeText}>{formatDate(card.date)}</Text>
            </View>
            <Text style={styles.degreesText}>
                {formatCelsiusValue(card.temp)}°{card.tempType}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    cityText: {
        fontSize: 24,
        color: 'white',
    },
    timeText: {
        fontSize: 16,
        color: 'white',
    },
    degreesText: {
        fontSize: 40,
        color: 'white',
    },
})

export default Card
