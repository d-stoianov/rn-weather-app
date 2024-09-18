import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '@/screens/HomeScreen'
import DetailsScreen from '@/screens/DetailsScreen'

import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
    Home: undefined
    Details: { city: string }
}

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
    StackNavigationProp<RootStackParamList, T>

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, // hide default navigation header
                    cardStyle: { backgroundColor: 'transparent' },
                }}
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
