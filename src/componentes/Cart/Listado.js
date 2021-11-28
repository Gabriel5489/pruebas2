import React, {useState, useCallback} from 'react'
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { View, Text, StyleSheet, Alert } from 'react-native';
import { map, size } from "lodash"
import { Avatar, Button, Card, Title, Paragraph, Snackbar } from 'react-native-paper';
import { WEB_URL } from '../../utils/constants';
import formStyle from '../../style/forms';
import {deleteProdApi} from '../../api/Products'
import Addresses from './Addresses'
import useAuth from "../../hooks/useAuth";
import {getAddressesApi} from '../../api/adress'

export default function Listado(props) {
    const { cart, setReloadCart } = props;
    const [input, setInput] = useState(false);
    const {auth} = useAuth();
    const [addresses, setAddresses] = useState(null);
    const [addres, setAddress] = useState(null);
    const [visible, setVisible] = React.useState(null);
    const navigation = useNavigation();
    console.log(cart);
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    useFocusEffect(
        useCallback(() => {
             (async ()=>{
                setAddresses(null);
               const response = await getAddressesApi(auth); 
                if(size(response) != 0){
                    setAddress(response[0]);
                    setVisible(false);
                }else{
                    setVisible(true);
                }
                setAddresses(response);
             })()
            },[])
    );
    
    const cambiarDir = (dir) => {
        setAddress(dir);
    }

    const goToDirecciones = () =>{
        navigation.navigate("Direcciones");
    }
    const GoToPay = () => {
        navigation.navigate('Payment', {addres, cart });
        /*
        navigation.navigate('Home', {
            screen: 'Payment',
            params: { addres, cart },
        });
        */
    }

    const deleteProdAlert = (cart) => {
        Alert.alert(
            "Eliminando Producto",
            `¿Estas seguro de que quieres eliminar el producto ${cart.vchProd}?`,
            [
                {
                    text: "No",
                },
                {
                    text: "SI",
                    onPress: () =>  deleteProd(cart.idCarrito),
                },
            ],
            {cancelable: false}
        );
    };
    
    const deleteProd = async (idCarrito) => {
        try {
            await deleteProdApi(idCarrito);
            setReloadCart(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            { map(cart, (carrito) => (
                <View key={carrito.idCarrito} style={Styles.container}>
                    <Card style={Styles.CardProd}>
                    <Card.Cover 
                    source={{uri: `${WEB_URL}/${carrito.vchImg}`}} />
                    </Card>
                    <Card style={Styles.CardInfo} >
                    <Card.Title title={carrito.vchProd} />
                    <Card.Content>
                        <Text style={Styles.textoInfo} >Precio: ${carrito.fltPrecio}</Text>
                        <Text style={Styles.textoInfo} >Descripción: {carrito.vchDesc}</Text>
                        <Text style={Styles.textoInfo} >Cantidad: {carrito.intCant}</Text>
                        <Text style={Styles.textoInfo} >Subtotal: ${carrito.fltTotal}</Text>
                    </Card.Content>
                    <View style={Styles.actions}>
                        <Button
                        mode="contained" color="#f00"
                        onPress={() => deleteProdAlert(carrito)}
                        >
                            Quitar del carrito
                        </Button>
                    </View>
                    </Card>
                    
                </View>
            )) }
            <Addresses addresses={addresses} addres={addres} cambiarDir={cambiarDir} ></Addresses>
            {size(addresses) != 0 ? (
                <Button icon="credit-card-outline" mode="contained" style={formStyle.btnPrimary} onPress={ GoToPay } > 
                Pagar
                </Button>
            ): 
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                    label: 'Ir a direcciones',
                    onPress: () => {
                        goToDirecciones();
                    },
                    }}>
                    Para poder pagar necesitas registrar al menos una dirección
                </Snackbar>
            }
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5
    },
    CardProd:{
        marginBottom: 20,
        width: "33%",
        height: "100%",
        padding: 10,
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 0,
        borderRightWidth: 0
    },
    CardInfo: {
        marginBottom: 10,
        width: "67%",
        height: "100%",
        padding: 5,
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 0,
        borderLeftWidth: 0
    },
    textoInfo:{
        fontSize: 16
    },
    actions:{
       flexDirection: "row", 
       justifyContent: "space-between",
       marginTop: 30,
    }
  });
  