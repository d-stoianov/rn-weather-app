import { RootStackNavigationProp } from '@/App'
import { City } from '@/service/types'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CityCard = ({ city }: { city: City }) => {
    const { navigate } = useNavigation<RootStackNavigationProp<'Details'>>()

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigate('Details', { city: city.name })}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: city.picture }} style={styles.image} />
                <Text style={styles.text}>{city.name}</Text>
            </View>
        </TouchableOpacity>
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
