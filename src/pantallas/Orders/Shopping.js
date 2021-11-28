import React, { useState, useCallback } from 'react'
import { ScrollView, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { GetShoppingApi } from "../../api/Order"
import size from "lodash"
import useAuth from '../../hooks/useAuth';
import Load from "../../componentes/Loading";
import NoFoundShopping from "../../componentes/Order/NoFoundShopping"
import ShoppingList from "../../componentes/Order/ShoppingList"

export default function Shopping() {
    const [shopping, setShopping] = useState(null);
    const { auth } = useAuth();
    useFocusEffect(
      useCallback(() => {
        (async () => {
            let controller = new AbortController();
            let signal = controller.signal;
            const response = await GetShoppingApi(auth,signal);
            const OrderTemp = [];
            for await (const order of response){
                for await (const det of order.dets){
                    OrderTemp.push(det);
                }
            }
            setShopping(OrderTemp);
            controller.abort();
        })();
      }, [])
    );
    return (
        <>
            <ScrollView>
                {!shopping ? (
                    <Load />
                ) : size(shopping) === 0 ?(
                    <NoFoundShopping />
                ) : (
                    <ShoppingList shopping={shopping} />
                )}
            </ScrollView>

        </>
    )
}
