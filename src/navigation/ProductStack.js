import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from "../style/colors"
import Home from "../pantallas/Home"
import History from '../pantallas/History'
import Product from "../pantallas/Product/Product"
import SearchProducts from '../pantallas/Product/SearchProducts';
import Payment from '../pantallas/Buy/Payment'

export default function ProductStack() {
    Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.indigo },
                cardStyle: { backgroundColor: colors.bgLight },
            }} >

            <Stack.Screen name="Product" component={Home}
                options={{ headerShown: false }} />

            <Stack.Screen name="History" component={History}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ProductDetails" component={Product}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SearchProducts" component={SearchProducts}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AdvSearch" component={AdvSearch}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Payment" component={Payment}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    )
}
