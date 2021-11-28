import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';
import { map } from "lodash"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { WEB_URL } from '../../utils/constants';
import formStyle from '../../style/forms';
import {deleteFavApi} from '../../api/Products'
import {useNavigation} from "@react-navigation/native";

export default function Listado(props) {
    const { favorite, setReloadFavorite } = props;
    const navigation = useNavigation();

    const deleteFavAlert = (favorito) => {
        Alert.alert(
            "Eliminando direccion",
            `¿Estas seguro de que quieres eliminar el producto ${favorito.vchProd}?`,
            [
                {
                    text: "No",
                },
                {
                    text: "SI",
                    onPress: () =>  deleteFav(favorito.idFavorito),
                },
            ],
            {cancelable: false}
        );
    };
    
    const deleteFav = async (idFavorito) => {
        try {
            await deleteFavApi(idFavorito);
            setReloadFavorite(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            { map(favorite, (favorito) => (
                <View key={favorito.idFavorito} style={Styles.container}>
                    <Card style={Styles.CardProd}>
                    <Card.Cover 
                    source={{uri: `${WEB_URL}/${favorito.vchImg}`}} />
                    </Card>
                    <Card style={Styles.CardInfo} >
                    <Card.Title title={favorito.vchProd} />
                    <Card.Content>
                        <Text style={Styles.textoInfo} >Precio: ${favorito.fltPrecio}</Text>
                        <Text style={Styles.textoInfo} >Cantidad: {favorito.intCant}</Text>
                    </Card.Content>
                    <View style={Styles.actions}>
                        <Button
                        mode="contained" color="#f00"
                        onPress={() => deleteFavAlert(favorito)}
                        >
                            Quitar de favoritos
                        </Button>
                    </View>
                    </Card>
                    
                </View>
            )) }
            <Button icon="heart" mode="contained" style={formStyle.btnPrimary} onPress={() => {navigation.navigate("Home")}}  > 
                Añadir otro
            </Button>
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
  