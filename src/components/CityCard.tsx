import { RootStackNavigationProp } from '@/App'
import { City } from '@/service/types'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const CityCard = ({ city }: { city: City }) => {
    const { navigate } = useNavigation<RootStackNavigationProp<'Details'>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigate('Details', { city: city.name })}
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: city.picture }}
                    cachePolicy={'disk'}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                />
                {isLoading ? (
                    <ActivityIndicator style={styles.loader} />
                ) : (
                    <Text style={styles.text}>{city.name}</Text>
                )}
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
    loader: {
        position: 'absolute',
    },
    text: {
        fontSize: 32,
        textAlign: 'center',
        color: 'white',
        position: 'absolute',
    },
})

export default CityCard
