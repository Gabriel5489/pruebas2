import React from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper';
import useAuth from "../hooks/useAuth";
import s from './style';
export default function CustomDrawerContent(props) {
    const {logout} = useAuth();

    const logoutAccount = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres cerrar sesión?",
            [
                {
                    text:"NO",
                },
                {
                    text: "SI", onPress: logout
                }
            ],
            {cancelable: false}
        );
    }
    return (
        <DrawerContentScrollView {...props}>
            <View style={s.bgContainer}>
                <TouchableOpacity>
                    <View style={s.userContainer}>
                        <Image style={s.userImagen} source={require('../../assets/Logo.jpeg')} />
                        <View style={s.camaraContainer}>
                            <Image style={s.camaraIcon} source={require('../../assets/photo-camera.png')} />
                        </View>
                    </View>
                    <View style={s.userNombre}>
                        <Text style={s.userTitulo}>Huastecas</Text>
                        <Text style={s.userSubTitulo}>Ver Perfil</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem {...props}
                label="Help"
                onPress={() => { }}
            />
            <Drawer.Item
                icon="logout"
                label="Cerrar sesion"
                onPress={logoutAccount}
            />
        </DrawerContentScrollView>
    );
}

/*
        <Drawer.Item
            icon="home"
            label="Inicio"
            active={active === 'Inicio'}
            onPress={  () => { navigation.navigate('Home'); setActive('Inicio'); } }
        />
        <Drawer.Item
            icon="heart"
            label="Favoritos"
            active={active === '2'}
            onPress={  () => { navigation.navigate('Favoritos'); setActive('Favoritos'); } }
        />
        <Drawer.Item
            icon="cart"
            label="Carrito"
            active={active === 'Carrito'}
            onPress={  () => { navigation.navigate('Carrito'); setActive('Carrito'); } }
        />
        */