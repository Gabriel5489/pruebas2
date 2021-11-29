import React, {useState} from 'react'
import { IconButton, Modal, Text, Portal, Provider, View, Checkbox, Card, Avatar, Button } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer'
import {useFormik} from 'formik';
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
import SearchAvanzada from '../componentes/Search/SearchAvanzada';
import ProductList from '../componentes/Search/ProductList';

import {createStackNavigator} from "@react-navigation/stack";
import { useNavigation, } from '@react-navigation/native';
import { advSearch } from '../api/Search';


const Drawer = createDrawerNavigator();

export default function AppNavigation(navigation) {
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [loading, setloading] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle =  { backgroundColor:'white', padding: 20};

    const formik = useFormik({
        initialValues: initialValues(),
        onSubmit: async (formData) => {
            hideModal();
            try{
                const response = await advSearch(formData);
                
            }catch (error){
                console.log(error);
            }
        }
    });

    return (
        <>
            <Portal>
                <Modal 
                visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                    <Card.Title title="Busqueda avanzada" />
                        <Checkbox.Item
                        label="Extra Chica" 
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked);
                          checked ? formik.setFieldValue("extra_chica", "") : formik.setFieldValue("extra_chica", "extra chica");
                        }} />

                        <Checkbox.Item
                        label="Chica" 
                        status={checked2 ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked2(!checked2);
                          checked2 ? formik.setFieldValue("chica", "") : formik.setFieldValue("chica", "chica");
                        }} />

                        <Checkbox.Item
                        label="Mediana" 
                        status={checked3 ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked3(!checked3);
                          checked3 ? formik.setFieldValue("mediana", "") : formik.setFieldValue("mediana", "mediana");
                        }} />

                        <Checkbox.Item
                        label="Grande" 
                        status={checked4 ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked4(!checked4);
                          checked4 ? formik.setFieldValue("grande", "") : formik.setFieldValue("grande", "grande");
                        }} />
                    <Button
                    icon="filter"
                    mode="contained"
                    style={{marginTop: 30}}
                    onPress={ formik.handleSubmit } >Buscar</Button>
                </Modal>
            </Portal>
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
                    ), headerShown: true, headerRight: () => (<IconButton icon="dots-vertical" onPress={ () => { showModal() }} />),
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
     </>   
    )
}

function initialValues(){
    return{
        extra_chica:"",
        chica:"",
        mediana:"",
        grande:""
    }
};