import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper';
import { getProductsApi } from '../../api/Products'
import Listado from './Listado';
export default function Products() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getProductsApi();
            setProducts(response);
        })()
    }, [])
    return (
        <View style={Styles.container}>
            <Title>Productos</Title>
            {products && <Listado products={products} />}
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})
