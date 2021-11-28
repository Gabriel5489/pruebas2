import React from "react";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Button, Snackbar } from "react-native-paper";
export default function Invoice(props) {
	const { invoiceURL } = props?.route?.params;
	const [visible, setVisible] = React.useState(true);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);
	const nav = useNavigation();
	function GoToBack() {
		nav.goBack();
	}

	setTimeout(() => {
		GoToBack();
		console.log("Regresar:)");
	}, 7000);
	return (
		<>
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				action={{
					label: "X",
					onPress: () => {
						onToggleSnackBar;
					},
				}}>
				Espere unos segundos
			</Snackbar>
			<WebView source={{ uri: invoiceURL }} />
		</>
	);
}
