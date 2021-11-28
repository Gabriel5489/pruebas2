import React, { useState, useCallback } from "react";
import {useFocusEffect} from "@react-navigation/native"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import ListadoCart from './Listado';
import useAuth from "../../hooks/useAuth";
import { favUser } from "../../api/Products"
import formStyle from '../../style/forms';
import {size} from "lodash";

export default function Favorite() {
  const [favorite, setFavorite] = useState(null);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const {auth} = useAuth();

  useFocusEffect(
    // (async () => {
    //   const response = await cartUser(auth);
    //   setCart(response);
    //   setReloadCart(true);
    // })();
    useCallback(() => {
      setFavorite(null);
       (async ()=>{
         const response = await favUser(auth); 
          setFavorite(response);
          setReloadFavorite(false);
       })()
      },[reloadFavorite])
  );

  return (
    <View style={Styles.container}>
      {!favorite ?(
              <ActivityIndicator size="large" style={Styles.loading} />
          ): favorite == 0 ? (
              <Text style={Styles.noAddresText}>Aún no tienes productos favorios</Text>
          ): (
          <ListadoCart favorite={favorite} setReloadFavorite={setReloadFavorite} />
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
