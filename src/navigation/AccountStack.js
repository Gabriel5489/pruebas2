import React from "react";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeName from "../pantallas/Account/ChangeName";
import ChangeEmail from "../pantallas/Account/ChangeEmail";
import ChangePhone from "../pantallas/Account/ChangePhone";
import ChangePassword from "../pantallas/Account/ChangePassword";
import Account from "../pantallas/Account/Account";
import AddAddress from "../pantallas/AddAddress";
import colors from "../style/colors";
import Search from "../componentes/Search";
import ChangeRFC from "../pantallas/Account/ChangeRFC";

const Stack = createStackNavigator();

export default function AccountStack({ navigation }) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTintColor: colors.bgDark,
				headerStyle: { backgroundColor: colors.bgLight },
				cardStyle: { backgroundColor: colors.bgLight },
			}}>
			<Stack.Screen
				name='account'
				component={Account}
				options={{
					title: "Cambio de nombre y apellido",
					headerTitle: () => <Search />,
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
				name='change-name'
				component={ChangeName}
				options={{ title: "Cambio de nombre y apellido" }}
			/>

			<Stack.Screen
				name='change-email'
				component={ChangeEmail}
				options={{
					title: "Cambiar email",
				}}
			/>
			<Stack.Screen
				name='change-phone'
				component={ChangePhone}
				options={{
					title: "Cambiar numero de telefono",
				}}
			/>
			<Stack.Screen
				name='change-password'
				component={ChangePassword}
				options={{
					title: "Cambiar nombre de usuario ",
				}}
			/>

			<Stack.Screen
				name='add-address'
				component={AddAddress}
				options={{
					title: "Nueva direccion",
				}}
			/>
			<Stack.Screen
				name='change-rfc'
				component={ChangeRFC}
				options={{
					title: "Cambiar RFC",
				}}
			/>
		</Stack.Navigator>
	);
}
