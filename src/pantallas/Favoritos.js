import React, {useCallback, useState} from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, TouchableWithoutFeedback} from 'react-native'
import {IconButton} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {getAddressesApi} from "../api/adress";
import useAuth from "../hooks/useAuth";
import {size} from "lodash";
import AddressList from "../componentes/Address/AddressList";

export default function Adresses() {
    const {auth} = useAuth();
    const [addresses, setAddresses] = useState(null);
    const [reloadAddress, setReloadAddress] = useState(false);
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            setAddresses(null);
             (async ()=>{
               const response = await getAddressesApi(auth); 
                setAddresses(response);
                setReloadAddress(false);
             })()
            },[reloadAddress])
    );
    return (
        <ScrollView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("add-address")}>
            <View style={styles.addAdress}>
                <Text style={styles.addAdressText}>
                    Añadir una direccion
                </Text>
                <IconButton icon="arrow-right" color="#000" size={19} />
            </View>
            </TouchableWithoutFeedback>
            {!addresses ?(
                <ActivityIndicator size="large" style={styles.loading} />
            ): size(addresses) === 0 ? (
                <Text style={styles.noAddresText}>Crea tu primera direccion</Text>
            ): (
            <AddressList addresses={addresses} 
            setReloadAddress={setReloadAddress}
            />
            )}
        </ScrollView>
            
         
    );
}

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    title:{
        fontSize:20
    },
    addAdress:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    addAdressText:{
        fontSize: 16,
    },
    loading:{
        marginTop: 20,
    },
    noAddresText:{
        fontSize: 16,
        marginTop: 10,
        textAlign:"center",
    },
});