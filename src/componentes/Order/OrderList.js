import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Title, Button, Card, Paragraph } from "react-native-paper";
import { map } from "lodash";
import Order from "./Order";
import { AddInvoiceApi, GetInvoiceApi } from "../../api/Invoice";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

export default function ProductList(props) {
	const { order } = props;
	const [products, setProducts] = useState([]);
	const [invoiceURL, setInvoiceURL] = useState(null);
	const nav = useNavigation();
	const { auth } = useAuth();
	const [loading, setLoading] = useState(false);
	const GoToInvoice = async () => {
		try {
			setLoading(true);
			let response;
			if (order.vchIdFactura === "") {
				/*let nombres = " ";
				for (let x = 0; x < products.length; x++) {
					nombres += products[x].vchProd + "1";
				}*/
				response = await AddInvoiceApi(products, order.intIdVenta, auth.idUser);
				console.log("Entro:++");
				console.log(response.invoice_pdf);
			} else if (order.vchIdFactura != null) {
				response = await GetInvoiceApi(order.vchIdFactura);
				console.log(response.invoice_pdf);
				console.log("Kena unkaj factura:)");
			}
			setLoading(false);
			nav.navigate("MyInvoice", { invoiceURL: response.invoice_pdf });
		} catch (error) {
			return error;
		}
	};
	return (
		<SafeAreaView style={Styles.container}>
			{map(order.dets, (order) => (
				<Order key={order.intIdVentaDet} det={order} products={products} />
			))}
			<View>
				<Text>Fecha de compra: {order.created_at}</Text>
				<View style={Styles.total}>
					<Title>Total pagado: ${order.Total_Venta}</Title>
				</View>
				<Title>Direccion de envio</Title>
				<Card mode='outlined' style={Styles.card}>
					<Card.Content>
						<Title>{order.direccion.vchTitulo}</Title>
						<Paragraph>{order.direccion.usuario.name}</Paragraph>
						<Paragraph>{order.direccion.vchDireccion}</Paragraph>
						<View style={Styles.containerCard}>
							<Paragraph>{order.direccion.vchPoblacion}, </Paragraph>
							<Paragraph>{order.direccion.vchEstado}, </Paragraph>
							<Paragraph>{order.direccion.vchCodigo}</Paragraph>
						</View>
						<Paragraph>{order.direccion.vchPais}</Paragraph>
						<Paragraph>Celular: {order.direccion.usuario.cel}</Paragraph>
					</Card.Content>
				</Card>
				<Button loading={loading} icon='receipt' onPress={GoToInvoice}>
					Descargar Factura
				</Button>
			</View>
		</SafeAreaView>
	);
}
const Styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	card: {
		marginBottom: 20,
		elevation: 4,
	},
	containerCard: {
		flexDirection: "row",
	},
	total: {
		alignItems: "center",
		marginBottom: 20,
	},
});
