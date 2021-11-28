import React, { useState, useCallback } from "react";
import {useFocusEffect} from "@react-navigation/native"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import ListadoCart from './Listado';
import useAuth from "../../hooks/useAuth";
import { cartUser } from "../../api/Products"
import formStyle from '../../style/forms';
import {size} from "lodash";

export default function Carrito() {
  const [cart, setCart] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const {auth} = useAuth();
  useFocusEffect(
    // (async () => {
    //   const response = await cartUser(auth);
    //   setCart(response);
    //   setReloadCart(true);
    // })();
    useCallback(() => {
      setCart(null);
       (async ()=>{
         const response = await cartUser(auth); 
          setCart(response);
          setReloadCart(false);
       })()
      },[reloadCart])
  );

  return (
    <View style={Styles.container}>
      {!cart ?(
              <ActivityIndicator size="large" style={Styles.loading} />
          ): cart == 0 ? (
              <Text style={Styles.noAddresText}>No tienes productos en tu carrito</Text>
          ): (
          <ListadoCart cart={cart} setReloadCart={setReloadCart} />
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  noAddresText:{
      fontSize: 16,
      marginTop: 10,
      textAlign:"center",
  },
  loading:{
      marginTop: 20,
  },
});
