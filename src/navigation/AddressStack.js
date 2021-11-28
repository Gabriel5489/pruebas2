import React from 'react'
import { IconButton } from 'react-native-paper';
import {createStackNavigator} from "@react-navigation/stack";
import Adresses from "../pantallas/Favoritos";
import AddAddress from "../pantallas/AddAddress";
import colors from "../style/colors";
import Search from '../componentes/Search';

const Stack = createStackNavigator();

export default function AccountStack({navigation}) {
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

         <Stack.Screen
         name="adresses"
         component={Adresses}
         options={{
             title: "Mis direcciones",
             headerTitle: () => (<Search />), 
             headerRight: () => (<IconButton icon="dots-vertical" onPress={() => { }} />),
             headerLeft: () => (<IconButton icon="menu" onPress={() => { navigation.toggleDrawer(); }} />),
         }}
         /> 
          <Stack.Screen
         name="add-address"
         component={AddAddress}
         options={{
             title: "Nueva direccion",
         }}
         /> 
           
        </Stack.Navigator>
    );
}