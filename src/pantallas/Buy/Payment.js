import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { TextInput, Button, FAB, Portal } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Card from "../../componentes/Buy/Card"
import Message from '../../componentes/Message';
import { size } from "lodash"
import { STRIPE_KEY_PUBLIC } from '../../utils/constants';
const stripe = require('stripe-client')(`${STRIPE_KEY_PUBLIC}`);
import { PaymentApi } from '../../api/Payment';
import formStyle from '../../style/forms';
import colors from '../../style/colors';
import useAuth from '../../hooks/useAuth';
let total;
export default function Payment(props) {
    const { route:{ params } } = props;
    console.log(params);
    const [onChange, setOnChange] = useState(null)
    const [textCard, setTextCard] = useState(null)
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const nav = useNavigation();
    //Mensaje de snackbar
    const [msg, setMsg] = useState(false);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = (dato) => { 
        setVisible(!visible) 
        setMsg(dato);
    };
    useFocusEffect(
        useCallback(
            () => {
                total = 0;
                for (const product of params?.cart){
                    total += product.fltTotal;
                }
            },[]
        )
    );
    const Pagar = async() => {
        setLoading(true);
        try {
            //console.log(onChange.values);
            //console.log(onChange.values.expiry.split('/',1));
            const fecha = onChange.values.expiry.split('/');
            if (onChange.status.name === "valid" &&
                onChange.status.number === "valid" &&  
                onChange.status.expiry === "valid" &&  
                onChange.status.cvc === "valid" &&
                onChange.valid
            ){
                var result = await stripe.createToken({card: {
                    "name": onChange.values.name,   
                    "number": onChange.values.number,
                    "exp_month": fecha[0],
                    "exp_year": fecha[1],
                    "cvc": onChange.values.cvc
                }});
            
                if(result?.error){
                    setLoading(false);
                    onToggleSnackBar(`${result.error.message}`);
                }
                else{
                    const response = await PaymentApi(
                        result.id,
                        auth.idUser,
                        params?.addres,
                        params?.cart
                    );
                    console.log(response);
                    if( response !=null ){
                        nav.navigate("Orders", {screen: "MyShopping"});
                        const dato = "Pedido realizado";
                        onToggleSnackBar(dato);
                        setLoading(false);
                    }else{
                        const dato = "Error al realizar pedido";
                        onToggleSnackBar(dato);
                        setLoading(false);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            const dato = "Error al procesar el pago intente nuevamente";
            onToggleSnackBar(dato);
            setLoading(false);
        }      
        setLoading(false);


    }

    return (
        <>
        <View style={Styles.font} ></View>
        <SafeAreaView style={Styles.container}>
            <Card setOnChange={setOnChange} setTextCard={setTextCard} />           
            <FAB
                label={`Pagar: $${total}`}
                style={[Styles.fab, formStyle.btnSuccess]}
                color= "#fff"                
                icon="credit-card-outline"
                loading={loading}
                onPress={!loading && Pagar}
            />
            <Message visible={visible} onDismissSnackBar={onDismissSnackBar} msg={msg} />

        </SafeAreaView>
        </>
    )
}
const Styles = StyleSheet.create({
    container:{
        padding:10,
        flex: 1,
        marginTop: 100,
    },
    inputContainer:{
        borderBottomWidth: 1,  borderBottomColor: "blue"
    },
    fab: {
        position: 'absolute',
        marginRight: 110,
        justifyContent: "center",
        alignItems:"center",
        right: 0,
        bottom: 0,
      },
}) 
