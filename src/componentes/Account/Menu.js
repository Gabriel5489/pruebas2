import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Menu() {
	const navigation = useNavigation();

	return (
		<>
			<ScrollView>
				<List.Section>
					<List.Subheader style={sytles.container}>Mi Cuenta</List.Subheader>
					<List.Item
						style={[sytles.containerItem, sytles.TextItem]}
						title='Nombre de Cuenta'
						description='Cambia el nombre de cuenta'
						left={(props) => <List.Icon {...props} icon='face' />}
						onPress={() => navigation.navigate("change-name")}
					/>
					<List.Item
						style={[sytles.containerItem, sytles.TextItem]}
						title='Email'
						description='Cambia el email de tu cuenta'
						left={(props) => <List.Icon {...props} icon='at' />}
						onPress={() => navigation.navigate("change-email")}
					/>

					<List.Item
						style={[sytles.containerItem, sytles.TextItem]}
						title='Numero de telefono '
						description='Cambia el numero de telefono tu cuenta'
						left={(props) => <List.Icon {...props} icon='phone' />}
						onPress={() => navigation.navigate("change-phone")}
					/>

					<List.Item
						style={sytles.containerItem}
						title='Contraseña'
						description='Cambia la contraseña de tu cuenta'
						left={(props) => <List.Icon {...props} icon='key' />}
						onPress={() => navigation.navigate("change-password")}
					/>

					<List.Item
						style={sytles.containerItem}
						title='RFC'
						description='Cambia el RFC de tu cuenta'
						left={(props) => <List.Icon {...props} icon='account' />}
						onPress={() => navigation.navigate("change-rfc")}
					/>
				</List.Section>
			</ScrollView>
		</>
	);
}

const sytles = StyleSheet.create({
	containerItem: {
		backgroundColor: "#55A4D2",
		height: 100,
		justifyContent: "center",
		padding: 20,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 15,
	},
	container: {
		height: 100,
		justifyContent: "center",
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 50,
	},
});
