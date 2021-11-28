import React from 'react'
import { IconButton } from 'react-native-paper';
import {createStackNavigator} from "@react-navigation/stack";
import Carrito from '../pantallas/Carrito';
import Payment from '../pantallas/Buy/Payment';
import Search from '../componentes/Search';
import colors from "../style/colors";
const Stack = createStackNavigator();

export default function ComprarStack({navigation}) {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor: colors.bgDark,
            headerStyle: {backgroundColor: colors.fontLight},
            cardStyle:{
                backgroundColor: colors.bgLight
            },
        }}
        >
            <Stack.Screen name="Cart" component={Carrito}
                options={{  title: "Carrito",
                    headerRight: () => (<IconButton icon="dots-vertical" onPress={() => { }} />),
                    headerLeft: () => (<IconButton icon="menu" onPress={() => { navigation.toggleDrawer(); }} />),
                }}
            /> 
            <Stack.Screen name="Payment" component={Payment}
                options={{ headerShown:false }}
            />
           
        </Stack.Navigator>
    );
}