import React, { useState, } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import Banners from "../componentes/Home/Banners"
import Products from "../componentes/Home/Products"
export default function Home({navigation}) {
    return (
        <>
            <ScrollView>
                <Banners/>
                <Products/>
                
            </ScrollView>
        </>
    )
}
