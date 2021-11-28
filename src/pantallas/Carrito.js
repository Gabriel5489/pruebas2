import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Cart from "../componentes/Cart/Carrito";

export default function Carrito() {
    return(
    <>
        <ScrollView>
            <Cart></Cart>
        </ScrollView>
    </>
    )
}
const Styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
