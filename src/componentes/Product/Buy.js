import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Snackbar } from 'react-native-paper'
import {useNavigation} from "@react-navigation/native";
import colors from '../../style/colors';
import formStyle from '../../style/forms';
import {addCart} from '../../api/Products'
import useAuth from "../../hooks/useAuth";

export default function Buy(props) {
    const {auth} = useAuth();
    const { product, cant} = props;
    const [visible, setVisible] = React.useState(false);
    const navigation = useNavigation();

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const AddProductCart = () => {
        console.log("Añadido al carrito");
        onToggleSnackBar();
        const response = addCart(product, auth, cant);
        console.log(response);
    }
    return (
        <View style={Styles.container}>
            <Button icon="cart" mode="contained" style={formStyle.btnPrimary} onPress={ AddProductCart } > 
                Agregar al carrito
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Ir al carrito',
                onPress: () => {
                    navigation.navigate("Buy", { screen: "Cart" } );
                },
                }}>
                Agregado al carrito
            </Snackbar>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        paddingTop:20,
    }
})