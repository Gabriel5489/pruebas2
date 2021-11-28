import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Invoice() {
	return (
		<SafeAreaView style={Styles.container}>
			<Text>Factura</Text>
		</SafeAreaView>
	);
}
const Styles = StyleSheet.create({
	container: {
		paddingLeft: 10,
		paddingTop: 0,
	},
});
