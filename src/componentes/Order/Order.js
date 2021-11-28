import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
import { WEB_URL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import colors from "../../style/colors";
export default function Product(props) {
	const { det, products } = props;
	const nav = useNavigation();
	const calcPrice = (price, cant) => {
		return (price * cant).toFixed(2);
	};
	const GoToProduct = (id) => {
		nav.navigate("MyOrder", { id: id });
	};
	det.producto.intCant = det.intCant;
	det.producto.fltPrecio = det.fltPrecio;

	products.push(det.producto);
	let nombres = "";
	nombres += det.producto.vchProd + "/";
	return (
		<TouchableOpacity
			style={Styles.product}
			onPress={() => {
				GoToProduct(det.intIdVenta);
			}}>
			<View style={Styles.containerImage}>
				<Image
					style={Styles.image}
					source={{ uri: `${WEB_URL}/${det.producto.vchImg}` }}
				/>
			</View>
			<View style={Styles.info}>
				<View>
					<Text style={Styles.name} numberOfLines={3} ellipsizeMode='tail'>
						{det.producto.vchProd}
					</Text>
					<View style={Styles.prices}>
						<Text>Cantidad: {det.intCant}</Text>
						<Text>Subtotal: ${calcPrice(det.fltPrecio, det.intCant)}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}
const Styles = StyleSheet.create({
	product: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 15,
		backgroundColor: colors.success,
	},
	containerImage: {
		width: "45%",
		height: 100,
		backgroundColor: colors.success,
		padding: 5,
	},
	image: {
		height: "100%",
		resizeMode: "contain",
	},
	info: {
		padding: 10,
		width: "60%",
		justifyContent: "space-between",
	},
	name: {
		color: colors.fontLight,
	},
	prices: {
		//flexDirection: "row",
		//flexDirection:"column",
		marginTop: 5,
		alignItems: "flex-start",
	},
	currentPrice: {
		fontSize: 22,
	},
});
