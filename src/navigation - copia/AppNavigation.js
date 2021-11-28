import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Button, Searchbar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from '../componentes/Search';
import ProductStack from './ProductStack';
import Favoritos from "../pantallas/Favoritos";
import Carrito from '../pantallas/Carrito';
import Account from '../pantallas/Account';
import Favorite from '../pantallas/Favorite'
import CustomDrawerContent from "./CustomDrawerContent"
const Drawer = createDrawerNavigator();
import colors from '../style/colors';
import AddAddress from '../pantallas/AddAddress';
import AccountStack from './AccountStack';

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
                    ), headerShown: true, headerRight: () => (<Button icon="camera" onPress={() => { }} />),
                    gestureEnabled: true,
                    ///headerLeft: () => (<Button onPress={() => { console.log("Press") }} ><MaterialCommunityIcons name="home" color={colors.success} size={40} /> </Button>)

                }}
                    onLayout={(e) => { console.log(e.nativeEvent.layout.height) }}
                />
                <Drawer.Screen name="Direcciones" component={AccountStack} options={{
                    drawerLabel: 'Direcciones', 
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car" color={color} size={26} />
                    ), headerShown: false, headerRight: () => (<Button icon="camera" onPress={() => { }} />),
                    gestureEnabled: true,
                }}
                />

                <Drawer.Screen name="Favoritos" component={Favorite} options={{
                    drawerLabel: 'Favoritos',
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={26} />
                    ), headerShown: true, headerRight: () => (<Button icon="camera" onPress={() => { }} />),
                    gestureEnabled: true
                }}
                />

                <Drawer.Screen name="Carrito" component={Carrito} options={{
                    drawerLabel: 'Carrito',
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={26} />
                    ),headerShown: true, headerRight: () => (<Button icon="camera" onPress={() => { }} />),
                    gestureEnabled: true,
                }}
                />

                <Drawer.Screen name="Account" component={AccountStack} options={{
                    drawerLabel: 'Cuenta ',
                    headerTitle: () => (<Search />),
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-details-outline" color={color} size={26} />
                    ),headerShown: false, headerRight: () => (<Button icon="camera" onPress={() => { }} />),
                    gestureEnabled: true
                }}
                />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}
