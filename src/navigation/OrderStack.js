import React from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Shopping from "../pantallas/Orders/Shopping";
import Order from "../pantallas/Orders/Order";
import Invoice from "../pantallas/Orders/Invoice";

import colors from "../style/colors";
const Stack = createStackNavigator();

export default function OrderStack({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.bgDark,
				headerStyle: { backgroundColor: colors.fontLight },
				cardStyle: {
					backgroundColor: colors.bgLight,
				},
			}}>
			<Stack.Screen
				name='MyShopping'
				component={Shopping}
				options={{
					title: "Compras",
					headerRight: () => (
						<IconButton icon='dots-vertical' onPress={() => {}} />
					),
					headerLeft: () => (
						<IconButton
							icon='menu'
							onPress={() => {
								navigation.toggleDrawer();
							}}
						/>
					),
				}}
			/>
			<Stack.Screen
				name='MyOrder'
				component={Order}
				options={{ title: "Pedidos" }}
			/>
			<Stack.Screen
				name='MyInvoice'
				component={Invoice}
				options={{ title: "Descargando Factura...." }}
			/>
		</Stack.Navigator>
	);
}
