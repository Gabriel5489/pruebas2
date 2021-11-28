import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Subheading,   } from "react-native-paper"
import { map } from "lodash"
import { WEB_URL } from '../../utils/constants';
import { useNavigation } from "@react-navigation/native"
import colors from '../../style/colors';
export default function Listado(props) {
    const { products } = props;
    const nav = useNavigation();
    const GoToProduct = (id) => {
        nav.navigate ("ProductDetails", { idProd: id} );
    } 
    return (
        <View style={Styles.container}>
            { map(products, (product) => (
                <Card key={product.intIDProd} elevation={20} style={Styles.CardProd} onPress={ () => GoToProduct(product.intIDProd) }>
                    <Card.Cover source={{ uri: `${WEB_URL}/${product.vchImg}` }} />
                    <Card.Content>
                        <Subheading numberOfLines={1} style={{color: "#fff"}}> {product.vchProd} </Subheading>
                    </Card.Content>

                </Card>
            ))}
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",

    },
    CardProd:{
        marginBottom: 20,
        width: "48%",
        padding: 5,
        backgroundColor: colors.success
    },
})