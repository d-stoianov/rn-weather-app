import { RootStackParamList } from '@/App'
import Layout from '@/components/Layout'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Button, StyleSheet, Text, View } from 'react-native'

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>

const DetailsScreen = () => {
    const { goBack } = useNavigation()
    const route = useRoute<DetailsScreenRouteProp>()

    const { city } = route.params

    console.log('city: ', city)

    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.text}>{city}</Text>
                <Button title="Go to Home" onPress={goBack} />
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 64,
        paddingBottom: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
    },
})

export default DetailsScreen
