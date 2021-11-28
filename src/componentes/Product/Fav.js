import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Snackbar } from 'react-native-paper'
import {useNavigation} from "@react-navigation/native";
import colors from '../../style/colors';
import formStyle from '../../style/forms';
import {addFavorito} from '../../api/Products'
import useAuth from "../../hooks/useAuth";

export default function Fav(props) {
    const {auth} = useAuth();
    const [visible, setVisible] = React.useState(false);
    const navigation = useNavigation();

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);


    const AddProductFav = () => {
        const { product, } = props;
        onToggleSnackBar();
        const response = addFavorito(product, auth);
    }
    return (
        <View style={Styles.container}>
            <Button icon="heart" mode="contained" style={formStyle.btnDelete} onPress={ AddProductFav } > 
                Agregar a favoritos
            </Button>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Ir a favoritos',
                onPress: () => {
                    navigation.navigate("Favoritos");
                },
                }}>
                Agregado a favoritos
            </Snackbar>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
})