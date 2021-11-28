import React from 'react'
import { IconButton } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from '../componentes/Search';
import ProductStack from './ProductStack';
import BuyStack from './BuyStack';
import OrderStack from './OrderStack';
import Favorite from '../pantallas/Favorite'
import CustomDrawerContent from "./CustomDrawerContent"
import AddressStack from './AddressStack';
import AccountStack from './AccountStack'
import colors from '../style/colors';
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
                drawerStyle={{
                    backgroundColor: '#c6cbef',
                }}
                drawerContent={props => <CustomDrawerContent {...props} />}
                drawerType="slide"
                overlayColor="transparent"

            >
                <Drawer.Screen name="Home" component={ProductStack} options={{
                    drawerLabel: 'Home', headerTitle: () => (
                        <Search />),
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ), headerShown: true, headerRight: () => (<IconButton icon="dots-vertical" onPress={() => { }} />),
                    gestureEnabled: true,
                    ///headerLeft: () => (<Button onPress={() => { console.log("Press") }} ><MaterialCommunityIcons name="home" color={colors.success} size={40} /> </Button>)

                }}
                    onLayout={(e) => { console.log(e.nativeEvent.layout.height) }}
                />
                <Drawer.Screen name="Direcciones" component={AddressStack} options={{
                    drawerLabel: 'Direcciones', 
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car" color={color} size={26} />
                    ), headerShown: false,
                }}
                />

                <Drawer.Screen name="Favoritos" component={Favorite} options={{
                    drawerLabel: 'Favoritos',
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={26} />
                    ), headerShown: true, headerRight: () => (<IconButton icon="dots-vertical" onPress={() => { }} />),
                    gestureEnabled: true
                }}
                />

                <Drawer.Screen name="Buy" component={BuyStack} options={{
                    drawerLabel: 'Carrito',
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={26} />
                    ),headerShown: false,
                    gestureEnabled: true,
                }}
                />

                <Drawer.Screen name="Orders" component={OrderStack} options={{
                    drawerLabel: 'Pedidos',
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="clipboard-list" color={color} size={26} />
                    ),headerShown: false,
                    gestureEnabled: true,
                }}
                />

                <Drawer.Screen name="Account" component={AccountStack} options={{
                    drawerLabel: 'Cuenta ',
                    headerTitle: () => (<Search />),
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-details-outline" color={color} size={26} />
                    ),headerShown: false, gestureEnabled: true
                }}
                />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}
