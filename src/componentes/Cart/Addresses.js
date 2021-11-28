import React, { useState, useCallback } from 'react'
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Avatar, Button, IconButton, Title, Paragraph, Portal, Dialog, TextInput, Text} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {map, size} from "lodash"
import {useFormik} from "formik";
import * as Yup from "yup";
import colors from '../../style/colors'
import formStyle from '../../style/forms';
import {getAddressesApi} from '../../api/adress'

let quantityform = 0;
export default function Addresses(props) {
    const { addresses, cambiarDir, addres } = props;
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    

    ///Dialog
    const showDialog = () =>{
        setVisible(true);
        setInput(false);
    } 
    const hideDialog = () => setVisible(false);

    const formik = useFormik({
        initialValues: valInicial(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            setLoading(true);
            try {
                cambiarDir(formData.cantProd);

            } catch (error) {
                console.log(error);
            }
            setLoading(false);
            hideDialog();
        }
    })
    
    ///Llena el array de cantidad de productos
    // let DataQuantity = new Array();
    // let i = 0, n = 1, texto = "unidad", vueltas = 6 ;
    // if(product.intCant < 6) vueltas = product.intCant;

    // for( i = vueltas; i > 0; i--){   
    //     DataQuantity.push({
    //         title: `${n} ${texto}`,
    //         value: n,
    //     });
    //     texto = "unidades";
    //     n++;
    // }
    
    const mostrarIput = () =>{
        setInput(true);
    }

    const goToAddress = () =>{
        navigation.navigate("Direcciones");
    }
    ///Numero de validacion del input
    // quantityform =+ product.intCant;
    return (
        <View style={Styles.container}>
            {size(addresses) != 0 ? (
                <>
                <Card mode="outline" style={Styles.container} elevation={10} onPress={showDialog} >
                <Card.Title title={`Dirección:`} subtitle={`${addres.title}`}
                    left={(props) => <Avatar.Icon {...props} backgroundColor={colors.success} icon="car" />}
                    right={(props) => <IconButton {...props} icon="arrow-right" />}
                />
                </Card>
                <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} >
                    <Dialog.Title>Elegir Dirección</Dialog.Title>
                    <Dialog.Content >
                        {map(addresses, (direcciones)=>(
                            <TouchableOpacity key={direcciones._id} onPress={ () => { cambiarDir(direcciones); hideDialog(); } }
                            style={Styles.plus} 
                            >
                                <Title>{direcciones.title}</Title>
                                <Text><MaterialCommunityIcons name="arrow-right" size={26} /></Text>                                  
                        </TouchableOpacity> 
                        ))}
                    </Dialog.Content>
                </Dialog>
                </Portal>
                </>
            ): 
            <Text ></Text>
            }
        </View>
    )
}
function valInicial(){
    return {
        cantProd:"",
    }
}
function validationSchema() {
    return{
        cantProd: Yup.number().positive().integer().min(1,true).max(quantityform,true).required(true),
    }
}
const Styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingBottom: 10
    },
    plus:{
        padding:15,
        borderWidth:0.5,
        borderRightWidth: 0,
        borderLeftWidth:0,
        borderTopWidth:0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    item:{
        padding:15,
        borderWidth:0.5,
        borderRightWidth: 0,
        borderLeftWidth:0,
        borderTopWidth:0,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor:colors.success
    },
    stock:{ fontWeight: "bold" },
})
