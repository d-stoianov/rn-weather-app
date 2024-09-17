import { City } from '@/service/types'
import { Image, StyleSheet, Text, View } from 'react-native'

const CityCard = ({ city }: { city: City }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: city.picture }} style={styles.image} />
                <Text style={styles.text}>{city.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: '100%',
        backgroundColor: '#CCCA12F',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 4,
        borderRadius: 12,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    text: {
        fontSize: 32,
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
    },
})

export default CityCard
