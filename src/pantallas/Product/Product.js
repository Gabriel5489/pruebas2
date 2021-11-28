import React, { useState, useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, Title } from 'react-native-paper'
import { getProductApi } from "../../api/Products"
import Price from '../../componentes/Product/Price';
import Quantity from '../../componentes/Product/Quantity';
import Buy from '../../componentes/Product/Buy';
import Notification from "../../componentes/Product/Notification"
import Fav from "../../componentes/Product/Fav"
import Slider from '../../componentes/Product/Slider';
import Load from "../../componentes/Loading"

export default function Product(props) {
    const { route:{ params } } = props;
    const [product, setProduct] = useState(null);
    const [cant, setCant] = useState(1)
    useEffect(() => {
      ( async () => {
        const response = await getProductApi(params.idProd);
        setProduct(response);
      })()
    }, [params]);
    const cambiarCant = (cant) => {
        setCant(cant);
    }
    return (
        <>
            {! product ? (
                <Load/>
            ): (
            <View>
                <ScrollView >
                    <View style={Styles.container}>
                        <Title>{ product.vchProd }</Title>
                    </View>
                    <Slider images={product.vchImg}/>
                    <View style={Styles.container}>
                        <Price price={product.fltPrecio} discount={product.discount} /> 
                        {product.intCant > 0  ? (
                            <>
                            <Quantity product={product} cant={cant} cambiarCant={cambiarCant} />
                            <Buy product={product} cant={cant} />
                            </>
                        ):(
                            <Notification product={product} />
                        )}
                        <Fav product={product} />
                    </View>
                    
                </ScrollView>    
            </View>
            )}
        </>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding:10,
        paddingLeft:20,
    }
})