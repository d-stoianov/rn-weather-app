import { Weather } from '@/service/types'
import { formatCelsiusValue, formatTime } from '@/utils/format'
import { StyleSheet, Text, View } from 'react-native'

const WeatherCard = ({ weather }: { weather: Weather }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatTime(weather.date)}</Text>
            <Text style={styles.text}>
                {formatCelsiusValue(weather.temp)}° C
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    text: {
        width: 64,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
})

export default WeatherCard
