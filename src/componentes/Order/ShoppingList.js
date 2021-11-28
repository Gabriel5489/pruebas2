import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import {  Title, Button } from "react-native-paper"
import { map } from "lodash"
import Shopping from "./Shopping"

export default function ShoppingList(props) {
    const { shopping } = props;
    return (
        <SafeAreaView style={Styles.container} >
            {map(shopping, (shop) => (
                    <Shopping key={shop.intIdVentaDet} det={shop} /> 
                ))
             }
        </SafeAreaView>
    )
}    
const Styles = StyleSheet.create({
    container: {
        padding:10,
    },
    total:{
        alignItems:"flex-end"
    }
});