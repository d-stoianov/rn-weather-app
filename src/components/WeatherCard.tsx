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
        paddingHorizontal: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
})

export default WeatherCard
